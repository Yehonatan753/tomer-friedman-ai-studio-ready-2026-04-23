import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, ChevronLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { leadInputProps, submitLeadAndOpenWhatsApp, validateLeadForm } from '../lib/leads';

const QUESTIONS = [
  {
    id: 'q1',
    title: 'מה המטרה העיקרית שלך?',
    hint: 'בחר את המטרה שהכי חשובה לך כרגע',
    options: [
      { id: 'fat-loss', label: 'ירידה בשומן וחיטוב', desc: 'שינוי הרכב הגוף והצרת היקפים' },
      { id: 'muscle', label: 'עלייה במסת שריר וכוח', desc: 'בניית שריר ושיפור ביצועים' },
      { id: 'health', label: 'שיפור בריאות ואנרגיה', desc: 'איזון מדדים, חיוניות ותפקוד יומיומי' },
      { id: 'habits', label: 'יציאה ממעגל הדיאטות', desc: 'בניית הרגלים לטווח ארוך בלי סבל' },
    ]
  },
  {
    id: 'q2',
    title: 'מה האתגר הכי גדול שלך כרגע?',
    hint: 'מה בדרך כלל גורם לך לעצור?',
    options: [
      { id: 'consistency', label: 'חוסר עקביות', desc: 'מתחיל חזק ואז מפסיק' },
      { id: 'emotional', label: 'אכילה רגשית / חוסר שליטה', desc: 'בעיקר בשעות הערב או בסטרס' },
      { id: 'confusion', label: 'בלבול מעודף מידע', desc: 'לא יודע למי להאמין ומה נכון' },
      { id: 'time', label: 'חוסר זמן', desc: 'לו"ז צפוף שמקשה על התארגנות' },
    ]
  },
  {
    id: 'q3',
    title: 'מה רמת הפעילות הגופנית שלך?',
    hint: 'כמה אימונים בשבוע בממוצע?',
    options: [
      { id: 'none', label: 'לא מתאמן כרגע', desc: 'או פעילות קלה מאוד פה ושם' },
      { id: 'low', label: '1-2 אימונים בשבוע', desc: 'משתדל לשמור על תנועה' },
      { id: 'med', label: '3-4 אימונים בשבוע', desc: 'שגרת אימונים קבועה ויציבה' },
      { id: 'high', label: 'מתאמן ברמה גבוהה', desc: '4+ אימונים עצימים בשבוע' },
    ]
  },
  {
    id: 'q4',
    title: 'מה הניסיון הקודם שלך עם תזונה?',
    hint: 'איך ניסית לפתור את זה בעבר?',
    options: [
      { id: 'never', label: 'אף פעם לא עשיתי תהליך מסודר', desc: 'זו פעם ראשונה שאני מחפש עזרה' },
      { id: 'yoyo', label: 'ניסיתי דיאטות ועליתי בחזרה', desc: 'אפקט היו-יו המוכר' },
      { id: 'know_stuck', label: 'יודע מה לעשות, לא מיישם', desc: 'הידע קיים, הביצוע חסר' },
      { id: 'good_stuck', label: 'אוכל טוב אבל התוצאות תקועות', desc: 'מרגיש שעושה הכל נכון ואין שינוי' },
    ]
  },
  {
    id: 'q5',
    title: 'איזו מסגרת ליווי תתאים לך עכשיו?',
    hint: 'מה יעזור לך להצליח?',
    options: [
      { id: 'premium', label: 'ליווי אישי וצמוד', desc: 'מעקב שבועי, התאמות וזמינות מלאה' },
      { id: 'independent', label: 'תוכנית מסודרת לעבודה עצמאית', desc: 'לקבל את הכלים ולרוץ לבד' },
      { id: 'consult', label: 'פגישת ייעוץ ודיוק', desc: 'לעשות סדר חד פעמי בבלאגן' },
      { id: 'unsure', label: 'לא בטוח', desc: 'אשמח להמלצה מקצועית' },
    ]
  },
  {
    id: 'q6',
    title: 'כמה חשובה לך מדידה אמיתית של הרכב גוף?',
    hint: 'לא רק משקל, אלא היקפים, אחוזי שומן ומגמות',
    options: [
      { id: 'measurement-high', label: 'קריטי לי לראות נתונים אמיתיים', desc: 'אני רוצה להבין מה קורה בגוף, לא לנחש' },
      { id: 'measurement-medium', label: 'חשוב, אבל לא חייב בכל שלב', desc: 'מספיק לי מעקב תקופתי מסודר' },
      { id: 'measurement-low', label: 'כרגע אני צריך סדר באוכל', desc: 'מדידות פחות דחופות לי עכשיו' },
      { id: 'measurement-unsure', label: 'לא יודע מה נכון למדוד', desc: 'צריך הכוונה בסיסית' },
    ]
  },
  {
    id: 'q7',
    title: 'איזה טווח השקעה מרגיש לך נכון להתחלה?',
    hint: 'כדי לא להמליץ לך על מוצר שלא מתאים למציאות שלך',
    options: [
      { id: 'budget-entry', label: 'מוצר דיגיטלי זול וגמיש', desc: 'להתחיל קטן בלי התחייבות' },
      { id: 'budget-diagnostic', label: 'כמה מאות שקלים לאבחון', desc: 'דוח / מדידה / בדיקת כיוון' },
      { id: 'budget-flagship', label: 'תהליך מלא של כמה אלפי שקלים', desc: 'אם זה שווה את הערך והמסגרת' },
      { id: 'budget-unsure', label: 'קודם להבין ערך', desc: 'לא החלטתי עדיין' },
    ]
  },
  {
    id: 'q8',
    title: 'מה יגרום לך להשתמש במערכת באמת?',
    hint: 'הפער הוא בדרך כלל לא ידע, אלא יישום',
    options: [
      { id: 'execution-fast', label: 'רישום אוכל מהיר', desc: 'ברקוד, צילום ובלי למלא אקסלים' },
      { id: 'execution-accountability', label: 'אחריותיות ומעקב', desc: 'שמישהו יחזיק איתי את הרצף' },
      { id: 'execution-progress', label: 'גרפים והתקדמות', desc: 'לראות אם הנתונים באמת זזים' },
      { id: 'execution-coaching', label: 'חיבור לתהליך אישי', desc: 'שיהיה ברור מה השלב הבא אם נתקעים' },
    ]
  }
];

