import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import EntryScreen from './components/EntryScreen';
import Mode1 from './components/Mode1';
import Mode2 from './components/Mode2';
import Navbar from './components/Navbar';

export default function App() {
  const [activeMode, setActiveMode] = useState('entry'); // 'entry', 'mode1', 'mode2'

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleUnlock = (mode) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveMode(mode);
  };

  const handleLogout = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveMode('entry');
  };

  return (
    <div className="bg-matte-black min-h-screen text-cream-highlight font-sans antialiased overflow-hidden">
      
      {activeMode !== 'entry' && (
        <Navbar mode={activeMode} onLogout={handleLogout} />
      )}

      <AnimatePresence mode="wait">
        {activeMode === 'entry' && (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: 'easeInOut' } }}
            className="w-full h-full"
          >
            <EntryScreen onUnlock={handleUnlock} />
          </motion.div>
        )}

        {activeMode === 'mode1' && (
          <motion.div
            key="mode1"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Mode1 />
          </motion.div>
        )}

        {activeMode === 'mode2' && (
          <motion.div
            key="mode2"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Mode2 />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
