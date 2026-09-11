import React from 'react';
import { motion } from 'motion/react';
import { ExplanationItem } from '../../types';
import { HelpCircle, Sparkles } from 'lucide-react';

interface ProbabilityBreakdownProps {
  explanations: ExplanationItem[];
}

export const ProbabilityBreakdown: React.FC<ProbabilityBreakdownProps> = ({ explanations }) => {
  const sorted = [...(explanations || [])].sort((a, b) => b.probability - a.probability);

  return (
    <div className="space-y-4 my-6">
      <div className="flex items-center justify-between border-b border-white/20 pb-2">
        <span className="font-heading text-base text-[#00F5FF] uppercase tracking-wide flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#FF007F]" />
          SECTION 3: ALTERNATE THEORIES & HYPOTHESIS SPECTRUM
        </span>
        <span className="font-mono-doc text-xs text-slate-300 font-bold bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
          RANKED BY PROBABILITY
        </span>
      </div>

      <div className="space-y-3">
        {sorted.map((item, idx) => {
          const clampedProb = Math.min(100, Math.max(0, item.probability));

          return (
            <div
              key={idx}
              className="bg-black/45 border border-white/15 p-3.5 rounded-2xl relative overflow-hidden backdrop-blur-md"
            >
              <div className="flex justify-between items-baseline gap-2 font-chunky text-sm mb-2">
                <span className="text-white font-semibold leading-tight">
                  <span className="text-[#FF007F] font-black mr-2 font-mono-doc">[{idx + 1}]</span>
                  {item.label}
                </span>
                <span className="font-mono-doc font-black text-[#00F5FF] shrink-0 tabular-nums text-base">
                  {clampedProb.toFixed(1)}%
                </span>
              </div>

              {/* Progress bar track */}
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/20">
                <motion.div
                  className="h-full bg-linear-to-r from-[#FF007F] via-[#A855F7] to-[#00F5FF] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${clampedProb}%` }}
                  transition={{
                    type: "spring",
                    stiffness: 75,
                    damping: 15,
                    delay: 0.2 + idx * 0.1
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
