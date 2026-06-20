import type { IntelligenceContext, AdaptationModifiers } from './types';

export function applyBehavioralAdaptation(context: IntelligenceContext): AdaptationModifiers {
  let difficultyMultiplier = 1.0;
  let awarenessTone: 'ENCOURAGING' | 'URGENT' | 'CELEBRATORY' | 'NEUTRAL' = 'NEUTRAL';
  
  if (context.motivation === 'committed' && context.missionSuccessRate > 0.8) {
    difficultyMultiplier = 1.15;
    awarenessTone = 'CELEBRATORY';
  } else if (context.motivation === 'casual' && context.engagementLevel === 'LOW') {
    difficultyMultiplier = 0.85;
    awarenessTone = 'ENCOURAGING';
  } else if (context.trendDelta > 0.1) {
    awarenessTone = 'URGENT';
  } else if (context.missionSuccessRate < 0.5) {
    difficultyMultiplier = 0.9;
    awarenessTone = 'ENCOURAGING';
  }

  const recommendationPriorityMod: Record<string, number> = {};
  if (context.engagementLevel === 'LOW') {
    recommendationPriorityMod['transport'] = 1.2;
  }

  return {
    difficultyMultiplier,
    recommendationPriorityMod,
    awarenessTone
  };
}
