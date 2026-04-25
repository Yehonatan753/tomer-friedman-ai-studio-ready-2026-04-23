import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Mail, Send } from 'lucide-react';
import { leadInputProps, submitLeadAndOpenWhatsApp, validateLeadForm } from '../lib/leads';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateLeadForm(e.currentTarget)) return;

    submitLeadAndOpenWhatsApp(
      {
        source: 'newsletter',
        name,
        email,
        product: 'newsletter',
        message: 'הרשמה לניוזלטר',
      },
      `שלום תומר, קוראים לי ${name}. אשמח להירשם לעדכונים שלך. אימייל: ${email}`,
    );
    setSubmitted(true);
  };

  return (
    <section className="border-y border-energy/10 bg-[#f5fbff] px-6 py-20 md:px-16 lg:px-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
          <Mail className="mx-auto mb-6 h-10 w-10 text-energy" />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 font-heading text-3xl font-black text-foreground md:text-4xl">
          הישאר בלופ
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-8 leading-relaxed text-text-muted">
          טיפים שבועיים קצרים על תזונה, אימונים ופסיכולוגיה של שינוי. השאר פרטים ונשלח לך עדכונים רק כשיש משהו ששווה לקרוא.
        </motion.p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <input
                name="name"
                type="text"
                {...leadInputProps.fullName}
                placeholder="שם מלא"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-grow rounded-full border border-[#d2e2ef] bg-white px-6 py-3 text-right text-foreground outline-none transition-colors focus:border-energy"
                required
              />
              <input
                name="email"
                {...leadInputProps.email}
                placeholder="your@email.com"
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow rounded-full border border-[#d2e2ef] bg-white px-6 py-3 text-foreground outline-none transition-colors focus:border-energy"
                required
              />
              <button type="submit" className="btn-magnetic flex items-center justify-center gap-2 rounded-full bg-energy px-8 py-3 font-black text-white transition-colors hover:bg-[#0f6fc9]">
                <span>אני בפנים</span>
                <Send size={16} />
              </button>
            </motion.form>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="flex flex-col items-center gap-4 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xl font-black text-foreground">נרשמת בהצלחה</p>
              <p className="text-text-muted">הפרטים נקלטו, ותומר יוכל להמשיך איתך בוואטסאפ.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!submitted && <p className="mt-4 text-xs text-text-muted/70">ניתן לבטל בכל רגע. 0 ספאם.</p>}
      </div>
    </section>
  );
}
