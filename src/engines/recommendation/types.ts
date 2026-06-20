import type { RecommendationCategory } from '../../types';
import type { CarbonAssessment } from '../../types';

export type RecommendationType = 'ONE_TIME' | 'RECURRING';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  category: RecommendationCategory;
  difficulty: Difficulty;
  type: RecommendationType;
  recurringTarget?: number;
  estimatedReduction: number; 
  impactScore: number;        
  isFeasible: (assessment: CarbonAssessment) => boolean;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: RecommendationCategory;
  difficulty: Difficulty;
  type: RecommendationType;
  recurringTarget?: number;
  estimatedReduction: number;
  impactScore: number;
  priorityScore: number;
}

export class RecommendationValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RecommendationValidationError';
  }
}
