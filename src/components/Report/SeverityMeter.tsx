import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SeverityScores } from '../../types';
import { playCashRegisterDing } from '../../lib/sound';

interface SeverityMeterProps {
  scores: SeverityScores;
}

// Rapid count-up hook
function useRapidCountUp(targetVal: number, durationMs = 850) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const clamped = Math.min(100, Math.max(0, targetVal));

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(eased * clamped);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [targetVal, durationMs]);

  return current;
}

export const SeverityMeter: React.FC<SeverityMeterProps> = ({ scores }) => {
  const countSocial = useRapidCountUp(scores.socialThreatLevel);
  const countOverthinking = useRapidCountUp(scores.overthinkingIndex);
  const countEmotional = useRapidCountUp(scores.emotionalDamage);

  useEffect(() => {
    if (scores.overthinkingIndex > 80) {
      setTimeout(() => {
        playCashRegisterDing();
      }, 650);
    }
  }, [scores.overthinkingIndex]);

  const meters = [
    {
      label: "💀 SOCIAL THREAT LEVEL (CRITICAL BRAINROT)",
      target: scores.socialThreatLevel,
      displayVal: countSocial,
      color: "var(--pink)",
    },
    {
      label: "🧠 OVERTHINKING INDEX (TERMINAL DELULU)",
      target: scores.overthinkingIndex,
      displayVal: countOverthinking,
      color: "var(--cyan)",
    },
    {
      label: "💔 EMOTIONAL DAMAGE (DOWN ASTRONOMICAL)",
      target: scores.emotionalDamage,
      displayVal: countEmotional,
      color: "var(--purple)",
    }
  ];

  return (
    <div className="space-y-4 my-6">
      {meters.map((meter, i) => (
        <div key={i} className="meter-section my-3">
          <div className="flex justify-between items-center font-mono-doc text-xs sm:text-sm mb-1.5">
            <span style={{ color: meter.color }} className="font-bold tracking-tight">
              {meter.label}
            </span>
            <span style={{ color: "var(--yellow)" }} className="font-extrabold tabular-nums text-sm sm:text-base">
              {meter.displayVal.toFixed(1)}%
            </span>
          </div>

          {/* Meter Bar */}
          <div className="h-3.5 bg-white/10 rounded-full overflow-hidden relative border border-white/10 p-0.5">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--cyan), var(--pink), #ff0044)",
                boxShadow: "0 0 15px var(--pink)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(4, meter.target))}%` }}
              transition={{
                type: "spring",
                stiffness: 85,
                damping: 14,
                delay: 0.1 + i * 0.1
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
