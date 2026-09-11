import React from 'react';
import { CaseReport } from '../../types';
import { SquigglyUnderline } from '../Doodles/DoodleAccents';
import { Sparkles, Flame } from 'lucide-react';

interface CaseHeaderProps {
  caseReport: CaseReport;
}

export const CaseHeader: React.FC<CaseHeaderProps> = ({ caseReport }) => {
  const isAppeal = caseReport.isAppeal;

  return (
    <div className="relative mb-6">
      {/* Header Subtitle in Chunky Mono */}
      <div className="flex flex-wrap items-center gap-2 mb-2 font-mono-doc text-xs font-bold text-[#FF5E57] uppercase tracking-wider">
        <span className="bg-[#FFE3EC] border border-[#FF2A85]/30 text-[#FF2A85] px-2.5 py-0.5 rounded-md">
          🚨 DOSSIER #{caseReport.caseId}
        </span>
        <span className="text-[#5C5549]">
          • {caseReport.department.toUpperCase()}
        </span>
      </div>

      {/* Header Title with Friendly Chunky Heading */}
      <div className="relative inline-block mb-3">
        <h2 className="font-heading text-3xl sm:text-4xl text-[#1F1C18] tracking-wide">
          {isAppeal ? "Supreme Copium Overrule Record 💅" : "Citizen Overthinking Record 🚨"}
        </h2>
        <SquigglyUnderline color={isAppeal ? "#FF2A85" : "#FFB800"} className="w-full h-3 -mt-1" />
      </div>

      {/* Warm Quote Container with Left Accent Bar */}
      <div className="p-4 sm:p-5 bg-[#FAF6EE] border-l-4 border-[#FF5E57] rounded-r-2xl border-y border-r border-[#E6DFD1] text-sm sm:text-base font-chunky text-[#1F1C18] italic shadow-xs">
        “{caseReport.incident}”
      </div>
    </div>
  );
};
