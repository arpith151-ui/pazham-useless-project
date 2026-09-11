import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2, Sparkles, Flame } from 'lucide-react';
import { playPop, playCashRegisterDing } from '../../lib/sound';
import { BananaMascot } from '../Mascot/BananaMascot';
import { HeartMascot } from '../Mascot/HeartMascot';

interface ProcessingSequenceProps {
  onComplete: () => void;
  isAppeal?: boolean;
}

const BRAINROT_INVESTIGATION_STEPS = [
  "Summoning Chief Officer Kai 'No Cap' Cenat 🕵️‍♂️",
  "Calculating millisecond pause between 'delivered' and 'read' 💀",
  "Checking if target's Snap score moved while leaving you on delivered 📱",
  "Measuring blue vs grey message bubble disparity ratio 📉",
  "Cross-referencing delulu index with astrology & TikTok charts ✨",
  "Finalizing certified cooked verdict on god fr fr 🔥"
];

const BRAINROT_APPEAL_STEPS = [
  "Convening the Supreme Council of Delusion & Copium 💅",
  "Gaslighting the algorithms into believing you actually ate ✨",
  "Inventing 4 excuses for why their phone died in the trenches 🤡",
  "Calculating maximum aura recovery trajectory 📈",
  "Nullifying lower court verdict for extreme hater behavior 🔨"
];

export const ProcessingSequence: React.FC<ProcessingSequenceProps> = ({
  onComplete,
  isAppeal = false
}) => {
  const steps = isAppeal ? BRAINROT_APPEAL_STEPS : BRAINROT_INVESTIGATION_STEPS;
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSteps((prev) => {
        const next = prev + 1;
        playPop();
        if (next >= steps.length) {
          clearInterval(interval);
          playCashRegisterDing();
          setTimeout(() => {
            onCompleteRef.current();
          }, 450);
          return steps.length;
        }
        return next;
      });
    }, 550);

    return () => clearInterval(interval);
  }, [steps.length]);

  const progressPercent = Math.min(100, Math.round((completedSteps / steps.length) * 100));

  return (
    <div className="w-full max-w-lg px-4 py-8 mx-auto flex flex-col items-center relative z-10">
      {/* Mascots reacting to the investigation in real time */}
      <div className="flex items-center justify-between w-full px-6 mb-2">
        {/* Shocked / Sweating Banana Mascot */}
        <BananaMascot
          mood="shocked"
          size={95}
          speechText={isAppeal ? "Emergency Copium! 💅" : "THE RECEIPTS ARE WILD 💀"}
        />

        {/* Nervous Overthinking Heart */}
        <HeartMascot
          mood="nervous"
          size={64}
          speechText="Heart rate 140 bpm 💓"
        />
      </div>

      {/* Warm Paper Progress Dossier */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full paper-card p-6 sm:p-8 relative overflow-hidden"
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b-2 border-[#E6DFD1] pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5E57] animate-ping" />
            <span className="font-heading text-sm text-[#FF5E57] tracking-wide uppercase">
              {isAppeal ? "APPELLATE COPIUM IN PROGRESS 💅" : "FORENSIC SCAN // DO NOT BLINK 🚨"}
            </span>
          </div>
          <span className="font-mono-doc text-sm font-black text-[#1F1C18] tabular-nums bg-[#FFEED9] px-2.5 py-0.5 rounded-lg border border-[#FFB800]">
            {progressPercent}%
          </span>
        </div>

        {/* Tactile Liquid Progress Bar */}
        <div className="w-full bg-[#EFE9DC] h-4 rounded-full overflow-hidden border border-[#DCD3C1] p-0.5 mb-6">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-[#FFB800] via-[#FF5E57] to-[#FF2A85]"
            initial={{ width: "6%" }}
            animate={{ width: `${Math.max(6, progressPercent)}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          />
        </div>

        {/* Staggered Checklist */}
        <div className="space-y-3 font-chunky text-xs sm:text-sm">
          {steps.map((step, index) => {
            const isDone = index < completedSteps;
            const isCurrent = index === completedSteps;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0.35, x: -6 }}
                animate={{
                  opacity: isDone ? 1 : isCurrent ? 1 : 0.35,
                  x: isCurrent ? 4 : 0,
                  scale: isCurrent ? 1.02 : 1
                }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all border-2 ${
                  isDone
                    ? "bg-[#F0FDF4] border-[#86EFAC] text-[#166534]"
                    : isCurrent
                    ? "bg-[#FFE3EC] border-[#FF2A85] text-[#FF2A85] font-bold shadow-xs"
                    : "border-transparent text-[#8C8275]"
                }`}
              >
                <div className="shrink-0">
                  {isDone ? (
                    <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : isCurrent ? (
                    <Loader2 className="w-6 h-6 text-[#FF2A85] animate-spin" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-[#DCD3C1]" />
                  )}
                </div>

                <span className="leading-snug">{step}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t-2 border-[#E6DFD1] text-center font-mono-doc text-xs text-[#8C8275] flex items-center justify-center gap-1.5">
          <Flame className="w-4 h-4 text-[#FFB800]" />
          <span>OVERTHINKING TELEMETRY BEING LOGGED IN REAL TIME</span>
        </div>
      </motion.div>
    </div>
  );
};
