import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2, Flame, Sparkles } from 'lucide-react';
import { playPop, playCashRegisterDing } from '../../lib/sound';

interface ProcessingSequenceProps {
  onComplete: () => void;
  isAppeal?: boolean;
}

const BRAINROT_INVESTIGATION_STEPS = [
  "Summoning Chief Officer Kai 'No Cap' Cenat 🕵️‍♂️",
  "Calculating millisecond pause between 'delivered' and 'read' 💀",
  "Checking if target's Snap score moved while leaving you on delivered 📱",
  "Measuring blue vs grey message bubble disparity ratio 📉",
  "Cross-referencing delulu index with TikTok brainrot charts ✨",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSteps((prev) => {
        const next = prev + 1;
        playPop();
        if (next >= steps.length) {
          clearInterval(interval);
          playCashRegisterDing();
          setTimeout(() => {
            onComplete();
          }, 450);
          return steps.length;
        }
        return next;
      });
    }, 550);

    return () => clearInterval(interval);
  }, [steps.length, onComplete]);

  const progressPercent = Math.min(100, Math.round((completedSteps / steps.length) * 100));

  return (
    <div className="w-full max-w-lg px-4 py-12 mx-auto flex flex-col items-center">
      {/* Neon Glassmorphic Dossier Card */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full glass-card-hot p-6 sm:p-8 rounded-3xl relative overflow-hidden"
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF007F] animate-ping" />
            <span className="font-heading text-sm text-[#00F5FF] tracking-wide uppercase">
              {isAppeal ? "APPELLATE COPIUM IN PROGRESS 💅" : "ACTIVE FORENSIC SCAN // DO NOT BLINK 🚨"}
            </span>
          </div>
          <span className="font-mono-doc text-sm font-black text-white tabular-nums bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
            {progressPercent}%
          </span>
        </div>

        {/* Big Neon Gradient Progress Bar */}
        <div className="w-full bg-black/40 h-4 rounded-full overflow-hidden border border-white/20 p-0.5 mb-6">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-[#FF007F] via-[#A855F7] to-[#00F5FF]"
            initial={{ width: "5%" }}
            animate={{ width: `${Math.max(5, progressPercent)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
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
                initial={{ opacity: 0.35, x: -8 }}
                animate={{
                  opacity: isDone ? 1 : isCurrent ? 1 : 0.35,
                  x: isCurrent ? 4 : 0
                }}
                transition={{ duration: 0.2 }}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all border ${
                  isDone
                    ? "bg-[#00F5FF]/10 border-[#00F5FF]/40 text-white"
                    : isCurrent
                    ? "bg-[#FF007F]/20 border-[#FF007F] text-[#FF007F] font-bold neon-glow-pink scale-[1.01]"
                    : "border-transparent text-slate-500"
                }`}
              >
                <div className="shrink-0">
                  {isDone ? (
                    <div className="w-6 h-6 rounded-full bg-[#00F5FF] text-black flex items-center justify-center font-bold">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : isCurrent ? (
                    <Loader2 className="w-6 h-6 text-[#FF007F] animate-spin" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-white/20" />
                  )}
                </div>

                <span className="leading-snug">{step}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-white/15 text-center font-mono-doc text-[11px] text-slate-300 flex items-center justify-center gap-2">
          <Flame className="w-4 h-4 text-yellow-300" />
          <span>DO NOT PANIC • OVERTHINKING TELEMETRY BEING LOGGED IN 4K</span>
        </div>
      </motion.div>
    </div>
  );
};
