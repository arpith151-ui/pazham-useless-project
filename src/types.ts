export interface SeverityScores {
  socialThreatLevel: number;
  overthinkingIndex: number;
  emotionalDamage: number;
}

export interface ExplanationItem {
  label: string;
  probability: number;
}

export interface CaseReport {
  caseId: string;
  department: string;
  incident: string;
  severity: SeverityScores;
  explanations: ExplanationItem[];
  evidence: string[];
  verdict: string;
  confidence: number;
  recommendedAction: string;
  isAppeal: boolean;
  timestamp?: string;
  originalVerdict?: string;
  caseOfficer?: string;
  imageAttachment?: string; // base64 or preview data url
}

export type ViewState = 'landing' | 'filing' | 'processing' | 'result' | 'appeal-result';

export interface ImageDataPayload {
  data: string; // base64 without prefix or with prefix
  mimeType: string;
  name?: string;
}

export interface InvestigateRequest {
  incident?: string;
  image?: ImageDataPayload;
}

export interface AppealRequest {
  incident?: string;
  image?: ImageDataPayload;
  originalCase: CaseReport;
}
