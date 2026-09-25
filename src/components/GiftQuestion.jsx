import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Frown, Sparkles, Smile, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GiftQuestion({ onYes }) {
  const [showSulkingModal, setShowSulkingModal] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const handleYes = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#F472B6', '#38BDF8', '#FBBF24', '#C084FC']
    });
    onYes();
  };

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    setShowSulkingModal(true);
  };

  const handleNoHover = () => {
    if (noCount >= 1) {
      // Playful dodge movement after repeated clicks
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 80;
      setNoPos({ x: randomX, y: randomY });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 relative z-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-lg">
        <div className="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl border border-purple-100 text-center relative overflow-hidden">
          {/* Cute Excited Meme GIF Header */}
          <motion.div
            className="w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 p-1 shadow-xl overflow-hidden"
            animate={{ rotate: [0, -3, 3, -3, 0], y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-full h-full bg-white rounded-[20px] overflow-hidden flex items-center justify-center border border-pink-200">
              <img
                src="/images/cute-excited.gif"
                alt="Cute Excited Meme"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://i.pinimg.com/originals/34/67/2d/34672dfab39a6fd2c2b855d099b5171d.gif";
                }}
              />
            </div>
          </motion.div>

          {/* Subtitle Header */}
          <span className="inline-block px-4 py-1.5 bg-pink-100/80 text-pink-700 font-semibold font-rounded text-xs sm:text-sm rounded-full mb-3 shadow-xs">
            Okay... you're in! 🎀
          </span>

          <h2 className="text-xl sm:text-2xl font-medium text-purple-700/80 mb-2">
            But there's one little question...
          </h2>

          <h1 className="text-2xl sm:text-4xl font-bold font-rounded text-purple-950 mb-8 leading-tight">
            Do you want to see your birthday gift? 🎁
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative min-h-[110px]">
            {/* YES BUTTON */}
            <motion.button
              onClick={handleYes}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold font-rounded text-lg rounded-2xl shadow-xl shadow-pink-200/80 flex items-center justify-center space-x-2 cursor-pointer transition-all border border-pink-300"
            >
              <span>YES 💖</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </motion.button>

            {/* NO BUTTON (Playful sulk trigger) */}
            <motion.button
              onClick={handleNoClick}
              onMouseEnter={handleNoHover}
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              whileTap={{ scale: 0.9 }}
              className="w-full sm:w-auto px-6 py-4 bg-purple-100/90 text-purple-700 font-bold font-rounded text-base rounded-2xl border border-purple-200/80 shadow-md hover:bg-purple-200/70 transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>NO 😤</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* SULKING / ANGRY MODAL IF NO IS CLICKED */}
      <AnimatePresence>
        {showSulkingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-purple-950/50 backdrop-blur-md flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border-4 border-pink-300 relative overflow-hidden"
            >
              {/* Uploaded Angry Cat Image */}
              <motion.div
                className="w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-4 rounded-3xl overflow-hidden border-4 border-pink-400 shadow-xl bg-pink-100 flex items-center justify-center"
                animate={{ rotate: [-6, 6, -6, 6, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/images/angry-cat.png"
                  alt="Angry Cat Glare"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-rounded text-pink-700 mb-2 leading-tight">
                HOW DARE YOU SAY NO! 😤
              </h3>

              <p className="text-purple-900 font-bold text-sm sm:text-base mb-6 leading-relaxed">
                You don't get to say no to this one! It's your special day! 🎀
              </p>

              {/* GO BACK Button */}
              <motion.button
                onClick={() => {
                  setShowSulkingModal(false);
                  handleYes();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white font-extrabold font-rounded text-lg rounded-2xl shadow-xl shadow-pink-200 flex items-center justify-center space-x-2 cursor-pointer border border-white/50"
              >
                <span>GO BACK 🥺</span>
                <RotateCcw className="w-5 h-5 ml-1" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
