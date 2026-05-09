import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Music2, LogOut } from 'lucide-react';
import { cn } from '../utils/cn';

const mode1Links = [
  { name: 'Gallery', id: 'gallery' },
  { name: 'Message', id: 'memories' }
];

const mode2Links = [
  { name: 'Timeline', id: 'timeline' },
  { name: 'Moments', id: 'moments' },
  { name: 'Message', id: 'future' }
];

export default function Navbar({ mode, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => console.log("Audio play failed:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const links = mode === 'mode1' ? mode1Links : mode2Links;
  const themeColor = mode === 'mode1' ? 'text-luxury-gold' : 'text-antique-gold';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-4" : "py-8"
      )}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className={cn(
          "flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500",
          scrolled ? "glass-card bg-matte-black/40 shadow-2xl" : "bg-transparent"
        )}>

          <button
            onClick={onLogout}
            className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </button>

          <div className="flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-sm tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px transition-all duration-300 group-hover:w-full",
                  mode === 'mode1' ? "bg-luxury-gold" : "bg-antique-gold"
                )} />
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors relative"
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="playing"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                >
                  <Music className={cn("w-4 h-4", themeColor)} />
                </motion.div>
              ) : (
                <motion.div
                  key="paused"
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -90 }}
                >
                  <Music2 className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                </motion.div>
              )}
            </AnimatePresence>
            {isPlaying && (
              <span className={cn(
                "absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping",
                mode === 'mode1' ? "bg-luxury-gold" : "bg-antique-gold"
              )} />
            )}
          </button>
        </div>
      </div>

      {/* Background Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/Little Things (Fairy Version) - oleksandr.mp3.mp3" type="audio/mpeg" />
      </audio>
    </motion.nav>
  );
}
