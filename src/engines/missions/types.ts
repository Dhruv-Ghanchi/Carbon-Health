import type { RecommendationType } from '../recommendation/types';
import type { RecommendationCategory } from '../../types';

export type MissionStatus = 'NOT_STARTED' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
export type MissionDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface MissionProgress {
  current: number;
  target: number;
}

export interface Mission {
  id: string;
  recommendationId: string;
  title: string;
  description: string;
  category: RecommendationCategory;
  type: RecommendationType;
  difficulty: MissionDifficulty;
  impactScore: number;
  status: MissionStatus;
  progress: MissionProgress;
  createdAt: string;
  updatedAt: string;
}

export class MissionValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissionValidationError';
  }
}