function calculateResult(answers: Record<string, string>) {
  let score = 0;
  if (answers.q5 === 'premium') score += 3;
  if (answers.q5 === 'independent') score -= 2;
  if (answers.q3 === 'none') score += 1;
  if (answers.q4 === 'yoyo') score += 1;
  if (answers.q6 === 'measurement-high') score += 1;
  if (answers.q8 === 'execution-accountability' || answers.q8 === 'execution-coaching') score += 1;
  if (answers.q7 === 'budget-entry' || answers.q7 === 'budget-diagnostic') score -= 2;
  if (answers.q7 === 'budget-flagship') score += 2;

  if (answers.q7 === 'budget-entry') return {
    badge: 'ההמלצה שלי: TF Tracker',
    title: 'הצעד הנכון הוא להתחיל קטן, מסודר וזול.',
    body: 'לפי התשובות שלך, אין סיבה לקפוץ מיד לתהליך מלא. קודם בונים רצף יומי עם אוכל, אימונים, מדידות ומעקב במקום אחד.',
    points: ['₪49.90 חודשי או ₪39.90 במסלול שנתי', 'שאלון כניסה ומעקב יומי', 'אפשר להתקדם אחר כך בלי לאבד נתונים'],
    cta: 'בחר את TF Tracker בסל הבחירה ושלח לי את ההתאמה.'
  };
  if (answers.q7 === 'budget-diagnostic' || answers.q6 === 'measurement-unsure') return {
    badge: 'ההמלצה שלי: BodyMetRiX Lite',
    title: 'לפני שמתחייבים, כדאי להבין מאיפה מתחילים.',
    body: 'הפער כרגע הוא לא בהכרח ליווי מלא, אלא אבחון ברור. דוח מדידה עצמי יכול לתת לך כיוון בלי להעמיס החלטה גדולה.',
    points: ['דוח בודד ב־₪297', '3 דוחות ב־₪790 למעקב', 'מדידות והמלצה להמשך בשפה פשוטה'],
    cta: 'בחר BodyMetRiX Lite בסל הבחירה ונבדוק אם זה מספיק או שצריך מסלול עמוק יותר.'
  };
  if (score >= 2) return {
    badge: 'ההמלצה שלי: ליווי אישי מלא',
    title: 'אתה צריך מסגרת חזקה וליווי אישי קרוב.',
    body: 'לפי התשובות שלך, ניסית בעבר להתמודד לבד וזה לא החזיק מעמד.',
    points: ['עבודה צמודה בקליניקה / אונליין לפי התאמה', 'מדידות והרכב גוף מלאים', 'זמינות יומיומית וגישה לאפליקציה'],
    cta: 'בוא נבדוק בשיחת ייעוץ קצרה אם אנחנו מתאימים לעבוד יחד.'
  };
  if (score >= -1) return {
    badge: 'ההמלצה שלי: מסלול אונליין',
    title: 'יש לך את הדרייב, אתה רק צריך את המערכת הנכונה.',
    body: 'אתה יודע לעבוד עצמאית, אבל חסר לך הסדר והכוונה המקצועית.',
    points: ['תוכנית מותאמת אישית', 'מעקב שבועי מרחוק', 'עצמאות בביצוע', 'גישה לאפליקציית המעקב'],
    cta: 'כדי להתאים לך את מסלול האונליין המדויק, נדרשת שיחת אפיון קצרה.'
  };
  return {
    badge: 'ההמלצה שלי: ייעוץ ממוקד',
    title: 'המצב שלך טוב, אתה רק צריך דיוק.',
    body: 'נראה שיש לך בסיס טוב ואתה יודע מה לעשות.',
    points: ['מענה מדויק לשאלות ספציפיות', 'דיוק התפריט הקיים', 'כלים פרקטיים ליישום מיידי', 'בלי התחייבות לתהליך ארוך'],
    cta: 'בוא נשב לשיחת ייעוץ ממוקדת ונדייק את מה שחסר לך.'
  };
}

