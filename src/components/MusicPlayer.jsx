import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useSynthFallback, setUseSynthFallback] = useState(false);
  const audioRef = useRef(null);
  const synthTimerRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Gentle music box lullaby notes (C, E, G, B, C5...)
  const melodyNotes = [261.63, 329.63, 392.00, 493.88, 523.25, 493.88, 392.00, 329.63];

  const playSynthMelody = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      let step = 0;
      synthTimerRef.current = setInterval(() => {
        const freq = melodyNotes[step % melodyNotes.length];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.8);

        step++;
      }, 600);
    } catch (e) {
      console.warn("Synth fallback error:", e);
    }
  };

  const stopSynthMelody = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      // Pause
      if (audioRef.current && !useSynthFallback) {
        audioRef.current.pause();
      } else {
        stopSynthMelody();
      }
      setIsPlaying(false);
    } else {
      // Play
      if (audioRef.current && !useSynthFallback) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Fallback to Web Audio synth if audio file missing or blocked
            setUseSynthFallback(true);
            playSynthMelody();
            setIsPlaying(true);
          });
      } else {
        playSynthMelody();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopSynthMelody();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio
        ref={audioRef}
        src="/music/birthday-song.mp3"
        loop
        onError={() => setUseSynthFallback(true)}
      />

      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-3 rounded-full font-rounded font-bold text-xs sm:text-sm shadow-xl flex items-center space-x-2 backdrop-blur-md border transition-all cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-pink-300 shadow-pink-200'
            : 'bg-white/90 text-purple-800 border-purple-200 hover:bg-purple-50 shadow-purple-100'
        }`}
      >
        {isPlaying ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Disc className="w-4 h-4 text-white" />
            </motion.div>
            <span>🎵 Music On</span>
            <Volume2 className="w-4 h-4" />
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-purple-500" />
            <span>🎵 Music Off</span>
            <VolumeX className="w-4 h-4 text-purple-400" />
          </>
        )}
      </motion.button>
    </div>
  );
}
