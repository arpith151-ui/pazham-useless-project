import React, { useState } from 'react';
import { motion } from 'motion/react';
import { playPop } from '../../lib/sound';

export const REACTION_MEMES = [
  {
    url: "https://media.tenor.com/FwIe_tLpIFAAAAAM/joker-tongue.gif",
    alt: "Unhinged Joker reaction"
  },
  {
    url: "https://media.tenor.com/YwB-1i7Tj_8AAAAM/side-eye-dog.gif",
    alt: "Bombastic side eye dog"
  },
  {
    url: "https://media.tenor.com/gK9tqFkUq-UAAAAM/cat-shocked.gif",
    alt: "Cat screaming crying in shock"
  },
  {
    url: "https://media.tenor.com/J3y4Y9i3jZgAAAAM/monkey-puppet-side-eye.gif",
    alt: "Awkward monkey side eye"
  },
  {
    url: "https://media.tenor.com/jM3Q_0jRvh8AAAAM/cat-typing-fast.gif",
    alt: "Typing 4 paragraph essay fast"
  },
  {
    url: "https://media.tenor.com/4g_NfJ7LqFMAAAAM/walter-white-crying.gif",
    alt: "Fell to knees in the kitchen"
  },
  {
    url: "https://media.tenor.com/0uB0w96x0zYAAAAM/skull-fire.gif",
    alt: "Flaming skull on god"
  }
];

interface MemeStickerProps {
  currentIndex: number;
  onCycle: () => void;
}

export const MemeSticker: React.FC<MemeStickerProps> = ({ currentIndex, onCycle }) => {
  const currentMeme = REACTION_MEMES[currentIndex % REACTION_MEMES.length];

  const handleClick = () => {
    playPop();
    onCycle();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.12, rotate: 12, transition: { type: "spring", stiffness: 450, damping: 10 } }}
      whileTap={{ scale: 0.9, rotate: -8 }}
      onClick={handleClick}
      title="Official Forensic Reaction Sticker (Click to cycle reaction!)"
      className="absolute top-4 right-4 z-30 cursor-pointer select-none"
    >
      <div className="relative p-1 bg-white border-2 border-[#1F1C18] rounded-2xl shadow-[3px_4px_0px_#1F1C18] rotate-6 overflow-hidden">
        <img
          src={currentMeme.url}
          alt={currentMeme.alt}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl pointer-events-none"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://media.tenor.com/FwIe_tLpIFAAAAAM/joker-tongue.gif";
          }}
        />
        <div className="absolute bottom-1 right-1 bg-[#FFB800] text-[#1F1C18] text-[9px] font-mono-doc font-bold px-1 rounded-sm border border-[#1F1C18]">
          STICKER
        </div>
      </div>
    </motion.div>
  );
};