export default function Pathfinder() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' });

  const handleStart = () => setCurrentStep(0);

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 350);
    } else {
      setTimeout(() => setCurrentStep(QUESTIONS.length), 350);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateLeadForm(e.currentTarget)) return;

    submitLeadAndOpenWhatsApp(
      {
        source: 'pathfinder',
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email,
        product: 'pathfinder-result',
        metadata: { answers },
      },
      `שלום תומר, קוראים לי ${leadData.name}. מילאתי את האבחון באתר ואשמח להבין מה המסלול הנכון בשבילי. טלפון: ${leadData.phone}`,
    );
    setCurrentStep(QUESTIONS.length + 1);
    setTimeout(() => setCurrentStep(QUESTIONS.length + 2), 2000);
  };

  const result = currentStep === QUESTIONS.length + 2 ? calculateResult(answers) : null;

  return (
    <section id="pathfinder" className="relative overflow-hidden bg-gradient-to-b from-[#f7fbff] to-white px-6 py-24 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto relative z-10">
        {currentStep < QUESTIONS.length + 2 && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
              בוא נבין מה באמת <span className="text-energy">מעכב אותך</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              אבחון תזונתי קצר שיגיד לך בדיוק מה המצב, מה עוצר אותך, ומה הצעד הבא שמתאים לך.
            </p>
          </div>
        )}

        <div className="glass-panel-dark relative flex min-h-[450px] flex-col justify-center overflow-hidden rounded-3xl border border-energy/10 p-8 shadow-[0_24px_80px_rgba(15,42,68,0.10)] md:p-12">
          {currentStep >= 0 && currentStep < QUESTIONS.length && (
            <div className="absolute top-0 left-0 w-full h-1 bg-foreground/5">
              <motion.div className="h-full bg-energy" initial={{ width: 0 }} animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }} transition={{ duration: 0.3 }} />
            </div>
          )}

          <AnimatePresence mode="wait">
            {currentStep === -1 && (
              <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center">
                <div className="w-20 h-20 bg-energy/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-energy/20">
                  <Target size={32} className="text-energy" />
                </div>
                <div className="space-y-4 mb-10 text-right max-w-sm mx-auto">
                  {[`${QUESTIONS.length} שאלות קצרות ומדויקות`, 'תוצאה מותאמת אישית בסוף', 'בלי מכירה, בלי ספאם'].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 text-text-muted">
                      <div className="w-2 h-2 rounded-full bg-energy"></div>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
                <button onClick={handleStart} className="btn-magnetic inline-flex items-center gap-2 rounded-full bg-energy px-10 py-4 text-lg font-bold text-white shadow-[0_10px_30px_-10px_rgba(28,141,255,0.4)]">
                  <span>בוא נתחיל</span>
                  <ChevronLeft size={20} />
                </button>
              </motion.div>
            )}

            {currentStep >= 0 && currentStep < QUESTIONS.length && (
              <motion.div key={`question-${currentStep}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-energy font-bold tracking-widest text-sm">שאלה {currentStep + 1} מתוך {QUESTIONS.length}</span>
                  {currentStep > 0 && (
                    <button onClick={() => setCurrentStep(prev => prev - 1)} className="text-text-muted hover:text-foreground flex items-center text-sm transition-colors">
                      <ChevronRight size={16} className="ml-1" /> חזור
                    </button>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">{QUESTIONS[currentStep].title}</h3>
                {QUESTIONS[currentStep].hint && <p className="text-text-muted mb-8 text-sm">{QUESTIONS[currentStep].hint}</p>}

                <div className="space-y-3">
                  {QUESTIONS[currentStep].options.map((option) => {
                    const isSelected = answers[QUESTIONS[currentStep].id] === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleAnswer(QUESTIONS[currentStep].id, option.id)}
                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 text-right
                          ${isSelected
                            ? 'bg-energy/10 border-energy text-foreground shadow-[0_0_20px_rgba(28,141,255,0.15)]'
                            : 'bg-foreground/5 border-foreground/10 text-text-muted hover:bg-foreground/10 hover:border-foreground/20 hover:text-foreground'
                          }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-energy bg-energy' : 'border-foreground/20'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 bg-bg rounded-full"></div>}
                        </div>
                        <div>
                          <span className="text-lg font-medium block">{option.label}</span>
                          {option.desc && <span className="text-sm text-text-muted/80 block mt-0.5">{option.desc}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {currentStep === QUESTIONS.length && (
              <motion.div key="lead" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-heading font-bold text-foreground mb-2">התוצאות שלך מוכנות</h3>
                  <p className="text-text-muted">השאר פרטים ותקבל את האבחון האישי שלך</p>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-muted">שם מלא</label>
                    <input name="name" required type="text" {...leadInputProps.fullName} value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})} className="w-full bg-bg border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-energy transition-colors" placeholder="השם שלך" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-muted">טלפון</label>
                    <input name="phone" required {...leadInputProps.phone} value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} className="w-full bg-bg border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-energy transition-colors text-right" placeholder="050-0000000" dir="ltr" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-muted">אימייל</label>
                    <input name="email" required {...leadInputProps.email} value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} className="w-full bg-bg border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-energy transition-colors text-right" placeholder="your@email.com" dir="ltr" />
                  </div>
                  <button type="submit" className="btn-magnetic mt-4 w-full rounded-xl bg-energy px-8 py-4 font-bold text-white shadow-[0_10px_30px_-10px_rgba(28,141,255,0.4)]">
                    קבל את התוצאות שלי
                  </button>
                </form>
              </motion.div>
            )}

            {currentStep === QUESTIONS.length + 1 && (
              <motion.div key="calculating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-foreground/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-energy rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">מנתח את התשובות שלך...</h3>
                <p className="text-text-muted">מתאים את האבחון המדויק עבורך</p>
              </motion.div>
            )}

            {currentStep === QUESTIONS.length + 2 && result && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
                <div className="text-center mb-10">
                  <h3 className="text-3xl md:text-4xl font-heading font-black text-foreground mb-2">
                    {leadData.name ? leadData.name.split(' ')[0] : 'היי'}, הנה מה שהאבחון מראה
                  </h3>
                </div>

                <div className="border rounded-3xl p-8 mb-8 bg-bg relative overflow-hidden border-green-500/30">
                  <div className="absolute top-0 right-0 w-full h-1 bg-green-500"></div>
                  <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-widest mb-6 bg-green-500/10 text-green-500">
                    {result.badge}
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-4 leading-snug">{result.title}</h4>
                  <p className="text-text-muted leading-relaxed mb-8">{result.body}</p>
                  <ul className="space-y-4">
                    {result.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90 pb-4 border-b border-foreground/5 last:border-0 last:pb-0">
                        <CheckCircle2 size={20} className="shrink-0 mt-0.5 text-green-500" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center bg-bg border border-foreground/5 rounded-3xl p-8">
                  <div className="text-xl font-bold text-foreground mb-3">הצעד הבא שלך</div>
                  <p className="text-text-muted mb-8 max-w-lg mx-auto">{result.cta}</p>
                  <a href="#tracks" className="btn-magnetic mb-4 inline-block w-full rounded-full bg-energy px-10 py-4 text-lg font-bold text-white shadow-[0_10px_30px_-10px_rgba(28,141,255,0.4)] sm:w-auto">
                    לקבוע שיחת ייעוץ איתי
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
