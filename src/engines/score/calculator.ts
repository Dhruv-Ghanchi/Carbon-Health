import type { ScoreInput, ScoreResult, CarbonLevelString } from './types';
import { SCORE_WEIGHTS, FOOTPRINT_THRESHOLDS, BASELINE_POINTS, TREND_THRESHOLDS, TREND_POINTS, LEVEL_THRESHOLDS } from './constants';
import { validateScoreInput } from './validators';



export const calculateBaselineScore = (currentFootprint: number): number => {
  if (currentFootprint <= FOOTPRINT_THRESHOLDS.EXCELLENT) return BASELINE_POINTS.EXCELLENT;

  if (currentFootprint <= FOOTPRINT_THRESHOLDS.GOOD) {
    const range = FOOTPRINT_THRESHOLDS.GOOD - FOOTPRINT_THRESHOLDS.EXCELLENT;
    const value = currentFootprint - FOOTPRINT_THRESHOLDS.EXCELLENT;
    const ptRange = BASELINE_POINTS.EXCELLENT - BASELINE_POINTS.GOOD;
    return BASELINE_POINTS.EXCELLENT - (value / range) * ptRange;
  }

  if (currentFootprint <= FOOTPRINT_THRESHOLDS.AVERAGE) {
    const range = FOOTPRINT_THRESHOLDS.AVERAGE - FOOTPRINT_THRESHOLDS.GOOD;
    const value = currentFootprint - FOOTPRINT_THRESHOLDS.GOOD;
    const ptRange = BASELINE_POINTS.GOOD - BASELINE_POINTS.AVERAGE;
    return BASELINE_POINTS.GOOD - (value / range) * ptRange;
  }

  if (currentFootprint <= FOOTPRINT_THRESHOLDS.POOR) {
    const range = FOOTPRINT_THRESHOLDS.POOR - FOOTPRINT_THRESHOLDS.AVERAGE;
    const value = currentFootprint - FOOTPRINT_THRESHOLDS.AVERAGE;
    const ptRange = BASELINE_POINTS.AVERAGE - BASELINE_POINTS.POOR;
    return BASELINE_POINTS.AVERAGE - (value / range) * ptRange;
  }

  // Scale down to 0 at 2000kg
  if (currentFootprint <= 2000) {
    const range = 2000 - FOOTPRINT_THRESHOLDS.POOR;
    const value = currentFootprint - FOOTPRINT_THRESHOLDS.POOR;
    const ptRange = BASELINE_POINTS.POOR - BASELINE_POINTS.VERY_HIGH;
    return BASELINE_POINTS.POOR - (value / range) * ptRange;
  }

  return BASELINE_POINTS.VERY_HIGH;
};

export const calculateTrendScore = (currentFootprint: number, previousFootprint?: number): number => {
  if (previousFootprint === undefined) return TREND_POINTS.NO_HISTORY;
  if (previousFootprint === 0) {
    // Edge case: if previous was perfectly 0, any increase is infinitely bad, maintaining 0 is excellent
    if (currentFootprint === 0) return TREND_POINTS.EXCELLENT;
    return 0;
  }

  const changePercent = (currentFootprint - previousFootprint) / previousFootprint;

  if (changePercent <= TREND_THRESHOLDS.EXCELLENT_REDUCTION) return TREND_POINTS.EXCELLENT;
  if (changePercent <= TREND_THRESHOLDS.GOOD_REDUCTION) return TREND_POINTS.GOOD;
  if (changePercent <= TREND_THRESHOLDS.NEUTRAL) return TREND_POINTS.NEUTRAL;
  
  // Worsening penalty: linearly scale from 15 points (0% change) down to 0 points (+15% change)
  const penaltyScore = TREND_POINTS.NEUTRAL - (changePercent / 0.15) * TREND_POINTS.NEUTRAL;
  return Math.max(0, penaltyScore);
};

export const calculateActionScore = (completedActions: number, assignedActions: number): number => {
  if (assignedActions === 0) return 0; // Handled by proration in main function
  
  const completionRatio = completedActions / assignedActions;
  return completionRatio * SCORE_WEIGHTS.ACTION;
};

export const getCarbonLevel = (score: number): CarbonLevelString => {
  if (score >= LEVEL_THRESHOLDS.CLIMATE_CHAMPION) return 'Climate Champion';
  if (score >= LEVEL_THRESHOLDS.GREEN_GUARDIAN) return 'Green Guardian';
  if (score >= LEVEL_THRESHOLDS.ECO_EXPLORER) return 'Eco Explorer';
  return 'Carbon Beginner';
};

export const calculateCarbonHealthScore = (input: ScoreInput): ScoreResult => {
  validateScoreInput(input);

  const baselineContribution = calculateBaselineScore(input.currentFootprint);
  const trendContribution = calculateTrendScore(input.currentFootprint, input.previousFootprint);
  
  const baselineInt = Math.round(baselineContribution);
  const trendInt = Math.round(trendContribution);
  let actionInt = 0;

  if (input.assignedActions === 0) {
    // Newbie Proration: Score out of 60, scaled to 100
    const availableWeight = SCORE_WEIGHTS.BASELINE + SCORE_WEIGHTS.TREND; // 60
    const earned = baselineContribution + trendContribution;
    const rawProrated = (earned / availableWeight) * 100;
    const totalInt = Math.round(rawProrated);
    
    // Action component perfectly absorbs the prorated gap to guarantee A+B+C = Total
    actionInt = totalInt - baselineInt - trendInt;
  } else {
    actionInt = Math.round(calculateActionScore(input.completedActions, input.assignedActions));
  }

  const carbonHealthScore = Math.max(0, Math.min(100, baselineInt + trendInt + actionInt));
  const statusLevel = getCarbonLevel(carbonHealthScore);

  let nextTier: CarbonLevelString | undefined;
  let nextTierBound: number | undefined;
  let currentTierBound: number = 0;

  if (carbonHealthScore < LEVEL_THRESHOLDS.ECO_EXPLORER) {
    nextTier = 'Eco Explorer';
    nextTierBound = LEVEL_THRESHOLDS.ECO_EXPLORER;
    currentTierBound = LEVEL_THRESHOLDS.CARBON_BEGINNER;
  } else if (carbonHealthScore < LEVEL_THRESHOLDS.GREEN_GUARDIAN) {
    nextTier = 'Green Guardian';
    nextTierBound = LEVEL_THRESHOLDS.GREEN_GUARDIAN;
    currentTierBound = LEVEL_THRESHOLDS.ECO_EXPLORER;
  } else if (carbonHealthScore < LEVEL_THRESHOLDS.CLIMATE_CHAMPION) {
    nextTier = 'Climate Champion';
    nextTierBound = LEVEL_THRESHOLDS.CLIMATE_CHAMPION;
    currentTierBound = LEVEL_THRESHOLDS.GREEN_GUARDIAN;
  }

  let pointsToNextTier: number | undefined;
  let progressPercentage: number | undefined;

  if (nextTierBound !== undefined && nextTier) {
    pointsToNextTier = nextTierBound - carbonHealthScore;
    const range = nextTierBound - currentTierBound;
    const progress = carbonHealthScore - currentTierBound;
    progressPercentage = Math.round((progress / range) * 100);
  } else {
    // Already max tier
    progressPercentage = 100;
  }

  return {
    carbonHealthScore,
    statusLevel,
    explanation: {
      baselineContribution: baselineInt,
      trendContribution: trendInt,
      actionContribution: actionInt,
    },
    nextTier,
    pointsToNextTier,
    progressPercentage,
  };
};
