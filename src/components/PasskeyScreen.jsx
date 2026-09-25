import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Delete, Heart } from 'lucide-react';
import { birthdayConfig } from '../data/birthdayConfig';

export default function PasskeyScreen({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [errorState, setErrorState] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const maxDigits = birthdayConfig.passkey.length || 4;

  const handleKeyPress = (digit) => {
    if (isUnlocked || pin.length >= maxDigits) return;
    const newPin = pin + digit;
    setPin(newPin);
    if (errorState) setErrorState(false);

    if (newPin.length === maxDigits) {
      verifyPin(newPin);
    }
  };

  const handleDelete = () => {
    if (isUnlocked || pin.length === 0) return;
    setPin((prev) => prev.slice(0, -1));
    if (errorState) setErrorState(false);
  };

  const handleClear = () => {
    if (isUnlocked) return;
    setPin('');
    if (errorState) setErrorState(false);
  };

  const verifyPin = (enteredPin) => {
    if (enteredPin === birthdayConfig.passkey) {
      setIsUnlocked(true);
      setErrorState(false);

      // Trigger Confetti Explosion
      confetti({
        particleCount: 140,
        spread: 95,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#FB7185', '#C084FC', '#FBBF24', '#60A5FA']
      });

      setTimeout(() => {
        onUnlock();
      }, 1300);
    } else {
      setErrorState(true);
      setTimeout(() => {
        setPin('');
        setErrorState(false);
      }, 750);
    }
  };

  // Listen for physical keyboard input (0-9, Backspace, Delete, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isUnlocked) return;
      if (/^[0-9]$/.test(e.key)) {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape' || e.key === 'Delete') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isUnlocked, errorState]);

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['C', '0', 'DEL']
  ];

  return (
    <motion.div
      className="w-full min-h-screen md:h-screen grid grid-cols-1 md:grid-cols-2 relative z-10 select-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
    >
      {/* ================= LEFT HALF: STRAWBERRY CREAM STRIPED WALLPAPER + SCALLOPED ARTWORK ================= */}
      <div
        className="w-full h-full min-h-[420px] md:min-h-screen relative p-6 sm:p-10 lg:p-16 flex flex-col items-center justify-center overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-pink-200/80"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, #FCE7F3, #FCE7F3 28px, #FFF5F7 28px, #FFF5F7 56px)`
        }}
      >
        {/* Floating Colorful Stars Background Accent */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute top-[10%] left-[8%] text-amber-400 text-3xl sm:text-4xl animate-pulse">★</span>
          <span className="absolute top-[16%] right-[12%] text-pink-400 text-4xl animate-bounce">★</span>
          <span className="absolute bottom-[18%] left-[10%] text-sky-400 text-3xl">★</span>
          <span className="absolute bottom-[12%] right-[10%] text-rose-400 text-4xl animate-pulse">★</span>
          <span className="absolute top-[45%] left-[5%] text-purple-400 text-2xl">★</span>
          <span className="absolute top-[55%] right-[6%] text-amber-500 text-3xl">★</span>
        </div>

        {/* Scalloped Soft Blossom Pink Frame Container */}
        <motion.div
          className="relative z-10 w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center drop-shadow-xl"
          initial={{ scale: 0.9, rotate: -1 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Scalloped Flower SVG Border */}
          <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full text-pink-200/90 drop-shadow-lg">
            <path
              fill="currentColor"
              d="M 150,15 
                 C 165,5 185,5 200,15 C 215,25 230,15 242,30 C 255,45 265,40 275,58 C 285,75 295,85 290,105 C 285,125 298,140 295,160 C 292,180 295,195 285,212 C 275,230 270,245 255,258 C 240,270 225,275 208,285 C 190,295 175,290 155,295 C 135,300 120,290 102,285 C 85,280 70,270 55,258 C 40,245 30,230 20,212 C 10,195 12,180 8,160 C 4,140 15,125 10,105 C 5,85 15,75 25,58 C 35,40 45,45 58,30 C 70,15 85,25 100,15 C 115,5 135,5 150,15 Z"
            />
          </svg>

          {/* Inner White Circle with Artwork */}
          <div className="w-[82%] h-[82%] rounded-full bg-white border-4 border-pink-300 shadow-inner overflow-hidden relative flex items-center justify-center p-3">
            <img
              src="/images/home_left.jpg"
              alt="Friendship Artwork"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                // Fallback vector artwork if user hasn't uploaded a photo yet
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />

            {/* Cute Default Vector Illustration */}
            <div className="w-full h-full flex-col items-center justify-center hidden bg-pink-50/90 rounded-full p-3 text-center">
              <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-56 sm:h-56 mx-auto">
                <g transform="translate(100, 110)">
                  {/* Body */}
                  <ellipse cx="0" cy="20" rx="32" ry="36" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="3" />
                  {/* Head */}
                  <ellipse cx="0" cy="-25" rx="36" ry="32" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="3" />
                  {/* Black Ear */}
                  <path d="M-30,-30 Q-52,-10 -36,12 Q-20,0 -25,-25 Z" fill="#4C1D95" />
                  {/* Eye & Nose */}
                  <ellipse cx="10" cy="-28" rx="3.5" ry="5" fill="#4C1D95" />
                  <ellipse cx="25" cy="-22" rx="6" ry="4.5" fill="#4C1D95" />
                  <path d="M10,-15 Q20,-10 24,-18" fill="none" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Flower Bouquet */}
                  <g transform="translate(-10, -10)">
                    <circle cx="-10" cy="-20" r="14" fill="#FB7185" />
                    <circle cx="10" cy="-30" r="16" fill="#C084FC" />
                    <circle cx="5" cy="-10" r="14" fill="#FBBF24" />
                    <path d="M-20,10 L0,35 M10,10 L0,35 M0,0 L0,35" stroke="#15803D" strokeWidth="3.5" />
                  </g>
                  {/* Woodstock bird on head */}
                  <path d="M-5,-65 C-15,-75 5,-75 0,-60 Z" fill="#FBBF24" stroke="#4C1D95" strokeWidth="2" />
                  <circle cx="-3" cy="-63" r="1.5" fill="#4C1D95" />
                </g>
              </svg>
              <span className="font-handwritten text-2xl sm:text-3xl font-bold text-pink-900 -mt-3">
                Best Friends Forever 🌸
              </span>
            </div>
          </div>
        </motion.div>

        {/* Wavy Scalloped Paper Divider Edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none hidden md:block">
          <svg viewBox="0 0 40 1000" preserveAspectRatio="none" className="w-full h-full text-pink-200/80 fill-current">
            <path d="M0,0 Q24,25 0,50 Q24,75 0,100 Q24,125 0,150 Q24,175 0,200 Q24,225 0,250 Q24,275 0,300 Q24,325 0,350 Q24,375 0,400 Q24,425 0,450 Q24,475 0,500 Q24,525 0,550 Q24,575 0,600 Q24,625 0,650 Q24,675 0,700 Q24,725 0,750 Q24,775 0,800 Q24,825 0,850 Q24,875 0,900 Q24,925 0,950 Q24,975 0,1000 L40,1000 L40,0 Z" />
          </svg>
        </div>
      </div>

      {/* ================= RIGHT HALF: PERIWINKLE & LAVENDER SUNSET GRADIENT PASSCODE ================= */}
      <div className="w-full h-full min-h-[450px] md:min-h-screen bg-gradient-to-br from-[#E0E7FF] via-[#F3E8FF] to-[#FCE7F3] p-6 sm:p-10 lg:p-16 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Header */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-rounded text-indigo-950 mb-8 tracking-wide drop-shadow-xs text-center"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Enter a passcode
        </motion.h2>

        {/* 4 PIN Digit Boxes */}
        <motion.div
          className="flex items-center justify-center space-x-3 sm:space-x-5 mb-8 sm:mb-10"
          animate={errorState ? { x: [-14, 14, -12, 12, -6, 6, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {Array.from({ length: maxDigits }).map((_, idx) => {
            const char = pin[idx];
            const isFilled = char !== undefined;

            return (
              <div
                key={idx}
                className={`w-14 h-16 sm:w-18 sm:h-20 rounded-2xl border-2 flex items-center justify-center shadow-md transition-all duration-200 ${
                  errorState
                    ? 'bg-rose-100/95 border-rose-500 text-rose-600'
                    : isFilled
                    ? 'bg-white border-pink-400 text-purple-950 shadow-lg scale-105'
                    : 'bg-white/70 border-indigo-200/80 text-transparent'
                }`}
              >
                {isFilled ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-3xl sm:text-4xl font-black font-rounded text-purple-950"
                  >
                    {char}
                  </motion.span>
                ) : (
                  <span className="w-3 h-3 rounded-full bg-pink-300/60" />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Error Shake Alert */}
        <div className="h-8 mb-3 flex items-center justify-center">
          {errorState && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs sm:text-sm font-bold text-rose-700 bg-rose-100/90 px-4 py-1.5 rounded-full border border-rose-300 shadow-xs"
            >
              Wrong passcode! Try 2609 😤
            </motion.span>
          )}
        </div>

        {/* 3x4 Round Keypad Grid */}
        <div className="w-full max-w-sm grid grid-cols-3 gap-3 sm:gap-5">
          {keypadNumbers.map((row, rIdx) =>
            row.map((btn, cIdx) => {
              const isAction = btn === 'C' || btn === 'DEL';

              return (
                <motion.button
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => {
                    if (btn === 'DEL') handleDelete();
                    else if (btn === 'C') handleClear();
                    else handleKeyPress(btn);
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className={`h-16 sm:h-20 rounded-full font-bold font-rounded text-2xl sm:text-3xl shadow-md border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    isAction
                      ? 'bg-pink-100/90 text-pink-800 border-pink-300/80 hover:bg-pink-200'
                      : 'bg-white text-purple-950 border-purple-200 hover:bg-pink-50 hover:shadow-xl'
                  }`}
                >
                  {btn === 'DEL' ? (
                    <Delete className="w-7 h-7 sm:w-8 sm:h-8 text-pink-800" />
                  ) : btn === 'C' ? (
                    <span className="text-sm sm:text-base font-extrabold text-pink-700">Clear</span>
                  ) : (
                    <span className="underline decoration-pink-300 underline-offset-4 decoration-2">
                      {btn}
                    </span>
                  )}
                </motion.button>
              );
            })
          )}
        </div>

        {/* Security Footer Accent */}
        <div className="mt-8 flex items-center justify-center space-x-1.5 text-xs sm:text-sm font-bold text-purple-800/80">
          <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
          <span>Passcode: 2609</span>
        </div>

      </div>

    </motion.div>
  );
}
