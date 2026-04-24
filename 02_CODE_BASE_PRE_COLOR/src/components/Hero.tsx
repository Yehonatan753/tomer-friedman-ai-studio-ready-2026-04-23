import { MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowLeft, PhoneCall, Users } from 'lucide-react';
import { SITE_DATA } from '../data';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const itemVariants = {
    hidden: { y: '100%' },
    show: { y: 0, transition: { duration: 1.05, ease } },
  };

  return (
    <section
      id="hero"
      className="group relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-gradient-to-br from-white via-[#f7fbff] to-[#e9f5ff] px-6 pb-0 pt-28 md:px-16 lg:px-24"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              660px circle at ${mouseX}px ${mouseY}px,
              rgba(28, 141, 255, 0.18),
              transparent 78%
            )
          `,
        }}
      />

      <div className="absolute inset-0 z-0">
        <img
          src="/tomer-office-highres.png"
          alt="תומר פרידמן בקליניקה"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-[0.08] mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(28,141,255,0.16),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.98),rgba(255,255,255,0.84)_52%,rgba(232,244,255,0.68))]" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -45 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 1.8, ease }}
        className="pointer-events-none absolute bottom-0 left-0 z-10 hidden h-[720px] w-[420px] lg:left-12 lg:block lg:w-[510px]"
      >
        <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-t-[3rem]">
          <div className="absolute inset-x-8 bottom-0 top-16 rounded-t-[3rem] bg-gradient-to-b from-energy/10 to-[#dff1ff]" />
          <div
            className="absolute inset-0 bg-[url('/tomer-blue-shirt.png')] bg-cover bg-top"
            style={{
              maskImage: 'linear-gradient(to bottom, black 76%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 76%, transparent 100%)',
            }}
          />

          <div className="absolute bottom-12 flex items-center gap-4 rounded-3xl border border-energy/20 bg-white/90 px-5 py-4 shadow-[0_20px_55px_rgba(15,42,68,0.18)] backdrop-blur-md">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-energy/20 bg-white">
              <img src="/tomer-logo.png" alt="לוגו תומר פרידמן" className="h-10 w-10 object-contain" />
            </div>
            <div>
              <p className="text-sm font-black text-foreground">{SITE_DATA.profile.name}</p>
              <p className="text-xs text-text-muted">{SITE_DATA.profile.title}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 1.25 } } }}
        initial="hidden"
        animate="show"
        className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-start gap-6 lg:ml-[42%]"
      >
        <div className="overflow-hidden pb-2">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 rounded-full border border-energy/20 bg-white/80 px-5 py-2.5 shadow-sm backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-energy opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-energy" />
            </span>
            <span className="text-xs font-black tracking-widest text-foreground/70">{SITE_DATA.hero.badge}</span>
          </motion.div>
        </div>

        <div className="overflow-hidden pb-2">
          <motion.p variants={itemVariants} className="text-xl font-bold tracking-tight text-energy md:text-2xl">
            {SITE_DATA.hero.eyebrow}
          </motion.p>
        </div>

        <div className="overflow-hidden pb-4">
          <motion.h1 variants={itemVariants} className="font-heading text-6xl font-black leading-[1.04] tracking-tighter text-foreground md:text-[7rem]">
            השינוי <span className="text-glow-animate">האחרון</span>
            <br />
            שתצטרך לעשות.
          </motion.h1>
        </div>

        <div className="overflow-hidden pb-2">
          <motion.p variants={itemVariants} className="mt-4 max-w-2xl border-r-2 border-energy pr-6 text-lg leading-relaxed text-text-muted md:text-xl">
            אני לא מחלק תפריטים גנריים. אני בונה מערכת תזונה ואימונים שמותאמת בדיוק לחיים שלך, לא להפך. 22 שנות ניסיון קליני, בלי מתמחים ובלי תפריט פוטוקופי. רק אני, אתה, והנתונים שמראים מה באמת עובד.
          </motion.p>
        </div>

        <div className="overflow-hidden pb-4 pt-6">
          <motion.div variants={itemVariants} className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <a
              href="#pathfinder"
              className="btn-magnetic group flex w-full items-center justify-center rounded-full bg-energy px-8 py-4 text-lg font-black text-white shadow-[0_12px_36px_rgba(28,141,255,0.32)] sm:w-auto"
            >
              <span>התאם לי תוכנית</span>
              <ArrowLeft size={20} className="mr-3 transition-transform group-hover:-translate-x-1" />
            </a>
            <a
              href="#tracks"
              className="btn-magnetic group flex w-full items-center justify-center rounded-full border border-energy/20 bg-white/80 px-8 py-4 text-lg font-bold text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-[#eef7ff] sm:w-auto"
            >
              <PhoneCall size={20} className="ml-3 text-energy" />
              <span>תיאום שיחת ייעוץ</span>
            </a>
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} className="mt-6 flex items-center gap-2 text-sm text-text-muted">
          <Users size={16} className="text-energy" />
          <span>מצטרף ליותר מ־500 מתאמנים שכבר עשו את השינוי</span>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4"
      >
        <div className="relative h-16 w-[1px] overflow-hidden bg-foreground/10">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 top-0 h-1/2 w-full bg-energy"
          />
        </div>
      </motion.div>
    </section>
  );
}
