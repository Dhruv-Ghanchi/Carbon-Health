export const REVIEW_CONSTANTS = {
  STABLE_MARGIN_PERCENT: 5, // engagement diff <= 5% is STABLE
  STABLE_SCORE_MARGIN: 2,   // score diff <= 2 is STABLE
  STABLE_FOOTPRINT_MARGIN: 0.1, // footprint diff <= 0.1 tons is STABLE
  RISK_ENGAGEMENT_DROP: 20, // engagement drop > 20% triggers a risk
} as const;
