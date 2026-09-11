import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DepartmentSeal } from '../DepartmentSeal';
import { RECENT_CASE_HEADLINES } from '../../lib/mockData';
import { BananaMascot } from '../Mascot/BananaMascot';
import { HeartMascot } from '../Mascot/HeartMascot';
import { SquigglyUnderline, HandDrawnSparkle, HandDrawnArrow } from '../Doodles/DoodleAccents';
import { ArrowRight, Sparkles, Flame, Zap } from 'lucide-react';
import { playPop } from '../../lib/sound';

interface LandingProps {
  onFileCase: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onFileCase }) => {
  const [currentHeadlineIdx, setCurrentHeadlineIdx] = useState(0);
  const [bananaSpeech, setBananaSpeech] = useState("Poke me bestie! 🍌");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeadlineIdx((prev) => (prev + 1) % RECENT_CASE_HEADLINES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const headline = RECENT_CASE_HEADLINES[currentHeadlineIdx] || RECENT_CASE_HEADLINES[0];

  const handleStart = () => {
    playPop();
    onFileCase();
  };

  const bananaQuotes = [
    "Poke me bestie! 🍌",
    "Did she really mean 'k'? 🤔",
    "Overthinking at 3am is wild 💀",
    "I'm 96.8% delulu too fr fr ✨",
    "Checking your Snap score rn 👀"
  ];

  const handleBananaClick = () => {
    const nextQuote = bananaQuotes[Math.floor(Math.random() * bananaQuotes.length)];
    setBananaSpeech(nextQuote);
  };

  return (
    <div className="w-full max-w-4xl px-4 py-6 mx-auto flex flex-col items-center text-center relative z-10">
      {/* Top Floating Badge */}
      <motion.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-2.5 mb-5"
      >
        <div className="bg-[#FFE3EC] text-[#FF2A85] border-2 border-[#FF2A85] px-4 py-1.5 rounded-full text-xs font-chunky font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#FF2A85]">
          <Flame className="w-4 h-4 fill-current text-[#FF2A85]" />
          <span>OFFICIAL CHRONICALLY ONLINE BUREAU 🚨</span>
        </div>
        <div className="bg-white border-2 border-[#E6DFD1] text-[#5C5549] px-3.5 py-1.5 rounded-full text-xs font-mono-doc font-bold shadow-[2px_2px_0px_#E6DFD1] hidden sm:flex items-center gap-1">
          <span>AI FORENSICS: RECEIPT INSPECTION READY</span>
        </div>
      </motion.div>

      {/* Main Warm Paper Hero Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="paper-card p-6 sm:p-10 w-full relative overflow-visible mb-6"
      >
        {/* Interactive Banana Mascot in the Corner with Wobble on hover */}
        <div className="absolute -top-10 -right-2 sm:-right-6 z-20">
          <BananaMascot
            size={105}
            speechText={bananaSpeech}
            onClick={handleBananaClick}
          />
        </div>

        {/* Small Heart Mascot perched on the left */}
        <div className="absolute -top-7 -left-3 sm:-left-5 z-20 hidden sm:block">
          <HeartMascot
            damageLevel={30}
            size={68}
            speechText="Ready to vibe ✨"
          />
        </div>

        {/* Central Department Seal */}
        <div className="flex justify-center mb-4">
          <DepartmentSeal size={110} />
        </div>

        {/* Ministry Sub-Header */}
        <div className="font-mono-doc text-xs font-extrabold text-[#FF5E57] tracking-widest uppercase mb-1 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
          <span>GOVERNMENT OF UNHINGED SOCIAL DISCIPLINE</span>
          <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
        </div>

        {/* Primary Title with Playful Chunky Typography */}
        <div className="relative inline-block my-2">
          <h1 className="font-heading text-4xl sm:text-6xl text-[#1F1C18] uppercase tracking-wide">
            PAZHAM — DUI
          </h1>
          <SquigglyUnderline color="#FF5E57" className="w-full h-3 -mt-1 mx-auto" />
        </div>

        <p className="font-chunky text-xl sm:text-2xl text-[#FF5E57] font-bold max-w-xl mx-auto mt-2 mb-3 leading-snug">
          Department of Unnecessary Intelligence 🕵️‍♂️🍌
        </p>

        <p className="font-chunky text-sm sm:text-base text-[#5C5549] max-w-2xl mx-auto mb-8 leading-relaxed">
          Left on read for 42 minutes? She hit you with <span className="bg-[#FFE3EC] text-[#FF2A85] font-bold px-2 py-0.5 rounded-lg border border-[#FF2A85]/30">"k"</span>? Manager sent a passive-aggressive period on Slack? 
          Drop the screenshot receipts. Our forensic banana algorithm will calculate your exact delulu quotient, emotional damage, and whether you are cooked fr fr.
        </p>

        {/* Primary Action Button with Tactile Jelly Spring Motion */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
          {/* Hand drawn little pointer doodle */}
          <div className="absolute -left-12 -bottom-2 hidden lg:flex items-center gap-1 font-doodle text-base text-[#FF2A85] font-bold rotate-[-12deg]">
            <span>Click here bestie</span>
            <HandDrawnArrow color="#FF2A85" className="w-6 h-6 rotate-45" />
          </div>

          <motion.button
            id="file-case-landing-btn"
            type="button"
            onClick={handleStart}
            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 12 } }}
            whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 12 } }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 btn-punchy-coral text-white font-heading text-lg sm:text-xl uppercase tracking-wider px-10 py-5 rounded-2xl cursor-pointer transition-all shadow-xl"
          >
            <span>FILE A GRIEVANCE // ROAST ME 🚨</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        </div>
      </motion.div>

      {/* Rotating Ticker of Recent Cases - Warm Paper Style */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full bg-white border-2 border-[#E6DFD1] p-3.5 rounded-2xl flex flex-col sm:flex-row items-center gap-3 shadow-[2px_3px_0px_#E6DFD1]"
      >
        <div className="flex items-center gap-1.5 bg-[#FFB800] text-[#1F1C18] px-3 py-1 rounded-xl font-heading text-xs uppercase tracking-wider shrink-0 border border-[#1F1C18]">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>BREAKING WIRE</span>
        </div>

        <div className="flex-1 overflow-hidden w-full text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={headline.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="font-chunky text-xs sm:text-sm text-[#1F1C18] flex items-center gap-2 truncate"
            >
              <span className="font-mono-doc font-bold text-[#FF5E57] shrink-0">
                [{headline.id}]
              </span>
              <span className="truncate font-semibold">{headline.text}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="font-mono-doc text-[11px] text-[#8C8275] shrink-0 hidden md:block">
          STATUS: UNHINGED OVERTHINKING TELEMETRY
        </div>
      </motion.div>
    </div>
  );
};
