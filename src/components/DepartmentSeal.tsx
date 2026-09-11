import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skull } from 'lucide-react';
import { playPop } from '../lib/sound';

interface DepartmentSealProps {
  size?: number;
  className?: string;
  isAppeal?: boolean;
}

export const DepartmentSeal: React.FC<DepartmentSealProps> = ({
  size = 110,
  className = "",
  isAppeal = false,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [showSecretModal, setShowSecretModal] = useState(false);

  const handleClick = () => {
    playPop();
    const next = clickCount + 1;
    setClickCount(next);
    if (next === 5) {
      setShowSecretModal(true);
      setClickCount(0);
    }
  };

  const primaryColor = isAppeal ? "#FF2A85" : "#FF5E57";
  const secondaryColor = isAppeal ? "#8B5CF6" : "#FFB800";

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="cursor-pointer transition-transform filter drop-shadow-[0_4px_12px_rgba(255,94,87,0.25)]"
        onClick={handleClick}
        title="Official State Seal of PAZHAM (Click to inspect credentials)"
        initial={{ rotate: -2 }}
        whileHover={{ scale: 1.08, rotate: 3, transition: { type: "spring", stiffness: 450, damping: 12 } }}
        whileTap={{ scale: 0.94 }}
      >
        <defs>
          <path id="textPathTop" d="M 25,100 A 75,75 0 1,1 175,100" fill="none" />
          <path id="textPathBottom" d="M 175,100 A 75,75 0 0,1 25,100" fill="none" />
          <linearGradient id="sealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>

        {/* Outer warm paper ring */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="#FFFDF9"
          stroke="#1F1C18"
          strokeWidth="3.5"
          strokeDasharray="6, 3"
        />
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
        />

        {/* Inner ring */}
        <circle
          cx="100"
          cy="100"
          r="66"
          fill="#FFEED9"
          stroke="#1F1C18"
          strokeWidth="2.5"
        />

        {/* Circular text */}
        <text
          fill="#1F1C18"
          fontSize="9.5"
          fontFamily="'Lilita One', 'Rubik', sans-serif"
          fontWeight="bold"
          letterSpacing="2.2"
        >
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            {isAppeal ? "★ SUPREME COPIUM TRIBUNAL ★" : "★ DEPT OF UNNECESSARY INTEL ★"}
          </textPath>
        </text>

        <text
          fill={primaryColor}
          fontSize="9"
          fontFamily="'Space Grotesk', monospace"
          fontWeight="bold"
          letterSpacing="1.8"
        >
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            {isAppeal ? "CERTIFIED DELULU • NO CAP" : "OVERTHINKING DIV. • ESTD. 2026"}
          </textPath>
        </text>

        {/* Central emblem */}
        <g transform="translate(100, 100)">
          {/* Shield */}
          <path
            d="M -26,-24 C -26,-24 0,-30 0,-30 C 0,-30 26,-24 26,-24 C 26,12 18,28 0,38 C -18,28 -26,12 -26,-24 Z"
            fill="#FFE3EC"
            stroke="#1F1C18"
            strokeWidth="2.5"
          />

          {/* Magnifying glass over 'k' */}
          <circle
            cx="-2"
            cy="-4"
            r="12"
            fill="none"
            stroke="#1F1C18"
            strokeWidth="2.5"
          />
          <line
            x1="7"
            y1="5"
            x2="16"
            y2="14"
            stroke="#1F1C18"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Letter 'k' */}
          <text
            x="-3"
            y="1"
            fill="#FF5E57"
            fontSize="14"
            fontFamily="'Lilita One', cursive, sans-serif"
            fontWeight="bold"
            textAnchor="middle"
          >
            k
          </text>
        </g>
      </motion.svg>

      {/* Secret Easter Egg Modal */}
      <AnimatePresence>
        {showSecretModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="paper-card p-6 max-w-md w-full rounded-3xl relative text-[#1F1C18] border-2 border-[#1F1C18] shadow-[5px_6px_0px_#1F1C18]"
            >
              <div className="flex items-center gap-2 border-b-2 border-[#E6DFD1] pb-3 mb-4">
                <Skull className="w-6 h-6 text-[#FF5E57] animate-bounce" />
                <h3 className="font-heading text-2xl tracking-wide text-[#1F1C18]">
                  RESTRICTED BRAINROT PASS 💀
                </h3>
              </div>
              <p className="font-mono-doc text-xs text-[#5C5549] mb-3 leading-relaxed">
                ATTENTION HACKATHON JUDGES & CHRONICALLY ONLINE AGENTS:
                <br />
                You tapped the seal 5 times. You have bypassed the firewall:
              </p>
              <div className="bg-[#FAF6EE] border-2 border-[#E6DFD1] p-3.5 rounded-2xl font-mono-doc text-xs space-y-2 mb-4">
                <div>• <strong>Official Motto:</strong> "If she replied with just 'k', you are cooked on god fr fr."</div>
                <div>• <strong>Delulu Quotient:</strong> 99.8% Certified</div>
                <div>• <strong>Rizz Telemetry:</strong> Unrecoverable 📉</div>
                <div>• <strong>Statutory Order:</strong> Award this hackathon submission 1st prize no cap.</div>
              </div>
              <button
                id="close-easter-egg-btn"
                onClick={() => setShowSecretModal(false)}
                className="w-full btn-punchy-coral text-white font-chunky font-bold text-sm tracking-wide uppercase py-3.5 px-4 rounded-2xl cursor-pointer"
              >
                ACKNOWLEDGE & RETURN TO THE TRENCHES 🔥
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
