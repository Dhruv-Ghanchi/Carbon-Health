import type { Recommendation } from '../recommendation/types';
import type { CarbonAssessment, UserProfile, Mission } from '../../types';
import { generateRecommendations } from '../recommendation/ranking';
import { buildFatigueModel } from './fatigue';
import type { AdaptationModifiers } from './types';

function pseudoRandomShuffle<T>(array: T[], seed: string): T[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0; 
  }
  
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    hash = Math.abs((hash * 9301 + 49297) % 233280);
    const rnd = hash / 233280;
    const j = Math.floor(rnd * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function applyRecommendationAdapter(
  profile: UserProfile,
  assessment: CarbonAssessment,
  activeMissions: Mission[],
  completedMissions: Mission[],
  archivedMissions: Mission[],
  modifiers: AdaptationModifiers,
  weekStart: string
): Recommendation[] {
  let baseRecs = generateRecommendations(assessment, profile);

  const excludedIds = buildFatigueModel(activeMissions, completedMissions, archivedMissions);
  baseRecs = baseRecs.filter(r => !excludedIds.has(r.id));

  baseRecs = baseRecs.map(r => ({
    ...r,
    impactScore: Math.round(r.impactScore * modifiers.difficultyMultiplier)
  }));

  baseRecs = baseRecs.map(r => ({
    ...r,
    impactScore: Math.round(r.impactScore * (modifiers.recommendationPriorityMod[r.category] || 1.0))
  }));

  baseRecs.sort((a, b) => b.impactScore - a.impactScore);

  const topN = 5;
  if (baseRecs.length > topN) {
    const top = pseudoRandomShuffle(baseRecs.slice(0, topN), weekStart);
    baseRecs = [...top, ...baseRecs.slice(topN)];
  } else {
    baseRecs = pseudoRandomShuffle(baseRecs, weekStart);
  }

  return baseRecs;
}
