import type { Mission, MissionDifficulty } from './types';
import type { Recommendation } from '../recommendation/types';
import { DIFFICULTY_THRESHOLDS, EFFORT_SCORES } from './constants';
import { validateMission } from './validators';

export const calculateMissionDifficulty = (rec: Recommendation): MissionDifficulty => {
  const effortScore = EFFORT_SCORES[rec.difficulty];
  const targetMultiplier = (rec.recurringTarget || 1) * 2;
  
  const totalScore = effortScore + targetMultiplier;
  
  if (totalScore <= DIFFICULTY_THRESHOLDS.EASY_MAX) return 'EASY';
  if (totalScore <= DIFFICULTY_THRESHOLDS.MEDIUM_MAX) return 'MEDIUM';
  return 'HARD';
};

export const createMissionFromRecommendation = (rec: Recommendation, instanceNumber: number, timestampISO: string): Mission => {
  const mission: Mission = {
    id: `mission_${rec.id}_${instanceNumber}`,
    recommendationId: rec.id,
    title: rec.title,
    description: rec.description,
    category: rec.category,
    type: rec.type,
    difficulty: calculateMissionDifficulty(rec),
    impactScore: rec.impactScore,
    status: 'NOT_STARTED',
    progress: {
      current: 0,
      target: rec.recurringTarget !== undefined ? rec.recurringTarget : 1,
    },
    createdAt: timestampISO,
    updatedAt: timestampISO,
  };

  validateMission(mission);
  return mission;
};
