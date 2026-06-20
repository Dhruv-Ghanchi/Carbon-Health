import { ValidationError, type ScoreInput } from './types';

export const validateScoreInput = (input: ScoreInput): void => {
  if (!Number.isFinite(input.currentFootprint) || input.currentFootprint < 0) {
    throw new ValidationError('Invalid currentFootprint: must be a positive finite number.');
  }

  if (input.previousFootprint !== undefined) {
    if (input.previousFootprint === null) {
      throw new ValidationError('Invalid previousFootprint: null is not allowed.');
    }
    if (!Number.isFinite(input.previousFootprint) || input.previousFootprint < 0) {
      throw new ValidationError('Invalid previousFootprint: must be a positive finite number.');
    }
  }

  if (!Number.isFinite(input.completedActions) || !Number.isInteger(input.completedActions) || input.completedActions < 0) {
    throw new ValidationError('Invalid completedActions: must be a positive finite integer.');
  }

  if (!Number.isFinite(input.assignedActions) || !Number.isInteger(input.assignedActions) || input.assignedActions < 0) {
    throw new ValidationError('Invalid assignedActions: must be a positive finite integer.');
  }

  if (input.completedActions > input.assignedActions) {
    throw new ValidationError('Invalid actions: completedActions cannot exceed assignedActions.');
  }
};
