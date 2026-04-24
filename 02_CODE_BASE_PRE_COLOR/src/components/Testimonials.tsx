import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Testimonials() {
  const data = [
    { name: "שלומי ט.", result: "ירידה של 10 ק״ג", duration: "4 חודשים", text: "הגעתי לתומר אחרי שלוש דיאטות שנכשלו. ירדתי, עליתי, ירדתי, עליתי — כל פעם עם עוד קילו בונוס. מה שהיה שונה הפעם? תומר לא נתן לי דיאטה. הוא בנה לי מערכת. תפריט שעובד גם כשאני אוכל בחוץ, אימונים של 20 דקות שאני באמת עושה. אחרי 4 חודשים ירדתי 10 קילו ולראשונה בחיים — לא עליתי בחזרה. אני אוכל מה שאני אוהב, פשוט במינון הנכון ובתזמון הנכון. המחשבון של תומר שינה לי את החיים." },
    { name: "דנית ס.", result: "חיטוב וירידה באחוזי שומן", duration: "3 חודשים", text: "הייתי בכושר סביר אבל תקועה. אותו מראה במראה כל חודש למרות שקרעתי את עצמי. תומר שינה לי את כל הגישה לתזונה — לא פחות אוכל, אלא אוכל נכון. התוצאה? ירידה משמעותית באחוזי שומן תוך חודשיים, בלי להרגיש רעבה אפילו יום אחד. אני מרגישה חזקה מאי פעם." },
    { name: "רועי ג.", result: "שיפור ביצועים ספורטיביים", duration: "6 חודשים", text: "בתור ספורטאי שמתחרה, התזונה היא הכל. תומר דייק לי את העיתויים, את הכמויות, ואת ההרכב — לפני אימון, אחרי אימון, ובימי מנוחה. הפידבק שלו אחרי כל אירוע הביא אותי לרמת ביצועים שלא חוויתי קודם. תומר הוא הרבה יותר ממאמן, הוא אסטרטג." },
    { name: "אביתר מ.", result: "ירידה של 15 ק״ג", duration: "5 חודשים", text: "הייתי סקפטי. אחרי 20 שנה של עודף משקל חשבתי שזה פשוט מי שאני. תומר לא הבטיח נסים — הוא הסביר לי מדע. הבנתי למה כל מה שניסיתי נכשל, ולמה הפעם זה יהיה שונה. 15 קילו פחות, ומה שיותר חשוב — אני יודע בדיוק מה לעשות כשאני לבד, ואני נהנה מהדרך!" },
    { name: "ירון פ.", result: "עלייה מסת שריר", duration: "4 חודשים", text: "רציתי לעלות במסה אבל כל מה שעלה היה שומן ולא שריר. תומר בנה לי תכנית עם עודף קלורי מבוקר ואימוני כוח ממוקדים לסידור הפרופורציות. ב-4 חודשים עליתי 4 קילו של שריר נקי! האפליקציה שלו מטורפת — הכל דרך הפלאפון." },
    { name: "לירון א.", result: "ירידה של 8 ק״ג", duration: "3 חודשים", text: "אחרי שנים של תסכול ודיאטות יו-יו, הגעתי לתומר בלי ציפיות. הוא הבטיח לי שנעשה דברים אחרת. ובפעם הראשונה בחיים הרגשתי שאני אוכל כמו בן אדם נורמלי ועדיין יורד במשקל. ערכי הדם שלי מושלמים עכשיו, ויש לי אנרגיה לרוץ אחרי הילדים כל היום." },
    { name: "אורית ג.", result: "מניעת סוכרת וירידה במשקל", duration: "6 חודשים", text: "הרופא אמר לי שאני טרום-סוכרתית ושחייבים שינוי. הגעתי לתומר בהיסטריה. הוא הרגיע אותי ועבדנו שלב אחרי שלב. בנינו הרגלים, הכנסנו אימונים קלים, ופתאום אחרי חצי שנה הרופא לא האמין למדדים שלי. הבדיקות חזרו למצב תקין לחלוטין. תומר ממש הציל אותי." },
    { name: "נדב צ.", result: "עיצוב ויציבה מחדש", duration: "5 חודשים", text: "הייתי מתאמן לבד במכון במשך שנים ולא רואה שום שינוי חוץ מכאבי גב. תומר בחן את הטכניקה שלי, שינה לי חצי מהתרגילים וסידר לי תפריט שדוחף את ההתאוששות. לא רק שהכאבים נעלמו, אני פתאום רואה חיתוכים בבטן שלא היו לי מעולם!" },
    { name: "יעל א.", result: "חזרה לגזרה אחרי לידה", duration: "4 חודשים", text: "להשתקם מלידה זה קשה, במיוחד כשאין לך זמן או שעות שינה. תומר תפר לי מסגרת שמתאימה לאמא תשושה במשרה מלאה — אימוני בית של 15 דקות ותפריט שאפשר להכין ביד אחת. אני היום שוקלת פחות ממה ששקלתי לפני ההיריון, והכל בזכות הגישה המציאותית שלו." },
  ];

  return (
    <section id="testimonials" className="py-32 px-6 md:px-16 lg:px-24 bg-surface relative overflow-hidden border-y border-white/5">
      <div className="glow-blob top-1/4 left-1/4 bg-energy/10 w-[800px] h-[800px] blur-[150px] pointer-events-none"></div>
      <div className="glow-blob bottom-1/4 right-1/4 bg-blue-500/5 w-[600px] h-[600px] blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter mb-6">
            לא מילים יפות. ראיות <span className="text-glow-animate italic font-light">בשטח.</span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            מאות מתאמנים עברו את המערכת של תומר וכל יום המספר הולך וגדל. הנה כמה דוגמאות לתוצאות בלתי מתפשרות כשהמדע פוגש התמדה.
          </p>
        </motion.div>

        {/* Masonry Grid of Testimonials */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pb-10">
          {data.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.6, ease }}
              className="break-inside-avoid bg-[#0a0a0a] border border-white/5 hover:border-energy/30 rounded-3xl p-8 flex flex-col relative transition-colors shadow-2xl hover:shadow-[0_15px_40px_rgba(28,141,255,0.1)] group"
            >
              <Quote size={32} className="text-energy/20 mb-6 rotate-180 group-hover:text-energy/50 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="text-energy" />
                ))}
              </div>
              <p className="text-text-muted text-lg leading-relaxed mb-8 font-medium italic relative z-10">
                "{testimonial.text}"
              </p>
              <div className="border-t border-white/10 pt-6 mt-auto">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-white text-lg">{testimonial.name}</p>
                    <p className="text-sm text-text-muted">{testimonial.duration}</p>
                  </div>
                  <span className="bg-energy/10 border border-energy/20 text-energy text-xs font-bold px-4 py-2 rounded-full text-center">
                    {testimonial.result}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tomer's Guarantee */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease }}
           className="mt-20 glass-panel border border-energy/20 rounded-[3rem] p-8 md:p-14 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden bg-gradient-to-r from-bg to-[#0a0a0a]"
         >
            <div className="absolute top-0 right-0 w-96 h-96 bg-energy/10 rounded-full blur-[100px]"></div>
            
            <div className="w-56 h-56 xl:w-72 xl:h-72 shrink-0 rounded-full border-[6px] border-[#111] overflow-hidden relative shadow-[0_0_50px_rgba(28,141,255,0.15)] glow-blob-container z-10">
                <div className="absolute inset-0 bg-[url('/tomer-measure.png')] bg-cover bg-top mix-blend-normal"></div>
            </div>
 
            <div className="relative z-10 text-center lg:text-right flex-1">
                <h3 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">המחוייבות שלי <span className="text-energy underline decoration-energy/30 underline-offset-8">אליך</span></h3>
                <p className="text-xl md:text-2xl text-text-muted leading-relaxed mb-10 font-medium">
                    "אני לא מחפש לקוחות לכל החיים. אני מחפש אנשים שרוצים ללמוד איך לאכול נכון, להתאמן חכם, ולשמור על התוצאות לתמיד. ההצלחה שלך היא תעודת הזהות שלי, והפנים שלי עומדות מאחורי כל תפריט ותוכנית."
                </p>
                <div className="inline-block relative">
                  <div className="text-3xl font-heading font-black text-white">תומר פרידמן.</div>
                  <div className="text-energy text-sm font-bold tracking-widest uppercase mt-2">תזונאי קליני וספורט</div>
                </div>
            </div>
         </motion.div>
      </div>
    </section>
  );
}

