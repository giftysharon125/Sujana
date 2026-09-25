import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../data/birthdayConfig';

export default function LittleThings({ onNextChapter }) {
  const [openedCards, setOpenedCards] = useState({});

  const toggleCard = (id) => {
    const isFirstTimeOpening = !openedCards[id];
    
    setOpenedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));

    if (isFirstTimeOpening) {
      // Small sparkle burst for discovering a card
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#F472B6', '#C084FC', '#FBBF24']
      });
    }
  };

  const openedCount = Object.values(openedCards).filter(Boolean).length;
  const totalCount = birthdayConfig.littleThings.length;

  return (
    <motion.section
      id="chapter-little-things"
      className="py-12 px-4 max-w-6xl mx-auto relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full font-bold font-rounded text-xs sm:text-sm mb-3">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          <span>CHAPTER 04</span>
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-rounded text-purple-950 mb-3 tracking-tight">
          20 little things that make you YOU ✨
        </h2>

        <p className="text-base sm:text-lg text-purple-700/80 font-medium mb-6">
          Since you're turning 20, here are 20 special things I love about you! Tap each card to unlock the note.
        </p>

        {/* Discovery Progress Bar */}
        <div className="glass-card rounded-2xl p-4 max-w-md mx-auto border border-purple-100 shadow-md">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold font-rounded text-purple-900 mb-2">
            <span>Progress Indicator</span>
            <span className="text-pink-600">
              {openedCount} / {totalCount} Discovered 💖
            </span>
          </div>

          <div className="w-full h-3 bg-purple-100 rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(openedCount / totalCount) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* 20 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {birthdayConfig.littleThings.map((item, idx) => {
          const isOpen = !!openedCards[item.id];
          const cardPhoto = item.image; // Unique photo URL or null (no repeats)

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => toggleCard(item.id)}
              whileHover={{ y: -4 }}
              className={`glass-card rounded-2xl p-5 border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isOpen
                  ? 'bg-gradient-to-b from-white via-pink-50/70 to-purple-50/80 border-pink-300 shadow-xl'
                  : 'hover:border-purple-300 shadow-md'
              }`}
            >
              {/* Card Header Top */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-rounded font-bold text-xs sm:text-sm px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800">
                    {item.number}
                  </span>

                  {/* Render photo only if card has a UNIQUE photo; otherwise render cute sparkle emoji */}
                  {cardPhoto ? (
                    <motion.div
                      className="w-10 h-10 rounded-full border-2 border-pink-300 shadow-sm overflow-hidden bg-purple-50"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <img
                        src={cardPhoto}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ) : (
                    <span className="text-lg">
                      {isOpen ? '💖' : '✨'}
                    </span>
                  )}
                </div>

                <h3 className="font-bold font-rounded text-purple-950 text-base sm:text-lg mb-1">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-purple-700/80 font-medium mb-3">
                  {item.shortDesc}
                </p>
              </div>

              {/* Revealable Full Description & Optional Unique Photo Preview */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-3 border-t border-pink-200/80 space-y-3"
                  >
                    {/* Render unique card photo only if present */}
                    {cardPhoto && (
                      <div className="relative rounded-xl overflow-hidden aspect-4/3 border border-pink-200 shadow-xs bg-purple-50">
                        <img
                          src={cardPhoto}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <p className="font-handwritten text-xl text-purple-900 leading-snug">
                      "{item.fullDesc}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tap Prompt Footer */}
              <div className="mt-4 text-[11px] text-purple-400 font-semibold flex items-center justify-between pt-2 border-t border-purple-100/50">
                <span>{isOpen ? 'Tap to close' : 'Tap to reveal ✨'}</span>
                {isOpen && <Check className="w-3.5 h-3.5 text-pink-500" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Next Chapter Button */}
      <div className="text-center mt-16">
        <motion.button
          onClick={onNextChapter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white font-bold font-rounded text-base sm:text-lg rounded-2xl shadow-xl shadow-purple-200 inline-flex items-center space-x-2 cursor-pointer"
        >
          <span>Open One Last Surprise 💝</span>
          <Sparkles className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.section>
  );
}
