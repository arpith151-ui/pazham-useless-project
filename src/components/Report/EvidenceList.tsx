import React, { useState } from 'react';
import { FileSearch, ImageIcon, Eye } from 'lucide-react';
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
      <div className="flex items-center justify-between border-b-2 border-[#E6DFD1] pb-2">
        <span className="font-heading text-base text-[#1F1C18] uppercase tracking-wide flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-[#FF5E57]" />
          DIGITAL RECEIPTS & GROUP CHAT FORENSICS
        </span>
        <span className="font-mono-doc text-xs text-[#5C5549] font-bold bg-[#FAF6EE] px-2.5 py-0.5 rounded-lg border border-[#E6DFD1]">
          CAUGHT IN 4K 📸
        </span>
      </div>

      {/* If screenshot was uploaded, display it as Exhibit 0 */}
      {imageAttachment && (
        <div className="bg-[#FAF6EE] border-2 border-[#E6DFD1] p-4 rounded-3xl mb-4 shadow-xs">
          <div className="flex items-center justify-between font-mono-doc text-xs mb-3">
            <span className="bg-[#FF5E57] text-white px-3 py-1 rounded-xl font-heading text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_#1F1C18]">
              <ImageIcon className="w-3.5 h-3.5" />
              EXHIBIT 0: THE CRIME SCENE (SCREENSHOT RECEIPT)
            </span>
            <button
              type="button"
              onClick={() => { playPop(); setShowFullImage(!showFullImage); }}
              className="text-xs text-[#1F1C18] hover:text-[#FF5E57] font-bold flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-[#E6DFD1] shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showFullImage ? "COLLAPSE" : "EXPAND RECEIPT"}</span>
            </button>
          </div>

          <div className="flex justify-center bg-white p-3 rounded-2xl border border-[#E6DFD1]">
            <img
              src={imageAttachment}
              alt="Citizen uploaded screenshot exhibit"
              className={`rounded-xl border border-[#E6DFD1] object-contain transition-all ${
                showFullImage ? "max-h-[500px] w-auto" : "max-h-[220px] w-auto"
              }`}
            />
          </div>
          <div className="text-xs font-mono-doc text-[#8C8275] mt-2 text-center italic">
            Visual artifact inspected by Departmental AI Forensics. Unedited screenshot confirmed.
          </div>
        </div>
      )}

      {/* Exhibit List */}
      <div className="space-y-3 font-chunky text-sm">
        {evidence?.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-[#FAF6EE] border-2 border-[#E6DFD1] p-3.5 sm:p-4 rounded-2xl relative overflow-hidden hover:border-[#FFB800] transition-colors shadow-xs"
          >
            <span className="bg-[#FFB800] text-[#1F1C18] border border-[#1F1C18] px-2.5 py-1 rounded-xl font-heading text-xs shrink-0 shadow-[1px_1px_0px_#1F1C18]">
              EXHIBIT {letters[idx] || idx + 1}
            </span>
            <span className="text-[#1F1C18] font-medium leading-relaxed">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
