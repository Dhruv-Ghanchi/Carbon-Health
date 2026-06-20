export const RECOMMENDATION_WEIGHTS = {
  IMPACT: 0.6,
  DIFFICULTY: 0.2,
  HABIT_ALIGNMENT: 0.1,
  MOTIVATION: 0.1,
} as const;

export const DIFFICULTY_MULTIPLIERS = {
  easy: 1.0,   // Highest priority boost for easy
  medium: 0.7,
  hard: 0.4,
} as const;

// Motivation Level maps to difficulty allowed
export const MOTIVATION_CEILINGS = {
  casual: ['easy'],
  committed: ['easy', 'medium'],
  urgent: ['easy', 'medium', 'hard'],
} as const;
