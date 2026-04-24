import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, ArrowLeft, BriefcaseBusiness, CheckCircle2, Laptop, Ruler, Smartphone, Sparkles, UserRound } from 'lucide-react';

type TrackTab = 'entry' | 'flagship' | 'professional';

type PriceOption = {
  label: string;
  price: string;
  note?: string;
  highlight?: boolean;
};

type ValueStackItem = {
  label: string;
  marketPrice: string;
};

type Product = {
  id: string;
  tab: TrackTab;
  title: string;
  icon: typeof Smartphone;
  eyebrow: string;
  ladderNote: string;
  description: string;
  prices: PriceOption[];
  includes: string[];
  valueStack?: {
    items: ValueStackItem[];
    total: string;
    here: string;
  };
  marketComparison?: string;
  capacity?: string;
  renewal?: string;
  upsell?: string;
  hiddenDetails?: string[];
  featured?: boolean;
};

const tabs: Array<{ id: TrackTab; label: string }> = [
  { id: 'entry', label: 'כניסה ואבחון' },
  { id: 'flagship', label: 'תהליכי ליווי' },
  { id: 'professional', label: 'תחזוקה ומקצועי' },
];

const products: Product[] = [
  {
    id: 'tf-tracker',
    tab: 'entry',
    icon: Smartphone,
    title: 'TF Tracker',
    eyebrow: 'מוצר הכניסה הדיגיטלי',
    ladderNote: 'מוצר הכניסה העצמאי. לא פרומו לתהליך הגדול, כלי שעומד בפני עצמו.',
    description: 'אוכל, אימונים, מדידות ומעקב במקום אחד. מתאים למי שרוצה להתחיל מסודר בלי להתחייב לליווי אישי.',
    prices: [
      { label: 'חודשי', price: '₪49.90', note: 'גמיש, ללא התחייבות' },
      { label: 'שנתי', price: '₪39.90 / חודש', note: 'חיסכון של ₪120 בשנה', highlight: true },
    ],
    includes: [
      'שאלון אישי קצר ובניית מסגרת התחלתית',
      'בוט AI לשאלות יומיומיות בסיסיות',
      'מדידות עצמאיות ומעקב התקדמות',
      'שיטת המנות של תומר + ברקוד/צילום/מאגר ארוחות',
      'תוכנית אימונים לבית, לחדר כושר או לפארק',
    ],
    renewal: 'מנוי חודשי או שנתי. אפשר לבטל בלי להיכנס לתהליך אישי.',
    upsell: 'כשמוכנים לליווי אישי, הנתונים ממשיכים איתך לתהליך אונליין.',
  },
  {
    id: 'bodymetrix-lite',
    tab: 'entry',
    icon: Activity,
    title: 'BodyMetRiX Lite',
    eyebrow: 'אבחון עצמי ממוקד',
    ladderNote: 'לפני שמתחייבים לתהליך מלא, מבינים מאיפה מתחילים.',
    description: 'דוח מדידה עצמי קצר וברור שמתרגם היקפים והרכב גוף להמלצה פרקטית להמשך.',
    prices: [
      { label: 'דוח בודד', price: '₪297' },
      { label: '3 דוחות', price: '₪790', note: 'למעקב התקדמות', highlight: true },
    ],
    includes: [
      'סרטון הדרכה קצר למדידות עצמיות',
      'שאלון קצר ופרקטי',
      'ניתוח מדידות והמלצה להמשך',
      'שפה פשוטה, לא דוח מעבדה מבלבל',
    ],
    renewal: 'אפשר לרכוש דוחות נוספים לפי צורך.',
    upsell: 'אם רואים שצריך מסגרת עמוקה יותר, ההמשך הטבעי הוא תהליך אונליין.',
  },
  {
    id: 'online-process',
    tab: 'flagship',
    icon: Laptop,
    title: 'תהליך אונליין',
    eyebrow: 'מוצר הדגל מרחוק',
    ladderNote: 'כל מה שצריך בתהליך רציני, בלי לדרוש הגעה פיזית.',
    description: 'ליווי מקצועי מרחוק עם תפריט דינמי, מעקב, אפליקציה, מדידות ואופטימיזציה לפי מה שקורה בפועל.',
    prices: [
      { label: '3 חודשים', price: '₪4,500', note: '₪1,500 לחודש' },
      { label: '6 חודשים', price: '₪8,400', note: '₪1,400 לחודש', highlight: true },
    ],
    includes: [
      'שאלון אישי מורחב ובדיקות רלוונטיות',
      'סקירת בדיקות והמלצות מקצועיות',
      'מעקב שבועי במייל + מענה יומי עם בוט AI',
      'פגישת מדידה קצרה אחת לחודש לפי צורך',
      'תפריט דינמי ותוכנית אימונים לפי צורך',
      'שימוש מלא ב־TF Tracker ודוח התקדמות חודשי',
    ],
    valueStack: {
      items: [
        { label: 'שאלון אישי מורחב ובדיקות', marketPrice: '₪600' },
        { label: 'בניית תפריט דינמי ל־3 חודשים', marketPrice: '₪2,700' },
        { label: 'תוכנית אימונים מותאמת', marketPrice: '₪1,200' },
        { label: 'מעקב שבועי ומענה יומי', marketPrice: '₪1,500+' },
        { label: 'פגישות מדידה חודשיות', marketPrice: '₪1,350' },
        { label: 'שימוש מלא ב־TF Tracker', marketPrice: '₪149.70' },
      ],
      total: '~₪7,500+',
      here: '₪4,500 ל־3 חודשים',
    },
    marketComparison:
      'אצל רוב הקולגות שלי ליווי מרחוק במבנה דומה עולה ₪6,000-8,000 ל־3 חודשים, בלי אפליקציה ובלי רצף נתונים. כאן זה ₪4,500, עם שניהם.',
    capacity: 'אני לוקח עד 8 משתתפים חדשים בחודש לתהליך הזה. הרישום לחודש הבא פתוח.',
    renewal: 'לאחר 3 חודשים אפשר להאריך ל־3 חודשים נוספים ב־₪3,900. לאחר 6 חודשים אפשר לעבור לתחזוקה.',
    upsell: 'אם צריך זמינות גבוהה יותר ועבודה צמודה, עוברים לליווי האישי המלא.',
    hiddenDetails: ['לבוגרי 12 חודשים קיימת אפשרות תחזוקה חודשית לפי התאמה אישית. זה לא מוצג כהצעת כניסה כדי לא לבלבל את ההחלטה הראשונית.'],
  },
  {
    id: 'personal-premium',
    tab: 'flagship',
    icon: UserRound,
    title: 'ליווי אישי מלא',
    eyebrow: 'הדרגה העליונה',
    ladderNote: 'עבודה צמודה, זמינות יומיומית ואפס פינות חתוכות.',
    description: 'תהליך עומק עם תומר: אפיון מלא, מדידות, תפריט דינמי, התאמות, זמינות יומיומית ופגישות מעקב מלאות.',
    prices: [
      { label: '3 חודשים', price: '₪9,000', note: '₪3,000 לחודש' },
      { label: '6 חודשים', price: '₪16,500', note: '₪2,750 לחודש', highlight: true },
    ],
    includes: [
      'פגישת אפיון מלאה ושאלון אישי מורחב',
      'בדיקות, הרכב גוף, מסת גוף רזה, היקפים ופרופורציות',
      'הגדרת מטרות מדעית ומספרית',
      'תפריט דינמי אישי ותוכנית אימונים לפי צורך',
      'זמינות יומיומית בוואטסאפ',
      'פגישות מעקב ומדידות מלאות אחת לחודש',
      'דוח התקדמות חודשי ושימוש מלא ב־TF Tracker',
    ],
    valueStack: {
      items: [
        { label: 'פגישת אפיון מלאה', marketPrice: '₪800' },
        { label: 'מדידות הרכב גוף והיקפים', marketPrice: '₪1,350' },
        { label: 'תפריט דינמי מותאם אישית', marketPrice: '₪2,700' },
        { label: 'תוכנית אימונים מותאמת', marketPrice: '₪1,200' },
        { label: 'ליווי וואטסאפ יומי', marketPrice: '₪1,500 / חודש' },
        { label: 'פגישות מעקב חודשיות מלאות', marketPrice: '₪1,800+' },
        { label: 'דוחות התקדמות ואפליקציה', marketPrice: '₪500+' },
      ],
      total: '~₪12,500+',
      here: '₪9,000 ל־3 חודשים',
    },
    marketComparison:
      'ליווי פרטי צמוד בשוק הפרימיום נע בין ₪12,000 ל־₪20,000 ל־3 חודשים. כאן המחיר הוא ₪9,000, עם הרבה יותר נקודות מגע מהממוצע.',
    capacity: '12 מקומות אישיים פעילים במקביל. כשמקום מתפנה, נפתח מקום חדש.',
    renewal: 'לאחר 3 חודשים ניתן להאריך ב־₪7,500. לאחר 6 חודשים ניתן להאריך ב־₪6,000.',
    upsell: 'אין מדרגה גבוהה יותר באתר. אם צריך המשך, זה תחזוקה אישית לפי מצב אמיתי.',
    hiddenDetails: ['לבוגרי פרימיום קיימת אפשרות תחזוקה חודשית ב־₪1,800 הכוללת פגישה חודשית, זמינות יומית והתאמות שוטפות.'],
    featured: true,
  },
  {
    id: 'measurement-card',
    tab: 'professional',
    icon: Ruler,
    title: 'כרטיסיית מדידות',
    eyebrow: 'תחזוקה למסיימי תהליך',
    ladderNote: 'לא כניסה. תחזוקה של תוצאה שכבר הושגה.',
    description: 'מדידות מקצועיות, דוחות השוואה והמלצות המשך כדי לשמור על תוצאה לאורך זמן.',
    prices: [
      { label: '4 מדידות', price: '₪800' },
      { label: '8 מדידות', price: '₪1,400', highlight: true },
      { label: '12 מדידות', price: '₪1,900' },
    ],
    includes: [
      'מדידות הרכב גוף והיקפים',
      'אחוז שומן, FFMI, LBM, היקפים ופרופורציות',
      'גרפים והשוואה לאורך זמן',
      'נורמות מותאמות גיל ומין',
      'המלצות מקצועיות בשפה פשוטה',
    ],
    renewal: 'אפשר לרכוש כרטיסייה נוספת לפי צורך.',
    upsell: 'אם המדידות מראות שהמסגרת התרופפה, חוזרים לתהליך אונליין.',
    hiddenDetails: ['קיימת אפשרות תחזוקה שנתית סביב ₪150 לחודש למי שכבר עבר תהליך ומחזיק רצף.'],
  },
  {
    id: 'bodymetrix-pro',
    tab: 'professional',
    icon: BriefcaseBusiness,
    title: 'BodyMetRiX Pro',
    eyebrow: 'מוצר מקצועי לתזונאים',
    ladderNote: 'לא רלוונטי למי שמחפש ליווי אישי. זה מוצר B2B לאנשי מקצוע.',
    description: 'מערכת מדידות והרכב גוף לתזונאים ואנשי מקצוע שרוצים דוחות, גרפים והמלצות ללקוחות.',
    prices: [
      { label: 'שנתי', price: '₪2,970', highlight: true },
      { label: 'חודשי', price: '₪297' },
    ],
    includes: [
      'מדידות והרכב גוף והיקפים',
      'אחוזי שומן, FFMI, LBM והיקפים',
      'פרופורציות ופוטנציאל שריר',
      'דוחות וגרפים ללקוח ולאיש המקצוע',
      'נורמות מותאמות גיל ומין',
      'המלצות מקצועיות ושפה קלינית פשוטה',
    ],
    renewal: 'רישיון שנתי או חודשי, לפי אופי השימוש.',
    upsell: 'ניתן להוסיף קורס הטמעה דיגיטלי, הדרכת מדידה אישית או שעות ייעוץ עסקי.',
    hiddenDetails: ['מחירי נאמנות/שימור לא מוצגים באתר כברירת מחדל כדי לא לפגוע במכירה הראשונית.'],
  },
];

