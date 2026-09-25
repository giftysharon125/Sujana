import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, ChevronDown, Calendar, CheckCircle2 } from 'lucide-react';

export default function LetterCard({ letter, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="w-full"
    >
      <div className="glass-card rounded-3xl border border-purple-100 shadow-xl overflow-hidden transition-all duration-300">
        {/* Envelope Top Header Bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-6 text-left flex items-center justify-between cursor-pointer transition-colors duration-300 ${
            isOpen ? 'bg-pink-50/80 border-b border-purple-100' : 'hover:bg-purple-50/50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <motion.div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-colors ${
                isOpen
                  ? 'bg-gradient-to-tr from-pink-500 to-purple-500'
                  : 'bg-gradient-to-tr from-purple-400 to-indigo-400'
              }`}
              animate={isOpen ? { rotate: [0, -10, 10, 0] } : {}}
            >
              <Mail className="w-6 h-6" />
            </motion.div>

            <div>
              <span className="text-xs font-bold text-pink-600 font-rounded uppercase tracking-wider block">
                {letter.subtitle || `Letter #${index + 1}`}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-rounded text-purple-950">
                {letter.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-block text-xs text-purple-500 font-medium">
              {isOpen ? 'Close Letter' : 'Tap to Open'}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-full bg-white/80 border border-purple-100 text-purple-600 shadow-xs"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>
        </button>

        {/* Unfolding Lined Paper Letter Body */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-6 sm:p-10 lined-paper border-t border-purple-100 relative">
                {/* Stamp & Date Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-purple-200/60">
                  <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-purple-600">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{letter.date}</span>
                  </span>
                  <div className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded-md uppercase tracking-wider border border-pink-200">
                    SEALED WITH LOVE 💖
                  </div>
                </div>

                {/* Handwritten Content */}
                <div className="space-y-4">
                  {letter.content.split('\n\n').map((para, idx) => (
                    <p
                      key={idx}
                      className="font-handwritten text-2xl sm:text-3xl text-purple-950 leading-relaxed tracking-wide"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Wax Seal Decorative Badge */}
                <div className="mt-8 pt-4 flex justify-end">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-600 to-purple-700 text-white flex items-center justify-center shadow-lg font-handwritten font-bold text-xl border-2 border-white">
                    💌
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
