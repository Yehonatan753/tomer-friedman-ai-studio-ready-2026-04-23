import { motion } from 'framer-motion';
import { Utensils, Dumbbell, LineChart, MessageCircle, CheckCircle2, ArrowLeft, HelpCircle } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function AppShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease }
    }
  };

  return (
    <section id="app" className="py-32 px-6 md:px-16 lg:px-24 bg-surface relative overflow-hidden border-y border-white/5">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1c8dff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="glow-blob top-1/2 right-0 bg-energy/30 translate-x-1/3 -translate-y-1/2"></div>



      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-heading text-sm font-bold tracking-widest text-energy uppercase mb-4"
          >
            TF TRACKER
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6"
          >
            כך TF Tracker עובד <span className="text-energy">ביום-יום</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-muted mb-8"
          >
            TF Tracker הוא מוצר הכניסה הדיגיטלי שלי. בפנים יש מערכת אחת שאוגדת אוכל, אימונים, מדידות ומעקב — בלי לקפוץ בין 4 אפליקציות, בלי למלא אקסלים, ובלי לנחש מה קורה מיום ליום. זה מוצר עצמאי שעומד לבד, ומי שרוצה להעמיק אחר כך לתהליך אישי — ההיסטוריה ממשיכה איתו, לא מתחילה מחדש.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#" className="btn-magnetic bg-energy text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_30px_-10px_rgba(28,141,255,0.4)] flex items-center gap-2">
              <span>להתחיל עם TF Tracker</span>
              <ArrowLeft size={20} />
            </a>
            <a href="#" className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors font-medium text-white flex items-center justify-center gap-2">
              <span>להבין אם זה מתאים לי</span>
              <HelpCircle size={20} />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-energy group-hover:bg-energy group-hover:text-white transition-colors duration-300">
                  <Utensils size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">שאלון קצר וכניסה מסודרת</h3>
                  <p className="text-text-muted leading-relaxed">מתחילים בלי בלגן. המערכת בונה לך מבנה בסיסי כבר מהיום הראשון.</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-energy group-hover:bg-energy group-hover:text-white transition-colors duration-300">
                  <Dumbbell size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">אוכל, ברקוד וצילום מזון</h3>
                  <p className="text-text-muted leading-relaxed">לרשום ארוחה זה שניות. גם כשאתה בחוץ, גם כשאתה ממהר.</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white group-hover:bg-white group-hover:text-bg transition-colors duration-300">
                  <LineChart size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">מדידות, התקדמות ואימונים במקום אחד</h3>
                  <p className="text-text-muted leading-relaxed">כל נתון נשמר, ההתקדמות נראית, וההמשך נבנה לפי מה שקורה בפועל.</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white group-hover:bg-white group-hover:text-bg transition-colors duration-300">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">המשך טבעי לתהליך אישי</h3>
                  <p className="text-text-muted leading-relaxed">כשתהיה מוכן לליווי עמוק יותר, עוברים בלי לאבד נתונים ובלי להתחיל מאפס.</p>
                </div>
              </motion.div>
            </div>

            {/* Subscription Info */}
            <motion.div variants={itemVariants} className="mt-12 p-6 rounded-2xl bg-energy/5 border border-energy/20">
              <h4 className="font-bold text-white mb-4">מסלולי TF Tracker:</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-energy shrink-0 mt-0.5" />
                  <span><strong className="text-white">₪49.90 / חודשי:</strong> גמיש, ללא התחייבות.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-energy shrink-0 mt-0.5" />
                  <span><strong className="text-white">₪39.90 / לחודש במסלול שנתי:</strong> חיסכון של ₪120 לשנה.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-energy shrink-0 mt-0.5" />
                  <span><strong className="text-white">המשך טבעי למסלול אישי:</strong> כשמוכנים, עוברים בלי לאבד נתונים.</span>
                </li>
              </ul>
              <p className="mt-5 text-xs text-text-muted/70">
                אלה מסכים אמיתיים מתוך המוצר. מה שאתה רואה כאן — זה מה שתראה ברגע שתיכנס.
              </p>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="relative flex justify-center lg:justify-end perspective-1000"
          >
            <div className="relative w-[300px] md:w-[350px] h-[600px] md:h-[700px] rounded-[3rem] border-[8px] border-[#222] bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_2px_rgba(255,255,255,0.1)] overflow-hidden transform-style-3d">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#222] rounded-b-3xl z-20"></div>

              {/* Phone Screen Content (Simulated) */}
              <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col pt-8">
                {/* Status Bar */}
                <div className="h-8 w-full flex justify-between items-center px-6 text-[11px] text-white font-medium z-10">
                  <span>9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <div className="w-3 h-3 rounded-full border border-white/80"></div>
                    <div className="w-3 h-3 rounded-full bg-white/80"></div>
                    <div className="w-4 h-2.5 rounded-sm bg-white/80"></div>
                  </div>
                </div>

                {/* App Header */}
                <div className="px-6 py-4 mt-2">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-energy text-xs font-bold mb-1 tracking-wider uppercase">TF Tracker</div>
                      <div className="text-2xl font-bold text-white">שלום, דניאל</div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-energy/50 flex items-center justify-center text-energy font-bold overflow-hidden shadow-[0_0_10px_rgba(28,141,255,0.3)] bg-energy/10 text-sm">
                      TF
                    </div>
                  </div>
                </div>

                {/* App Body */}
                <div className="flex-1 px-6 pb-6 space-y-6 overflow-y-auto custom-scrollbar">

                  {/* Daily Progress Ring (Simulated) */}
                  <div className="bg-[#111] rounded-3xl p-6 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/60 mb-1">קלוריות נותרות</div>
                      <div className="text-3xl font-black text-white">1,240</div>
                      <div className="text-xs text-energy mt-1">מתוך 2,500 קק"ל</div>
                    </div>
                    <div className="w-20 h-20 rounded-full border-4 border-[#222] border-t-energy border-r-energy flex items-center justify-center transform -rotate-45">
                      <div className="transform rotate-45 text-center">
                        <div className="text-lg font-bold text-white">50%</div>
                      </div>
                    </div>
                  </div>

                  {/* Macros Card */}
                  <div className="bg-[#111] rounded-3xl p-5 border border-white/5">
                    <div className="text-sm font-bold text-white mb-4">יעדים יומיים</div>
                    <div className="flex justify-between items-end">
                      <div className="text-center">
                        <div className="text-energy font-bold text-xl mb-1">180g</div>
                        <div className="w-12 h-1.5 bg-[#222] rounded-full overflow-hidden mx-auto mb-1">
                          <div className="w-3/4 h-full bg-energy rounded-full"></div>
                        </div>
                        <div className="text-[10px] text-white/40">חלבון</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-xl mb-1">250g</div>
                        <div className="w-12 h-1.5 bg-[#222] rounded-full overflow-hidden mx-auto mb-1">
                          <div className="w-1/2 h-full bg-white rounded-full"></div>
                        </div>
                        <div className="text-[10px] text-white/40">פחמימה</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white/60 font-bold text-xl mb-1">70g</div>
                        <div className="w-12 h-1.5 bg-[#222] rounded-full overflow-hidden mx-auto mb-1">
                          <div className="w-1/4 h-full bg-white/40 rounded-full"></div>
                        </div>
                        <div className="text-[10px] text-white/40">שומן</div>
                      </div>
                    </div>
                  </div>

                  {/* Next Meal */}
                  <div className="bg-gradient-to-br from-energy/20 to-transparent rounded-3xl p-5 border border-energy/20">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-bold text-white">ארוחה הבאה</div>
                      <div className="text-xs text-energy bg-energy/10 px-2 py-1 rounded-md">14:00</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#222] flex items-center justify-center text-white/50">
                        <Utensils size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">חזה עוף ואורז</div>
                        <div className="text-xs text-white/60">450 קק"ל • 40g חלבון</div>
                      </div>
                    </div>
                  </div>

                  {/* Workout */}
                  <div className="bg-[#111] rounded-3xl p-5 border border-white/5">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-sm font-bold text-white">אימון מתוכנן</div>
                      <div className="text-xs text-white/40 bg-[#222] px-2 py-1 rounded-md">18:30</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-energy/10 flex items-center justify-center text-energy">
                        <Dumbbell size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">אימון כוח - פלג גוף עליון</div>
                        <div className="text-xs text-white/60">60 דקות • 5 תרגילים</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Navigation */}
                <div className="h-20 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 flex justify-around items-center px-6 pb-4 pt-2 z-10">
                  <div className="flex flex-col items-center gap-1 text-energy">
                    <div className="p-2 bg-energy/10 rounded-xl"><Utensils size={20} /></div>
                    <div className="text-[10px] font-medium">תזונה</div>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-white/40">
                    <div className="p-2"><Dumbbell size={20} /></div>
                    <div className="text-[10px] font-medium">אימון</div>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-white/40">
                    <div className="p-2"><LineChart size={20} /></div>
                    <div className="text-[10px] font-medium">מדדים</div>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-white/40">
                    <div className="p-2"><MessageCircle size={20} /></div>
                    <div className="text-[10px] font-medium">צ'אט</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements around phone */}
            <div className="absolute -z-10 top-20 -left-10 w-32 h-32 bg-energy/20 rounded-full blur-2xl"></div>
            <div className="absolute -z-10 bottom-20 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
