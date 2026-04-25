import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import VSL from '../components/VSL';
import Process from '../components/Process';
import Pathfinder from '../components/Pathfinder';
import Tracks from '../components/Tracks';
import AppShowcase from '../components/AppShowcase';
import Testimonials from '../components/Testimonials';
import Commitment from '../components/Commitment';
import Seminars from '../components/Seminars';
import Newsletter from '../components/Newsletter';
import FAQ from '../components/FAQ';
import InsuranceBanner from '../components/InsuranceBanner';
import DownloadPopup from '../components/DownloadPopup';
import CoursePopup from '../components/CoursePopup';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import CursorFollower from '../components/CursorFollower';
import GeminiAgentPopup from '../components/GeminiAgentPopup';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const hasScrolledPopupRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return p + Math.floor(Math.random() * 10) + 5;
      });
    }, 50);

    const handleScroll = () => {
      const skipPopup = new URLSearchParams(window.location.search).get('skip_popup') === 'true';
      if (!skipPopup && window.scrollY > 800 && !hasScrolledPopupRef.current) {
        hasScrolledPopupRef.current = true;
        window.dispatchEvent(new CustomEvent('open-download', { detail: { resourceName: 'TF Tracker - התאמת מסלול ראשונית' } }));
      }
    };

    window.addEventListener('scroll', handleScroll);

    const params = new URLSearchParams(window.location.search);
    const shouldOpenPopup = params.get('open_popup') === 'true' || params.get('popup') === 'true';
    if (shouldOpenPopup) {
      window.setTimeout(() => {
        hasScrolledPopupRef.current = true;
        window.dispatchEvent(new CustomEvent('open-download', { detail: { resourceName: 'TF Tracker - התאמת מסלול ראשונית' } }));
      }, 1200);
    }

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-white via-[#f4f9ff] to-[#e8f4ff] flex flex-col items-center justify-center"
          >
            <div className="w-32 h-32 mb-6 rounded-[2rem] bg-white border border-energy/20 shadow-[0_24px_70px_rgba(28,141,255,0.18)] flex items-center justify-center overflow-hidden">
              <img src="/tomer-logo.png" alt="תומר פרידמן" className="h-24 w-24 object-contain" />
            </div>
            <div className="w-48 h-1 bg-foreground/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-energy"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="mt-4 text-text-muted font-mono text-sm tracking-widest">{progress}%</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full min-h-screen" dir="rtl">
        <CursorFollower />
        <DownloadPopup />
        <CoursePopup />
        <GeminiAgentPopup />
        <div className="noise-overlay"></div>
        <Header />
        <main>
          <Hero />
          <Process />
          <VSL />
          <AppShowcase />
          <Pathfinder />
          <Tracks />
          <Commitment />
          <InsuranceBanner />
          <Testimonials />
          <Seminars />
          <FAQ />
          <Newsletter />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
