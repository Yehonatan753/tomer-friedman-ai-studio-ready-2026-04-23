import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { submitLeadAndOpenWhatsApp } from '../lib/leads';

export default function CtaSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    submitLeadAndOpenWhatsApp(
      {
        source: 'final-cta',
        name,
        phone,
        product: 'final-fit-call',
        message: 'CTA סוף דף',
      },
      `שלום תומר, קוראים לי ${name}. הגעתי מהאתר ורוצה להתחיל להבין מה מתאים לי. טלפון: ${phone}`,
    );
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden border-t border-energy/10 bg-gradient-to-b from-white to-[#eaf5ff] px-6 py-24 md:px-16 md:py-32 lg:px-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,141,255,0.13)_0,rgba(255,255,255,0)_54%)]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-black leading-tight text-foreground md:text-5xl lg:text-6xl">אם הגעת לפה</h2>
          <h2 className="mb-4 text-3xl font-black leading-tight text-energy md:text-5xl lg:text-6xl">כנראה שהבנת</h2>
          <h2 className="mb-8 text-2xl font-black leading-snug text-foreground md:text-4xl lg:text-5xl">שהגיע הזמן לקחת שליטה על הגוף שלך</h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">
            הדרך לתוצאה מנוהלת מתחילה בהחלטה אחת. אני כאן כדי לתת לך את האסטרטגיה והכלים שמתאימים לחיים שלך.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative w-full">
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-energy/30 to-[#5fb8ff]/30 opacity-70 blur-md" />
          <div className="relative rounded-[2rem] border border-energy/20 bg-white px-6 py-6 shadow-[0_24px_75px_rgba(15,42,68,0.12)] md:rounded-full md:px-10">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form-content" className="flex w-full flex-col items-center justify-between gap-6 md:flex-row" exit={{ opacity: 0, scale: 0.95 }}>
                  <p className="hidden w-full text-center text-sm text-text-muted md:w-auto md:text-right lg:block">
                    זה הזמן לעשות את הצעד הראשון. השאר פרטים ואחזור אליך בהקדם.
                  </p>
                  <form className="flex w-full flex-col items-center justify-end gap-4 md:flex-row lg:w-3/5" onSubmit={handleSubmit}>
                    <input name="name" type="text" placeholder="שם מלא" className="w-full rounded-full border border-[#d2e2ef] bg-white px-6 py-3 text-right text-sm text-foreground outline-none transition-colors focus:border-energy md:w-1/3" required />
                    <input name="phone" type="tel" placeholder="טלפון" dir="ltr" className="w-full rounded-full border border-[#d2e2ef] bg-white px-6 py-3 text-right text-sm text-foreground outline-none transition-colors focus:border-energy md:w-1/3" required />
                    <button type="submit" className="btn-magnetic whitespace-nowrap rounded-full bg-energy px-8 py-3 text-sm font-black text-white shadow-[0_0_20px_rgba(28,141,255,0.28)] transition-colors hover:bg-[#0f6fc9]">
                      שליחה
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="flex w-full items-center justify-center gap-4 py-2">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <p className="text-xl font-black text-foreground">תודה. תומר יחזור אליך בהקדם.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
