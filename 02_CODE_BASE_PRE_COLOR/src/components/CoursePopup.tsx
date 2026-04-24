import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle2, GraduationCap } from 'lucide-react';

export default function CoursePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    const handleOpenCourse = (e: CustomEvent) => {
      setCourseName(e.detail.courseName);
      setIsOpen(true);
      setHasSubmitted(false);
      setFormData({ name: '', email: '' });
    };

    window.addEventListener('open-course', handleOpenCourse as EventListener);
    return () => window.removeEventListener('open-course', handleOpenCourse as EventListener);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent('שלום תומר! קוראים לי ' + formData.name + ' ומעוניין/ת לשמוע על ' + courseName + ' (' + formData.email + ')');
    window.open('https://wa.me/972546699574?text=' + text, '_blank');
    setHasSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-bg border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white/70 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="h-32 bg-gradient-to-br from-energy to-blue-700 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20"></div>
              <GraduationCap size={48} className="text-white relative z-10" />
            </div>

            <div className="p-8">
              {!hasSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">
                      {courseName}
                    </h3>
                    <p className="text-text-muted text-sm">
                      השאר שם ומייל ואני אשלח לך את כל הפרטים ישירות למייל.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input 
                        required 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-energy transition-colors text-right" 
                        placeholder="שם מלא" 
                      />
                    </div>
                    <div>
                      <input 
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-energy transition-colors text-right" 
                        placeholder="your@email.com" 
                        dir="ltr" 
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full btn-magnetic bg-energy text-white px-8 py-4 rounded-xl font-bold shadow-[0_10px_30px_-10px_rgba(28,141,255,0.4)] flex items-center justify-center gap-2"
                    >
                      <Mail size={20} />
                      <span>שלח לי למייל</span>
                    </button>
                    <p className="text-xs text-text-muted/50 text-center mt-3">
                      אני שונא ספאם בדיוק כמוך. הפרטים שלך בטוחים אצלי.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">נשלח בהצלחה!</h3>
                  <p className="text-text-muted">
                    הפרטים בדרך למייל שלך. בדוק גם בתיקיית קידומי מכירות או ספאם.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

