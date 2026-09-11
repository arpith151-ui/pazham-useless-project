import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SeverityScores } from '../../types';
import { playCashRegisterDing } from '../../lib/sound';
import { HeartMascot } from '../Mascot/HeartMascot';

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

  const maxDamage = Math.max(scores.emotionalDamage, scores.overthinkingIndex);

  useEffect(() => {
    if (maxDamage > 75) {
      const timer = setTimeout(() => {
        playCashRegisterDing();
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [maxDamage]);

  const meters = [
    {
      label: "💀 SOCIAL THREAT LEVEL (CRITICAL BRAINROT)",
      target: scores.socialThreatLevel,
      displayVal: countSocial,
      color: "#FF5E57",
      bgGradient: "linear-gradient(90deg, #FFB800, #FF5E57)",
    },
    {
      label: "🧠 OVERTHINKING INDEX (TERMINAL DELULU)",
      target: scores.overthinkingIndex,
      displayVal: countOverthinking,
      color: "#D97706",
      bgGradient: "linear-gradient(90deg, #FFB800, #FF2A85)",
    },
    {
      label: "💔 EMOTIONAL DAMAGE (DOWN ASTRONOMICAL)",
      target: scores.emotionalDamage,
      displayVal: countEmotional,
      color: "#FF2A85",
      bgGradient: "linear-gradient(90deg, #FF5E57, #FF2A85, #8B5CF6)",
    }
  ];

  return (
    <div className="space-y-4 my-6 p-5 bg-[#FAF6EE] border-2 border-[#E6DFD1] rounded-3xl relative overflow-visible">
      {/* Small Heart Mascot popping up near high overthinking / emotional damage */}
      <div className="absolute -top-9 -right-2 sm:right-2 z-20">
        <HeartMascot
          damageLevel={maxDamage}
          size={64}
        />
      </div>

      <div className="font-heading text-xs uppercase tracking-wider text-[#5C5549] mb-2">
        OFFICIAL DELULU TELEMETRY SENSORS
      </div>

      {meters.map((meter, i) => (
        <div key={i} className="meter-section my-2">
          <div className="flex justify-between items-center font-mono-doc text-xs sm:text-sm mb-1.5">
            <span style={{ color: meter.color }} className="font-black tracking-tight">
              {meter.label}
            </span>
            <span className="font-black tabular-nums text-sm sm:text-base text-[#1F1C18] bg-white border border-[#E6DFD1] px-2 py-0.5 rounded-md shadow-xs">
              {meter.displayVal.toFixed(1)}%
            </span>
          </div>

          {/* Liquid Jelly Meter Bar */}
          <div className="h-4 bg-[#EFE9DC] rounded-full overflow-hidden relative border border-[#DCD3C1] p-0.5 shadow-inner">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: meter.bgGradient,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(4, meter.target))}%` }}
              transition={{
                type: "spring",
                stiffness: 95,
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
