import { z } from 'zod';
import { type ApiRequest, type ApiResponse, methodNotAllowed, rateLimit, trimText } from '../_utils';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(1200),
});

const ChatSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(12),
});

const SYSTEM_PROMPT = `
אתה סוכן התאמת מוצר באתר TF Tracker של תזונאי קליני וספורט.
ענה בעברית, RTL-friendly, קצר וחד, בגוף ראשון כאילו תומר מדבר באתר שלו.
מותר לך לעזור רק בבחירת מוצר, שאלות FAQ, מחירים, הבדלים בין מסלולים והפניה להשארת פרטים.
אסור לתת אבחנה רפואית, הבטחת תוצאות, טיפול רפואי, או מידע שאינו מופיע כאן.
אם השאלה רפואית/מסוכנת: הסבר שצריך ייעוץ אישי מול תומר או איש מקצוע.

מוצרים ומחירים:
1. TF Tracker: מוצר כניסה דיגיטלי. ₪49.90 חודשי או ₪39.90 לחודש במסלול שנתי.
2. BodyMetRiX Lite: דוח מדידה עצמאי. ₪297 לדוח או ₪790 ל-3 דוחות.
3. תהליך אונליין: ליווי מרחוק. ₪4,500 ל-3 חודשים או ₪8,400 ל-6 חודשים.
4. ליווי אישי מלא: עבודה צמודה איתי. ₪9,000 ל-3 חודשים או ₪16,500 ל-6 חודשים.
5. כרטיסיית מדידות: ₪800 ל-4 מדידות, ₪1,400 ל-8 מדידות, ₪1,900 ל-12 מדידות.
6. BodyMetRiX Pro: לתזונאים ואנשי מקצוע. ₪2,970 שנתי או ₪297 חודשי.

כללי התאמה:
- אם המשתמש רוצה להתחיל בזול/עצמאי: TF Tracker.
- אם הוא צריך להבין מצב מדידה לפני התחייבות: BodyMetRiX Lite.
- אם הוא רוצה תהליך רציני בלי להגיע פיזית: תהליך אונליין.
- אם הוא רוצה זמינות גבוהה ועבודה צמודה: ליווי אישי מלא.
- אם הוא סיים תהליך ורוצה תחזוקה: כרטיסיית מדידות.
- אם הוא איש מקצוע: BodyMetRiX Pro.
`;

function fallbackAnswer(lastUserMessage: string) {
  const text = lastUserMessage.toLowerCase();
  if (text.includes('מחיר') || text.includes('כמה') || text.includes('עלות')) {
    return 'המחירים המרכזיים: TF Tracker ב-₪49.90 חודשי או ₪39.90 שנתי, BodyMetRiX Lite ב-₪297 לדוח, תהליך אונליין מ-₪4,500 ל-3 חודשים, וליווי אישי מלא מ-₪9,000 ל-3 חודשים. אם תגיד לי מה המטרה שלך ומה רמת הליווי שאתה רוצה, אפשר לכוון אותך למסלול הנכון.';
  }
  if (text.includes('ביטוח') || text.includes('החזר')) {
    return 'ייתכן שיש החזרים דרך ביטוח פרטי או קופות, אבל זה תלוי בפוליסה שלך. הכי נכון להשאיר פרטים באזור הביטוח באתר ואחזור אליך לבדיקה נקודתית.';
  }
  if (text.includes('אפליק') || text.includes('tracker')) {
    return 'TF Tracker מתאים למי שרוצה מסגרת עצמאית וזולה: אוכל, אימונים, מדידות ומעקב במקום אחד. הוא עומד כמוצר בפני עצמו, ואם בהמשך עוברים לתהליך אישי הנתונים ממשיכים איתך.';
  }
  return 'כדי לכוון אותך נכון צריך להבין שלושה דברים: מה המטרה שלך, כמה ליווי אתה רוצה בפועל, והאם אתה מעדיף להתחיל עצמאית או להיכנס לתהליך מלא. אם אתה רוצה תשובה מהירה, כתוב לי את שלוש התשובות ואכוון אותך למסלול המתאים.';
}

async function callGemini(messages: { role: 'user' | 'assistant'; content: string }[]) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  if (!apiKey) {
    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content || '';
    return { answer: fallbackAnswer(lastUserMessage), configured: false };
  }

  const contents = messages.map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: trimText(message.content, 1200) }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 700,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error('gemini-request-failed');
  }

  const data = await response.json() as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const answer = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();

  return {
    answer: answer || 'לא הצלחתי לייצר תשובה כרגע. אפשר להשאיר פרטים ואחזור אליך בוואטסאפ.',
    configured: true,
  };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return methodNotAllowed(res, 'POST, OPTIONS');
  }

  if (!rateLimit(req, 20, 60_000)) {
    return res.status(429).json({ ok: false, error: 'rate-limited' });
  }

  const parsed = ChatSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'invalid-chat' });
  }

  try {
    const result = await callGemini(parsed.data.messages);
    return res.status(200).json({ ok: true, ...result });
  } catch {
    const lastUserMessage = [...parsed.data.messages].reverse().find((message) => message.role === 'user')?.content || '';
    return res.status(200).json({ ok: true, answer: fallbackAnswer(lastUserMessage), configured: false });
  }
}
