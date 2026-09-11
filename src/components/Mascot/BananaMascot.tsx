import React, { useState } from 'react';
import { motion } from 'motion/react';
import { playPop } from '../../lib/sound';

export type BananaMood = 'idle' | 'hover' | 'wink' | 'shocked' | 'thinking';

interface BananaMascotProps {
  mood?: BananaMood;
  size?: number;
  speechText?: string;
  className?: string;
  onClick?: () => void;
  showSpeech?: boolean;
}

export const BananaMascot: React.FC<BananaMascotProps> = ({
  mood = ('idle' as BananaMood),
  size = 110,
  speechText,
  className = '',
  onClick,
  showSpeech = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [manualSpin, setManualSpin] = useState(false);

  let currentMood: BananaMood = mood;
  if (manualSpin) {
    currentMood = 'wink';
  } else if (isHovered) {
    currentMood = 'hover';
  }

  const handleClick = () => {
    playPop();
    setManualSpin(true);
    setTimeout(() => setManualSpin(false), 900);
    onClick?.();
  };

  // Motion variants for fluid liquid physics
  const mascotVariants = {
    idle: {
      y: [0, -5, 0],
      rotate: [0, 2, -2, 0],
      scaleX: [1, 1.02, 1],
      scaleY: [1, 0.98, 1],
      transition: {
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      rotate: [-8, 8, -6, 6, 0],
      scale: [1, 1.1, 1.05],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    wink: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      y: [0, -16, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    shocked: {
      x: [-3, 3, -3, 3, 0],
      y: [0, -2, 2, 0],
      scale: [1, 1.06, 1],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "linear"
      }
    },
    thinking: {
      rotate: [0, -10, -5],
      y: [0, -3, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="PAZHAM — Official Overthinking Banana Mascot (Click to poke!)"
    >
      {/* Optional Speech Bubble */}
      {showSpeech && speechText && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 15 }}
          className="absolute -top-12 z-20 whitespace-nowrap bg-white text-[#1F1C18] border-2 border-[#1F1C18] px-3 py-1 rounded-2xl text-xs font-chunky font-bold shadow-[2px_3px_0px_#1F1C18] pointer-events-none"
        >
          {speechText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-[#1F1C18] rotate-45" />
        </motion.div>
      )}

      {/* Cute Flat Vector SVG Banana */}
      <motion.div
        variants={mascotVariants}
        animate={currentMood}
        className="origin-bottom filter drop-shadow-[0_6px_12px_rgba(255,184,0,0.35)]"
        style={{ width: size, height: size * 1.05 }}
      >
        <svg
          viewBox="0 0 120 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Stem top */}
          <path
            d="M58 8C55 12 56 18 57 23C58 24 62 25 64 24C65 19 65 12 62 8C61 6 59 6 58 8Z"
            fill="#5C7C32"
            stroke="#1F1C18"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Main Banana Body (Smooth Curved Silhouette) */}
          <path
            d="M57 23C42 28 26 44 22 66C17 92 32 114 55 121C77 127 96 117 101 98C103 89 101 80 96 72C90 62 76 56 70 54C62 50 63 34 57 23Z"
            fill="#FFC837"
            stroke="#1F1C18"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Peel Belly Highlight / Soft 3D Ridge */}
          <path
            d="M50 30C38 39 30 55 29 73C27 92 38 108 53 115C42 108 36 93 37 77C38 60 46 44 55 35"
            fill="#FFE072"
            opacity="0.9"
          />

          {/* Banana Tip Bottom Cap */}
          <path
            d="M53 120C55 124 59 125 61 123C63 121 61 119 59 118"
            fill="#6B4E26"
            stroke="#1F1C18"
            strokeWidth="2"
          />

          {/* Blush Cheeks */}
          <ellipse
            cx="44"
            cy="79"
            rx="5.5"
            ry="3.5"
            fill="#FF758F"
            transform="rotate(-5 44 79)"
          />
          <ellipse
            cx="75"
            cy="76"
            rx="5.5"
            ry="3.5"
            fill="#FF758F"
            transform="rotate(-5 75 76)"
          />

          {/* Eyes & Eyebrows depending on mood */}
          {currentMood === 'wink' ? (
            /* Winking Eye + Star Eye */
            <g>
              {/* Left Eye: Big cute sparkle star */}
              <circle cx="48" cy="71" r="5" fill="#1F1C18" />
              <circle cx="46.5" cy="69.5" r="1.8" fill="white" />
              {/* Right Eye: Happy Wink Arc */}
              <path
                d="M68 73C70 70 76 70 78 73"
                stroke="#1F1C18"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Wink star sparkle */}
              <path
                d="M82 65L83.5 61L85 65L89 66.5L85 68L83.5 72L82 68L78 66.5L82 65Z"
                fill="#FF5E57"
              />
            </g>
          ) : currentMood === 'shocked' ? (
            /* Shocked Wide Eyes with Sweat Drop */
            <g>
              {/* Big round shocked eyes */}
              <circle cx="48" cy="70" r="6" fill="#1F1C18" />
              <circle cx="46.5" cy="68" r="2.2" fill="white" />
              <circle cx="72" cy="68" r="6" fill="#1F1C18" />
              <circle cx="70.5" cy="66" r="2.2" fill="white" />
              {/* High eyebrows */}
              <path d="M43 60C46 58 52 58 54 61" stroke="#1F1C18" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M68 59C71 57 77 57 80 60" stroke="#1F1C18" strokeWidth="2.5" strokeLinecap="round" />
              {/* Cold Sweat Droplet */}
              <path
                d="M32 58C32 58 28 64 28 66C28 68.2 29.8 70 32 70C34.2 70 36 68.2 36 66C36 64 32 58 32 58Z"
                fill="#38BDF8"
                stroke="#1F1C18"
                strokeWidth="1.8"
              />
            </g>
          ) : currentMood === 'thinking' ? (
            /* Thinking eyes looking up */
            <g>
              <circle cx="49" cy="68" r="5" fill="#1F1C18" />
              <circle cx="50" cy="66.5" r="1.8" fill="white" />
              <circle cx="73" cy="66" r="5" fill="#1F1C18" />
              <circle cx="74" cy="64.5" r="1.8" fill="white" />
              {/* Thinking furrowed brows */}
              <path d="M44 62C47 64 52 64 54 62" stroke="#1F1C18" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M68 60C71 58 76 60 78 62" stroke="#1F1C18" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          ) : (
            /* Default Happy Kawaii Eyes */
            <g>
              <circle cx="48" cy="71" r="4.8" fill="#1F1C18" />
              <circle cx="46.5" cy="69.5" r="1.8" fill="white" />
              <circle cx="72" cy="69" r="4.8" fill="#1F1C18" />
              <circle cx="70.5" cy="67.5" r="1.8" fill="white" />
              {/* Soft smile eyebrows */}
              <path d="M44 64C47 62 51 62 53 64" stroke="#1F1C18" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M68 62C71 60 75 60 77 62" stroke="#1F1C18" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          )}

          {/* Mouth depending on mood */}
          {currentMood === 'shocked' ? (
            /* Open "O" mouth */
            <ellipse cx="60" cy="84" rx="4.5" ry="6.5" fill="#1F1C18" />
          ) : currentMood === 'wink' ? (
            /* Open laughing smile with tongue */
            <path
              d="M53 79C54 85 64 86 67 80"
              fill="#FF5E57"
              stroke="#1F1C18"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ) : (
            /* Gentle sweet smile */
            <path
              d="M55 79C57 82 63 82 65 79"
              stroke="#1F1C18"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Tiny Doodle Sparkles around head on hover/wink */}
          {(currentMood === 'hover' || currentMood === 'wink') && (
            <g className="animate-pulse">
              <path d="M88 40L89.5 35L91 40L96 41.5L91 43L89.5 48L88 43L83 41.5L88 40Z" fill="#FFB800" />
              <path d="M22 45L23 41L24 45L28 46L24 47L23 51L22 47L18 46L22 45Z" fill="#FF5E57" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
