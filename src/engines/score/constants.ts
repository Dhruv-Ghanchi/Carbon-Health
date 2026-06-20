export const SCORE_WEIGHTS = {
  BASELINE: 30,
  TREND: 30,
  ACTION: 40,
} as const;

// Footprint thresholds in kg CO2e per month
export const FOOTPRINT_THRESHOLDS = {
  EXCELLENT: 150, 
  GOOD: 300,      
  AVERAGE: 600,   
  POOR: 1000,     
} as const;

export const BASELINE_POINTS = {
  EXCELLENT: SCORE_WEIGHTS.BASELINE, // 30
  GOOD: 20,
  AVERAGE: 10,
  POOR: 5,
  VERY_HIGH: 0,
} as const;

// Trend thresholds based on % change (negative is good reduction, positive is worsening)
export const TREND_THRESHOLDS = {
  EXCELLENT_REDUCTION: -0.15, // <= -15%
  GOOD_REDUCTION: -0.05,      // <= -5%
  NEUTRAL: 0.0,               // <= 0%
} as const;

export const TREND_POINTS = {
  EXCELLENT: SCORE_WEIGHTS.TREND, // 30
  GOOD: 20,
  NEUTRAL: 10,
  NO_HISTORY: 10, // Default for new users
} as const;

export const LEVEL_THRESHOLDS = {
  CLIMATE_CHAMPION: 85,
  GREEN_GUARDIAN: 65,
  ECO_EXPLORER: 40,
  CARBON_BEGINNER: 0,
} as const;
