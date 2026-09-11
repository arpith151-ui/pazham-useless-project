import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Download, Share2, Check, Loader2 } from 'lucide-react';
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

  const handleDownloadPng = async () => {
    if (!reportRef.current) return;
    playPop();
    setIsExporting(true);

    try {
      // Confetti burst on export
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#00f0ff', '#ff2a85', '#ffe600']
        });
      } catch (_e) {}

      const dataUrl = await toPng(reportRef.current, {
        cacheBust: true,
        backgroundColor: '#06090e',
        pixelRatio: 2,
        style: {
          transform: 'none',
          boxShadow: 'none',
        }
      });

      const link = document.createElement('a');
      link.download = `${caseReport.caseId}-BRAINROT-DOSSIER.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export report image:', err);
      alert("Notice: Screenshot this window to share your official case docket!");
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
        className="btn btn-primary px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer disabled:opacity-50 text-xs sm:text-sm"
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
          className="btn btn-secondary px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
        >
          <span>🤡 SWAP MEME</span>
        </button>
      )}

      <button
        id="copy-summary-btn"
        type="button"
        onClick={handleCopySummary}
        title="Copy text summary of case file"
        className="btn btn-secondary px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
      >
        {hasCopied ? (
          <>
            <Check className="w-4 h-4 text-[#00f0ff]" />
            <span className="text-[#00f0ff]">COPIED!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 text-[#ff2a85]" />
            <span>COPY ROAST</span>
          </>
        )}
      </button>
    </div>
  );
};
