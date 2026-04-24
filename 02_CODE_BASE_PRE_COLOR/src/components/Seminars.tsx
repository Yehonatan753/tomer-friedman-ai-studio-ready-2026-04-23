import { useState } from 'react';
import { motion } from 'framer-motion';
import { openWhatsApp, submitLead } from '../lib/leads';

export default function Seminars() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await submitLead({
      source: 'newsletter',
      email,
      product: 'seminars-2026',
      message: 'רשימת המתנה לסדנאות והרצאות',
    });
    openWhatsApp(`שלום תומר, אשמח להצטרף לרשימת ההמתנה לסדנאות 2026. אימייל: ${email}`);
    setSubmitted(true);
  };

  return (
    <section id="seminars" className="relative border-y border-energy/10 bg-gradient-to-b from-white to-[#f5fbff] px-6 py-32 md:px-16 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-energy/20 bg-white p-10 text-center shadow-[0_24px_80px_rgba(15,42,68,0.09)] md:p-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(28,141,255,0.13),transparent_55%)]" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="mb-6 inline-block rounded-full border border-energy/30 bg-[#eef7ff] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-energy">
              בקרוב
            </span>
            <h3 className="mb-6 font-heading text-3xl font-black text-foreground md:text-5xl">
              סדנאות פרונטליות - <span className="bg-gradient-to-r from-energy to-[#5fb8ff] bg-clip-text text-transparent">סדרת 2026</span>
            </h3>
            <p className="mb-10 text-lg leading-relaxed text-text-muted">
              בקרוב נפתח את ההרשמה לסדרה ייחודית של הרצאות וסדנאות עומק בנושאי תזונת ספורט, תוספים וגמישות תזונתית. מספר המקומות מוגבל לפי יכולת ליווי אמיתית, לא כטריק מכירה.
            </p>

            {!submitted ? (
              <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="האימייל שלך"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="flex-grow rounded-full border border-[#d2e2ef] bg-white px-6 py-4 text-foreground outline-none transition-all focus:border-energy focus:ring-1 focus:ring-energy"
                  dir="ltr"
                />
                <button type="submit" className="btn-magnetic whitespace-nowrap rounded-full bg-energy px-8 py-4 font-black text-white shadow-[0_12px_34px_rgba(28,141,255,0.25)]">
                  הצטרף לרשימה
                </button>
              </form>
            ) : (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-4 font-black text-green-800">
                נרשמת לרשימת ההמתנה.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
