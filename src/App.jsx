import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundDecorations from './components/BackgroundDecorations';
import PasskeyScreen from './components/PasskeyScreen';
import GiftQuestion from './components/GiftQuestion';
import BirthdayReveal from './components/BirthdayReveal';
import NavigationBar from './components/NavigationBar';
import MemoryGallery from './components/MemoryGallery';
import LetterSection from './components/LetterSection';
import LittleThings from './components/LittleThings';
import FinalSurprise from './components/FinalSurprise';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  // Stage flow: 'passkey' -> 'question' -> 'main'
  const [currentStage, setCurrentStage] = useState('passkey');
  const [activeSection, setActiveSection] = useState('birthday');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`chapter-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className={`min-h-screen relative transition-colors duration-1000 font-sans selection:bg-pink-200 selection:text-pink-900 ${
        isDarkMode ? 'bg-[#0F0D1C] text-purple-100' : 'bg-[#FAF5FF] text-[#4A4063]'
      }`}
    >
      {/* Background Animated Orbs, Stars & Hearts */}
      <BackgroundDecorations dark={isDarkMode} />

      {/* Floating Audio Toggle Widget */}
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {/* PAGE 1: SECRET PASSKEY PORTAL */}
        {currentStage === 'passkey' && (
          <PasskeyScreen
            key="passkey-screen"
            onUnlock={() => setCurrentStage('question')}
          />
        )}

        {/* PAGE 2: GIFT QUESTION INTERACTIVE GATEWAY */}
        {currentStage === 'question' && (
          <GiftQuestion
            key="gift-question"
            onYes={() => setCurrentStage('main')}
          />
        )}

        {/* MAIN BIRTHDAY SCRAPBOOK EXPERIENCE */}
        {currentStage === 'main' && (
          <motion.div
            key="main-experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 pb-24"
          >
            {/* Sticky Navigation Bar & Progress Indicator */}
            <NavigationBar
              activeSection={activeSection}
              onSelectSection={scrollToSection}
            />

            {/* PAGE 3: BIRTHDAY REVEAL & HERO PHOTO */}
            <BirthdayReveal
              onExploreNext={() => scrollToSection('memories')}
            />

            {/* PAGE 4: OUR MEMORIES POLAROID GALLERY */}
            <MemoryGallery
              onNextChapter={() => scrollToSection('letters')}
            />

            {/* PAGE 5: LETTERS FOR HER */}
            <LetterSection
              onNextChapter={() => scrollToSection('little-things')}
            />

            {/* PAGE 6: 20 LITTLE THINGS ABOUT HER */}
            <LittleThings
              onNextChapter={() => scrollToSection('surprise')}
            />

            {/* PAGE 7: FINAL SURPRISE GRAND CLIMAX */}
            <FinalSurprise
              onToggleDarkMode={(darkState) => setIsDarkMode(darkState)}
            />

            {/* Footer Sign-off */}
            <footer className="text-center py-10 border-t border-purple-200/40 text-xs text-purple-400 font-medium">
              <p>Crafted with endless love & sparkles for your 20th Birthday 🎀✨</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
