import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Commitment() {
  return (
    <section id="commitment" className="py-28 px-6 md:px-16 lg:px-24 bg-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#1c8dff 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
      <div className="absolute top-1/2 right-0 w-[520px] h-[520px] rounded-full bg-energy/10 blur-[140px] translate-x-1/3 -translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease }}
        className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center rounded-[2.5rem] border border-white/10 bg-surface/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
      >
        <div className="relative min-h-[320px] rounded-[2rem] overflow-hidden border border-white/10">
          <img
            src="/tomer-measure.png"
            alt="תומר פרידמן במדידת הרכב גוף"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/15 to-transparent" />
        </div>

        <div className="text-right">
          <div className="inline-flex items-center gap-2 rounded-full border border-energy/30 bg-energy/10 px-4 py-2 text-xs font-bold tracking-widest text-energy mb-6">
            מה אני מתחייב אליך
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight tracking-tight mb-6">
            אני מתחייב עליך, לא על הסיסמה שלך.
          </h2>
          <p className="text-xl text-text-muted leading-relaxed mb-8">
            אני לא מבטיח לך "תוצאות מובטחות" כי אני לא משחק. אני כן מתחייב לשלושה דברים: שלא אמכור לך מסלול שלא מתאים לך רק כי הוא יקר יותר. שלא אעלים ממך מידע שחשוב לשיקול הדעת שלך. ושאם בדרך נראה שמשהו לא עובד - נעצור, נתקן, ולא נמשיך על אוטומט.
          </p>
          <div className="text-2xl font-heading font-black text-white">תומר</div>
          <div className="mt-2 text-sm font-bold tracking-widest text-energy">תזונאי קליני וספורט</div>
        </div>
      </motion.div>
    </section>
  );
}
