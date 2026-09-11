import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { playBruhTone } from '../../lib/sound';

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
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // 1. Play comedic sound
    playBruhTone();

    // 2. Screen shake & flash
    setHasTriggeredShake(true);
    setShowFlash(true);
    const flashTimer = setTimeout(() => setShowFlash(false), 450);

    // 3. Confetti burst
    try {
      confetti({
        particleCount: isAppeal ? 90 : 80,
        spread: 80,
        origin: { y: 0.65 },
        colors: isAppeal
          ? ['#00f0ff', '#9d4edd', '#ffe600', '#ffffff']
          : ['#ff2a85', '#9d4edd', '#00f0ff', '#ffe600', '#ff0055']
      });
    } catch (_e) {}

    return () => clearTimeout(flashTimer);
  }, [isAppeal]);

  return (
    <div className={`space-y-5 my-6 relative ${hasTriggeredShake ? "animate-screen-shake" : ""}`}>
      {/* Screen flash overlay */}
      {showFlash && (
        <div className="fixed inset-0 bg-[#ff2a85]/20 pointer-events-none z-50 flash-overlay" />
      )}

      {/* If this is an appeal, show the previous verdict struck through */}
      {isAppeal && originalVerdict && (
        <div className="p-3.5 bg-black/50 border border-red-500/40 rounded-xl mb-3 text-xs font-mono-doc">
          <span className="text-slate-400 uppercase font-bold mr-2">ORIGINAL VERDICT (NULLIFIED):</span>
          <span className="text-slate-400 line-through font-bold">{originalVerdict}</span>
          <span className="ml-2 text-[#ff2a85] font-black">[RATIO'D 💀]</span>
        </div>
      )}

      {/* The Slay/Ratio Verdict Box matching user template */}
      <div className="verdict-box">
        <div className="verdict-tag">
          {isAppeal ? "★ CERTIFIED REVISED APPELLATE FINDING ★" : "★ CERTIFIED UNHINGED FINDING ★"}
        </div>
        <div className="verdict-text">
          {verdict}
        </div>
        <div className="mt-2 text-xs text-[#a5f3fc] font-mono-doc tracking-wide">
          VIBE-CHECK ACCURACY: {confidence.toFixed(1)}% DELULU PROBABILITY
        </div>
      </div>

      {/* Mandatory Advice from your Bestie */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200 leading-relaxed font-chunky">
        <b className="text-[#ffe600] font-mono-doc text-xs tracking-wider uppercase block mb-1">
          MANDATORY ADVICE FROM YOUR BESTIE:
        </b>
        "{recommendedAction}"
      </div>

      {/* Case Officer Signature */}
      {caseOfficer && (
        <div className="flex justify-between items-center text-xs font-mono-doc text-slate-400 pt-1">
          <span>SIGNED: {caseOfficer}</span>
          <span className="text-[#00f0ff] font-bold">[CERTIFIED FORENSICS IN 4K]</span>
        </div>
      )}
    </div>
  );
};
