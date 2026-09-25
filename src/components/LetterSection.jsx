import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../data/birthdayConfig';
import LetterCard from './LetterCard';

export default function LetterSection({ onNextChapter }) {
  return (
    <motion.section
      id="chapter-letters"
      className="py-12 px-4 max-w-4xl mx-auto relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-pink-100 text-pink-700 rounded-full font-bold font-rounded text-xs sm:text-sm mb-3">
          <Mail className="w-4 h-4 text-purple-600" />
          <span>CHAPTER 03</span>
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-rounded text-purple-950 mb-3 tracking-tight">
          Letters I Never Want You To Forget 💌
        </h2>

        <p className="text-base sm:text-lg text-purple-700/80 font-medium">
          Click any envelope to unseal and read the handwritten letter inside!
        </p>
      </div>

      {/* Letters List */}
      <div className="space-y-6">
        {birthdayConfig.letters.map((letter, index) => (
          <LetterCard key={letter.id} letter={letter} index={index} />
        ))}
      </div>

      {/* Next Chapter Button */}
      <div className="text-center mt-16">
        <motion.button
          onClick={onNextChapter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold font-rounded text-base sm:text-lg rounded-2xl shadow-xl shadow-pink-200 inline-flex items-center space-x-2 cursor-pointer"
        >
          <span>Discover 20 Little Things ✨</span>
          <Sparkles className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.section>
  );
}
