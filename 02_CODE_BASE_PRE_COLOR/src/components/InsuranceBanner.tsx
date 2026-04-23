import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function InsuranceBanner() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    insuranceType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // form submission logic would go here
  };

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-bg relative overflow-hidden text-right">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a1128]">
          
          {/* Image Side */}
          <div className="lg:w-5/12 relative min-h-[300px] lg:min-h-full">
            <div className="absolute inset-0 bg-gradient-to-l from-[#0a1128] via-[#0a1128]/40 to-transparent z-10 hidden lg:block"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] to-transparent z-10 lg:hidden"></div>
            <img 
              src="/tomer-suit-desk.png" 
              alt="תומר פרידמן - ייעוץ תזונתי מקצועי" 
              className="absolute inset-0 w-full h-full object-cover object-top filter brightness-90 saturate-150"
            />
          </div>

          {/* Content Side */}
          <div className="lg:w-7/12 p-8 md:p-12 relative z-20">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-blue-400 w-8 h-8" />
              <h2 className="text-3xl lg:text-4xl font-heading font-black text-white tracking-tight">
                מבוטחים בביטוח בריאות פרטי?
              </h2>
            </div>
            
            <p className="text-blue-100/90 text-lg leading-relaxed mb-6 font-medium">
              השירותים שאני מעניק הינם מוכרים על ידי מרבית חברות הביטוח בישראל. לכן, ביכולתכם לקבל <span className="text-white font-bold bg-blue-500/20 px-2 py-0.5 rounded">החזר של עד 80%</span> מעלות השירותים הבאים בהגשת בקשה לחברה בה אתם מבוטחים:
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              {['ייעוץ תזונתי', 'מעקב תזונתי', 'ליווי תזונתי'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white font-semibold flex-shrink-0">
                  <CheckCircle2 size={18} className="text-blue-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-energy/10 border border-energy/20 rounded-xl p-4 mb-10 flex items-start gap-3">
              <div className="text-energy font-bold mt-0.5">*</div>
              <p className="text-energy-light font-medium">
                חשוב לדעת: קיימות רשתות ביטחון והשתתפות בהוצאות משמעותיות <strong className="font-bold underline">גם למשרתי מילואים פעילים!</strong> בדקו את זכאותכם.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-xl font-bold text-white mb-6">
                לבדיקה האם אתם זכאים לכיסוי מחברת הביטוח, מלאו פרטים:
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="שם מלא *" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <input 
                    type="tel" 
                    placeholder="טלפון *" 
                    required 
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full text-right bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="email" 
                    placeholder="אימייל *" 
                    required 
                    dir="ltr"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full text-right bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="סוג פוליסת ביטוח" 
                    value={formData.insuranceType}
                    onChange={(e) => setFormData({...formData, insuranceType: e.target.value})}
                    className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit" 
                    className="bg-[#003B73] hover:bg-[#00509E] text-white px-10 py-3 rounded-lg font-bold transition-all shadow-lg active:scale-95"
                  >
                    שליחה
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
