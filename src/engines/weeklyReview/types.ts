import type { JourneyEvent, WeeklyProgressSummary } from '../progress/types';

export type TrendType = 'IMPROVING' | 'STABLE' | 'DECLINING' | 'INSUFFICIENT_DATA';

export type InsightType = 'ACHIEVEMENT' | 'RISK' | 'OPPORTUNITY' | 'OBSERVATION';

export interface ReviewInsight {
  id: string;
  type: InsightType;
  text: string;
}

export interface ReviewStats {
  engagementRate: number;
  missionsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  scoreChange: number;
  footprintChange: number;
  journeyEvents: JourneyEvent[];
}

export type RiskSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ReviewRisk {
  id: string;
  text: string;
  severity: RiskSeverity;
}

export interface WeeklyReview {
  id: string;
  weekStart: string; // YYYY-MM-DD
  weekEnd: string; // YYYY-MM-DD
  summary: string;
  insights: ReviewInsight[];
  achievements: string[];
  risks: ReviewRisk[];
  stats: ReviewStats;
  createdAt: string; // ISO
}

export interface WeeklyReviewInputs {
  currentSummary: WeeklyProgressSummary;
  previousSummary: WeeklyProgressSummary | null;
  currentScore: number;
  previousScore: number | null;
  currentFootprint: number;
  previousFootprint: number | null;
  timestampISO: string;
}

export class ReviewValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ReviewValidationError';
  }
}
