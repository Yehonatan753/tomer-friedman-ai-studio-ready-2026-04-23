import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const testimonials = [
  {
    name: 'ש. ט.',
    context: 'תהליך אונליין',
    text: 'הפעם הראשונה שהרגשתי שהתפריט נבנה סביב החיים שלי ולא סביב דף מוכן מראש. היה ברור מה עושים גם במסעדה, גם בחופש וגם בשבוע עמוס.',
  },
  {
    name: 'ד. ס.',
    context: 'ליווי אישי',
    text: 'המדידות שינו לי את כל ההבנה. לא הסתכלנו רק על משקל, אלא על הרכב גוף, היקפים והתגובה של הגוף לאורך זמן.',
  },
  {
    name: 'ר. ג.',
    context: 'ספורטאי חובב',
    text: 'הדיוק סביב אימונים, זמני ארוחות וכמויות הוריד המון רעש. לא הייתי צריך לנחש אם אני אוכל מספיק או יותר מדי.',
  },
  {
    name: 'א. מ.',
    context: 'אחרי שנים של דיאטות',
    text: 'לא קיבלתי עוד דיאטה. קיבלתי מערכת. זה היה ההבדל בין להחזיק שבועיים לבין להבין איך להתנהל לבד.',
  },
  {
    name: 'י. פ.',
    context: 'TF Tracker',
    text: 'האפליקציה עזרה לי לראות מה קורה ביום יום בלי להסתבך. רישום אוכל, מדידות ואימונים במקום אחד זה מה שחסר לי.',
  },
  {
    name: 'ל. א.',
    context: 'תחזוקה',
    text: 'אחרי התהליך היה לי חשוב לא להיעלם. כרטיסיית המדידות נתנה לי נקודת בדיקה מסודרת בלי להיכנס שוב לתהליך מלא.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden border-y border-energy/10 bg-white px-6 py-32 md:px-16 lg:px-24">
      <div className="absolute left-1/4 top-1/4 h-[700px] w-[700px] rounded-full bg-energy/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="mb-20 text-center"
        >
          <div className="mb-4 text-sm font-black uppercase tracking-widest text-energy">עדויות אנונימיות</div>
          <h2 className="mb-6 font-heading text-5xl font-black tracking-tighter text-foreground md:text-7xl">
            פחות רעש. יותר <span className="text-energy">בהירות.</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-text-muted">
            בלי תמונות מטעות ובלי שמות מלאים שלא אושרו לפרסום. רק ציטוטים אנונימיים שמייצגים תגובות שחוזרות מתהליכים אמיתיים.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: (idx % 3) * 0.08, duration: 0.6, ease }}
              className="rounded-[2rem] border border-energy/20 bg-[#f8fbff] p-8 shadow-[0_20px_65px_rgba(15,42,68,0.07)] transition-colors hover:border-energy/40"
            >
              <Quote size={32} className="mb-6 rotate-180 text-energy/30" />
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="text-energy" />
                ))}
              </div>
              <p className="mb-8 text-lg font-medium leading-relaxed text-foreground/80">"{testimonial.text}"</p>
              <div className="border-t border-[#dceaf5] pt-6">
                <p className="text-lg font-black text-foreground">{testimonial.name}</p>
                <p className="text-sm font-bold text-energy">{testimonial.context}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
