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

  const current = RECENT_CASE_HEADLINES[index];

  return (
    <div
      className="w-full bg-[#1A1F2E]/5 border-y border-[#1A1F2E]/15 py-2.5 px-4 flex items-center justify-between gap-3 text-xs font-mono-doc select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-2 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B1E2F] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B1E2F]"></span>
        </span>
        <span className="font-bold text-[#8B1E2F] uppercase tracking-wider hidden sm:inline">
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
            className="truncate flex items-center gap-2 text-[#1A1F2E]/90"
          >
            <span className="bg-[#8B1E2F]/10 text-[#8B1E2F] px-1.5 py-0.5 rounded-xs font-bold text-[11px] shrink-0 border border-[#8B1E2F]/20">
              {current.id}
            </span>
            <span className="truncate">{current.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-1 shrink-0 text-[#1A1F2E]/60">
        <button
          id="ticker-prev-btn"
          aria-label="Previous Docket Item"
          onClick={() => setIndex((prev) => (prev - 1 + RECENT_CASE_HEADLINES.length) % RECENT_CASE_HEADLINES.length)}
          className="p-1 hover:text-[#8B1E2F] transition-colors rounded-xs hover:bg-[#1A1F2E]/10"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] text-[#1A1F2E]/50 tabular-nums">
          {index + 1}/{RECENT_CASE_HEADLINES.length}
        </span>
        <button
          id="ticker-next-btn"
          aria-label="Next Docket Item"
          onClick={() => setIndex((prev) => (prev + 1) % RECENT_CASE_HEADLINES.length)}
          className="p-1 hover:text-[#8B1E2F] transition-colors rounded-xs hover:bg-[#1A1F2E]/10"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
