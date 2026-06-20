export const MISSION_LIMITS = {
  MAX_ACTIVE_MISSIONS: 3,
} as const;

export const PROGRESS_THRESHOLDS = {
  COMPLETION_PERCENTAGE: 100,
} as const;

export const DIFFICULTY_THRESHOLDS = {
  EASY_MAX: 20,
  MEDIUM_MAX: 40,
} as const;

export const EFFORT_SCORES = {
  easy: 10,
  medium: 20,
  hard: 30,
} as const;
