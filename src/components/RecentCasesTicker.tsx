import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RECENT_CASE_HEADLINES } from '../lib/mockData';
import { Radio, ChevronRight, ChevronLeft } from 'lucide-react';

export const RecentCasesTicker: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % RECENT_CASE_HEADLINES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = RECENT_CASE_HEADLINES[index] || RECENT_CASE_HEADLINES[0];
  if (!current) return null;

  return (
    <div
      className="w-full bg-white/70 border-y-2 border-[#E6DFD1] py-2.5 px-4 flex items-center justify-between gap-3 text-xs font-mono-doc select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-2 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5E57] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5E57]"></span>
        </span>
        <span className="font-bold text-[#FF5E57] uppercase tracking-wider hidden sm:inline">
          LIVE DOCKET:
        </span>
      </div>

      <div className="flex-1 overflow-hidden h-6 relative flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="truncate flex items-center gap-2 text-[#1F1C18]"
          >
            <span className="bg-[#FFE3EC] text-[#FF2A85] px-1.5 py-0.5 rounded-md font-bold text-[11px] shrink-0 border border-[#FF2A85]/30">
              {current.id}
            </span>
            <span className="truncate font-semibold">{current.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-1 shrink-0 text-[#5C5549]">
        <button
          id="ticker-prev-btn"
          aria-label="Previous Docket Item"
          onClick={() => setIndex((prev) => (prev - 1 + RECENT_CASE_HEADLINES.length) % RECENT_CASE_HEADLINES.length)}
          className="p-1 hover:text-[#FF5E57] transition-colors rounded-md hover:bg-[#FAF6EE] cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] text-[#8C8275] tabular-nums font-bold">
          {index + 1}/{RECENT_CASE_HEADLINES.length}
        </span>
        <button
          id="ticker-next-btn"
          aria-label="Next Docket Item"
          onClick={() => setIndex((prev) => (prev + 1) % RECENT_CASE_HEADLINES.length)}
          className="p-1 hover:text-[#FF5E57] transition-colors rounded-md hover:bg-[#FAF6EE] cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
