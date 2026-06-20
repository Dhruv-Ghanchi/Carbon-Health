export type MotivationLevel = 'casual' | 'committed' | 'urgent';

export interface IntelligenceContext {
  motivation: MotivationLevel;
  engagementLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  missionSuccessRate: number; // 0 to 1
  trendDelta: number; // negative means reduction (good), positive means increase (bad)
}

export interface AdaptationModifiers {
  difficultyMultiplier: number; // e.g. 1.2 for harder missions
  recommendationPriorityMod: Record<string, number>; // Category ID to modifier
  awarenessTone: 'ENCOURAGING' | 'URGENT' | 'CELEBRATORY' | 'NEUTRAL';
}

export interface Insight {
  id: string;
  type: 'WEEKLY' | 'BEHAVIORAL' | 'IMPROVEMENT';
  text: string;
  priority: number;
}

export interface UnifiedNarrative {
  headline: string;
  subheadline: string;
  tone: string;
  insights: Insight[];
}
