export type CarbonLevelString = 'Carbon Beginner' | 'Eco Explorer' | 'Green Guardian' | 'Climate Champion';

export interface ScoreInput {
  currentFootprint: number;
  previousFootprint?: number;
  completedActions: number;
  assignedActions: number;
}

export interface ScoreExplanation {
  baselineContribution: number;
  trendContribution: number;
  actionContribution: number;
}

export interface ScoreResult {
  carbonHealthScore: number;
  statusLevel: CarbonLevelString;
  explanation: ScoreExplanation;
  pointsToNextTier?: number;
  progressPercentage?: number;
  nextTier?: CarbonLevelString;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
