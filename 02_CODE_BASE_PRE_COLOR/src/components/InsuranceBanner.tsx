import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { openWhatsApp, submitLead } from '../lib/leads';

export default function InsuranceBanner() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', insuranceType: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLead({
      source: 'insurance',
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      product: 'insurance-refund-check',
      message: formData.insuranceType,
    });
    openWhatsApp(`שלום תומר, קוראים לי ${formData.name}. אשמח לבדוק זכאות להחזר ביטוח. טלפון: ${formData.phone}. סוג פוליסה: ${formData.insuranceType || 'לא בטוח/ה'}`);
    setSubmitted(true);
  };

  return (
    <section id="insurance" className="relative overflow-hidden bg-[#f4f9ff] px-6 py-20 text-right md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid overflow-hidden rounded-[2.5rem] border border-energy/20 bg-white shadow-[0_28px_90px_rgba(15,42,68,0.12)] lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="relative min-h-[320px] lg:min-h-full">
            <img
              src="/tomer-measure-reference.jpeg"
              alt="בדיקת מדידות והרכב גוף"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a44]/30 via-transparent to-transparent" />
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-energy" />
              <h2 className="font-heading text-3xl font-black tracking-tight text-foreground lg:text-4xl">
                מבוטחים בביטוח בריאות פרטי?
              </h2>
            </div>

            <p className="mb-6 text-lg font-medium leading-relaxed text-text-muted">
              השירותים שאני מעניק מוכרים על ידי מרבית חברות הביטוח בישראל. לכן, ייתכן שתוכלו לקבל החזר משמעותי מעלות השירותים, בהתאם לפוליסה האישית שלכם.
            </p>

            <div className="mb-6 flex flex-wrap gap-4">
              {['ייעוץ תזונתי', 'מעקב תזונתי', 'ליווי תזונתי'].map((item) => (
                <div key={item} className="flex shrink-0 items-center gap-2 font-black text-foreground">
                  <CheckCircle2 size={18} className="text-energy" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mb-10 flex items-start gap-3 rounded-2xl border border-energy/20 bg-[#eef7ff] p-4">
              <div className="mt-0.5 font-black text-energy">*</div>
              <p className="font-bold leading-relaxed text-foreground">
                חשוב לדעת: קיימות אפשרויות השתתפות גם למשרתי מילואים פעילים. הבדיקה תלויה בפוליסה ובזכאות האישית.
              </p>
            </div>

            <div className="border-t border-[#dceaf5] pt-8">
              <h3 className="mb-6 text-xl font-black text-foreground">
                לבדיקה אם אתם זכאים לכיסוי, מלאו פרטים ותומר יחזור אליכם בוואטסאפ:
              </h3>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="שם מלא *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-[#d2e2ef] bg-white px-4 py-3 text-right text-foreground outline-none transition-colors focus:border-energy"
                    />
                    <input
                      type="tel"
                      placeholder="טלפון *"
                      required
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-[#d2e2ef] bg-white px-4 py-3 text-right text-foreground outline-none transition-colors focus:border-energy"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                      type="email"
                      placeholder="אימייל"
                      dir="ltr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-[#d2e2ef] bg-white px-4 py-3 text-right text-foreground outline-none transition-colors focus:border-energy"
                    />
                    <input
                      type="text"
                      placeholder="סוג פוליסת ביטוח"
                      value={formData.insuranceType}
                      onChange={(e) => setFormData({ ...formData, insuranceType: e.target.value })}
                      className="w-full rounded-xl border border-[#d2e2ef] bg-white px-4 py-3 text-right text-foreground outline-none transition-colors focus:border-energy"
                    />
                  </div>
                  <button type="submit" className="rounded-xl bg-energy px-10 py-3 font-black text-white shadow-[0_12px_32px_rgba(28,141,255,0.25)] transition-colors hover:bg-[#0f6fc9]">
                    שליחה
                  </button>
                </form>
              ) : (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-5 font-black text-green-800">
                  קיבלתי את הפרטים. תומר יחזור אליך בוואטסאפ.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