function whatsappLink(product: string) {
  const text = encodeURIComponent(`שלום תומר, אשמח לשמוע עוד על ${product}`);
  return `https://wa.me/972546699574?text=${text}`;
}

function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`flex h-full flex-col rounded-[2rem] border bg-white p-7 shadow-[0_24px_70px_rgba(15,42,68,0.08)] md:p-9 ${
        product.featured ? 'border-energy/40 ring-2 ring-energy/10' : 'border-energy/20'
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0f8ff] text-energy">
          <Icon size={26} />
        </div>
        <div className="rounded-full border border-energy/20 bg-[#f6fbff] px-3 py-1 text-xs font-black text-energy">{product.eyebrow}</div>
      </div>

      <p className="mb-3 text-sm font-bold leading-relaxed text-energy">{product.ladderNote}</p>
      <h3 className="mb-3 font-heading text-3xl font-black text-foreground">{product.title}</h3>
      <p className="mb-6 leading-relaxed text-text-muted">{product.description}</p>

      <div className="mb-7 grid gap-3">
        {product.prices.map((price) => (
          <div
            key={`${product.id}-${price.label}`}
            className={`flex items-center justify-between rounded-2xl border p-4 ${
              price.highlight ? 'border-energy/40 bg-[#eef7ff]' : 'border-[#dceaf5] bg-white'
            }`}
          >
            <div>
              <div className="text-sm font-bold text-text-muted">{price.label}</div>
              {price.note && <div className="mt-1 text-xs text-text-muted/80">{price.note}</div>}
            </div>
            <div className="text-left text-2xl font-black text-[#0f2a44]">{price.price}</div>
          </div>
        ))}
      </div>

      <div className="mb-7 space-y-3">
        {product.includes.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-energy" />
            <span className="text-sm leading-relaxed text-foreground/80">{item}</span>
          </div>
        ))}
      </div>

      {product.valueStack && (
        <div className="mb-7 rounded-[1.5rem] border border-energy/20 bg-[#f6fbff] p-5">
          <div className="mb-4 flex items-center gap-2 font-black text-foreground">
            <Sparkles size={18} className="text-energy" />
            שווי שוק משוער
          </div>
          <div className="space-y-2">
            {product.valueStack.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 border-b border-[#dceaf5] pb-2 text-sm last:border-0 last:pb-0">
                <span className="text-text-muted">{item.label}</span>
                <span className="font-black text-foreground">{item.marketPrice}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-4 py-3">
            <span className="font-black text-text-muted">שווי כולל</span>
            <span className="font-black text-foreground">{product.valueStack.total}</span>
          </div>
          <div className="mt-2 flex items-center justify-between rounded-2xl bg-energy px-4 py-3 text-white">
            <span className="font-black">המחיר כאן</span>
            <span className="font-black">{product.valueStack.here}</span>
          </div>
        </div>
      )}

      {product.marketComparison && (
        <p className="mb-5 rounded-2xl border border-energy/20 bg-white px-4 py-3 text-sm font-bold leading-relaxed text-foreground">
          {product.marketComparison}
        </p>
      )}

      {product.capacity && (
        <div className="mb-5 flex items-start gap-2 rounded-full border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
          {product.capacity}
        </div>
      )}

      <div className="mt-auto rounded-[1.5rem] border border-[#dceaf5] bg-[#f8fbff] p-4">
        <div className="mb-3 text-sm font-black text-foreground">מה קורה אחרי</div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="mb-1 text-xs font-black text-energy">בסיום התהליך</div>
            <p className="text-sm leading-relaxed text-text-muted">{product.renewal}</p>
          </div>
          <div>
            <div className="mb-1 text-xs font-black text-energy">שלב הבא אם צריך</div>
            <p className="text-sm leading-relaxed text-text-muted">{product.upsell}</p>
          </div>
        </div>
        {product.hiddenDetails && (
          <details className="mt-4 rounded-2xl border border-[#dceaf5] bg-white p-3 text-sm text-text-muted">
            <summary className="cursor-pointer font-black text-foreground">פרטים נוספים על המשך וחידוש</summary>
            <ul className="mt-3 space-y-2">
              {product.hiddenDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </details>
        )}
      </div>

      <a
        href={whatsappLink(product.title)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-center font-black transition-colors ${
          product.featured ? 'bg-energy text-white hover:bg-[#0f6fc9]' : 'border border-energy/20 bg-white text-foreground hover:bg-[#eef7ff]'
        }`}
      >
        קבל התאמה למסלול
        <ArrowLeft size={18} />
      </a>
    </motion.article>
  );
}

