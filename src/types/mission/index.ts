import type { RecommendationCategory } from '../recommendation';

export type MissionDifficulty = 'easy' | 'medium' | 'hard';
export type MissionStatus = 'available' | 'in_progress' | 'completed' | 'abandoned';
export type MissionType = 'one_time' | 'habit';

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: RecommendationCategory;
  difficulty: MissionDifficulty;
  targetReduction: number;
  status: MissionStatus;
  missionType: MissionType;
  streakCount: number;
  createdAt: string;
  completedAt?: string;
}
