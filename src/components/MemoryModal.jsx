import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Sparkles, Heart } from 'lucide-react';

export default function MemoryModal({ memory, onClose }) {
  if (!memory) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/60 backdrop-blur-md">
        {/* Backdrop click to close */}
        <motion.div
          className="absolute inset-0"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Lightbox Content Container */}
        <motion.div
          className="relative bg-white rounded-3xl p-4 sm:p-6 max-w-xl w-full shadow-2xl border-4 border-purple-100 z-10 overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-purple-100 text-purple-700 hover:bg-pink-100 hover:text-pink-700 transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Polaroid Tape Accent */}
          <div className="tape-sticker" />

          {/* Full Resolution Image Frame */}
          <div className="relative overflow-hidden rounded-2xl bg-purple-50 aspect-4/3 mb-4 mt-2 border border-purple-100 shadow-inner">
            <img
              src={memory.image}
              alt={memory.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/memories/memory1.jpg";
              }}
            />
          </div>

          {/* Memory Details */}
          <div className="px-2 pb-2">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center space-x-1 text-xs font-semibold px-3 py-1 bg-pink-100 text-pink-700 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                <span>{memory.date}</span>
              </span>

              {memory.location && (
                <span className="inline-flex items-center space-x-1 text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{memory.location}</span>
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-rounded text-purple-950 mb-2">
              {memory.title} {memory.sticker}
            </h3>

            <p className="font-handwritten text-2xl text-purple-800 leading-relaxed bg-purple-50/50 p-4 rounded-xl border border-purple-100/60">
              "{memory.caption}"
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
