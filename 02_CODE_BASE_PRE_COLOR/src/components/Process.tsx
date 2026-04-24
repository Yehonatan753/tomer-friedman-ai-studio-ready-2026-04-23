import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Step = {
  num: string;
  title: string;
  desc: string;
  note: string;
};

function ProcessStep({
  step,
  idx,
  total,
  scrollYProgress,
}: {
  step: Step;
  idx: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const isEven = idx % 2 !== 0;
  const stepProgressStart = idx / Math.max(total, 1);
  const stepProgressEnd = stepProgressStart + 0.16;

  const glowOpacity = useTransform(scrollYProgress, [stepProgressStart, stepProgressEnd], [0.2, 1]);
  const borderColor = useTransform(scrollYProgress, [stepProgressStart, stepProgressEnd], ['rgba(28,141,255,0.14)', 'rgba(28,141,255,1)']);
  const scale = useTransform(scrollYProgress, [stepProgressStart, stepProgressEnd], [1, 1.1]);

  return (
    <div className={`flex flex-col items-center gap-8 md:flex-row md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="w-full flex-1 text-right md:w-1/2"
      >
        <div className="rounded-[2rem] border border-energy/20 bg-white p-8 shadow-[0_24px_70px_rgba(15,42,68,0.08)] transition-all duration-300 hover:border-energy/40 hover:shadow-[0_24px_80px_rgba(28,141,255,0.14)]">
          <h3 className="mb-3 font-heading text-2xl font-black text-foreground">{step.title}</h3>
          <p className="mb-4 leading-relaxed text-text-muted">{step.desc}</p>
          <p className="text-sm font-bold italic text-energy">"{step.note}"</p>
        </div>
      </motion.div>

      <div className="relative z-10 hidden h-16 w-16 shrink-0 items-center justify-center md:flex">
        <motion.div className="absolute inset-0 rounded-full bg-energy/20 blur-md" style={{ opacity: glowOpacity }} />
        <motion.div
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-black text-energy shadow-[0_16px_38px_rgba(15,42,68,0.12)]"
          style={{ borderColor, borderWidth: '2px', borderStyle: 'solid', scale }}
        >
          {step.num}
        </motion.div>
      </div>

      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-energy bg-white text-xl font-black text-energy shadow-[0_12px_30px_rgba(28,141,255,0.18)] md:hidden">
        {step.num}
      </div>

      <div className="hidden w-1/2 flex-1 md:block" />
    </div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const steps: Step[] = [
    {
      num: '1',
      title: 'אבחון',
      desc: 'מתחילים במדידות אמיתיות, לא בהערכה. הרכב גוף, היקפים, בדיקות אם יש. בלי זה, כל תפריט הוא ניחוש.',
      note: 'בשלב הזה אני רוצה להבין מה באמת קורה, לא מה נדמה שקורה.',
    },
    {
      num: '2',
      title: 'בנייה',
      desc: 'אני בונה לך מסגרת: תזונה, אימונים ומדידות שמתחברת לחיים שלך, לא לחיים של מישהו אחר שראית באפליקציה.',
      note: 'התוכנית צריכה להתאים אליך. לא אתה אליה.',
    },
    {
      num: '3',
      title: 'ליווי',
      desc: 'מענה יומיומי. לא פעם בשבועיים כשאתה נזכר. גם כשנשבר, גם כשאתה בחופש, וגם כשמשהו השתנה.',
      note: 'אני לא משאיר אותך לבד עם קובץ ותפריט.',
    },
    {
      num: '4',
      title: 'התמדה',
      desc: 'בסוף התהליך לא נשארים תלויים בי. בונים את הרצף שאפשר להחזיק גם אחרי שסיימנו לעבוד יחד.',
      note: 'המטרה היא לא רק תוצאה. המטרה היא תוצאה שאתה יודע לשמור.',
    },
  ];

  return (
    <section id="process" className="relative overflow-hidden bg-gradient-to-b from-[#f7fbff] to-white px-6 py-32 md:px-16 lg:px-24">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#1c8dff 1px, transparent 1px), linear-gradient(90deg, #1c8dff 1px, transparent 1px)', backgroundSize: '46px 46px' }} />
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-24 text-center">
          <div className="mb-4 text-sm font-black uppercase tracking-widest text-energy">תהליך העבודה איתי</div>
          <h2 className="font-heading text-4xl font-black text-foreground md:text-6xl">
            4 שלבים. לא שיטה, <span className="text-energy">שיטתיות.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
            השותפות שלנו מתחילה באבחון אסטרטגי וממשיכה באופטימיזציה מתמדת. אני לא מספק פתרון "זבנג וגמרנו", אלא בונה איתך הרגלים שאפשר להחזיק.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-[2px] -translate-x-1/2 bg-energy/10 md:block" />
          <motion.div
            className="absolute left-1/2 top-0 hidden w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-energy to-[#5fb8ff] shadow-[0_0_15px_rgba(28,141,255,0.45)] md:block"
            style={{ height: lineHeight }}
          />
          <div className="relative z-10 flex flex-col gap-20 md:gap-24">
            {steps.map((step, idx) => (
              <ProcessStep key={step.num} step={step} idx={idx} total={steps.length} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
