import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import VSL from '../components/VSL';
import Ingredients from '../components/Ingredients';
import Process from '../components/Process';
import FreeValue from '../components/FreeValue';
import Pathfinder from '../components/Pathfinder';
import Courses from '../components/Courses';
import Tracks from '../components/Tracks';
import AppShowcase from '../components/AppShowcase';
import Testimonials from '../components/Testimonials';
import PainPointGap from '../components/PainPointGap';
import About from '../components/About';
import Seminars from '../components/Seminars';
import Newsletter from '../components/Newsletter';
import FAQ from '../components/FAQ';
import InsuranceBanner from '../components/InsuranceBanner';
import DownloadPopup from '../components/DownloadPopup';
import CoursePopup from '../components/CoursePopup';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import CursorFollower from '../components/CursorFollower';

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
      if (window.scrollY > 800 && !hasScrolledPopupRef.current) {
        hasScrolledPopupRef.current = true;
        window.dispatchEvent(new CustomEvent('open-download', { detail: { resourceName: 'TF Tracker - האפליקציה בחינם' } }));
      }
    };

    window.addEventListener('scroll', handleScroll);

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
            className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
          >
            <div className="w-32 h-32 mb-6 rounded-full bg-energy flex items-center justify-center font-heading font-black text-5xl text-foreground">
              TF
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

      <div className="relative w-full min-h-screen">
        <CursorFollower />
        <DownloadPopup />
        <CoursePopup />
        <div className="noise-overlay"></div>
        <Header />
        <main>
          <Hero />
          <VSL />
          <Ingredients />
          <Process />
          <FreeValue />
          <Pathfinder />
          <Courses />
          <Testimonials />
          <PainPointGap />
          <Tracks />
          <InsuranceBanner />
          <AppShowcase />
          <About />
          <Seminars />
          <Newsletter />
          <FAQ />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
