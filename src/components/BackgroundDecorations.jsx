import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundDecorations({ dark = false }) {
  // Generate static positions for floating hearts and stars
  const hearts = [
    { top: '10%', left: '5%', size: 'text-2xl', delay: 0 },
    { top: '25%', left: '90%', size: 'text-3xl', delay: 1 },
    { top: '60%', left: '8%', size: 'text-xl', delay: 2 },
    { top: '75%', left: '88%', size: 'text-2xl', delay: 0.5 },
    { top: '40%', left: '95%', size: 'text-lg', delay: 1.5 },
    { top: '85%', left: '4%', size: 'text-2xl', delay: 2.5 }
  ];

  const stars = [
    { top: '15%', left: '85%', size: 'text-xl', delay: 0.2 },
    { top: '35%', left: '12%', size: 'text-2xl', delay: 1.2 },
    { top: '65%', left: '92%', size: 'text-lg', delay: 2.2 },
    { top: '80%', left: '15%', size: 'text-2xl', delay: 0.8 },
    { top: '5%', left: '50%', size: 'text-xl', delay: 1.8 }
  ];

  const balloons = [
    { left: '3%', color: 'from-pink-300 to-pink-400', duration: 18, delay: 0 },
    { left: '15%', color: 'from-purple-300 to-indigo-300', duration: 22, delay: 4 },
    { left: '82%', color: 'from-amber-200 to-pink-300', duration: 20, delay: 2 },
    { left: '94%', color: 'from-blue-200 to-sky-300', duration: 24, delay: 6 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Ambient Radial Gradient Orbs */}
      <div
        className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-40 transition-colors duration-1000 ${
          dark ? 'bg-purple-900/50' : 'bg-purple-200'
        }`}
      />
      <div
        className={`absolute bottom-10 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-40 transition-colors duration-1000 ${
          dark ? 'bg-pink-900/40' : 'bg-pink-200'
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 transition-colors duration-1000 ${
          dark ? 'bg-indigo-950/60' : 'bg-blue-100'
        }`}
      />

      {/* Floating Hearts */}
      {hearts.map((h, i) => (
        <motion.div
          key={`heart-${i}`}
          className={`absolute ${h.size} ${dark ? 'opacity-30' : 'opacity-60'}`}
          style={{ top: h.top, left: h.left }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: h.delay,
            ease: 'easeInOut'
          }}
        >
          {i % 2 === 0 ? '💖' : '🌸'}
        </motion.div>
      ))}

      {/* Floating Sparkles & Stars */}
      {stars.map((s, i) => (
        <motion.div
          key={`star-${i}`}
          className={`absolute ${s.size} ${dark ? 'opacity-70' : 'opacity-60'}`}
          style={{ top: s.top, left: s.left }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 90, 180]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut'
          }}
        >
          {i % 2 === 0 ? '✨' : '⭐'}
        </motion.div>
      ))}

      {/* Slow Rising Balloons */}
      {balloons.map((b, i) => (
        <motion.div
          key={`balloon-${i}`}
          className="absolute bottom-[-120px]"
          style={{ left: b.left }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, 15, -15, 0]
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'linear'
          }}
        >
          <div className="relative flex flex-col items-center opacity-70">
            <div
              className={`w-12 h-16 rounded-full bg-gradient-to-t ${b.color} shadow-sm border border-white/50 flex items-center justify-center`}
            >
              <div className="w-2 h-4 bg-white/40 rounded-full absolute top-2 left-2 blur-[1px]" />
            </div>
            <div className="w-1.5 h-1.5 bg-pink-400 rounded-sm -mt-0.5" />
            <div className="w-0.5 h-16 bg-purple-300/60" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
