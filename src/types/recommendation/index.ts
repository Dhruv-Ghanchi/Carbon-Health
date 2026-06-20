export type RecommendationCategory = 'transport' | 'energy' | 'diet' | 'consumption';
export type RecommendationType = 'one_time' | 'habit';
export type RecommendationDifficulty = 'easy' | 'medium' | 'hard';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: RecommendationCategory;
  difficulty: RecommendationDifficulty;
  estimatedReduction: number;
  impactScore: number;
  recommendationType: RecommendationType;
  active: boolean;
  createdAt: string;
}
