import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Cake, PartyPopper, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../data/birthdayConfig';

export default function BirthdayReveal({ onExploreNext }) {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#C084FC', '#FBBF24', '#60A5FA', '#34D399']
    });
  };

  return (
    <motion.section
      id="chapter-birthday"
      className="min-h-screen pt-12 pb-20 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Date & Birthday Badge */}
      <motion.div
        className="inline-flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border border-purple-200/80 rounded-full shadow-sm mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Calendar className="w-4 h-4 text-purple-600" />
        <span className="font-bold text-xs sm:text-sm text-purple-900 tracking-wide font-rounded">
          {birthdayConfig.birthday} • Turning {birthdayConfig.age} ✨
        </span>
      </motion.div>

      {/* Main Dramatic Headline */}
      <motion.h1
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-rounded text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 tracking-tight leading-tight mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Happy 20th Birthday! 🎂✨
      </motion.h1>

      <motion.p
        className="text-lg sm:text-2xl font-medium text-purple-800/80 max-w-2xl mb-10 leading-relaxed font-rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {birthdayConfig.heroGreeting}
      </motion.p>

      {/* Hero Best Friend Polaroid Frame */}
      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {/* Tape sticker effect */}
        <div className="tape-sticker" />

        {/* Polaroid frame container */}
        <div className="polaroid-shadow bg-white p-4 sm:p-6 rounded-2xl border border-purple-100 max-w-xs sm:max-w-md mx-auto transition-transform hover:scale-[1.02] duration-300">
          <div className="relative overflow-hidden rounded-xl bg-purple-50 aspect-4/5 flex items-center justify-center border border-purple-100 shadow-inner">
            <img
              src={birthdayConfig.friendPhoto}
              alt={birthdayConfig.friendName}
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                // Fallback SVG if image not found
                e.target.onerror = null;
                e.target.src = "/images/bestfriend.jpg";
              }}
            />
            {/* Subtle overlay shimmer */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="pt-4 text-center">
            <h3 className="font-handwritten text-3xl text-purple-900 font-bold tracking-wide">
              {birthdayConfig.friendName} • The Birthday Queen 👑
            </h3>
            <p className="text-xs text-purple-500 font-medium tracking-wider uppercase mt-1">
              September 26, 2026
            </p>
          </div>
        </div>

        {/* Decorative Floating Badges Around Photo */}
        <motion.div
          className="absolute -top-4 -right-4 bg-pink-100 border border-pink-300 text-pink-700 p-3 rounded-full shadow-lg text-lg"
          animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          💖
        </motion.div>
        <motion.div
          className="absolute -bottom-4 -left-4 bg-purple-100 border border-purple-300 text-purple-700 p-3 rounded-full shadow-lg text-lg"
          animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✨
        </motion.div>
      </motion.div>

      {/* Interactive Birthday Cake & Blow Candle Feature */}
      <motion.div
        className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border border-purple-100 mb-12 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-2 text-pink-600 mb-3">
          <Cake className="w-6 h-6" />
          <h3 className="font-bold font-rounded text-lg sm:text-xl text-purple-950">
            Make a Wish! 🕯️
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-purple-700/80 mb-5">
          {candlesBlown
            ? "Your wish has been sent to the universe! ✨ May all your dreams come true!"
            : "Tap the cake below to blow out your 20th birthday candles!"}
        </p>

        {/* Cake Candle SVG Interactive Button */}
        <motion.button
          onClick={handleBlowCandles}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex flex-col items-center justify-center cursor-pointer p-4 bg-purple-50/80 hover:bg-pink-50 rounded-2xl border border-purple-100 transition-colors w-full"
        >
          {/* Flame indicator */}
          <div className="flex space-x-3 mb-1">
            {[1, 2, 3].map((c) => (
              <div key={c} className="flex flex-col items-center">
                {!candlesBlown ? (
                  <motion.div
                    className="w-3 h-4 bg-amber-400 rounded-full blur-[1px] border border-amber-300 shadow-amber-300 shadow-md"
                    animate={{ scale: [1, 1.3, 1], y: [0, -2, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: c * 0.2 }}
                  />
                ) : (
                  <div className="w-2 h-3 bg-gray-300 rounded-full opacity-60" />
                )}
                <div className="w-1.5 h-6 bg-pink-300 rounded-t-xs" />
              </div>
            ))}
          </div>

          <div className="w-32 h-14 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-xl shadow-md flex items-center justify-center border border-white">
            <span className="font-rounded font-bold text-sm text-purple-900">
              {candlesBlown ? "Wish Granted! 💫" : "Blow Candle 🌬️"}
            </span>
          </div>
        </motion.button>
      </motion.div>

      {/* Next Chapter Button */}
      <motion.button
        onClick={onExploreNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white font-bold font-rounded text-base sm:text-lg rounded-2xl shadow-xl shadow-purple-200 flex items-center space-x-2 cursor-pointer"
      >
        <span>Explore Your Memories 📸</span>
        <Sparkles className="w-5 h-5" />
      </motion.button>
    </motion.section>
  );
}
