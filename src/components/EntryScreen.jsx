import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Atmosphere } from './Canvas/Atmosphere';
import { Lock, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

export default function EntryScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '1005') {
      triggerUnlock('mode1');
    } else if (password === '2603') {
      triggerUnlock('mode2');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
      setPassword('');
    }
  };

  const triggerUnlock = (mode) => {
    setIsUnlocking(true);
    setTimeout(() => {
      onUnlock(mode);
    }, 1500); // 1.5s for cinematic exit animation
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-matte-black flex items-center justify-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Atmosphere color="#D4AF37" count={2000} />
        </Canvas>
      </div>

      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-matte-black/50 to-matte-black pointer-events-none" />

      {/* Main Content */}
      <AnimatePresence>
        {!isUnlocking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="z-20 relative flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mb-8 text-center"
            >
              <h1 className="text-3xl md:text-5xl font-cinematic text-cream-highlight mb-4 text-shadow-glow">
                Happiesttt Birthdayyyy!!! <span className="text-luxury-gold">❤️</span>
              </h1>
              <p className="text-white/50 tracking-widest text-sm uppercase">Enter the key to unlock</p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className={cn(
                "glass-card p-8 rounded-2xl w-full max-w-md flex flex-col gap-6 transition-all duration-500",
                error ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]" : "hover:gold-glow-hover"
              )}
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold/50 group-focus-within:text-luxury-gold transition-colors" />
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-center text-xl tracking-[0.5em] text-cream-highlight placeholder:text-white/20 focus:outline-none focus:border-luxury-gold/50 focus:bg-white/10 transition-all gold-glow"
                  autoComplete="off"
                  autoFocus
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400/80 text-sm text-center font-cinematic italic"
                  >
                    Your Day ...
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full relative group overflow-hidden rounded-xl bg-luxury-gold/10 hover:bg-luxury-gold/20 border border-luxury-gold/30 hover:border-luxury-gold py-4 transition-all duration-300 flex items-center justify-center gap-2 text-luxury-gold"
              >
                <span className="tracking-widest uppercase text-sm font-medium">Unlock</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
