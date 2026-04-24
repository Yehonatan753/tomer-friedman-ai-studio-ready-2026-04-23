export type AgentRole = 'user' | 'assistant';

export type AgentMessage = {
  role: AgentRole;
  content: string;
};

export type AgentResponse = {
  ok: boolean;
  answer: string;
  configured?: boolean;
  error?: string;
};

function localAgentFallback(messages: AgentMessage[]): AgentResponse {
  const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content.toLowerCase() || '';

  if (lastUserMessage.includes('מחיר') || lastUserMessage.includes('כמה') || lastUserMessage.includes('עלות')) {
    return {
      ok: true,
      configured: false,
      answer:
        'המחירים המרכזיים: TF Tracker ב-₪49.90 חודשי או ₪39.90 במסלול שנתי, BodyMetRiX Lite ב-₪297 לדוח, תהליך אונליין מ-₪4,500 ל-3 חודשים, וליווי אישי מלא מ-₪9,000 ל-3 חודשים.',
    };
  }

  if (lastUserMessage.includes('ביטוח') || lastUserMessage.includes('החזר')) {
    return {
      ok: true,
      configured: false,
      answer: 'יכול להיות שיש זכאות להחזר דרך ביטוח פרטי או קופה, אבל זה תלוי בפוליסה. השאר פרטים באזור הביטוח ותומר יחזור אליך לבדיקה נקודתית.',
    };
  }

  if (lastUserMessage.includes('tracker') || lastUserMessage.includes('אפליק')) {
    return {
      ok: true,
      configured: false,
      answer:
        'TF Tracker מתאים למי שרוצה להתחיל עצמאית וזול: אוכל, אימונים, מדידות ומעקב במקום אחד. אם בהמשך עוברים לתהליך אישי, הנתונים ממשיכים איתך ולא מתחילים מאפס.',
    };
  }

  return {
    ok: true,
    configured: false,
    answer:
      'כדי לכוון אותך נכון צריך להבין מטרה, רמת ליווי רצויה, והאם אתה רוצה להתחיל לבד או בתהליך מלא. אם אתה רוצה ליווי מרחוק, תהליך אונליין הוא נקודת פתיחה חזקה. אם אתה רוצה זמינות גבוהה ועבודה צמודה, הליווי האישי מתאים יותר.',
  };
}

export async function sendAgentMessage(messages: AgentMessage[]): Promise<AgentResponse> {
  try {
    const response = await fetch('/api/agent/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      return localAgentFallback(messages);
    }

    return (await response.json()) as AgentResponse;
  } catch {
    return localAgentFallback(messages);
  }
}
