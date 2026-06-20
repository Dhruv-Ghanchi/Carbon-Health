import type { WeeklyReview, WeeklyReviewInputs, ReviewStats } from './types';
import { validateReviewInputs } from './validators';
import { generateInsights } from './insightEngine';

const generateSummaryText = (stats: ReviewStats): string => {
  if (stats.engagementRate === 0 && stats.missionsCompleted === 0) {
    return "You didn't record any check-ins or complete any missions this week. Let's try to take a small action next week!";
  }

  const parts: string[] = [];

  // 1. Missions
  if (stats.missionsCompleted > 0) {
    parts.push(`You completed ${stats.missionsCompleted} missions`);
  }

  // 2. Streaks
  if (stats.currentStreak >= 3) {
    parts.push(`maintained a ${stats.currentStreak}-day engagement streak`);
  } else if (stats.engagementRate > 0) {
    parts.push(`checked in ${stats.engagementRate}% of the time`);
  }

  // 3. Score
  if (stats.scoreChange > 0) {
    parts.push(`improved your sustainability score by ${Math.round(stats.scoreChange)} points`);
  } else if (stats.scoreChange < 0) {
    parts.push(`your sustainability score changed by ${Math.round(stats.scoreChange)} points`);
  }

  // 4. Footprint
  if (stats.footprintChange < 0) {
    parts.push(`reduced your footprint by ${Math.abs(stats.footprintChange)} tons`);
  }

  // 5. Events
  if (stats.journeyEvents.length > 0) {
    parts.push(`earned ${stats.journeyEvents.length} new achievements`);
  }

  if (parts.length === 0) return "You recorded some activity this week.";

  if (parts.length === 1) {
    // If "You completed..." is not the first part, capitalize it
    const pt = parts[0];
    return pt.charAt(0).toUpperCase() + pt.slice(1) + '.';
  }

  if (parts.length === 2) {
    let p0 = parts[0];
    p0 = p0.charAt(0).toUpperCase() + p0.slice(1);
    return `${p0} and ${parts[1]}.`;
  }

  let text = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  for (let i = 1; i < parts.length - 1; i++) {
    text += `, ${parts[i]}`;
  }
  text += `, and ${parts[parts.length - 1]}.`;

  return text;
};

export const generateWeeklyReview = (inputs: WeeklyReviewInputs): WeeklyReview => {
  validateReviewInputs(inputs);

  const { currentSummary, currentScore, previousScore, currentFootprint, previousFootprint, timestampISO } = inputs;

  const scoreChange = previousScore !== null ? currentScore - previousScore : 0;
  const footprintChange = previousFootprint !== null ? currentFootprint - previousFootprint : 0;

  const stats: ReviewStats = {
    engagementRate: currentSummary.engagementRate,
    missionsCompleted: currentSummary.missionsCompleted,
    currentStreak: currentSummary.currentStreak,
    longestStreak: currentSummary.longestStreak,
    scoreChange,
    footprintChange,
    journeyEvents: currentSummary.journeyEvents,
  };

  const { insights, achievements, risks } = generateInsights(inputs);

  const summaryText = generateSummaryText(stats);

  return {
    id: `weekly_review_${currentSummary.weekStart}_${currentSummary.weekEnd}`,
    weekStart: currentSummary.weekStart,
    weekEnd: currentSummary.weekEnd,
    summary: summaryText,
    insights,
    achievements,
    risks,
    stats,
    createdAt: timestampISO,
  };
};
