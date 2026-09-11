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
import { Scale, RotateCcw, ShieldAlert, ArrowLeft } from 'lucide-react';
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
    <div className="w-full max-w-[820px] px-4 py-6 mx-auto relative z-10">
      {/* Top action toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button
          id="new-grievance-btn"
          type="button"
          onClick={handleNewCaseClick}
          className="inline-flex items-center gap-2 font-mono-doc text-xs text-[#5C5549] hover:text-[#FF5E57] transition-colors cursor-pointer group bg-white hover:bg-[#FAF6EE] px-3.5 py-2 rounded-xl border-2 border-[#E6DFD1] shadow-xs font-bold"
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

      {/* The Printable / Exportable Official Warm Paper Dossier Card */}
      <motion.div
        ref={reportRef}
        initial={{ opacity: 0, y: -20, scaleX: 0.95, scaleY: 1.05 }}
        animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        className="paper-card p-6 sm:p-9 relative overflow-visible bg-[#FFFDF9]"
      >
        {/* Floating Sticker */}
        <MemeSticker
          currentIndex={memeIndex}
          onCycle={cycleMeme}
        />

        {/* 1. Official Header & Statement Quote Box */}
        <CaseHeader caseReport={caseReport} />

        {/* 2. Final Verdict Box with Droplet Landing & Banana Wink Reaction */}
        <FinalVerdict
          verdict={caseReport.verdict}
          confidence={caseReport.confidence}
          recommendedAction={caseReport.recommendedAction}
          isAppeal={caseReport.isAppeal}
          originalVerdict={caseReport.originalVerdict}
          caseOfficer={caseReport.caseOfficer}
        />

        {/* 3. Severity Meter with Heart Mascot Reacting to Damage */}
        <SeverityMeter scores={caseReport.severity} />

        <div className="my-6 border-b-2 border-[#E6DFD1]" />

        {/* 4. Ranked Hypotheses */}
        <ProbabilityBreakdown explanations={caseReport.explanations} />

        <div className="my-6 border-b-2 border-[#E6DFD1]" />

        {/* 5. Group Chat Exhibits & Receipts */}
        <EvidenceList
          evidence={caseReport.evidence}
          imageAttachment={caseReport.imageAttachment}
        />

        {/* Footer info in Dossier */}
        <div className="mt-8 pt-4 border-t-2 border-[#E6DFD1] text-center font-mono-doc text-xs text-[#8C8275] space-y-1">
          <div className="text-[#FF5E57] font-bold">
            DOSSIER #{caseReport.caseId} • PAZHAM BRAINROT INTELLIGENCE ARCHIVE
          </div>
          <div>CONFIDENTIAL // ROASTED IN 4K • RECEIPTS ARE FOREVER ON GOD</div>
        </div>
      </motion.div>

      {/* Action Buttons Below Docket */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Appeal Button */}
        {!isAppeal ? (
          <motion.button
            id="appeal-verdict-btn"
            type="button"
            onClick={handleAppealClick}
            disabled={isAppealing}
            whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 400, damping: 12 } }}
            whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 12 } }}
            className="w-full sm:w-auto btn-punchy-coral px-8 py-4 rounded-2xl flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer disabled:opacity-50"
          >
            <Scale className="w-5 h-5 text-white" />
            <span>APPEAL VERDICT (TRIBUNAL COPIUM REVIEW) 💅</span>
          </motion.button>
        ) : (
          <div className="font-mono-doc text-xs sm:text-sm text-[#D97706] font-bold flex items-center gap-2 bg-[#FFFBEB] px-4 py-3 rounded-2xl border-2 border-[#FDE68A]">
            <ShieldAlert className="w-5 h-5 text-[#D97706]" />
            <span>APPELLATE JURISDICTION EXHAUSTED (MAXIMUM COPIUM ATTAINED ✨)</span>
          </div>
        )}

        <motion.button
          id="file-another-case-bottom-btn"
          type="button"
          onClick={handleNewCaseClick}
          whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 400, damping: 12 } }}
          whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 12 } }}
          className="w-full sm:w-auto btn-punchy-yellow px-7 py-4 rounded-2xl flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
        >
          <RotateCcw className="w-5 h-5 stroke-[2.5]" />
          <span>FILE NEW CASE 🚨</span>
        </motion.button>
      </div>
    </div>
  );
};
