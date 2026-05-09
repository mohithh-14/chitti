import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Atmosphere } from './Canvas/Atmosphere';
import { cn } from '../utils/cn';

const compliments = [
  "The prettiest smile.",
  "The best among the best",
  "You make ordinary moments magical.",
  "Thank you for existing"
];

const galleryImages = [
  "/IMG-20250829-WA0012.jpg",
  "/IMG_0151.JPG",
  "/IMG-20250829-WA0018.jpg",
  "/IMG-20250829-WA0024.jpg",
  "/IMG-20260222-WA0005.jpg",
  "/IMG_0103.JPG"
];

export default function Mode1() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <div ref={containerRef} className="w-full bg-matte-black relative selection:bg-luxury-gold/30">
      <div className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-60">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Atmosphere color="#F5E6C8" count={1000} size={0.004} />
        </Canvas>
      </div>
      {/* 1. Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative h-screen w-full flex items-center justify-center z-10 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            src="/ChatGPT Image May 4, 2026, 08_33_53 PM.png"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-matte-black/50 to-matte-black" />
        </div>

        <div className="z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="text-4xl md:text-8xl font-cinematic text-cream-highlight mb-6 tracking-wider text-shadow-glow"
          >
            Happiesttt Birthdayyyy!!! <br /> Chitti <span className="text-luxury-gold">❤️</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-white/60 font-sans tracking-[0.3em] uppercase text-sm md:text-base"
          >
            A universe built entirely around you
          </motion.p>
        </div>
      </motion.section>

      {/* 2. Floating Photo Gallery */}
      <section className="relative z-10 py-32 px-4 md:px-12 max-w-7xl mx-auto" id="gallery">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-cinematic text-luxury-gold mb-4">Glimpses of You</h2>
          <div className="w-24 h-px bg-luxury-gold/30 mx-auto" />
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
              className="relative break-inside-avoid glass-card p-3 rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={src}
                  alt="Gallery"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-luxury-gold/0 group-hover:bg-luxury-gold/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Compliment Cards */}
      <section className="relative z-10 py-32 px-4 bg-white/[0.02]" id="About you">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {compliments.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={cn(
                  "glass-card p-12 rounded-2xl flex items-center justify-center text-center",
                  "hover:gold-glow-hover transition-all duration-500",
                  i % 2 === 0 ? "md:mt-16" : ""
                )}
              >
                <p className="text-2xl md:text-4xl font-cinematic text-cream-highlight italic">
                  "{text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Aesthetic Memory */}
      <section className="relative z-10 py-40 px-4" id="memories">
        <div className="max-w-5xl mx-auto relative flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="absolute -inset-4 bg-luxury-gold/20 blur-2xl rounded-full" />
            <img
              src="/IMG_1939.PNG"
              alt="Memory"
              className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/5] z-10"
            />
            {/* Scrapbook polaroid layer */}
            <motion.div
              initial={{ rotate: -10, x: -20 }}
              whileInView={{ rotate: -15, x: -40 }}
              viewport={{ once: true }}
              className="absolute bottom-4 -left-2 md:bottom-10 md:-left-10 w-32 h-40 md:w-48 md:h-56 bg-white p-2 md:p-3 shadow-2xl z-20"
            >
              <div className="w-full h-full bg-gray-200 overflow-hidden">
                <img src="/IMG_1941.PNG" alt="Small Memory" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2 space-y-8 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-6xl font-cinematic text-luxury-gold leading-tight">
              May this day be as<br /> amazing as you.
            </h2>
            <p className="text-cream-highlight/80 text-lg leading-relaxed font-light">
              Happiestt Birthdayyy Chitti 🎉<br />
              Another year added to your story — more memories, more laughter, more little moments that someday will feel like gold dust in the pocket of time.
              May this year bring you peace that stays, happiness that lingers, and people who choose you even on ordinary days. Keep shining the way old lanterns do — quietly, warmly, impossible to ignore.
              Eat cake like rules were invented for other people today.
              Have the kind of birthday that feels like a favorite song playing at the perfect time. 💫
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-32" />
    </div>
  );
}
