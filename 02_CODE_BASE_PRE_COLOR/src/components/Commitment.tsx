import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Commitment() {
  return (
    <section id="commitment" className="relative overflow-hidden bg-gradient-to-b from-white to-[#f4f9ff] px-6 py-28 md:px-16 lg:px-24">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#1c8dff 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
      <div className="absolute right-0 top-1/2 h-[520px] w-[520px] translate-x-1/3 -translate-y-1/2 rounded-full bg-energy/10 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 rounded-[2.5rem] border border-energy/20 bg-white p-8 shadow-[0_30px_90px_rgba(15,42,68,0.10)] md:p-12 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-energy/20">
          <img
            src="/tomer-measure-waist-highres.png"
            alt="תומר פרידמן במדידת הרכב גוף"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a44]/30 via-transparent to-transparent" />
        </div>

        <div className="text-right">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-energy/25 bg-[#eef7ff] px-4 py-2 text-xs font-black tracking-widest text-energy">
            מה אני מתחייב אליך
          </div>
          <h2 className="mb-6 font-heading text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
            אני מתחייב עליך, לא על הסיסמה שלך.
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-text-muted">
            אני לא מבטיח לך "תוצאות מובטחות" כי אני לא משחק. אני כן מתחייב לשלושה דברים: שלא אמכור לך מסלול שלא מתאים לך רק כי הוא יקר יותר. שלא אעלים ממך מידע שחשוב לשיקול הדעת שלך. ושאם בדרך נראה שמשהו לא עובד, נעצור, נתקן, ולא נמשיך על אוטומט.
          </p>

          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {['התאמה לפני מכירה', 'נתונים לפני תחושות', 'תיקון לפני אוטומט'].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-2xl border border-energy/20 bg-[#f5fbff] px-4 py-3 text-sm font-black text-foreground">
                <CheckCircle2 size={16} className="text-energy" />
                {item}
              </div>
            ))}
          </div>

          <div className="font-heading text-2xl font-black text-foreground">תומר</div>
          <div className="mt-2 text-sm font-black tracking-widest text-energy">תזונאי קליני וספורט</div>
        </div>
      </motion.div>
    </section>
  );
}
