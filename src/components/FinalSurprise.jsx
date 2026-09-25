import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, Star, RotateCcw, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../data/birthdayConfig';

export default function FinalSurprise({ onToggleDarkMode }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleOpenFinalSurprise = () => {
    setIsRevealed(true);
    if (onToggleDarkMode) {
      onToggleDarkMode(true);
    }

    // Grand celebration confetti burst (multiple waves)
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F472B6', '#C084FC', '#FBBF24', '#38BDF8']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F472B6', '#C084FC', '#FBBF24', '#38BDF8']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <motion.section
      id="chapter-surprise"
      className="py-16 px-4 max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center text-center relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          /* UNOPENED STATE */
          <motion.div
            key="unopened"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl"
          >
            <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-pink-100 text-pink-700 rounded-full font-bold font-rounded text-xs sm:text-sm mb-4">
              <Gift className="w-4 h-4 text-purple-600" />
              <span>CHAPTER 05 • THE GRAND FINALE</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-rounded text-purple-950 mb-3 tracking-tight">
              And finally... 🎀
            </h2>

            <p className="text-lg sm:text-2xl font-medium text-purple-800/80 mb-10 leading-relaxed font-rounded">
              There's one more thing I want you to know.
            </p>

            {/* Glowing Big Gift Box Button */}
            <motion.button
              onClick={handleOpenFinalSurprise}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 10px 30px rgba(244, 114, 182, 0.4)',
                  '0 15px 40px rgba(192, 132, 252, 0.6)',
                  '0 10px 30px rgba(244, 114, 182, 0.4)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="px-10 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-extrabold font-rounded text-xl sm:text-2xl rounded-3xl cursor-pointer flex items-center justify-center space-x-3 mx-auto border-2 border-white/40"
            >
              <span>Open Your Final Surprise 💝</span>
              <Sparkles className="w-7 h-7 animate-spin" />
            </motion.button>
          </motion.div>
        ) : (
          /* REVEALED GRAND SURPRISE LETTER */
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-2xl"
          >
            {/* Atmospheric Glassmorphism Grand Card */}
            <div className="glass-card-dark rounded-3xl p-8 sm:p-12 text-center text-white border border-purple-300/30 shadow-2xl relative overflow-hidden">
              {/* Floating Sparkle Elements */}
              <div className="absolute top-4 left-4 text-2xl animate-bounce">✨</div>
              <div className="absolute top-4 right-4 text-2xl animate-pulse">💖</div>
              <div className="absolute bottom-4 left-4 text-2xl animate-pulse">🌟</div>
              <div className="absolute bottom-4 right-4 text-2xl animate-bounce">🎀</div>

              {/* Heart Badge Header */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center shadow-lg border-2 border-white/40">
                <Heart className="w-10 h-10 fill-white text-white" />
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-5xl font-extrabold font-rounded text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-100 to-pink-300 mb-6">
                {birthdayConfig.finalMessage.title.replace("[NAME]", birthdayConfig.friendName)}
              </h2>

              {/* Body Paragraphs */}
              <div className="space-y-6 text-purple-100/90 text-base sm:text-lg font-medium leading-relaxed mb-8">
                {birthdayConfig.finalMessage.bodyParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Closing Sign-off */}
              <div className="pt-6 border-t border-purple-500/30 font-handwritten text-3xl sm:text-4xl text-pink-300 font-bold whitespace-pre-line">
                {birthdayConfig.finalMessage.closing}
              </div>

              {/* Replay Option */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => {
                    setIsRevealed(false);
                    if (onToggleDarkMode) onToggleDarkMode(false);
                  }}
                  className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold font-rounded text-purple-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Final Surprise</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
