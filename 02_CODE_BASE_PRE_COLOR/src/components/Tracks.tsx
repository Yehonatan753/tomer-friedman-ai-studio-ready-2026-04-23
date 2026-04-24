import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Users, PhoneCall, CheckCircle2, Lock } from 'lucide-react';
import { SITE_DATA } from '../data';

type TabId = 'online' | 'frontal' | 'phone';

export default function Tracks() {
    const [activeTab, setActiveTab] = useState<TabId>('online');

    // Inject animated border style tag just in case index.css doesn't load it early enough
    // (Prompt suggested doing this, though we also add it to index.css)
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
          @property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
          @keyframes rotateBorder { to { --angle: 360deg; } }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const tabs = [
        { id: 'online', label: 'אונליין', icon: Smartphone },
        { id: 'frontal', label: 'פרונטלי', icon: Users },
        { id: 'phone', label: 'ייעוץ טלפוני', icon: PhoneCall },
    ];

    const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

    return (
        <section id="tracks" className="pt-16 pb-32 px-6 md:px-16 lg:px-24 bg-bg relative overflow-hidden">
            {/* Urgency Banner */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease }}
                className="flex items-center justify-center gap-2 text-sm text-text-muted mb-8"
            >
                <Lock size={14} className="text-energy" />
                <span>תומר מקבל עד 8 מתאמנים חדשים בלבד בחודש — כדי לשמור על איכות הליווי.</span>
            </motion.div>

            {/* Section Heading */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease }}
                className="max-w-7xl mx-auto text-center mb-12 relative z-10"
            >
                <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter mb-6">
                    מסלולי <span className="text-energy italic font-light">ליווי</span>
                </h2>
                <p className="text-xl text-text-muted max-w-2xl mx-auto">
                    לא עוד דיאטה. מערכת שמותאמת ללוח הזמנים, להעדפות ולמטרות שלך.
                </p>
            </motion.div>

            {/* Tab Switcher */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease }}
                className="flex justify-center mb-16 relative z-10"
            >
                <div className="inline-flex p-1.5 rounded-full" style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.06)'
                }}>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabId)}
                                className={`relative flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${isActive ? 'text-white' : 'text-text-muted hover:text-white'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-energy rounded-full"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <Icon size={18} />
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </motion.div>

            {/* Radial Glow Background behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
                 style={{ background: 'radial-gradient(ellipse at center, rgba(28,141,255,0.06) 0%, transparent 70%)', zIndex: 0 }} />

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease }}
                    >
                        {activeTab === 'online' && (
                            <div className="flex flex-col gap-8">
                                {/* Entry Card */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.05, duration: 0.5 }}
                                    className="bg-surface border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between"
                                >
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">TF Tracker — מנוי לאפליקציה</h3>
                                        <p className="text-text-muted">החודש הראשון חינם. אחר כך ₪39/חודש.</p>
                                    </div>
                                    <div className="flex-grow max-w-xl">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {[
                                                "מעקב משקל ומדדים אישיים",
                                                "מחשבון קלוריות ומאקרו מובנה",
                                                "גישה לספריית מתכונים ומאמרים",
                                                "מדריך וידאו קצר להתחלה נכונה",
                                                "ביטול בכל רגע, ללא התחייבות"
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 size={16} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/80">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center shrink-0 w-full md:w-auto mt-4 md:mt-0">
                                        <a href="https://api.whatsapp.com/send?phone=972546699574&text=%D7%94%D7%99%D7%99%20%D7%AA%D7%95%D7%9E%D7%A8%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93%20%D7%A2%D7%9C%20%D7%94%D7%9E%D7%A1%D7%9C%D7%95%D7%9C%D7%99%D7%9D" target="_blank" rel="noopener noreferrer" className="btn-magnetic w-full md:w-auto px-8 py-3 rounded-full font-bold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors text-center">
                                            התחל חינם
                                        </a>
                                        <p className="text-[10px] text-text-muted mt-2 text-center">0 ₪ לחודש הראשון. ₪39/חודש אח״כ. ביטול בקליק.</p>
                                    </div>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Online Card 1 */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.15, duration: 0.5 }}
                                        className="bg-surface border border-white/5 rounded-[1.5rem] p-10 flex flex-col relative"
                                    >
                                        <h3 className="text-3xl font-bold text-white mb-2">המסלול הממוקד</h3>
                                        <p className="text-text-muted mb-8">תזונה מותאמת אישית, ליווי שבועי, תוצאות מדידות</p>
                                        
                                        <div className="space-y-4 mb-8 flex-grow">
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">תפריט מותאם לאורח החיים שלך — כולל מסעדות, אירועים וחופשות <span className="opacity-50">(שווי שוק: ₪500)</span></span>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">מדריך שרידות: איך לאכול בחוץ בלי להרוס התקדמות <span className="opacity-50">(שווי שוק: ₪350)</span></span>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">מעקב שבועי אישי מול תומר — לא מתמחה <span className="opacity-50">(שווי שוק: ₪300/פגישה)</span></span>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">גישה מלאה לאפליקציית TF Tracker <span className="opacity-50">(שווי שוק: ₪39/חודש)</span></span>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">התאמות תפריט בזמן אמת דרך צ'אט ישיר <span className="opacity-50">(שווי שוק: ₪500)</span></span>
                                            </div>
                                        </div>

                                        <div className="mb-6 pt-6 border-t border-white/5 text-center">
                                            <div className="text-sm text-text-muted/60 line-through mb-1">שווי כולל ל-6 חודשים: ₪8,784</div>
                                            <div className="text-xl font-bold text-white">המחיר שלך: ₪4,200</div>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                                <span>חודש</span>
                                                <span className="font-bold">₪1,200</span>
                                            </div>
                                            <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                                <span>3 חודשים</span>
                                                <span className="font-bold">₪2,580 (₪860/חודש)</span>
                                            </div>
                                            <div className="flex justify-between items-center text-white pb-3">
                                                <span>6 חודשים <span className="text-xs text-energy bg-energy/10 px-2 py-0.5 rounded ml-2">הכי משתלם</span></span>
                                                <span className="font-bold text-lg text-white">₪4,200 (₪700/חודש)</span>
                                            </div>
                                        </div>

                                        <a href="https://api.whatsapp.com/send?phone=972546699574&text=%D7%94%D7%99%D7%99%20%D7%AA%D7%95%D7%9E%D7%A8%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93%20%D7%A2%D7%9C%20%D7%94%D7%9E%D7%A1%D7%9C%D7%95%D7%9C%D7%99%D7%9D" target="_blank" rel="noopener noreferrer" className="w-full text-center py-4 rounded-xl font-bold bg-transparent text-white border border-white/20 hover:bg-white/5 transition-colors">
                                            התחל את התהליך
                                        </a>
                                        <p className="text-xs text-center mt-3 text-text-muted">השארת פרטים לתיאום תהליך</p>
                                    </motion.div>

                                    {/* Online Card 2 (POPULAR) */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="animated-border-card-popular relative z-20"
                                    >
                                        <div className="bg-surface h-full rounded-[calc(1.5rem-2px)] p-10 flex flex-col relative overflow-hidden">
                                            <div className="absolute top-0 right-1/2 translate-x-1/2 bg-gradient-to-r from-energy to-energy-light text-white text-xs font-bold px-6 py-1.5 rounded-b-lg tracking-widest uppercase">
                                                הנבחר ביותר
                                            </div>
                                            <div className="absolute top-4 left-4 bg-energy/10 text-energy text-xs font-bold px-3 py-1 rounded-full border border-energy/20">
                                                נשארו 3 מקומות החודש
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2 mt-6">המסלול המלא</h3>
                                            <p className="text-text-muted mb-8">תזונה + אימונים אישיים. המעטפת השלמה למי שרוצה תוצאות ולא רוצה לנחש.</p>

                                            <div className="space-y-4 mb-8 flex-grow">
                                                <div className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90 font-bold">כל מה שכלול במסלול הממוקד <span className="opacity-50 font-normal">(שווי שוק: ₪8,784)</span></span>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90">תכנית אימונים אישית: 20 דקות, 3 פעמים בשבוע <span className="opacity-50">(שווי שוק: ₪800)</span></span>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90">סרטוני הדרכה לכל תרגיל + משקלים מדויקים <span className="opacity-50">(שווי שוק: ₪1,500)</span></span>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90">עדכון תכנית אימונים כל חודש לפי התקדמות <span className="opacity-50">(שווי שוק: ₪400)</span></span>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90">מעקב ביצועים באפליקציה: סטים, חזרות, עומסים</span>
                                                </div>
                                            </div>

                                            <div className="mb-6 pt-6 border-t border-white/5 text-center">
                                                <div className="text-sm text-text-muted/60 line-through mb-1">שווי כולל ל-6 חודשים: ₪11,484</div>
                                                <div className="text-xl font-bold text-white">המחיר שלך: ₪6,480</div>
                                            </div>

                                            <div className="space-y-4 mb-8">
                                                <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                                    <span>חודש</span>
                                                    <span className="font-bold">₪1,620</span>
                                                </div>
                                                <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                                    <span>3 חודשים</span>
                                                    <span className="font-bold">₪3,660 (₪1,220/חודש)</span>
                                                </div>
                                                <div className="flex justify-between items-center text-white pb-3">
                                                    <span>6 חודשים <span className="text-xs text-energy bg-energy/10 px-2 py-0.5 rounded ml-2">הכי משתלם</span></span>
                                                    <span className="font-bold text-lg text-energy">₪6,480 (₪1,080/חודש)</span>
                                                </div>
                                            </div>

                                            <a href="https://api.whatsapp.com/send?phone=972546699574&text=%D7%94%D7%99%D7%99%20%D7%AA%D7%95%D7%9E%D7%A8%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93%20%D7%A2%D7%9C%20%D7%94%D7%9E%D7%A1%D7%9C%D7%95%D7%9C%D7%99%D7%9D" target="_blank" rel="noopener noreferrer" className="btn-magnetic w-full text-center py-4 rounded-xl font-bold bg-energy text-white hover:bg-energy-light transition-colors shadow-[0_10px_30px_-10px_rgba(28,141,255,0.4)]">
                                                מתחיל עכשיו
                                            </a>
                                            <p className="text-xs text-center mt-3 text-white/70">לנרשמים ל-6 חודשים: פגישת מיפוי ראשונית ללא עלות נוספת</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'frontal' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Frontal Card 1 */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.15, duration: 0.5 }}
                                        className="bg-surface border border-white/5 rounded-[1.5rem] p-10 flex flex-col relative"
                                    >
                                        <h3 className="text-3xl font-bold text-white mb-2">הליווי הפרונטלי</h3>
                                        <p className="text-text-muted mb-8">תזונה מותאמת אישית עם מפגשים פנים מול פנים</p>
                                        
                                        <div className="space-y-4 mb-10 flex-grow">
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">תפריט מותאם לאורח החיים שלך — כולל מסעדות, אירועים וחופשות <span className="opacity-50">(שווי שוק: ₪500)</span></span>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">מדריך שרידות: איך לאכול בחוץ בלי להרוס התקדמות <span className="opacity-50">(שווי שוק: ₪350)</span></span>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">מדידות הרכב גוף כל פגישה <span className="opacity-50">(שווי שוק: ₪250/מדידה)</span></span>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">פגישה ראשונה של 75 דקות לאפיון מלא <span className="opacity-50">(שווי שוק: ₪600)</span></span>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">פגישות מעקב קצרות כל 2-3 שבועות <span className="opacity-50">(שווי שוק: ₪400/פגישה)</span></span>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">גישה מלאה לאפליקציית TF Tracker <span className="opacity-50">(שווי שוק: ₪39/חודש)</span></span>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                                <span>4 מפגשים</span>
                                                <span className="font-bold">₪4,200</span>
                                            </div>
                                            <div className="flex justify-between items-center text-white pb-3">
                                                <span>8 מפגשים</span>
                                                <span className="font-bold text-lg">₪6,240 (₪780/מפגש)</span>
                                            </div>
                                        </div>

                                        <a href="https://api.whatsapp.com/send?phone=972546699574&text=%D7%94%D7%99%D7%99%20%D7%AA%D7%95%D7%9E%D7%A8%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93%20%D7%A2%D7%9C%20%D7%94%D7%9E%D7%A1%D7%9C%D7%95%D7%9C%D7%99%D7%9D" target="_blank" rel="noopener noreferrer" className="w-full text-center py-4 rounded-xl font-bold bg-transparent border border-white/20 text-white hover:bg-white/5 transition-colors">
                                            קבע פגישת היכרות
                                        </a>
                                        <p className="text-xs text-center mt-3 text-text-muted">השארת פרטים לתיאום פגישה</p>
                                    </motion.div>

                                    {/* Frontal Card 2 (POPULAR) */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="animated-border-card-popular relative z-20"
                                    >
                                        <div className="bg-surface h-full rounded-[calc(1.5rem-2px)] p-10 flex flex-col relative overflow-hidden">
                                            <div className="absolute top-0 right-1/2 translate-x-1/2 bg-gradient-to-r from-energy to-energy-light text-white text-xs font-bold px-6 py-1.5 rounded-b-lg tracking-widest uppercase">
                                                הנבחר ביותר
                                            </div>
                                            <div className="absolute top-4 left-4 bg-energy/10 text-energy text-xs font-bold px-3 py-1 rounded-full border border-energy/20">
                                                נשארו 3 מקומות החודש
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2 mt-6">הליווי האינטנסיבי</h3>
                                            <p className="text-text-muted mb-8">תזונה + אימונים פנים מול פנים. הליווי הצמוד ביותר שתומר מציע.</p>

                                            <div className="space-y-4 mb-10 flex-grow">
                                                <div className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90 font-bold">כל מה שכלול בליווי הפרונטלי</span>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90">תכנית אימונים אישית: 20 דקות, 3 פעמים בשבוע <span className="opacity-50">(שווי שוק: ₪800)</span></span>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90">סרטוני הדרכה לכל תרגיל + משקלים מדויקים <span className="opacity-50">(שווי שוק: ₪1,500)</span></span>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90">עדכון תכנית אימונים כל חודש לפי התקדמות <span className="opacity-50">(שווי שוק: ₪400)</span></span>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90">מעקב ביצועים באפליקציה: סטים, חזרות, עומסים</span>
                                                </div>
                                            </div>

                                            <div className="space-y-4 mb-8">
                                                <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                                    <span>4 מפגשים</span>
                                                    <span className="font-bold">₪5,580</span>
                                                </div>
                                                <div className="flex justify-between items-center text-white pb-3">
                                                    <span>8 מפגשים</span>
                                                    <span className="font-bold text-lg text-energy">₪8,580 (₪1,073/מפגש)</span>
                                                </div>
                                            </div>

                                            <a href="https://api.whatsapp.com/send?phone=972546699574&text=%D7%94%D7%99%D7%99%20%D7%AA%D7%95%D7%9E%D7%A8%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93%20%D7%A2%D7%9C%20%D7%94%D7%9E%D7%A1%D7%9C%D7%95%D7%9C%D7%99%D7%9D" target="_blank" rel="noopener noreferrer" className="btn-magnetic w-full text-center py-4 rounded-xl font-bold bg-energy text-white hover:bg-energy-light transition-colors shadow-[0_10px_30px_-10px_rgba(28,141,255,0.4)]">
                                                מתחיל עכשיו
                                            </a>
                                            <p className="text-xs text-center mt-3 text-white/70">פגישה ראשונה ארוכה (75 דק׳) — אפיון מלא של מטרות, מגבלות והעדפות</p>
                                        </div>
                                    </motion.div>
                                </div>
                                
                                {/* Info Note */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6 flex items-start sm:items-center gap-4 text-blue-200/80"
                                >
                                    <div className="shrink-0 mt-1 sm:mt-0 text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm leading-relaxed">
                                            <strong className="text-blue-300 font-bold">שימו לב:</strong> הפגישה הראשונה ארוכה מן הרגיל. שאר פגישות המעקב אורכות כ-5 דקות ומתקיימות בטווח של כ-3 שבועות אחת מהשנייה למעקב אידיאלי.
                                        </p>
                                    </div>
                                </motion.div>

                                {/* MFU Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-surface border border-white/5 rounded-[2rem] p-10 lg:p-14 flex flex-col xl:flex-row gap-12 lg:gap-16 items-center"
                                >
                                    <div className="w-full xl:w-1/3 text-center xl:text-right">
                                        <h4 className="text-3xl font-bold mb-4 text-white">מדידות מעקב (MFU)</h4>
                                        <p className="text-text-muted text-lg leading-relaxed">לשמירה על תוצאות — מיועד רק למי שעבר תהליך פרונטלי מלא</p>
                                    </div>
                                    
                                    <div className="w-full xl:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-bg border border-white/5 rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden">
                                            <div className="text-white/60 text-sm mb-2">4 מדידות</div>
                                            <div className="text-2xl font-bold text-white mb-1">₪520</div>
                                            <div className="text-xs text-text-muted">₪130/מדידה</div>
                                        </div>
                                        <div className="bg-bg border-2 border-energy/30 rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(28,141,255,0.1)]">
                                            <div className="absolute top-0 right-0 w-full h-1 bg-energy"></div>
                                            <div className="text-energy text-sm mb-2 font-bold">8 מדידות</div>
                                            <div className="text-2xl font-bold text-white mb-1">₪880</div>
                                            <div className="text-xs text-energy/80">₪110/מדידה (חיסכון ₪160)</div>
                                        </div>
                                        <div className="bg-bg border border-energy/50 rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden bg-energy/5">
                                            <div className="absolute top-0 right-1/2 translate-x-1/2 bg-energy text-white text-[10px] font-bold px-3 py-0.5 rounded-b-md">הכי משתלם</div>
                                            <div className="text-text-main text-sm mt-3 mb-1 font-bold">12 מדידות</div>
                                            <div className="text-2xl font-bold text-white mb-1">₪1,140</div>
                                            <div className="text-xs text-text-muted">₪95/מדידה</div>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full border-t border-white/5 pt-6 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 size={16} className="text-energy shrink-0 mt-0.5" />
                                            <span className="text-sm text-text-muted">מדידת הרכב גוף מקצועית <span className="opacity-50">(שווי שוק: ₪200-300/מדידה)</span></span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 size={16} className="text-energy shrink-0 mt-0.5" />
                                            <span className="text-sm text-text-muted">ניתוח תוצאות + המלצות אישיות מתומר</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 size={16} className="text-energy shrink-0 mt-0.5" />
                                            <span className="text-sm text-text-muted">3-4 דקות פגישה ממוקדת — אפס בזבוז זמן</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 size={16} className="text-energy shrink-0 mt-0.5" />
                                            <span className="text-sm text-text-muted">גישה מתמשכת לאפליקציית TF Tracker</span>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full mt-4 flex flex-col items-center">
                                        <a href="https://api.whatsapp.com/send?phone=972546699574&text=%D7%94%D7%99%D7%99%20%D7%AA%D7%95%D7%9E%D7%A8%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93%20%D7%A2%D7%9C%20%D7%94%D7%9E%D7%A1%D7%9C%D7%95%D7%9C%D7%99%D7%9D" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-xl font-bold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors">
                                            שמור על התוצאות
                                        </a>
                                        <p className="text-xs mt-3 text-text-muted/60">מיועד לבוגרי תהליך פרונטלי בלבד</p>
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        {activeTab === 'phone' && (
                            <div className="max-w-2xl mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-surface-hover border border-white/10 p-12 md:p-16 rounded-[3rem] text-center relative overflow-hidden shadow-[0_0_50px_rgba(28,141,255,0.05)]"
                                >
                                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-energy/5 to-transparent pointer-events-none"></div>
                                    <PhoneCall className="w-16 h-16 text-energy mx-auto mb-8" strokeWidth={1.5} />
                                    <h3 className="text-4xl font-heading font-black mb-6 text-white">{SITE_DATA.services.phone.title}</h3>
                                    <p className="text-lg text-text-muted mb-12 leading-relaxed max-w-lg mx-auto">
                                        {SITE_DATA.services.phone.description}
                                    </p>

                                    <div className="flex flex-col gap-4 max-w-md mx-auto relative z-10">
                                        <div className="flex justify-between items-center w-full bg-surface border border-white/5 rounded-2xl p-6">
                                            <span className="text-sm text-text-muted">{SITE_DATA.services.phone.basePrice.minutes} דקות ראשונות</span>
                                            <span className="text-3xl font-black text-energy">₪{SITE_DATA.services.phone.basePrice.price}</span>
                                        </div>
                                        <div className="flex justify-between items-center w-full bg-surface border border-white/5 rounded-2xl p-6">
                                            <span className="text-sm text-text-muted">כל דקה נוספת</span>
                                            <span className="font-bold text-xl text-white">₪{SITE_DATA.services.phone.additionalMinutePrice}</span>
                                        </div>

                                        <a href="https://api.whatsapp.com/send?phone=972546699574&text=%D7%94%D7%99%D7%99%20%D7%AA%D7%95%D7%9E%D7%A8%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93%20%D7%A2%D7%9C%20%D7%94%D7%9E%D7%A1%D7%9C%D7%95%D7%9C%D7%99%D7%9D" target="_blank" rel="noopener noreferrer" className="w-full mt-4 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-[#1c8dff] to-[#0f5fb3] text-white hover:shadow-[0_0_30px_rgba(28,141,255,0.4)] hover:scale-[1.02]">
                                            תיאום שיחה
                                        </a>
                                        <p className="text-xs text-center mt-3 text-white/50">בלי התחייבות. שלם רק על הזמן שאתה צורך.</p>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

