import { ReviewValidationError } from './types';
import type { WeeklyReviewInputs } from './types';

export const normalizeISOToDate = (isoString: string): string => {
  return isoString.split('T')[0];
};

export const validateReviewInputs = (inputs: WeeklyReviewInputs): void => {
  const { currentSummary } = inputs;
  
  if (currentSummary.weekStart > currentSummary.weekEnd) {
    throw new ReviewValidationError(`Invalid week bounds: ${currentSummary.weekStart} is after ${currentSummary.weekEnd}`);
  }

  if (inputs.currentScore < 0 || inputs.currentScore > 100) {
    throw new ReviewValidationError(`Invalid current score: ${inputs.currentScore}. Must be 0-100.`);
  }

  if (inputs.previousScore !== null && (inputs.previousScore < 0 || inputs.previousScore > 100)) {
    throw new ReviewValidationError(`Invalid previous score: ${inputs.previousScore}. Must be 0-100.`);
  }
  
  if (Number.isNaN(inputs.currentFootprint) || !Number.isFinite(inputs.currentFootprint)) {
    throw new ReviewValidationError('Invalid footprint calculation');
  }
};
