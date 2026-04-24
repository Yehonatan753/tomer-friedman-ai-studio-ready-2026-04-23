import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Dumbbell, HelpCircle, LineChart, MessageCircle, Utensils } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const features = [
  {
    icon: Utensils,
    title: 'שאלון התאמה חכם יותר',
    text: 'לא רק מטרה ומשקל. האפליקציה בודקת ניסיון, תקציב, מדידות, שגרת אימון ורמת מעטפת שנכונה לך.',
  },
  {
    icon: Dumbbell,
    title: 'אוכל, ברקוד וצילום מזון',
    text: 'לרשום ארוחה זה שניות. גם כשאתה בחוץ, גם כשאתה ממהר.',
  },
  {
    icon: LineChart,
    title: 'מדידות, התקדמות ואימונים במקום אחד',
    text: 'כל נתון נשמר, ההתקדמות נראית, וההמשך נבנה לפי מה שקורה בפועל.',
  },
  {
    icon: MessageCircle,
    title: 'המשך טבעי לתהליך אישי',
    text: 'כשמוכנים, עוברים לליווי עמוק יותר בלי לאבד נתונים ובלי להתחיל מאפס.',
  },
];

export default function AppShowcase() {
  return (
    <section id="app" className="relative overflow-hidden border-y border-energy/10 bg-gradient-to-br from-white via-[#f5fbff] to-[#eaf5ff] px-6 py-32 md:px-16 lg:px-24">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#1c8dff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full border border-energy/20 bg-white px-4 py-2 font-heading text-sm font-black tracking-widest text-energy"
          >
            TF Tracker
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-heading text-4xl font-black text-foreground md:text-5xl lg:text-6xl"
          >
            כך TF Tracker עובד <span className="text-energy">ביום-יום</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-lg leading-relaxed text-text-muted"
          >
            TF Tracker הוא מוצר הכניסה הדיגיטלי שלי. בפנים יש מערכת אחת שאוגדת אוכל, אימונים, מדידות ומעקב, עם מצב כהה ומצב בהיר לפי מה שנוח לך. זה מוצר עצמאי שעומד לבד, ומי שרוצה להעמיק אחר כך לתהליך אישי, ההיסטוריה ממשיכה איתו ולא מתחילה מחדש.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a href="#tracks" className="btn-magnetic flex items-center gap-2 rounded-full bg-energy px-8 py-4 font-black text-white shadow-[0_12px_34px_rgba(28,141,255,0.3)]">
              <span>להתחיל עם TF Tracker</span>
              <ArrowLeft size={20} />
            </a>
            <a href="#pathfinder" className="flex items-center justify-center gap-2 rounded-full border border-energy/20 bg-white px-8 py-4 font-bold text-foreground shadow-sm transition-colors hover:bg-[#eef7ff]">
              <span>ענה על שאלון התאמה</span>
              <HelpCircle size={20} className="text-energy" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          >
            <div className="space-y-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                    className="group flex gap-5 rounded-[1.75rem] border border-energy/10 bg-white p-5 shadow-[0_18px_55px_rgba(15,42,68,0.07)]"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-energy/20 bg-[#f0f8ff] text-energy transition-colors group-hover:bg-energy group-hover:text-white">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="mb-2 text-2xl font-black text-foreground">{feature.title}</h3>
                      <p className="leading-relaxed text-text-muted">{feature.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div className="mt-10 rounded-[1.75rem] border border-energy/20 bg-white p-6 shadow-[0_18px_55px_rgba(15,42,68,0.07)]">
              <h4 className="mb-4 font-black text-foreground">מסלולי TF Tracker:</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-energy" />
                  <span><strong className="text-foreground">₪49.90 / חודשי:</strong> גמיש, ללא התחייבות.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-energy" />
                  <span><strong className="text-foreground">₪39.90 / לחודש במסלול שנתי:</strong> חיסכון של ₪120 לשנה.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-energy" />
                  <span><strong className="text-foreground">המשך טבעי למסלול אישי:</strong> כשמוכנים, עוברים בלי לאבד נתונים.</span>
                </li>
              </ul>
              <p className="mt-5 text-xs text-text-muted/80">
                אלה מסכים אמיתיים מתוך המוצר. מה שאתה רואה כאן, זה מה שתראה ברגע שתיכנס.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative h-[600px] w-[300px] overflow-hidden rounded-[3rem] border-[8px] border-[#263544] bg-[#0a0a0a] shadow-[0_30px_70px_rgba(15,42,68,0.22),inset_0_0_0_2px_rgba(255,255,255,0.08)] md:h-[700px] md:w-[350px]">
              <div className="absolute left-1/2 top-0 z-20 h-7 w-32 -translate-x-1/2 rounded-b-3xl bg-[#263544]" />
              <div className="absolute inset-0 flex flex-col bg-[#0a0a0a] pt-8">
                <div className="z-10 flex h-8 w-full items-center justify-between px-6 text-[11px] font-medium text-white">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full border border-white/80" />
                    <div className="h-3 w-3 rounded-full bg-white/80" />
                    <div className="h-2.5 w-4 rounded-sm bg-white/80" />
                  </div>
                </div>

                <div className="mt-2 px-6 py-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="mb-1 text-xs font-black uppercase tracking-wider text-energy">TF Tracker</div>
                      <div className="text-2xl font-black text-white">שלום, דניאל</div>
                    </div>
                    <a href="#pathfinder" className="flex items-center gap-2 overflow-hidden rounded-2xl border border-energy/40 bg-white/10 px-2 py-1 text-[10px] font-black text-white transition-colors hover:border-energy">
                      <img src="/tomer-logo.png" alt="תומר פרידמן" className="h-8 w-8 rounded-xl bg-white object-contain" />
                      שאלון התאמה
                    </a>
                  </div>
                </div>

                <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto px-6 pb-6">
                  <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-[#111] p-6">
                    <div>
                      <div className="mb-1 text-sm text-white/60">קלוריות נותרות</div>
                      <div className="text-3xl font-black text-white">1,240</div>
                      <div className="mt-1 text-xs text-energy">מתוך 2,500 קק"ל</div>
                    </div>
                    <div className="-rotate-45 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#222] border-r-energy border-t-energy">
                      <div className="rotate-45 text-center text-lg font-black text-white">50%</div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-[#111] p-5">
                    <div className="mb-4 text-sm font-black text-white">יעדים יומיים</div>
                    <div className="flex items-end justify-between">
                      {[
                        ['180g', 'חלבון', 'bg-energy', 'text-energy'],
                        ['250g', 'פחמימה', 'bg-white', 'text-white'],
                        ['70g', 'שומן', 'bg-white/40', 'text-white/60'],
                      ].map(([value, label, bar, color]) => (
                        <div key={label} className="text-center">
                          <div className={`mb-1 text-xl font-black ${color}`}>{value}</div>
                          <div className="mx-auto mb-1 h-1.5 w-12 overflow-hidden rounded-full bg-[#222]">
                            <div className={`h-full w-3/4 rounded-full ${bar}`} />
                          </div>
                          <div className="text-[10px] text-white/40">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-energy/20 bg-gradient-to-br from-energy/20 to-transparent p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm font-black text-white">ארוחה הבאה</div>
                      <div className="rounded-md bg-energy/10 px-2 py-1 text-xs text-energy">14:00</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#222] text-white/50">
                        <Utensils size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-black text-white">חזה עוף ואורז</div>
                        <div className="text-xs text-white/60">450 קק"ל • 40g חלבון</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="z-10 flex h-20 items-center justify-around border-t border-white/10 bg-[#0a0a0a]/90 px-6 pb-4 pt-2 backdrop-blur-md">
                  {[
                    [Utensils, 'תזונה', true],
                    [Dumbbell, 'אימון', false],
                    [LineChart, 'מדדים', false],
                    [MessageCircle, 'צ׳אט', false],
                  ].map(([Icon, label, active]) => {
                    const NavIcon = Icon as typeof Utensils;
                    return (
                      <div key={String(label)} className={`flex flex-col items-center gap-1 ${active ? 'text-energy' : 'text-white/40'}`}>
                        <div className={`rounded-xl p-2 ${active ? 'bg-energy/10' : ''}`}>
                          <NavIcon size={20} />
                        </div>
                        <div className="text-[10px] font-bold">{String(label)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
