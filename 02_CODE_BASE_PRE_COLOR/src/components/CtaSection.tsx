import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function CtaSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const name = ((fd.get('name') || fd.get('fullName') || '') as string).trim();
    const phone = ((fd.get('phone') || '') as string).trim();
    const text = encodeURIComponent('שלום תומר! קוראים לי ' + name + ' ורוצה להתחיל. טלפון: ' + phone);
    window.open('https://wa.me/972546699574?text=' + text, '_blank');
    setSubmitted(true);
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-bg relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,0,0.1)_0,rgba(0,0,0,0)_50%)]"></div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-12"
        >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 leading-tight">
                אם הגעת לפה
            </h2>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-energy mb-4 leading-tight">
                כנראה שהבנת
            </h2>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-snug">
                שהגיע הזמן לקחת שליטה על הגוף שלך
            </h2>
            
            <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
                הדרך לתוצאות מתחילה בהחלטה אחת. אני כאן כדי לתת לך את כל האסטרטגיה והכלים שאתה צריך. מוכן להצטרף להצלחה?
            </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full relative"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-energy/50 to-orange-400/50 rounded-full blur-md opacity-70"></div>
            
            <div className="relative bg-[#110c18] border border-white/10 rounded-full py-6 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(255,77,0,0.15)]">
                
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div key="form-content" className="flex flex-col md:flex-row items-center justify-between gap-6 w-full" exit={{ opacity: 0, scale: 0.95 }}>
                      <p className="text-sm md:text-base text-text-muted/80 text-center md:text-right w-full md:w-auto hidden lg:block">
                          זה הזמן לעשות את הצעד הראשון. השאר פרטים ואחזור אליך בהקדם.
                      </p>

                      <form 
                        className="flex flex-col md:flex-row gap-4 w-full lg:w-3/5 items-center justify-end"
                        onSubmit={handleSubmit}
                      >
                        <input 
                          type="text" 
                          placeholder="שם מלא" 
                          className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-energy transition-colors w-full md:w-1/3 text-right text-sm" 
                          required
                        />
                        <input 
                          type="tel" 
                          placeholder="טלפון" 
                          dir="ltr"
                          className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-energy transition-colors w-full md:w-1/3 text-right text-sm" 
                          required
                        />
                        <button 
                          type="submit" 
                          className="btn-magnetic bg-energy hover:bg-[#CC3E00] text-white px-8 py-3 rounded-full font-bold transition-colors shadow-[0_0_20px_rgba(255,77,0,0.4)] whitespace-nowrap text-sm"
                        >
                          שליחה
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="flex items-center justify-center gap-4 w-full py-2"
                    >
                      <CheckCircle className="w-8 h-8 text-green-400" />
                      <p className="text-xl font-bold text-white">תודה! נחזור אליך בהקדם 🙌</p>
                    </motion.div>
                  )}
                </AnimatePresence>

            </div>
        </motion.div>

      </div>
    </section>
  );
}
