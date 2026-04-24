import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowLeft, PhoneCall, Users } from 'lucide-react';
import { SITE_DATA } from '../data';
import { MouseEvent } from 'react';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.0,
      }
    }
  };

  const itemVariants = {
    hidden: { y: '100%' },
    show: {
      y: 0,
      transition: { duration: 1.2, ease }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex items-center pb-0 px-6 md:px-16 lg:px-24 overflow-hidden bg-bg group"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Glow based on mouse position */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(28, 141, 255, 0.16),
              transparent 80%
            )
          `,
        }}
      />

      {/* Dramatic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/tomer-office-highres.png"
          alt="Gym and Training Environment"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-20 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/50" />
      </div>



      {/* Glow Blob */}
      <div className="glow-blob top-1/4 -right-20 bg-energy opacity-50"></div>

      {/* Tomer's Image Spot */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 2.8, ease }}
        className="absolute bottom-0 left-0 lg:left-10 w-[350px] lg:w-[500px] h-[600px] lg:h-[800px] hidden md:block z-10 pointer-events-none"
      >
        <div className="w-full h-full relative overflow-hidden flex items-end justify-center">
             {/* Brand-color background behind the image */}
             <div className="absolute inset-0 bg-energy/20"></div>
             {/* The image itself without opacity reduction for better resolution */}
             <div className="absolute inset-0 bg-[url('/tomer-blue-shirt.png')] bg-cover bg-top" style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}></div>
             
             <div className="absolute bottom-10 px-6 py-3 glass-panel-dark rounded-2xl border border-white/10 backdrop-blur-md flex items-center gap-4 shadow-[0_0_30px_rgba(28,141,255,0.25)]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center border border-energy/50 overflow-hidden bg-energy text-white font-heading font-black text-sm">
                    TF
                </div>
                <div>
                    <p className="text-white font-bold text-sm">{SITE_DATA.profile.name}</p>
                    <p className="text-text-muted text-xs">{SITE_DATA.profile.title}</p>
                </div>
             </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-start gap-6 mt-20"
      >

        <div className="overflow-hidden pb-2">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 glass-panel-dark"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-energy"></span>
            </div>
            <span className="text-xs font-bold tracking-widest text-text-muted uppercase">{SITE_DATA.hero.badge}</span>
          </motion.div>
        </div>

        <div className="overflow-hidden pb-2">
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-energy font-medium tracking-tight"
          >
            {SITE_DATA.hero.eyebrow}
          </motion.p>
        </div>

        <div className="overflow-hidden pb-4">
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-[7rem] font-heading font-black text-white leading-[1.1] tracking-tighter"
          >
            השינוי <span className="text-glow-animate text-transparent bg-clip-text bg-gradient-to-r from-energy to-blue-300">האחרון</span><br/>
            שתצטרך לעשות.
          </motion.h1>
        </div>

        <div className="overflow-hidden pb-2">
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed mt-4 border-r-2 border-energy pr-6"
          >
            אני לא מחלק תפריטים גנריים. אני בונה מערכת תזונה ואימונים שמותאמת בדיוק לחיים שלך — לא להפך. 22 שנות ניסיון קליני. בלי מתמחים. בלי תפריט פוטוקופי. רק אני, רק אתה, רק תוצאות.
          </motion.p>
        </div>

        <div className="overflow-hidden pt-6 pb-4">
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#pathfinder"
              className="btn-magnetic w-full sm:w-auto group bg-energy text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_10px_30px_-10px_rgba(28,141,255,0.45)] flex items-center justify-center"
            >
              <span>התאם לי תוכנית</span>
              <ArrowLeft size={20} className="mr-3 transition-transform group-hover:-translate-x-1" />
            </a>
            <a
              href="#tracks"
              className="btn-magnetic w-full sm:w-auto group bg-white/5 backdrop-blur-md border border-white/15 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <PhoneCall size={20} className="ml-3 text-energy" />
              <span>תיאום שיחת ייעוץ</span>
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-sm text-text-muted flex items-center gap-2 mt-6"
        >
          <Users size={16} className="text-energy" />
          <span>מצטרף ליותר מ-500 מתאמנים שכבר עשו את השינוי</span>
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-energy"
          />
        </div>
      </motion.div>
    </section>
  );
}
