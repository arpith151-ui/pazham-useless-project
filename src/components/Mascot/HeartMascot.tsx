import React, { useState } from 'react';
import { motion } from 'motion/react';
import { playPop } from '../../lib/sound';

export type HeartMood = 'happy' | 'nervous' | 'cracked';

interface HeartMascotProps {
  damageLevel?: number; // 0 - 100
  mood?: HeartMood;
  size?: number;
  speechText?: string;
  className?: string;
  onClick?: () => void;
  showSpeech?: boolean;
}

export const HeartMascot: React.FC<HeartMascotProps> = ({
  damageLevel,
  mood,
  size = 72,
  speechText,
  className = '',
  onClick,
  showSpeech = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Derive mood from damageLevel if not explicitly set
  const calculatedMood: HeartMood = mood
    ? mood
    : damageLevel !== undefined
    ? damageLevel > 68
      ? 'cracked'
      : damageLevel > 40
      ? 'nervous'
      : 'happy'
    : 'happy';

  const defaultSpeech =
    calculatedMood === 'cracked'
      ? "EMOTIONAL DAMAGE! 💔"
      : calculatedMood === 'nervous'
      ? "Overthinking rn... 🥺"
      : "Heart is vibing! ✨";

  const activeSpeech = speechText || defaultSpeech;

  // Variants for fluid squash & stretch motion
  const heartVariants = {
    happy: {
      y: [0, -10, 0],
      scaleX: [1, 1.08, 0.95, 1],
      scaleY: [1, 0.92, 1.08, 1],
      rotate: [0, 4, -4, 0],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    nervous: {
      y: [0, -4, 0],
      rotate: [-3, 3, -3],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut"
      }
    },
    cracked: {
      x: [-2, 2, -2, 2, 0],
      rotate: [-2, 2, -1, 1, 0],
      scale: [0.98, 1.02, 0.98],
      transition: {
        duration: 0.35,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "linear"
      }
    }
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        playPop();
        onClick?.();
      }}
      title="Overthinking Heart Mascot (Reacts to damage & threat levels!)"
    >
      {/* Speech bubble */}
      {showSpeech && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-9 z-20 whitespace-nowrap bg-white text-[#1F1C18] border-2 border-[#1F1C18] px-2.5 py-0.5 rounded-xl text-[11px] font-chunky font-bold shadow-[2px_2px_0px_#1F1C18] pointer-events-none"
        >
          {activeSpeech}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r-2 border-b-2 border-[#1F1C18] rotate-45" />
        </motion.div>
      )}

      {/* Heart SVG */}
      <motion.div
        variants={heartVariants}
        animate={calculatedMood}
        whileHover={{ scale: 1.15, transition: { type: "spring", stiffness: 450, damping: 12 } }}
        className="origin-center filter drop-shadow-[0_4px_10px_rgba(255,94,87,0.3)]"
        style={{ width: size, height: size * 0.95 }}
      >
        <svg
          viewBox="0 0 100 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Main Heart Shape */}
          <path
            d="M50 85C50 85 10 58 10 32C10 18 20 8 33 8C41.5 8 47.5 13 50 18C52.5 13 58.5 8 67 8C80 8 90 18 90 32C90 58 50 85 50 85Z"
            fill={calculatedMood === 'cracked' ? "#FF5252" : "#FF5E57"}
            stroke="#1F1C18"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Glossy top-left highlight */}
          <path
            d="M24 16C18 20 15 26 15 32"
            stroke="#FFA8A8"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Blush Cheeks */}
          <ellipse cx="28" cy="46" rx="4" ry="2.5" fill="#FF2A85" opacity="0.6" />
          <ellipse cx="72" cy="46" rx="4" ry="2.5" fill="#FF2A85" opacity="0.6" />

          {/* Eyes & Facial Expression */}
          {calculatedMood === 'happy' ? (
            /* Happy Anime Eyes (^  ^) */
            <g>
              <path d="M28 38C30 34 35 34 37 38" stroke="#1F1C18" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M63 38C65 34 70 34 72 38" stroke="#1F1C18" strokeWidth="2.8" strokeLinecap="round" />
              {/* Sweet smile */}
              <path d="M46 45C48 48 52 48 54 45" stroke="#1F1C18" strokeWidth="2.5" strokeLinecap="round" />
              {/* Sparkles */}
              <path d="M78 16L79 12L80 16L84 17L80 18L79 22L78 18L74 17L78 16Z" fill="#FFB800" />
            </g>
          ) : calculatedMood === 'cracked' ? (
            /* Teary Eyes + Zigzag Crack + Bandage Sticker */
            <g>
              {/* Teary eyes */}
              <circle cx="32" cy="38" r="3.5" fill="#1F1C18" />
              <circle cx="31" cy="37" r="1.2" fill="white" />
              <circle cx="68" cy="38" r="3.5" fill="#1F1C18" />
              <circle cx="67" cy="37" r="1.2" fill="white" />

              {/* Sad downturned mouth */}
              <path d="M47 48C49 45 51 45 53 48" stroke="#1F1C18" strokeWidth="2.5" strokeLinecap="round" />

              {/* Dramatic Crack Down the Center */}
              <path
                d="M50 18L46 32L54 44L47 58L51 72"
                stroke="#1F1C18"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Cute Cross Bandage Sticker */}
              <g transform="translate(62, 50) rotate(15)">
                <rect x="-8" y="-3" width="16" height="6" rx="2" fill="#FFEED9" stroke="#1F1C18" strokeWidth="1.5" />
                <rect x="-3" y="-8" width="6" height="16" rx="2" fill="#FFEED9" stroke="#1F1C18" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="1" fill="#FF5E57" />
              </g>

              {/* Teardrop falling */}
              <path
                d="M24 48C24 48 21 53 21 55C21 56.6 22.3 58 24 58C25.7 58 27 56.6 27 55C27 53 24 48 24 48Z"
                fill="#38BDF8"
                stroke="#1F1C18"
                strokeWidth="1.5"
              />
            </g>
          ) : (
            /* Nervous / Concerned Expression */
            <g>
              <circle cx="32" cy="38" r="4" fill="#1F1C18" />
              <circle cx="31" cy="36.5" r="1.5" fill="white" />
              <circle cx="68" cy="38" r="4" fill="#1F1C18" />
              <circle cx="67" cy="36.5" r="1.5" fill="white" />

              {/* Nervous wavy mouth */}
              <path d="M45 47C47 49 49 46 51 48C53 50 55 47 56 48" stroke="#1F1C18" strokeWidth="2.2" strokeLinecap="round" />

              {/* Sweat bead */}
              <path
                d="M74 24C74 24 71 28 71 30C71 31.5 72.3 32.5 74 32.5C75.7 32.5 77 31.5 77 30C77 28 74 24 74 24Z"
                fill="#38BDF8"
                stroke="#1F1C18"
                strokeWidth="1.5"
              />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
