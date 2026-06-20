import type { CarbonAssessment, UserProfile } from '../../types';
import type { CatalogItem, Recommendation, Difficulty } from './types';
import { CATALOG } from './catalog';
import { RECOMMENDATION_WEIGHTS, DIFFICULTY_MULTIPLIERS, MOTIVATION_CEILINGS } from './constants';
import { validateCatalog } from './validators';

// Validate the global catalog once on load
validateCatalog(CATALOG);

const isDifficultyAllowed = (difficulty: Difficulty, motivation: UserProfile['motivationLevel']): boolean => {
  const allowed = MOTIVATION_CEILINGS[motivation as keyof typeof MOTIVATION_CEILINGS] as readonly string[];
  return allowed.includes(difficulty);
};

const calculatePriority = (item: CatalogItem, assessment: CarbonAssessment, user: UserProfile): number => {
  const impactWeight = item.impactScore * RECOMMENDATION_WEIGHTS.IMPACT;
  const difficultyBoost = DIFFICULTY_MULTIPLIERS[item.difficulty] * (RECOMMENDATION_WEIGHTS.DIFFICULTY * 100);
  
  let habitBoost = 0;
  if (item.category === 'transport' && assessment.primaryTransport === 'car_gas') habitBoost = RECOMMENDATION_WEIGHTS.HABIT_ALIGNMENT * 100;
  if (item.category === 'energy' && assessment.acUsage === 'always') habitBoost = RECOMMENDATION_WEIGHTS.HABIT_ALIGNMENT * 100;
  if (item.category === 'diet' && assessment.meatConsumption === 'daily') habitBoost = RECOMMENDATION_WEIGHTS.HABIT_ALIGNMENT * 100;

  let motivationBoost = 0;
  if (user.motivationLevel === 'casual' && item.difficulty === 'easy') {
    motivationBoost = RECOMMENDATION_WEIGHTS.MOTIVATION * 100;
  } else if (user.motivationLevel === 'urgent' && item.impactScore >= 70) {
    motivationBoost = RECOMMENDATION_WEIGHTS.MOTIVATION * 100;
  }

  return Number((impactWeight + difficultyBoost + habitBoost + motivationBoost).toFixed(2));
};

export const generateRecommendations = (
  assessment: CarbonAssessment, 
  user: UserProfile,
  completedRecommendationIds?: string[]
): Recommendation[] => {
  // 1. Feasibility & Motivation Filtration
  const validItems = CATALOG.filter(item => {
    if (completedRecommendationIds && item.type === 'ONE_TIME' && completedRecommendationIds.includes(item.id)) return false;
    if (!item.isFeasible(assessment)) return false;
    if (!isDifficultyAllowed(item.difficulty, user.motivationLevel)) return false;
    return true;
  });

  // 2. Priority Scoring & Sorting
  const ranked: Recommendation[] = validItems.map(item => {
    const { isFeasible, ...rest } = item;
    return {
      ...rest,
      priorityScore: calculatePriority(item, assessment, user)
    };
  }).sort((a, b) => (b.priorityScore - a.priorityScore) || a.id.localeCompare(b.id));

  // 3. Diversity Enforcement (Top 3 max 2 from same category)
  const top3: Recommendation[] = [];
  const remaining: Recommendation[] = [];
  const categoryCounts: Record<string, number> = {};

  for (const rec of ranked) {
    if (top3.length < 3) {
      const count = categoryCounts[rec.category] || 0;
      if (count < 2) {
        top3.push(rec);
        categoryCounts[rec.category] = count + 1;
      } else {
        remaining.push(rec);
      }
    } else {
      remaining.push(rec);
    }
  }

  remaining.sort((a, b) => (b.priorityScore - a.priorityScore) || a.id.localeCompare(b.id));

  return [...top3, ...remaining];
};
