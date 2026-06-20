import { MissionValidationError } from './types';
import type { Mission } from './types';

const VALID_STATUSES = ['NOT_STARTED', 'ACTIVE', 'COMPLETED', 'ARCHIVED'];
const VALID_TYPES = ['ONE_TIME', 'RECURRING'];
const VALID_CATEGORIES = ['transport', 'energy', 'diet', 'consumption'];

export const validateMission = (mission: Mission): void => {
  if (!VALID_STATUSES.includes(mission.status)) {
    throw new MissionValidationError(`Invalid status: ${mission.status}`);
  }
  
  if (!VALID_TYPES.includes(mission.type)) {
    throw new MissionValidationError(`Invalid type: ${mission.type}`);
  }

  if (!VALID_CATEGORIES.includes(mission.category)) {
    throw new MissionValidationError(`Invalid category: ${mission.category}`);
  }

  if (!Number.isFinite(mission.progress.current) || mission.progress.current < 0) {
    throw new MissionValidationError(`Invalid progress current: cannot be negative or NaN. Passed: ${mission.progress.current}`);
  }

  if (!Number.isInteger(mission.progress.target) || mission.progress.target < 1) {
    throw new MissionValidationError(`Invalid progress target: must be >= 1. Passed: ${mission.progress.target}`);
  }

  if (mission.progress.current > mission.progress.target) {
    throw new MissionValidationError(`Progress current cannot exceed target.`);
  }

  if (mission.status === 'COMPLETED' && mission.progress.current !== mission.progress.target) {
    throw new MissionValidationError(`Mission marked COMPLETED but progress is not 100%`);
  }
};
