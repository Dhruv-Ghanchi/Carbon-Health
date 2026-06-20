import type { Mission } from './types';
import type { Recommendation } from '../recommendation/types';
import { createMissionFromRecommendation } from './missionFactory';
import { MISSION_LIMITS } from './constants';
import { validateMission } from './validators';

/**
 * Derives the completion percentage mathematically without persisting it to state.
 */
export const calculateMissionPercentage = (mission: Mission): number => {
  if (mission.progress.target === 0) return 0;
  return Math.min(100, Math.round((mission.progress.current / mission.progress.target) * 100));
};

/**
 * Selects top priority recommendations and converts them to ACTIVE missions
 * until the max active mission limit is reached. Deterministic assignment.
 */
export const syncActiveMissions = (
  recommendations: Recommendation[],
  existingMissions: Mission[],
  timestampISO: string
): Mission[] => {
  // Do not mutate arguments directly
  const newActive = existingMissions.filter(m => m.status === 'ACTIVE');
  const allMissions = [...existingMissions];

  for (const rec of recommendations) {
    if (newActive.length >= MISSION_LIMITS.MAX_ACTIVE_MISSIONS) break;

    const isAlreadyActive = allMissions.some(m => m.recommendationId === rec.id && m.status === 'ACTIVE');
    if (!isAlreadyActive) {
      const pastInstances = allMissions.filter(m => m.recommendationId === rec.id).length;
      const instanceNumber = pastInstances + 1;
      const mission = createMissionFromRecommendation(rec, instanceNumber, timestampISO);
      mission.status = 'ACTIVE';
      newActive.push(mission);
      allMissions.push(mission);
    }
  }

  return allMissions;
};

/**
 * Handles progress updates and automatically marks missions as COMPLETED.
 */
export const updateMissionProgress = (
  mission: Mission,
  increment: number,
  timestampISO: string
): Mission => {
  const updated: Mission = { 
    ...mission, 
    progress: { ...mission.progress }, 
    updatedAt: timestampISO 
  };
  
  updated.progress.current += increment;

  if (updated.progress.current >= updated.progress.target) {
    updated.progress.current = updated.progress.target; // Cap to exact target
    updated.status = 'COMPLETED';
  }

  validateMission(updated);
  return updated;
};

/**
 * Transitions eligible COMPLETED missions into ARCHIVED.
 * ONE_TIME missions archive permanently. 
 * RECURRING missions might reset or remain completed for the period, but per rules, ONE_TIME definitely archives.
 */
export const archiveEligibleMissions = (missions: Mission[], timestampISO: string): Mission[] => {
  return missions.map(m => {
    if (m.status === 'COMPLETED' && m.type === 'ONE_TIME') {
      const archived = { ...m, status: 'ARCHIVED' as const, updatedAt: timestampISO };
      validateMission(archived);
      return archived;
    }
    return m;
  });
};

/**
 * Exposes the retirement state formally. Consumers pass this output to the Recommendation Engine.
 */
export const getRetiredRecommendationIds = (missions: Mission[]): string[] => {
  const retired = new Set<string>();
  for (const m of missions) {
    if (m.status === 'ARCHIVED') {
      retired.add(m.recommendationId);
    }
  }
  return Array.from(retired);
};
