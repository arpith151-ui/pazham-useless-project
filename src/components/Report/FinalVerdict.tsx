import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { playBruhTone } from '../../lib/sound';
import { BananaMascot } from '../Mascot/BananaMascot';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface FinalVerdictProps {
  verdict: string;
  confidence: number;
  recommendedAction: string;
  isAppeal?: boolean;
  originalVerdict?: string;
  caseOfficer?: string;
}

export const FinalVerdict: React.FC<FinalVerdictProps> = ({
  verdict,
  confidence,
  recommendedAction,
  isAppeal = false,
  originalVerdict,
  caseOfficer
}) => {
  const [hasTriggeredShake, setHasTriggeredShake] = useState(false);

  useEffect(() => {
    // 1. Play comedic sound
    playBruhTone();

    // 2. Gentle screen shake
    setHasTriggeredShake(true);
    const shakeTimer = setTimeout(() => setHasTriggeredShake(false), 500);

    // 3. Confetti burst with warm punchy colors
    try {
      confetti({
        particleCount: isAppeal ? 75 : 65,
        spread: 75,
        origin: { y: 0.65 },
        colors: isAppeal
          ? ['#FFB800', '#FF5E57', '#FF2A85', '#FFFDF9']
          : ['#FF5E57', '#FFB800', '#FF2A85', '#8B5CF6']
      });
    } catch (_e) {}

    return () => clearTimeout(shakeTimer);
  }, [isAppeal]);

  return (
    <div className={`space-y-4 my-6 relative ${hasTriggeredShake ? "animate-screen-shake" : ""}`}>
      {/* If this is an appeal, show the previous verdict struck through */}
      {isAppeal && originalVerdict && (
        <div className="p-3.5 bg-[#FFF0F0] border-2 border-[#FF8080] rounded-2xl mb-3 text-xs font-mono-doc shadow-xs">
          <span className="text-[#8C8275] uppercase font-bold mr-2">ORIGINAL VERDICT (NULLIFIED):</span>
          <span className="text-[#8C8275] line-through font-bold">{originalVerdict}</span>
          <span className="ml-2 text-[#FF5E57] font-black">[RATIO'D 💀]</span>
        </div>
      )}

      {/* Gentle Droplet Landing Squash-and-Stretch Verdict Box */}
      <motion.div
        initial={{ opacity: 0, y: -22, scaleX: 0.88, scaleY: 1.15 }}
        animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 14 }}
        className="relative bg-[#FFFDF9] border-2 border-[#1F1C18] p-5 sm:p-7 rounded-3xl shadow-[4px_5px_0px_#1F1C18] overflow-visible"
      >
        {/* Celebratory Winking Banana Mascot perched in the top-right corner */}
        <div className="absolute -top-12 -right-3 sm:-right-4 z-20">
          <BananaMascot
            mood="wink"
            size={88}
            speechText={isAppeal ? "Aura Restored! 💅" : "No Cap Fr Fr 🍌"}
          />
        </div>

        {/* Verdict Tag */}
        <div className="inline-flex items-center gap-1.5 bg-[#FF5E57] text-white px-3.5 py-1.5 rounded-xl font-heading text-xs uppercase tracking-wider shadow-[2px_2px_0px_#1F1C18] mb-3">
          <Sparkles className="w-3.5 h-3.5 fill-current text-[#FFB800]" />
          <span>{isAppeal ? "★ CERTIFIED REVISED APPELLATE FINDING ★" : "★ CERTIFIED UNHINGED FINDING ★"}</span>
        </div>

        {/* Big Punchy Verdict Text */}
        <div className="font-heading text-2xl sm:text-3xl text-[#1F1C18] leading-snug tracking-normal my-2">
          {verdict}
        </div>

        {/* Confidence pill */}
        <div className="mt-3 inline-block font-mono-doc text-xs text-[#5C5549] bg-[#FAF6EE] border border-[#E6DFD1] px-3 py-1 rounded-xl font-bold">
          VIBE-CHECK ACCURACY: <span className="text-[#FF5E57]">{confidence.toFixed(1)}% DELULU PROBABILITY</span>
        </div>
      </motion.div>

      {/* Mandatory Advice from your Bestie */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="p-4 sm:p-5 rounded-2xl bg-[#FFEED9] border-2 border-[#FFB800] text-sm text-[#1F1C18] leading-relaxed font-chunky shadow-xs"
      >
        <b className="text-[#D97706] font-mono-doc text-xs tracking-wider uppercase block mb-1">
          💅 MANDATORY ADVICE FROM YOUR BESTIE:
        </b>
        "{recommendedAction}"
      </motion.div>

      {/* Case Officer Signature */}
      {caseOfficer && (
        <div className="flex justify-between items-center text-xs font-mono-doc text-[#8C8275] pt-1">
          <span>OFFICER IN CHARGE: <b className="text-[#1F1C18]">{caseOfficer}</b></span>
          <span className="text-[#10B981] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CERTIFIED FORENSICS IN 4K</span>
          </span>
        </div>
      )}
    </div>
  );
};
