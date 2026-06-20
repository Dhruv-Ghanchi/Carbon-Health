import type { CarbonLevel } from '../common';
import type { RecommendationCategory } from '../recommendation';

export interface CarbonHealthReport {
  carbonHealthScore: number;
  statusLevel: CarbonLevel;
  currentFootprint: number;
  potentialFootprint: number;
  biggestContributor: RecommendationCategory;
  quickestWin: string;
  estimatedReduction: number;
  generatedAt: string;
}
