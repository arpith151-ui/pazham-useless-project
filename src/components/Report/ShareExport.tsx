import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Share2, Check, Loader2 } from 'lucide-react';
import { CaseReport } from '../../types';
import { playPop } from '../../lib/sound';

interface ShareExportProps {
  reportRef: React.RefObject<HTMLDivElement | null>;
  caseReport: CaseReport;
  onCycleMeme?: () => void;
}

export const ShareExport: React.FC<ShareExportProps> = ({ reportRef, caseReport, onCycleMeme }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleDownloadPng = async () => {
    if (!reportRef.current) return;
    playPop();
    setIsExporting(true);
    setExportNotice(null);

    try {
      // Confetti burst on export
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#FF5E57', '#FFB800', '#FF2A85']
        });
      } catch (_e) {}

      const dataUrl = await toPng(reportRef.current, {
        cacheBust: true,
        backgroundColor: '#FAF6EE',
        pixelRatio: 2,
        style: {
          transform: 'none',
          boxShadow: 'none',
        }
      });

      const link = document.createElement('a');
      link.download = `${caseReport.caseId}-PAZHAM-DOSSIER.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.warn('Direct canvas export limitation encountered; providing screenshot advice and auto-copying roast:', err);
      handleCopySummary();
      setExportNotice("📸 Tip: Take a quick screenshot to share, or paste the copied roast!");
      setTimeout(() => setExportNotice(null), 5000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopySummary = () => {
    playPop();
    const summary = `🚨 PAZHAM — Department of Unnecessary Intelligence
📁 Dossier: ${caseReport.caseId}
💀 Incident: "${caseReport.incident}"
🚩 Social Threat: ${caseReport.severity.socialThreatLevel}%
🧠 Overthinking: ${caseReport.severity.overthinkingIndex}%
🔥 Official Verdict: ${caseReport.verdict}
💅 Bestie Advice: "${caseReport.recommendedAction}"`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <button
        id="export-case-file-btn"
        type="button"
        onClick={handleDownloadPng}
        disabled={isExporting}
        className="btn-punchy-coral px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 cursor-pointer disabled:opacity-50 text-xs sm:text-sm jelly-hover"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>EXPORTING...</span>
          </>
        ) : (
          <>
            <span>🚀 EXPORT DOSSIER (PNG)</span>
          </>
        )}
      </button>

      {onCycleMeme && (
        <button
          type="button"
          onClick={() => { playPop(); onCycleMeme(); }}
          className="btn-warm-neutral px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-bold jelly-hover"
        >
          <span>🤡 SWAP STICKER</span>
        </button>
      )}

      <button
        id="copy-summary-btn"
        type="button"
        onClick={handleCopySummary}
        title="Copy text summary of case file"
        className="btn-warm-neutral px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-bold jelly-hover"
      >
        {hasCopied ? (
          <>
            <Check className="w-4 h-4 text-[#10B981]" />
            <span className="text-[#10B981]">COPIED!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 text-[#FF5E57]" />
            <span>COPY ROAST</span>
          </>
        )}
      </button>

      {exportNotice && (
        <div className="w-full font-mono-doc text-[11px] text-[#FF5E57] bg-[#FFE3EC] border border-[#FF2A85]/30 p-2 rounded-xl mt-1 text-center font-bold">
          {exportNotice}
        </div>
      )}
    </div>
  );
};
