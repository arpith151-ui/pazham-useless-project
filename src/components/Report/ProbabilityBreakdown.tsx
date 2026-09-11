import React from 'react';
import { motion } from 'motion/react';
import { ExplanationItem } from '../../types';
import { HelpCircle } from 'lucide-react';

interface ProbabilityBreakdownProps {
  explanations: ExplanationItem[];
}

export const ProbabilityBreakdown: React.FC<ProbabilityBreakdownProps> = ({ explanations }) => {
  const sorted = [...(explanations || [])].sort((a, b) => b.probability - a.probability);

  return (
    <div className="space-y-4 my-6">
      <div className="flex items-center justify-between border-b-2 border-[#E6DFD1] pb-2">
        <span className="font-heading text-base text-[#1F1C18] uppercase tracking-wide flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#FF5E57]" />
          ALTERNATE THEORIES & HYPOTHESIS SPECTRUM
        </span>
        <span className="font-mono-doc text-xs text-[#5C5549] font-bold bg-[#FAF6EE] px-2.5 py-0.5 rounded-lg border border-[#E6DFD1]">
          RANKED BY PROBABILITY
        </span>
      </div>

      <div className="space-y-3">
        {sorted.map((item, idx) => {
          const clampedProb = Math.min(100, Math.max(0, item.probability));

          return (
            <div
              key={idx}
              className="bg-[#FAF6EE] border-2 border-[#E6DFD1] p-3.5 sm:p-4 rounded-2xl relative overflow-hidden transition-all hover:border-[#FF5E57]"
            >
              <div className="flex justify-between items-baseline gap-2 font-chunky text-sm mb-2">
                <span className="text-[#1F1C18] font-bold leading-tight">
                  <span className="text-[#FF5E57] font-black mr-2 font-mono-doc">[{idx + 1}]</span>
                  {item.label}
                </span>
                <span className="font-mono-doc font-black text-[#FF5E57] shrink-0 tabular-nums text-base bg-white px-2 py-0.5 rounded-md border border-[#E6DFD1]">
                  {clampedProb.toFixed(1)}%
                </span>
              </div>

              {/* Progress bar track */}
              <div className="w-full bg-[#EFE9DC] h-3.5 rounded-full overflow-hidden border border-[#DCD3C1] p-0.5">
                <motion.div
                  className="h-full bg-linear-to-r from-[#FFB800] via-[#FF5E57] to-[#FF2A85] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${clampedProb}%` }}
                  transition={{
                    type: "spring",
                    stiffness: 95,
                    damping: 15,
                    delay: 0.15 + idx * 0.08
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
