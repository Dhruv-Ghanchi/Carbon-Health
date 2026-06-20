import type { CarbonAssessment } from '../../types';
import { ValidationError } from './types';
import { TRANSPORT_FACTORS, COMMUTE_FACTORS, DIET_FACTORS, AC_FACTORS, ELECTRICITY_FACTORS, RECYCLING_FACTORS } from './constants';

export const validateAssessment = (assessment: CarbonAssessment): void => {
  if (!Number.isFinite(assessment.householdSize) || !Number.isInteger(assessment.householdSize) || assessment.householdSize < 1) {
    throw new ValidationError('Invalid household size: must be a finite integer of at least 1.');
  }
  
  if (!Object.prototype.hasOwnProperty.call(TRANSPORT_FACTORS, assessment.primaryTransport)) {
    throw new ValidationError(`Invalid primary transport: ${assessment.primaryTransport}`);
  }

  if (!Object.prototype.hasOwnProperty.call(COMMUTE_FACTORS, assessment.commuteDistance)) {
    throw new ValidationError(`Invalid commute distance: ${assessment.commuteDistance}`);
  }

  if (!Object.prototype.hasOwnProperty.call(DIET_FACTORS, assessment.meatConsumption)) {
    throw new ValidationError(`Invalid meat consumption: ${assessment.meatConsumption}`);
  }

  if (!Object.prototype.hasOwnProperty.call(AC_FACTORS, assessment.acUsage)) {
    throw new ValidationError(`Invalid AC usage: ${assessment.acUsage}`);
  }

  if (!Object.prototype.hasOwnProperty.call(ELECTRICITY_FACTORS, assessment.electricitySavingHabits)) {
    throw new ValidationError(`Invalid electricity saving habits: ${assessment.electricitySavingHabits}`);
  }

  if (!Object.prototype.hasOwnProperty.call(RECYCLING_FACTORS, assessment.recyclingHabits)) {
    throw new ValidationError(`Invalid recycling habits: ${assessment.recyclingHabits}`);
  }
};
