export type ScaleScore = 0 | 1 | 2 | 3 | 4 | 5;

export type DomainCategory = 'nasal' | 'ear_facial' | 'sleep' | 'psychological';

export interface SnotQuestion {
  id: number;
  text: string;
  domain: DomainCategory;
  domainLabel: string;
  hint?: string;
}

export interface DomainSummary {
  category: DomainCategory;
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
  color: string;
}

export interface InterpretationResult {
  level: 'normal' | 'mild' | 'moderate' | 'severe';
  title: string;
  badgeColor: string;
  description: string;
  recommendation: string;
  needsDoctorVisit: boolean;
}
