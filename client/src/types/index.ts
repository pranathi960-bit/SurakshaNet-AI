export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type Language = 'en' | 'te';

export interface Indicator {
  title: string;
  titleTelugu?: string;
  severity: RiskLevel;
  evidence: string;
  evidenceTelugu?: string;
  whyItMatters: string;
  whyItMattersTelugu?: string;
}

export interface ExtractedEntities {
  phoneNumbers: string[];
  upiIds: string[];
  bankAccounts: string[];
  urls: string[];
  impersonatedEntities: string[];
  demandedAmounts: string[];
  deadlines: string[];
  threatKeywords: string[];
}

export interface ActionStep {
  step: number;
  action: string;
  actionTelugu?: string;
}

export interface SafeActionPlan {
  immediate: ActionStep[];
  next: ActionStep[];
}

export interface AnalysisResult {
  incidentId: string;
  timestamp: string;
  evidenceHash: string;
  fileName?: string;
  fileSize?: string;
  submittedContent?: string;
  scamCategory: string;
  scamCategoryTelugu?: string;
  riskLevel: RiskLevel;
  confidence: number;
  summary: string;
  summaryTelugu?: string;
  indicators: Indicator[];
  extractedEntities: ExtractedEntities;
  safeActionPlan: SafeActionPlan;
  missingInformation: string[];
  missingInformationTelugu?: string[];
  disclaimer: string;
  disclaimerTelugu?: string;
  isDemo?: boolean;
  fallbackNotice?: string;
}

export interface DemoCase {
  id: string;
  title: string;
  titleTelugu: string;
  category: string;
  categoryTelugu: string;
  shortDescription: string;
  shortDescriptionTelugu: string;
  sampleText: string;
  riskLevel: RiskLevel;
  confidence: number;
  summary: string;
  summaryTelugu: string;
  indicators: Indicator[];
  extractedEntities: ExtractedEntities;
  safeActionPlan: SafeActionPlan;
  missingInformation: string[];
  missingInformationTelugu: string[];
  evidenceHash: string;
  fileName: string;
}

export interface EvidenceVaultItem {
  id: string;
  incidentId: string;
  fileName: string;
  fileSize: string;
  hash: string;
  timestamp: string;
  scamCategory: string;
  riskLevel: RiskLevel;
  rawContent?: string;
}
