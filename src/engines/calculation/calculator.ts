import type { CarbonAssessment, RecommendationCategory } from '../../types';
import { TRANSPORT_FACTORS, COMMUTE_FACTORS, DIET_FACTORS, AC_FACTORS, ELECTRICITY_FACTORS, RECYCLING_FACTORS } from './constants';
import { validateAssessment } from './validators';
import type { CalculationResult } from './types';

const roundToTwoDecimals = (num: number): number => {
  return Number(num.toFixed(2));
};

export const calculateCarbonFootprint = (assessment: CarbonAssessment): CalculationResult => {
  validateAssessment(assessment);

  // Personal Emissions (NOT DIVIDED)
  const transportEmission = TRANSPORT_FACTORS[assessment.primaryTransport];
  const commuteEmission = transportEmission * COMMUTE_FACTORS[assessment.commuteDistance];
  const dietEmission = DIET_FACTORS[assessment.meatConsumption];
  
  const personalEmissions = roundToTwoDecimals(transportEmission + commuteEmission + dietEmission);

  // Shared Emissions (DIVIDED by max 5)
  const divisor = Math.min(assessment.householdSize, 5);
  
  const acEmissionBase = AC_FACTORS[assessment.acUsage];
  const electricityEmissionBase = ELECTRICITY_FACTORS[assessment.electricitySavingHabits];
  const consumptionEmissionBase = RECYCLING_FACTORS[assessment.recyclingHabits];

  const acEmission = roundToTwoDecimals(acEmissionBase / divisor);
  const electricityEmission = roundToTwoDecimals(electricityEmissionBase / divisor);
  const consumptionEmission = roundToTwoDecimals(consumptionEmissionBase / divisor);

  const sharedEmissions = roundToTwoDecimals(acEmission + electricityEmission + consumptionEmission);
  const totalFootprint = roundToTwoDecimals(personalEmissions + sharedEmissions);

  // Determine biggest contributor mapping to RecommendationCategory
  const breakdowns = [
    { category: 'transport' as RecommendationCategory, value: transportEmission + commuteEmission },
    { category: 'energy' as RecommendationCategory, value: acEmission + electricityEmission },
    { category: 'diet' as RecommendationCategory, value: dietEmission },
    { category: 'consumption' as RecommendationCategory, value: consumptionEmission },
  ];

  // Tie-breaker priority: transport > energy > diet > consumption
  const categoryPriority: Record<RecommendationCategory, number> = {
    transport: 1,
    energy: 2,
    diet: 3,
    consumption: 4,
  };

  const biggestContributor = breakdowns.reduce((max, current) => {
    if (current.value > max.value) return current;
    if (current.value === max.value) {
      return categoryPriority[current.category] < categoryPriority[max.category] ? current : max;
    }
    return max;
  }).category;

  return {
    totalFootprint,
    personalEmissions,
    sharedEmissions,
    breakdown: {
      transport: transportEmission,
      commute: commuteEmission,
      diet: dietEmission,
      ac: acEmission,
      electricity: electricityEmission,
      consumption: consumptionEmission,
    },
    biggestContributor,
  };
};
