import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone, Youtube } from 'lucide-react';
import { SITE_DATA } from '../data';
import { submitLeadAndOpenWhatsApp } from '../lib/leads';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);

  const handleQuickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '');
    const phone = String(fd.get('phone') || '');
    submitLeadAndOpenWhatsApp(
      { source: 'footer', name, phone, product: 'footer-whatsapp', message: 'טופס מהיר בפוטר' },
      `שלום תומר, שמי ${name}. אשמח שתחזור אליי. טלפון: ${phone}`,
    );
    setSubmitted(true);
  };

  const handleFullSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '');
    const phone = String(fd.get('phone') || '');
    const email = String(fd.get('email') || '');
    const subject = String(fd.get('subject') || '');
    const message = String(fd.get('message') || '');
    submitLeadAndOpenWhatsApp(
      { source: 'footer', name, phone, email, product: subject || 'footer-contact', message },
      `שלום תומר, שמי ${name}. אני רוצה לדבר איתך. ${subject ? `נושא: ${subject}. ` : ''}${message ? `הודעה: ${message}. ` : ''}טלפון: ${phone}. אימייל: ${email}`,
    );
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="relative z-20 overflow-hidden rounded-t-[4rem] border-t border-energy/10 bg-white px-6 pb-12 pt-28 text-foreground md:px-16 lg:px-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5fbff] to-white" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-24 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="col-span-1 w-full lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-4xl overflow-hidden rounded-[3rem] border border-energy/20 bg-white p-6 shadow-[0_24px_80px_rgba(15,42,68,0.10)] md:p-10"
            >
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="mb-8 text-center text-xl font-black leading-tight text-foreground md:text-3xl">
                  השאר פרטים ואחזור אליך בוואטסאפ עד 24 שעות
                </h3>
                {!submitted ? (
                  <form className="flex w-full flex-col items-stretch justify-center gap-4 md:w-auto md:flex-row md:items-center" onSubmit={handleQuickSubmit}>
                    <input name="name" type="text" placeholder="שם מלא" className="w-full max-w-xs flex-grow rounded-full border border-[#d2e2ef] bg-white px-6 py-4 text-right text-foreground outline-none transition-colors focus:border-energy md:w-auto" required />
                    <input name="phone" type="tel" placeholder="טלפון" dir="ltr" className="w-full max-w-xs flex-grow rounded-full border border-[#d2e2ef] bg-white px-6 py-4 text-right text-foreground outline-none transition-colors focus:border-energy md:w-auto" required />
                    <button type="submit" className="btn-magnetic flex w-full items-center justify-center gap-2 rounded-full bg-energy px-10 py-4 font-black text-white shadow-[0_14px_38px_rgba(28,141,255,0.28)] transition-colors hover:bg-[#0f6fc9] md:w-auto">
                      בואו נתחיל
                    </button>
                  </form>
                ) : (
                  <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-4 font-black text-green-800">הפרטים נקלטו. נפתח וואטסאפ להמשך.</div>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
            <div className="overflow-hidden pb-4">
              <motion.h2 variants={{ hidden: { y: '100%' }, show: { y: 0, transition: { duration: 1.0, ease } } }} className="mb-12 font-heading text-5xl font-black tracking-tighter text-foreground md:text-7xl">
                מוכן לצאת <span className="text-energy">לדרך?</span>
              </motion.h2>
            </div>

            <form className="flex flex-col gap-8" onSubmit={handleFullSubmit}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="relative">
                  <input name="name" type="text" required className="peer w-full border-b border-[#cfe0ee] bg-transparent py-3 text-foreground outline-none transition-colors focus:border-energy" placeholder=" " />
                  <label className="absolute right-0 top-3 text-text-muted transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-energy peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">שם מלא</label>
                </div>
                <div className="relative">
                  <input name="phone" type="tel" required className="peer w-full border-b border-[#cfe0ee] bg-transparent py-3 text-right text-foreground outline-none transition-colors focus:border-energy" placeholder=" " dir="ltr" />
                  <label className="absolute right-0 top-3 text-text-muted transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-energy peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">טלפון</label>
                </div>
              </div>

              <div className="relative">
                <input name="email" type="email" className="peer w-full border-b border-[#cfe0ee] bg-transparent py-3 text-right text-foreground outline-none transition-colors focus:border-energy" placeholder=" " dir="ltr" />
                <label className="absolute right-0 top-3 text-text-muted transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-energy peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">אימייל</label>
              </div>

              <div className="relative">
                <input name="subject" type="text" className="peer w-full border-b border-[#cfe0ee] bg-transparent py-3 text-foreground outline-none transition-colors focus:border-energy" placeholder=" " />
                <label className="absolute right-0 top-3 text-text-muted transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-energy peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">נושא הפנייה</label>
              </div>

              <div className="relative mt-4">
                <textarea name="message" rows={4} className="peer w-full resize-none border-b border-[#cfe0ee] bg-transparent py-3 text-foreground outline-none transition-colors focus:border-energy" placeholder=" " />
                <label className="absolute right-0 top-3 text-text-muted transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-energy peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">הודעה</label>
              </div>

              <button className="mt-8 w-full rounded-full bg-energy px-8 py-4 text-lg font-black text-white shadow-[0_14px_38px_rgba(28,141,255,0.28)] transition-colors hover:bg-[#0f6fc9] md:w-auto md:self-start" type="submit">
                שלח הודעה
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col justify-center lg:pl-12">
            <div className="rounded-3xl border border-energy/20 bg-[#f8fbff] p-10 shadow-[0_20px_60px_rgba(15,42,68,0.07)]">
              {[
                [Mail, 'אימייל', SITE_DATA.profile.email, `mailto:${SITE_DATA.profile.email}`],
                [Phone, 'וואטסאפ / טלפון', SITE_DATA.profile.phone, `tel:${SITE_DATA.profile.phoneInternational}`],
                [Clock, 'שעות פעילות', SITE_DATA.profile.hours, ''],
              ].map(([Icon, label, value, href]) => {
                const ItemIcon = Icon as typeof Mail;
                return (
                  <div key={String(label)} className="mb-8 flex items-start gap-6 last:mb-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-energy/20 bg-white text-energy">
                      <ItemIcon size={24} />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm text-text-muted">{String(label)}</h4>
                      {href ? (
                        <a href={String(href)} className="text-xl font-bold text-foreground transition-colors hover:text-energy" dir="ltr">
                          {String(value)}
                        </a>
                      ) : (
                        <p className="text-xl font-bold text-foreground">{String(value)}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 rounded-[2rem] border border-energy/10 bg-[#f8fbff] p-5 text-center text-sm font-bold text-foreground md:grid-cols-4">
          <div>תזונאי קליני וספורט</div>
          <div>22 שנות ניסיון קליני</div>
          <div>קליניקה ואונליין</div>
          <div>קבלות מוכרות לביטוח לפי זכאות</div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-[#dceaf5] pt-8 md:flex-row">
          <img src="/tomer-logo.png" alt="תומר פרידמן" className="h-16 w-16 object-contain" />

          <div className="flex items-center gap-4">
            <a href={SITE_DATA.profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-energy/20 text-foreground transition-all hover:bg-energy hover:text-white">
              <Instagram size={18} />
            </a>
            <a href={SITE_DATA.profile.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-energy/20 text-foreground transition-all hover:bg-energy hover:text-white">
              <Facebook size={18} />
            </a>
            <a href={SITE_DATA.profile.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-energy/20 text-foreground transition-all hover:bg-energy hover:text-white">
              <Youtube size={18} />
            </a>
            <a href={SITE_DATA.profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-energy/20 text-foreground transition-all hover:bg-energy hover:text-white">
              <Linkedin size={18} />
            </a>
            <a href={SITE_DATA.profile.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-energy/20 text-foreground transition-all hover:bg-energy hover:text-white">
              <MessageCircle size={18} />
            </a>
          </div>

          <div className="text-sm text-text-muted">
            © {new Date().getFullYear()} {SITE_DATA.profile.name}. כל הזכויות שמורות.
          </div>
        </div>
      </div>
    </footer>
  );
}
