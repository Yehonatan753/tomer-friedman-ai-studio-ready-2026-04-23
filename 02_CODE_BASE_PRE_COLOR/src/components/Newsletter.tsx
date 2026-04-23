import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, User } from 'lucide-react';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent('שלום תומר! קוראים לי ' + name + ' ורוצה להירשם לרשימת התפוצה. מייל: ' + email);
    window.open('https://wa.me/972546699574?text=' + text, '_blank');
    setSubmitted(true);
  };

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-surface border-y border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Mail className="w-10 h-10 text-energy mx-auto mb-6" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-white mb-4"
        >
          הישאר בלופ
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-muted mb-8"
        >
          טיפים שבועיים קצרים על תזונה, אימונים ופסיכולוגיה של שינוי — ישירות למייל. בלי ספאם, בלי בולשיט.
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
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={handleSubmit}
            >
              <input 
                type="text" 
                placeholder="שם מלא" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-grow bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white text-right focus:outline-none focus:border-energy transition-colors" 
                required
              />
              <input 
                type="email" 
                placeholder="your@email.com" 
                dir="ltr" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-energy transition-colors" 
                required
              />
              <button type="submit" className="btn-magnetic bg-energy text-white px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-energy-light transition-colors">
                <span>אני בפנים</span>
                <Send size={16} />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col items-center gap-4 py-4"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-xl font-bold text-white">נרשמת בהצלחה! 🎉</p>
              <p className="text-text-muted">נשלח לך עדכונים ישירות למייל.</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!submitted && (
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xs text-text-muted/50 mt-4"
          >
            ניתן לבטל בכל רגע. 0 ספאם.
          </motion.p>
        )}
      </div>
    </section>
  );
}
