import type { MotivationLevel } from '../common';

export interface UserProfile {
  id: string;
  name: string;
  motivationLevel: MotivationLevel;
  createdAt: string;
  updatedAt: string;
}

export interface UserProgress {
  activeMissionIds: string[];
  completedMissionIds: string[];
  currentLevel: number;
  totalReduction: number;
  totalActionsCompleted: number;
}
