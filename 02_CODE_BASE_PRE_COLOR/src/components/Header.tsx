import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'ראשי', href: '#hero' },
  { name: 'תהליך', href: '#process' },
  { name: 'אפליקציה', href: '#app' },
  { name: 'מסלולים', href: '#tracks' },
  { name: 'ביטוח', href: '#insurance' },
  { name: 'המלצות', href: '#testimonials' },
  { name: 'הרצאות', href: '#seminars' },
  { name: 'שאלות', href: '#faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      let currentSection = 'hero';

      for (const section of links.map((link) => link.href.slice(1))) {
        const element = document.getElementById(section);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSection = section;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 top-5 z-40 mx-auto w-[95%] max-w-6xl rounded-full border px-5 transition-all duration-500 ${
          isScrolled
            ? 'border-energy/20 bg-white/90 py-3 shadow-[0_18px_55px_rgba(15,42,68,0.12)] backdrop-blur-2xl'
            : 'border-transparent bg-white/70 py-4 backdrop-blur-xl'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#hero" className="relative z-50 flex items-center">
            <img src="/tomer-logo.png" alt="תומר פרידמן" className="h-11 object-contain md:h-12" />
          </a>

          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex items-center rounded-full border border-energy/20 p-2 text-foreground md:hidden"
            aria-label="פתח תפריט"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-3 py-2 text-sm font-bold transition-colors ${
                    isActive ? 'text-foreground' : 'text-text-muted hover:bg-[#edf6ff] hover:text-foreground'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-energy"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full bg-energy px-5 py-2 text-sm font-black text-white shadow-[0_12px_32px_rgba(28,141,255,0.28)] transition-colors hover:bg-[#0f6fc9] md:block"
          >
            צור קשר
          </a>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 flex flex-col gap-5 bg-white/95 px-6 pt-32 backdrop-blur-xl md:hidden"
          >
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-[#dceaf5] pb-4 text-3xl font-black text-foreground"
              >
                {link.name}
              </motion.a>
            ))}
            <a
              href="#tracks"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 rounded-2xl bg-energy py-4 text-center text-xl font-black text-white"
            >
              התאמת מסלול
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
