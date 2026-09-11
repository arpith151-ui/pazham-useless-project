import React, { useState } from 'react';
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
  const [animating, setAnimating] = useState(false);
  const currentMeme = REACTION_MEMES[currentIndex % REACTION_MEMES.length];

  const handleClick = () => {
    playPop();
    setAnimating(true);
    onCycle();
    setTimeout(() => setAnimating(false), 200);
  };

  return (
    <img
      src={currentMeme.url}
      alt={currentMeme.alt}
      title="Official Forensic Meme Receipt (Click to cycle reaction!)"
      onClick={handleClick}
      className={`meme-sticker ${animating ? "scale-90 rotate-24" : ""}`}
      onError={(e) => {
        // Fallback in case external image has network hiccup
        (e.target as HTMLImageElement).src = "https://media.tenor.com/FwIe_tLpIFAAAAAM/joker-tongue.gif";
      }}
    />
  );
};
