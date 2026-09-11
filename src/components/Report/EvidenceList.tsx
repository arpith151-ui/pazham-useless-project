import React, { useState } from 'react';
import { FileSearch, ImageIcon, Eye, Flame, Skull } from 'lucide-react';
import { playPop } from '../../lib/sound';

interface EvidenceListProps {
  evidence: string[];
  imageAttachment?: string;
}

export const EvidenceList: React.FC<EvidenceListProps> = ({ evidence, imageAttachment }) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const [showFullImage, setShowFullImage] = useState(false);

  return (
    <div className="space-y-4 my-6">
      <div className="flex items-center justify-between border-b border-white/20 pb-2">
        <span className="font-heading text-base text-[#00F5FF] uppercase tracking-wide flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-[#FF007F]" />
          SECTION 4: DIGITAL RECEIPTS & GROUP CHAT FORENSICS
        </span>
        <span className="font-mono-doc text-xs text-slate-300 font-bold bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/20">
          CHAIN OF CUSTODY: CAUGHT IN 4K
        </span>
      </div>

      {/* If screenshot was uploaded, display it as Exhibit 0 */}
      {imageAttachment && (
        <div className="glass-card-hot p-4 rounded-2xl mb-4">
          <div className="flex items-center justify-between font-mono-doc text-xs mb-3">
            <span className="bg-[#FF007F] text-white px-3 py-1 rounded-xl font-heading text-xs uppercase tracking-wider flex items-center gap-1.5 neon-glow-pink">
              <ImageIcon className="w-3.5 h-3.5" />
              EXHIBIT 0: THE CRIME SCENE (UNEDITED SCREENSHOT RECEIPT)
            </span>
            <button
              type="button"
              onClick={() => { playPop(); setShowFullImage(!showFullImage); }}
              className="text-xs text-[#00F5FF] hover:underline font-bold flex items-center gap-1 cursor-pointer bg-white/10 px-2.5 py-1 rounded-lg border border-white/15"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showFullImage ? "COLLAPSE" : "EXPAND RECEIPT"}</span>
            </button>
          </div>

          <div className="flex justify-center bg-black/60 p-3 rounded-xl border border-white/15">
            <img
              src={imageAttachment}
              alt="Citizen uploaded screenshot exhibit"
              className={`rounded-xl border border-white/20 object-contain transition-all ${
                showFullImage ? "max-h-[500px] w-auto" : "max-h-[220px] w-auto"
              }`}
            />
          </div>
          <div className="text-xs font-mono-doc text-slate-300 mt-2 text-center italic">
            Visual artifact inspected by Departmental AI Forensics. Zero edits detected.
          </div>
        </div>
      )}

      {/* Tweet-style exhibits */}
      <div className="space-y-3 font-chunky text-sm">
        {evidence?.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-black/45 border border-white/15 p-3.5 rounded-2xl relative overflow-hidden backdrop-blur-md hover:border-[#FF007F]/40 transition-colors"
          >
            <span className="bg-linear-to-r from-[#FF007F] to-[#8B5CF6] text-white px-2.5 py-1 rounded-xl font-heading text-xs shrink-0 neon-glow-pink">
              EXHIBIT {letters[idx] || idx + 1}
            </span>
            <span className="text-slate-100 font-medium leading-relaxed">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
