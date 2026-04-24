import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Step = {
  num: string;
  title: string;
  desc: string;
  note: string;
};

type ProcessStepProps = {
  step: Step;
  idx: number;
  total: number;
  scrollYProgress: MotionValue<number>;
};

function ProcessStep({ step, idx, total, scrollYProgress }: ProcessStepProps) {
  const isEven = idx % 2 !== 0;
  const stepProgressStart = idx / Math.max(total, 1);
  const stepProgressEnd = stepProgressStart + 0.16;

  const glowOpacity = useTransform(
    scrollYProgress,
    [stepProgressStart, stepProgressEnd],
    [0.2, 1]
  );

  const borderColor = useTransform(
    scrollYProgress,
    [stepProgressStart, stepProgressEnd],
    ["rgba(255,255,255,0.1)", "rgba(28,141,255,1)"]
  );

  const scale = useTransform(
    scrollYProgress,
    [stepProgressStart, stepProgressEnd],
    [1, 1.1]
  );

  const nodeColor = useTransform(
    scrollYProgress,
    [stepProgressStart, stepProgressEnd],
    ["#ffffff", "#1c8dff"]
  );

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className={`flex-1 w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}
      >
        <div className="glass-panel p-8 rounded-3xl hover-trigger hover:border-energy/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(28,141,255,0.15)] group">
          <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-energy transition-colors">{step.title}</h3>
          <p className="text-text-muted mb-4">{step.desc}</p>
          <p className="text-sm text-energy/80 italic">"{step.note}"</p>
        </div>
      </motion.div>

      <div className="hidden md:flex relative z-10 items-center justify-center w-16 h-16 shrink-0">
        <motion.div
          className="absolute inset-0 rounded-full bg-energy/20 blur-md"
          style={{ opacity: glowOpacity }}
        />
        <motion.div
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-bg text-white font-bold text-xl z-10 transition-colors hover-trigger"
          style={{
            borderColor,
            borderWidth: '2px',
            borderStyle: 'solid',
            scale
          }}
          whileHover={{ scale: 1.2, boxShadow: "0 0 20px rgba(28,141,255,0.6)", borderColor: "rgba(28,141,255,1)" }}
        >
          <motion.span style={{ color: nodeColor }}>
            {step.num}
          </motion.span>
        </motion.div>
      </div>

      <div className="md:hidden relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-bg border-2 border-energy text-energy font-bold text-xl shrink-0 shadow-[0_0_20px_rgba(28,141,255,0.3)]">
        {step.num}
      </div>

      <div className="hidden md:block flex-1 w-1/2"></div>
    </div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      num: "1",
      title: "אבחון",
      desc: "מתחילים במדידות אמיתיות, לא בהערכה. הרכב גוף, היקפים, בדיקות אם יש. בלי זה, כל תפריט הוא ניחוש.",
      note: "בשלב הזה אני רוצה להבין מה באמת קורה, לא מה נדמה שקורה."
    },
    {
      num: "2",
      title: "בנייה",
      desc: "אני בונה לך מסגרת — תזונה, אימונים ומדידות — שמתחברת לחיים שלך, לא לחיים של מישהו אחר שראיתי באפליקציה.",
      note: "התכנית צריכה להתאים אליך. לא אתה אליה."
    },
    {
      num: "3",
      title: "ליווי",
      desc: "מענה יומיומי. לא פעם בשבועיים כשאתה נזכר. גם כשנשבר, גם כשאתה בחופש, גם כשהשתנה משהו.",
      note: "אני לא משאיר אותך לבד עם קובץ ותפריט."
    },
    {
      num: "4",
      title: "התמדה",
      desc: "בסוף התהליך לא נשארים תלויים בי. בונים את הרצף שאפשר להחזיק גם אחרי שסיימנו לעבוד יחד.",
      note: "המטרה היא לא רק תוצאה. המטרה היא תוצאה שאתה יודע לשמור."
    }
  ];

  return (
    <section id="process" className="py-32 px-6 md:px-16 lg:px-24 bg-bg relative overflow-hidden">


      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <div className="text-energy font-bold tracking-widest uppercase text-sm mb-4">תהליך העבודה איתי</div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white">
            מובנה, שקוף <span className="text-energy">וממוקד-תוצאות</span>
          </h2>
          <p className="text-text-muted mt-6 max-w-2xl mx-auto text-lg">
            השותפות שלנו מתחילה באפיון אסטרטגי וממשיכה באופטימיזציה מתמדת. אני לא מספק פתרון 'זבנג וגמרנו', אלא אנחנו בונים יחד הרגלים לכל החיים.
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Background Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block"></div>

          {/* Animated Fill Line */}
          <motion.div
            className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-energy to-blue-500 -translate-x-1/2 hidden md:block origin-top shadow-[0_0_15px_rgba(28,141,255,0.8)]"
            style={{ height: lineHeight }}
          ></motion.div>

          <div className="flex flex-col gap-24 relative z-10">
            {steps.map((step, idx) => (
              <ProcessStep key={step.num} step={step} idx={idx} total={steps.length} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
