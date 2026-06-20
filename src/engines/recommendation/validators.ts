import { RecommendationValidationError } from './types';
import type { CatalogItem } from './types';

export const validateRecommendation = (item: CatalogItem): void => {
  if (!['transport', 'energy', 'diet', 'consumption'].includes(item.category)) {
    throw new RecommendationValidationError(`Invalid category: ${item.category}`);
  }
  if (!['easy', 'medium', 'hard'].includes(item.difficulty)) {
    throw new RecommendationValidationError(`Invalid difficulty: ${item.difficulty}`);
  }
  if (!Number.isFinite(item.impactScore) || item.impactScore < 0 || item.impactScore > 100) {
    throw new RecommendationValidationError(`Invalid impactScore for ${item.id}: must be 0-100.`);
  }
  if (!Number.isFinite(item.estimatedReduction) || item.estimatedReduction < 0) {
    throw new RecommendationValidationError(`Invalid estimatedReduction for ${item.id}: must be positive.`);
  }
};

export const validateCatalog = (catalog: readonly CatalogItem[]): void => {
  const ids = new Set<string>();
  for (const item of catalog) {
    validateRecommendation(item);
    if (ids.has(item.id)) {
      throw new RecommendationValidationError(`Duplicate ID found in catalog: ${item.id}`);
    }
    ids.add(item.id);
  }
};
