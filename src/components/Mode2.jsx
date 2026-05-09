import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../utils/cn';

const timelineEvents = [
  { date: "Mar 2024", title: "The First Photo", img: "/Screenshot_2026-03-15-18-24-43-64_1c337646f29875672b5a61192b9010f9.jpg" },
  { date: "Mar 2025", title: "Together", img: "/Snapchat-1808586553 (1).jpg" },
  { date: "Apr 2026", title: "First of US", img: "/IMG_0160.JPG" },
  { date: "Present", title: "Still Falling", img: "/20260507_084454.jpg.jpeg" }
];

const polaroids = [
  { img: "/IMG_0088.JPG", rot: -10, x: -50, y: 20 },
  { img: "/IMG20260404133753.jpg", rot: 15, x: 50, y: -20 },
  { img: "/IMG_1940.PNG", rot: -5, x: 0, y: 50 },
];

export default function Mode2() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  return (
    <div ref={containerRef} className="w-full bg-[#111] relative selection:bg-antique-gold/30">

      {/* Film Grain Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', backgroundRepeat: 'repeat' }} />

      {/* 1. Cinematic Hero */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen w-full flex items-center justify-center z-10 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            src="/IMG20260404133753.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover object-[50%_45%] opacity-40 brightness-75 sepia-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-[#111]" />
        </div>

        <div className="z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            className="text-5xl md:text-8xl font-cinematic text-[#F5E6C8] mb-6 tracking-widest drop-shadow-2xl"
          >
            Our Story <span className="text-antique-gold">❤️</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="text-white/50 font-sans tracking-[0.4em] uppercase text-sm md:text-base"
          >
            A cinematic journey through us
          </motion.p>
        </div>
      </motion.section>

      {/* 2. Interactive Timeline */}
      <section className="relative z-10 py-32 px-4 max-w-4xl mx-auto" id="timeline">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-cinematic text-antique-gold mb-4">Chapters</h2>
          <div className="w-16 h-px bg-antique-gold/30 mx-auto" />
        </motion.div>

        <div className="relative max-w-5xl mx-auto space-y-24">
          {/* Vertical Timeline Line */}
          <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-px bg-gradient-to-b from-transparent via-antique-gold/30 to-transparent -translate-x-1/2" />

          {timelineEvents.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
              className={cn(
                "relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 pl-14 md:pl-0",
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-8 md:top-1/2 md:-translate-y-1/2 w-[12px] h-[12px] rounded-full bg-antique-gold shadow-[0_0_15px_#8B6F47] z-10" />

              <div className={cn("w-full md:w-[45%]", i % 2 === 0 ? "md:text-right" : "md:text-left")}>
                <p className="text-antique-gold/70 font-sans tracking-widest text-sm mb-2">{event.date}</p>
                <h3 className="text-2xl md:text-4xl font-cinematic text-[#F5E6C8] mb-4">{event.title}</h3>
              </div>

              <div className="w-full md:w-[45%] group z-10">
                <div className="overflow-hidden rounded-xl aspect-[4/5] border border-white/5 relative shadow-2xl">
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover sepia-[0.2] transition-transform duration-700 group-hover:scale-105 group-hover:sepia-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Polaroid Memory Wall */}
      <section className="relative z-10 py-40 px-4 overflow-hidden" id="moments">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-[10vw] md:text-[8vw] font-cinematic text-white/5 whitespace-nowrap select-none pointer-events-none">
              MOMENTS
            </h2>
          </div>

          <div className="relative w-full max-w-2xl aspect-square md:aspect-video flex items-center justify-center">
            {polaroids.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100, rotate: 0 }}
                whileInView={{ opacity: 1, y: p.y, x: p.x, rotate: p.rot }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: i * 0.2 }}
                whileHover={{ scale: 1.1, zIndex: 40, rotate: 0 }}
                className="absolute bg-white p-2 md:p-4 shadow-2xl rounded-sm cursor-pointer transition-colors hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 w-[150px] h-[180px] md:w-[220px] md:h-[260px]"
              >
                <div className="w-full h-[80%] bg-gray-200 overflow-hidden relative">
                  <img src={p.img} alt="Polaroid" className="w-full h-full object-cover sepia-[0.3]" />
                </div>
                <div className="w-full h-[20%] flex items-center justify-center">
                  <p className="font-cinematic text-gray-800 text-sm italic">Forever</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Future Dreams */}
      <section className="relative z-10 py-32 px-4 bg-black/50 border-t border-white/5" id="future">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-cinematic text-[#F5E6C8]"
          >
            Happiesttt Birthdayyy Chitti 🎉❤️
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="glass-card p-8 md:p-16 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-antique-gold/5 group-hover:bg-antique-gold/10 transition-colors duration-500" />
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed relative z-10">
              Happiesttt Birthdayyy Bangaram😘❤️.<br />
              You are the person who just lits up my heart effortlessly and make me get lost in my own la la land. Before you i had a huge bucket list but ever since you came it's just been entirely about you I just can't stop thinking about you and missing you. I wish for you to be always happy and smiling beacause the pretty smile of yours means everything to me.<br />
              Today is sooo special too me as idiii ni day and on this day i promise that i will always stay by your side and always support you and try to keep you happy. You are too precious to me and someone I can't lose tooo. Sorry for the days u felt like nen ninu ardam chskotle or the days u were hurt by me. Sorry for the times nen overthink chsi or nen hurt chshnavi but those were just me being scared of losing you. I am very greatful to have youu on my side and i really wish by some wonder we don't drift apart i want to stay with uh forever.
              <br />
              I want you to always be happy and may everything you wish for come to youu
              <br />
              I Love Youu❤️
              <br />
              Thank you for letting me be a part of your life
              <br />
              Once again Happiest Birthdayyyy ❤️
            </p>
          </motion.div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}