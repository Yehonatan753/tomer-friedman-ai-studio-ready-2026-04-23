import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function PainPointGap() {
  return (
    <section className="pt-32 pb-12 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Gradient background for differentiation */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/30 to-bg pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-energy/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white">
            למה דיאטות לא עובדות <span className="text-energy italic font-light">(ומה כן)</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Decorative VS divider */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-16 h-16 rounded-full bg-surface border-2 border-energy/30 flex items-center justify-center shadow-[0_0_30px_rgba(28,141,255,0.2)]">
              <span className="text-energy font-black text-lg">VS</span>
            </div>
          </div>

          {/* The Old Way */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <h3 className="text-2xl font-bold text-red-400 mb-8 border-b border-red-500/10 pb-4">
              הדרך הישנה
            </h3>
            <ul className="space-y-6">
              {[
                "תפריטים גנריים שלא לוקחים בחשבון את החיים האמיתיים שלך",
                "אימונים של שעה+ שנגמרים אחרי שבועיים כי אין זמן או כוח",
                "דיאטות קיצוניות שמסתיימות באותו משקל — פלוס עוד קילו",
                "מאמנים שנותנים תפריט פוטוקופי זהה לכל לקוח"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={14} className="text-red-400/80" />
                  </div>
                  <span className="text-white/70 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tomer's Way */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-energy/5 border border-energy/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_40px_rgba(28,141,255,0.05)] backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-energy/20 blur-3xl translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"></div>
            <h3 className="text-2xl font-bold text-energy mb-8 border-b border-energy/10 pb-4 relative z-10">
              הגישה שלי
            </h3>
            <ul className="space-y-6 relative z-10">
              {[
                "תפריט שמתאים לאורח החיים שלך — מסעדות, אירועים, חופשות",
                "אימונים של 20 דקות, 3 פעמים בשבוע. זה הכל.",
                "תוצאות שנשארות כי הגישה מדעית, לא רגשית",
                "תזונאי קליני אחד. 22 שנות ניסיון. בלי מתמחים, בלי צוות."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-energy/20 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_rgba(28,141,255,0.3)]">
                    <Check size={14} className="text-energy" strokeWidth={3} />
                  </div>
                  <span className="text-white font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-text-muted mt-10 text-lg tracking-wide"
        >
          בחר את המסלול שמתאים לך.
        </motion.p>
      </div>
    </section>
  );
}
