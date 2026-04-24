import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function VSL() {
  return (
    <section className="relative z-20 overflow-hidden bg-white px-6 py-20 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glowing border effect */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-energy to-[#5fb8ff] opacity-20 blur-xl md:rounded-[2rem]"></div>

          <div className="group relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-energy/10 bg-white shadow-[0_24px_75px_rgba(15,42,68,0.12)] md:rounded-[2rem]">
            {/* Fallback / Placeholder Image */}
            <img
              src="/tomer-suitcase-photo.jpeg"
              alt="Tomer Fridman VSL"
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a44]/70 via-[#0f2a44]/10 to-transparent"></div>

            {/* Play Button */}
            <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-energy/90 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(28,141,255,0.5)]">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-2" fill="currentColor" />
            </div>

            {/* VSL Text Overlay */}
            <div className="absolute bottom-6 md:bottom-10 left-0 right-0 text-center z-10">
              <p className="font-heading font-bold text-xl md:text-3xl text-white tracking-widest drop-shadow-md">
                צפה כיצד השיטה עובדת
              </p>
              <p className="text-white/60 text-sm mt-2">4:32 דקות שעשויות לשנות את חייך</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
