import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Camera, Mail, Gift, Cake } from 'lucide-react';

export default function NavigationBar({ activeSection, onSelectSection }) {
  const navItems = [
    { id: 'birthday', label: '01 Birthday', icon: Cake },
    { id: 'memories', label: '02 Memories', icon: Camera },
    { id: 'letters', label: '03 Letters', icon: Mail },
    { id: 'little-things', label: '04 Little Things', icon: Heart },
    { id: 'surprise', label: '05 Surprise', icon: Gift }
  ];

  return (
    <div className="sticky top-4 z-40 px-4 max-w-3xl mx-auto mb-8">
      <nav className="glass-card rounded-full p-2 border border-purple-200/80 shadow-lg flex items-center justify-between overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`relative px-3 sm:px-4 py-2 rounded-full font-rounded text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
                isActive
                  ? 'text-white'
                  : 'text-purple-700/70 hover:text-purple-900 hover:bg-purple-50/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-md -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-purple-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