export default function Tracks() {
  const [activeTab, setActiveTab] = useState<TrackTab>('flagship');
  const activeProducts = products.filter((product) => product.tab === activeTab);

  return (
    <section id="tracks" className="relative overflow-hidden bg-gradient-to-b from-white via-[#f7fbff] to-white px-6 pb-32 pt-16 md:px-16 lg:px-24">
      <div className="absolute left-1/2 top-24 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-energy/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 text-sm font-black uppercase tracking-widest text-energy">סולם המוצרים</div>
          <h2 className="font-heading text-5xl font-black tracking-tighter text-foreground md:text-7xl">
            לא רק מחיר. <span className="text-energy">ערך והמשך.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-text-muted">
            כל מוצר בסולם נועד לשלב אחר. מתחילים קטן אם זה נכון, נכנסים לתהליך מלא אם צריך, וממשיכים לתחזוקה רק כשהיא באמת משרתת את התוצאה.
          </p>
        </motion.div>

        <div className="mb-12 flex justify-center">
          <div className="inline-flex rounded-full border border-energy/20 bg-white p-1.5 shadow-[0_18px_55px_rgba(15,42,68,0.08)]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative rounded-full px-5 py-3 text-sm font-black transition-colors md:px-8 ${
                    isActive ? 'text-white' : 'text-text-muted hover:text-foreground'
                  }`}
                >
                  {isActive && <motion.div layoutId="tracksActiveTab" className="absolute inset-0 rounded-full bg-energy" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            {activeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
