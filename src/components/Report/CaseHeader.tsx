import React from 'react';
import { DepartmentSeal } from '../DepartmentSeal';
import { CaseReport } from '../../types';
import { Sparkles } from 'lucide-react';

interface CaseHeaderProps {
  caseReport: CaseReport;
}

export const CaseHeader: React.FC<CaseHeaderProps> = ({ caseReport }) => {
  const isAppeal = caseReport.isAppeal;

  return (
    <div className="relative mb-6">
      {/* Header Subtitle in JetBrains Mono / Space Grotesk */}
      <div className="header-sub">
        <span>🚨 DOSSIER #{caseReport.caseId} • {caseReport.department.toUpperCase()}</span>
      </div>

      {/* Header Title with Neon Ice Gradient */}
      <h2 className="header-title">
        {isAppeal ? "Supreme Copium Overrule Record" : "Citizen Overthinking Record"}
      </h2>

      {/* Quote Box with Neon Cyan Accent Border */}
      <div className="quote-box">
        “{caseReport.incident}”
      </div>
    </div>
  );
};
