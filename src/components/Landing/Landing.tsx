import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DepartmentSeal } from '../DepartmentSeal';
import { RECENT_CASE_HEADLINES } from '../../lib/mockData';
import { FileText, Sparkles, AlertTriangle, ArrowRight, Flame, Skull, Shield, Zap } from 'lucide-react';
import { playPop } from '../../lib/sound';

interface LandingProps {
  onFileCase: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onFileCase }) => {
  const [currentHeadlineIdx, setCurrentHeadlineIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeadlineIdx((prev) => (prev + 1) % RECENT_CASE_HEADLINES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const headline = RECENT_CASE_HEADLINES[currentHeadlineIdx];

  const handleStart = () => {
    playPop();
    onFileCase();
  };

  return (
    <div className="w-full max-w-4xl px-4 py-8 mx-auto flex flex-col items-center text-center">
      {/* Top Floating Brainrot Badges */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-6"
      >
        <div className="bg-linear-to-r from-[#FF007F] to-[#8B5CF6] text-white px-3.5 py-1 rounded-full text-xs font-chunky font-bold flex items-center gap-1.5 neon-glow-pink tracking-wide">
          <Flame className="w-3.5 h-3.5 text-yellow-300" />
          <span>CHRONICALLY ONLINE TASK FORCE 🚨</span>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-mono-doc text-[#00F5FF]">
          AI FORENSICS: MULTIMODAL RECEIPTS READY
        </div>
      </motion.div>

      {/* Main Glassmorphic Hero Container */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="glass-card-hot p-6 sm:p-10 rounded-3xl w-full relative overflow-hidden mb-8"
      >
        {/* Decorative Floating Emojis in Corners */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 left-4 text-3xl select-none opacity-80"
        >
          💀
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [5, -5, 5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 right-4 text-3xl select-none opacity-80"
        >
          💅
        </motion.div>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 left-6 text-2xl select-none opacity-80"
        >
          🤡
        </motion.div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 right-6 text-2xl select-none opacity-80"
        >
          🔥
        </motion.div>

        {/* Central Department Seal with Interactive Animation */}
        <div className="flex justify-center mb-5">
          <DepartmentSeal size={125} />
        </div>

        {/* Ministry Sub-Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono-doc text-xs font-bold text-[#00F5FF] tracking-widest uppercase mb-1 flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF007F]" />
          <span>GOVERNMENT OF UNHINGED SOCIAL DISCIPLINE</span>
          <Sparkles className="w-3.5 h-3.5 text-[#FF007F]" />
        </motion.div>

        {/* Primary Title with TikTok Caption Bold Chunky Font & VHS Glitch */}
        <h1 className="font-heading text-4xl sm:text-6xl text-white uppercase tracking-normal mb-3 glitch-text">
          PAZHAM — DUI
        </h1>

        <p className="font-chunky text-lg sm:text-xl text-[#00F5FF] font-extrabold max-w-xl mx-auto mb-4 leading-snug">
          Department of Unnecessary Intelligence 🕵️‍♂️💀
        </p>

        <p className="font-chunky text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mb-8 leading-relaxed">
          Left on read for 42 minutes? She hit you with <span className="bg-[#FF007F]/30 text-[#FF007F] font-bold px-1.5 py-0.5 rounded-md border border-[#FF007F]/40">"k"</span>? Manager sent a passive-aggressive period on Slack? 
          Drop the receipts. Our AI forensics will calculate your exact delulu quotient, emotional damage, and whether you are cooked on god fr fr.
        </p>

        {/* Primary CTA Button with Loud Neon Styling */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            id="file-case-landing-btn"
            type="button"
            onClick={handleStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-linear-to-r from-[#FF007F] via-[#A855F7] to-[#00F5FF] text-white font-heading text-lg sm:text-xl uppercase tracking-wide px-10 py-5 rounded-2xl neon-glow-pink hover-wiggle cursor-pointer transition-all border border-white/40 shadow-2xl"
          >
            <Skull className="w-6 h-6 text-yellow-300 animate-bounce" />
            <span>FILE A GRIEVANCE // ROAST ME 🚨</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Rotating Ticker of Brainrot Headlines */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full glass-card border border-[#00F5FF]/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3 relative overflow-hidden"
      >
        <div className="flex items-center gap-2 bg-[#FF007F] text-white px-3 py-1 rounded-xl font-heading text-xs uppercase tracking-wider shrink-0 neon-glow-pink">
          <Zap className="w-3.5 h-3.5 fill-current text-yellow-300" />
          <span>BREAKING WIRE</span>
        </div>

        <div className="flex-1 overflow-hidden w-full text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={headline.id}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-chunky text-xs sm:text-sm text-slate-100 flex items-center gap-2 truncate"
            >
              <span className="font-mono-doc font-bold text-[#00F5FF] shrink-0">
                [{headline.id}]
              </span>
              <span className="truncate">{headline.text}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="font-mono-doc text-[10px] text-slate-400 shrink-0 hidden md:block">
          STATUS: UNHINGED OVERTHINKING TELEMETRY
        </div>
      </motion.div>
    </div>
  );
};
