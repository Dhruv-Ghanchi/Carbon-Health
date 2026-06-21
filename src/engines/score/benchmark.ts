import { LEVEL_THRESHOLDS } from './constants';

export interface BenchmarkResult {
  percentileRank: number; // 0 to 100 (higher is better rank, e.g., 90 means top 10%)
  percentileText: string;
  explanation: string;
}

export function calculateBenchmark(carbonScore: number): BenchmarkResult {
  if (carbonScore >= LEVEL_THRESHOLDS.CLIMATE_CHAMPION) {
    return {
      percentileRank: 90, // Top 10%
      percentileText: "Top 10%",
      explanation: "Because you reached the Climate Champion tier, you are in the top 10% of similar users.",
    };
  }
  
  if (carbonScore >= LEVEL_THRESHOLDS.GREEN_GUARDIAN) {
    return {
      percentileRank: 70, // Top 30%
      percentileText: "Top 30%",
      explanation: "Because you reached the Green Guardian tier, you are in the top 30% of similar users.",
    };
  }
  
  if (carbonScore >= LEVEL_THRESHOLDS.ECO_EXPLORER) {
    return {
      percentileRank: 40, // Top 60%
      percentileText: "Top 60%",
      explanation: "Because you reached the Eco Explorer tier, you are in the top 60% of similar users.",
    };
  }
  
  return {
    percentileRank: 10, // Bottom 40% (display as Top 90% or Bottom 40%)
    percentileText: "Bottom 40%",
    explanation: "Because you are in the Carbon Beginner tier, you are currently in the bottom 40% of users.",
  };
}
