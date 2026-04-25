import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Smartphone, X } from 'lucide-react';
import { leadInputProps, submitLeadAndOpenWhatsApp, validateLeadForm } from '../lib/leads';

export default function DownloadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [resourceName, setResourceName] = useState('TF Tracker');

  useEffect(() => {
    const handleOpenDownload = (e: CustomEvent) => {
      setResourceName(e.detail?.resourceName || 'TF Tracker');
      setIsOpen(true);
      setHasSubmitted(false);
      setFormData({ name: '', phone: '', email: '' });
    };

    window.addEventListener('open-download', handleOpenDownload as EventListener);
    return () => window.removeEventListener('open-download', handleOpenDownload as EventListener);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateLeadForm(e.currentTarget)) return;

    submitLeadAndOpenWhatsApp(
      {
        source: 'download-popup',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        product: 'TF Tracker app onboarding',
        message: `בקשת כניסה לאפליקציית TF Tracker דרך popup. מקור: ${resourceName}`,
      },
      `שלום תומר, קוראים לי ${formData.name}. אני רוצה להתחיל עם TF Tracker ולקבל קישור כניסה לאפליקציה + שאלון פתיחה. הבנתי שהחודש הראשון חינם בלבד, אחרי ייעוץ טלפוני יש 3 חודשים חינם, ובתהליך אונליין/פרונטלי יש Lifetime. טלפון: ${formData.phone}. אימייל: ${formData.email}`,
    );
    setHasSubmitted(true);
    setTimeout(() => setIsOpen(false), 2600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" dir="rtl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[#0f2a44]/30 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-energy/20 bg-white shadow-[0_30px_90px_rgba(15,42,68,0.22)]"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-text-muted transition-colors hover:bg-[#eef7ff] hover:text-foreground"
              aria-label="סגור"
            >
              <X size={20} />
            </button>

            <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#f2f8ff] to-[#dff0ff]">
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#1c8dff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] border border-energy/20 bg-white shadow-[0_16px_40px_rgba(28,141,255,0.16)]">
                <img src="/tomer-logo.png" alt="תומר פרידמן" className="h-16 w-16 object-contain" />
                <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-energy px-3 py-1 text-[10px] font-black text-white shadow-[0_10px_24px_rgba(28,141,255,0.28)]">
                  <Smartphone size={12} />
                  TF Tracker
                </div>
              </div>
            </div>

            <div className="p-8">
              {!hasSubmitted ? (
                <>
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 font-heading text-2xl font-black text-foreground">
                      כניסה ל־TF Tracker
                    </h3>
                    <p className="text-sm leading-relaxed text-text-muted">
                      השאר פרטים ונשלח לך בוואטסאפ את קישור הכניסה לאפליקציה ואת שאלון הפתיחה הראשוני. משתמש חדש מקבל חודש ראשון חינם בלבד; אחרי ייעוץ טלפוני מקבלים 3 חודשים חינם; ובתהליך אונליין/פרונטלי מקבלים Lifetime.
                    </p>
                  </div>

                  <div className="mb-5 grid grid-cols-1 gap-2 rounded-2xl border border-energy/15 bg-[#f7fbff] p-4 text-sm font-bold text-foreground sm:grid-cols-3">
                    <div className="rounded-xl bg-white px-3 py-2 text-center shadow-sm">חודש ראשון חינם</div>
                    <div className="rounded-xl bg-white px-3 py-2 text-center shadow-sm">3 חודשים אחרי ייעוץ</div>
                    <div className="rounded-xl bg-white px-3 py-2 text-center shadow-sm">Lifetime ללקוחות ליווי</div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      name="name"
                      required
                      type="text"
                      {...leadInputProps.fullName}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-[#d2e2ef] bg-white px-4 py-3 text-right text-foreground outline-none transition-colors focus:border-energy"
                      placeholder="שם מלא"
                    />
                    <input
                      name="phone"
                      required
                      type="tel"
                      {...leadInputProps.phone}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-[#d2e2ef] bg-white px-4 py-3 text-right text-foreground outline-none transition-colors focus:border-energy"
                      placeholder="טלפון"
                      dir="ltr"
                    />
                    <input
                      name="email"
                      type="email"
                      {...leadInputProps.email}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-[#d2e2ef] bg-white px-4 py-3 text-right text-foreground outline-none transition-colors focus:border-energy"
                      placeholder="your@email.com"
                      dir="ltr"
                    />

                    <button type="submit" className="btn-magnetic flex w-full items-center justify-center gap-2 rounded-xl bg-energy px-8 py-4 font-black text-white shadow-[0_12px_34px_rgba(28,141,255,0.28)]">
                      <Smartphone size={20} />
                      <span>שלחו לי קישור ל־TF Tracker</span>
                    </button>
                  </form>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="mb-2 text-2xl font-black text-foreground">הבקשה נקלטה</h3>
                  <p className="text-text-muted">נפתח לך וואטסאפ עם הודעה מוכנה לקבלת קישור הכניסה ל־TF Tracker.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
