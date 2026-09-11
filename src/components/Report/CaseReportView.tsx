import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CaseReport } from '../../types';
import { CaseHeader } from './CaseHeader';
import { SeverityMeter } from './SeverityMeter';
import { ProbabilityBreakdown } from './ProbabilityBreakdown';
import { EvidenceList } from './EvidenceList';
import { FinalVerdict } from './FinalVerdict';
import { ShareExport } from './ShareExport';
import { MemeSticker } from './MemeSticker';
import { Scale, RotateCcw, ShieldAlert, ArrowLeft, Flame, Sparkles } from 'lucide-react';
import { playRecordScratch, playPop } from '../../lib/sound';

interface CaseReportViewProps {
  caseReport: CaseReport;
  onAppeal: () => void;
  onNewCase: () => void;
  isAppealing?: boolean;
}

export const CaseReportView: React.FC<CaseReportViewProps> = ({
  caseReport,
  onAppeal,
  onNewCase,
  isAppealing = false,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [memeIndex, setMemeIndex] = useState(0);
  const isAppeal = caseReport.isAppeal;

  const cycleMeme = () => {
    setMemeIndex((prev) => prev + 1);
  };

  const handleAppealClick = () => {
    playRecordScratch();
    onAppeal();
  };

  const handleNewCaseClick = () => {
    playPop();
    onNewCase();
  };

  return (
    <div className="w-full max-w-[820px] px-4 py-8 mx-auto">
      {/* Top action toolbar */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          id="new-grievance-btn"
          type="button"
          onClick={handleNewCaseClick}
          className="inline-flex items-center gap-1.5 font-mono-doc text-xs text-slate-300 hover:text-[#00f0ff] transition-colors cursor-pointer group bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>SUBMIT ANOTHER INCIDENT</span>
        </button>

        <ShareExport
          reportRef={reportRef}
          caseReport={caseReport}
          onCycleMeme={cycleMeme}
        />
      </div>

      {/* The Printable / Exportable Official Dossier Card */}
      <div
        ref={reportRef}
        className="dossier-card relative"
      >
        {/* Outrageous Floating Reaction Meme Sticker */}
        <MemeSticker
          currentIndex={memeIndex}
          onCycle={cycleMeme}
        />

        {/* 1. Official Header & Statement Quote Box */}
        <CaseHeader caseReport={caseReport} />

        {/* 2. Final Verdict Box with Glowing Tag & Cyan Text Shadow */}
        <FinalVerdict
          verdict={caseReport.verdict}
          confidence={caseReport.confidence}
          recommendedAction={caseReport.recommendedAction}
          isAppeal={caseReport.isAppeal}
          originalVerdict={caseReport.originalVerdict}
          caseOfficer={caseReport.caseOfficer}
        />

        {/* 3. Interactive Threat Meter Bar (Social, Overthinking, Emotional Damage) */}
        <SeverityMeter scores={caseReport.severity} />

        <div className="my-6 border-b border-white/10" />

        {/* 4. Ranked Hypotheses */}
        <ProbabilityBreakdown explanations={caseReport.explanations} />

        <div className="my-6 border-b border-white/10" />

        {/* 5. Group Chat Exhibits & Receipts */}
        <EvidenceList
          evidence={caseReport.evidence}
          imageAttachment={caseReport.imageAttachment}
        />

        {/* Footer info in Dossier */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center font-mono-doc text-xs text-slate-400 space-y-1">
          <div className="text-[#00f0ff] font-bold">
            DOSSIER #{caseReport.caseId} • FEDERAL BRAINROT TASK FORCE ARCHIVE
          </div>
          <div>CONFIDENTIAL // ROASTED IN 4K • RECEIPTS ARE FOREVER ON GOD</div>
        </div>
      </div>

      {/* Action Buttons Below Docket */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Appeal Button */}
        {!isAppeal ? (
          <button
            id="appeal-verdict-btn"
            type="button"
            onClick={handleAppealClick}
            disabled={isAppealing}
            className="w-full sm:w-auto btn-primary px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer disabled:opacity-50"
          >
            <Scale className="w-5 h-5 text-white" />
            <span>APPEAL VERDICT (TRIBUNAL COPIUM REVIEW) 💅</span>
          </button>
        ) : (
          <div className="font-mono-doc text-xs sm:text-sm text-[#00f0ff] font-bold flex items-center gap-2 bg-[#00f0ff]/10 px-4 py-3 rounded-xl border border-[#00f0ff]/30">
            <ShieldAlert className="w-5 h-5" />
            <span>APPELLATE JURISDICTION EXHAUSTED (MAXIMUM COPIUM ATTAINED ✨)</span>
          </div>
        )}

        <button
          id="file-another-case-bottom-btn"
          type="button"
          onClick={handleNewCaseClick}
          className="w-full sm:w-auto btn-secondary px-7 py-4 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
        >
          <RotateCcw className="w-5 h-5 text-[#ff2a85]" />
          <span>FILE NEW CASE 🚨</span>
        </button>
      </div>
    </div>
  );
};
