import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Calendar, Sparkles, Heart, Eye } from 'lucide-react';
import { birthdayConfig } from '../data/birthdayConfig';
import MemoryModal from './MemoryModal';

export default function MemoryGallery({ onNextChapter }) {
  const [selectedMemory, setSelectedMemory] = useState(null);

  // Slight alternating rotations for organic polaroid scrapbook feel
  const rotations = [-2, 2.5, -3, 1.5, -1.5, 3];

  return (
    <motion.section
      id="chapter-memories"
      className="py-12 px-4 max-w-6xl mx-auto relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full font-bold font-rounded text-xs sm:text-sm mb-3">
          <Camera className="w-4 h-4 text-pink-500" />
          <span>CHAPTER 02</span>
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-rounded text-purple-950 mb-3 tracking-tight">
          Some of my favorite memories with you 💭
        </h2>

        <p className="text-base sm:text-lg text-purple-700/80 font-medium">
          Tap any polaroid photo to open the memory scrapbook entry! ✨
        </p>
      </div>

      {/* Responsive Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {birthdayConfig.memories.map((mem, idx) => {
          const rotation = rotations[idx % rotations.length];

          return (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
              style={{ rotate: `${rotation}deg` }}
              onClick={() => setSelectedMemory(mem)}
              className="group cursor-pointer relative"
            >
              {/* Polaroid Frame */}
              <div className="polaroid-shadow bg-white p-4 pb-6 rounded-2xl border border-purple-100/80 transition-all duration-300 relative overflow-hidden">
                {/* Tape Sticker */}
                <div className="tape-sticker" />

                {/* Photo Thumbnail */}
                <div className="relative overflow-hidden rounded-xl bg-purple-50 aspect-4/3 mb-4 border border-purple-100">
                  <img
                    src={mem.image}
                    alt={mem.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/memories/memory1.jpg";
                    }}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-white/90 text-purple-900 px-4 py-2 rounded-full font-bold font-rounded text-xs flex items-center space-x-1.5 shadow-lg">
                      <Eye className="w-4 h-4 text-pink-500" />
                      <span>View Memory</span>
                    </span>
                  </div>
                </div>

                {/* Polaroid Text & Sticker Accent */}
                <div className="px-2">
                  <div className="flex items-center justify-between text-xs text-purple-400 font-semibold mb-1">
                    <span>{mem.date}</span>
                    <span>{mem.sticker}</span>
                  </div>

                  <h3 className="font-bold font-rounded text-purple-950 text-lg group-hover:text-pink-600 transition-colors line-clamp-1">
                    {mem.title}
                  </h3>

                  <p className="font-handwritten text-xl text-purple-800 line-clamp-2 mt-1 leading-snug">
                    "{mem.caption}"
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Popup Lightbox */}
      <MemoryModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />

      {/* Next Chapter Button */}
      <div className="text-center mt-16">
        <motion.button
          onClick={onNextChapter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold font-rounded text-base sm:text-lg rounded-2xl shadow-xl shadow-purple-200 inline-flex items-center space-x-2 cursor-pointer"
        >
          <span>Read Letters For You 💌</span>
          <Sparkles className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.section>
  );
}
