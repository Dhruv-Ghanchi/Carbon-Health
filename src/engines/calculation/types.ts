import type { RecommendationCategory } from '../../types';

export interface CalculationResult {
  totalFootprint: number;
  personalEmissions: number;
  sharedEmissions: number;
  breakdown: {
    transport: number;
    commute: number;
    diet: number;
    ac: number;
    electricity: number;
    consumption: number;
  };
  biggestContributor: RecommendationCategory;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
