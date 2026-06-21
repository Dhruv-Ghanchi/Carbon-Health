import type { ReviewInsight, WeeklyReviewInputs } from './types';
import { REVIEW_CONSTANTS } from './constants';
import { detectTrend } from './trendEngine';

export const generateInsights = (inputs: WeeklyReviewInputs): { insights: ReviewInsight[], achievements: string[], risks: { id: string; text: string; severity: 'LOW' | 'MEDIUM' | 'HIGH' }[] } => {
  const insights: ReviewInsight[] = [];

  let insightCounter = 1;
  const addInsight = (type: ReviewInsight['type'], text: string) => {
    insights.push({ id: `insight_${inputs.currentSummary.weekEnd}_${insightCounter++}`, type, text });
  };

  const { currentSummary, previousSummary, currentScore, previousScore, currentFootprint, previousFootprint } = inputs;

  // Engagement Trend
  const engagementTrend = detectTrend(
    currentSummary.engagementRate, 
    previousSummary?.engagementRate ?? null, 
    REVIEW_CONSTANTS.STABLE_MARGIN_PERCENT, 
    true
  );

  if (engagementTrend === 'IMPROVING') {
    addInsight('ACHIEVEMENT', 'Engagement increased compared to last week.');
  } else  if (engagementTrend === 'DECLINING') {
    const diff = (previousSummary?.engagementRate ?? 0) - currentSummary.engagementRate;
    if (diff > REVIEW_CONSTANTS.RISK_ENGAGEMENT_DROP) {
      addInsight('RISK', `Engagement dropped by ${diff}% compared to last week.`);
    } else {
      addInsight('OBSERVATION', 'Engagement decreased compared to last week.');
    }
  }

  // Score Trend
  const scoreTrend = detectTrend(currentScore, previousScore, REVIEW_CONSTANTS.STABLE_SCORE_MARGIN, true);
  if (scoreTrend === 'IMPROVING') {
    const pts = currentScore - (previousScore ?? 0);
    addInsight('ACHIEVEMENT', `Sustainability score improved by ${Math.round(pts)} points.`);
  } else if (scoreTrend === 'DECLINING') {
    addInsight('RISK', 'Sustainability score declined.');
  }

  // Footprint Trend (Lower is better)
  const footprintTrend = detectTrend(currentFootprint, previousFootprint, REVIEW_CONSTANTS.STABLE_FOOTPRINT_MARGIN, false);
  if (footprintTrend === 'IMPROVING') {
    addInsight('ACHIEVEMENT', 'Carbon footprint reduced compared to last week.');
  } else if (footprintTrend === 'DECLINING') {
    addInsight('RISK', 'Carbon footprint increased compared to last week.');
  }

  // Pure Observations
  if (currentSummary.missionsCompleted > 0) {
    addInsight('ACHIEVEMENT', `Completed ${currentSummary.missionsCompleted} missions this week.`);
  }
  
  if (currentSummary.currentStreak >= 7) {
    addInsight('ACHIEVEMENT', `Maintained a ${currentSummary.currentStreak}-day engagement streak.`);
  }

  // Journey Engine Achievements (No duplicates)


  // Zero Check-in Risk
  if (currentSummary.checkInCount === 0) {
    addInsight('RISK', 'No check-ins recorded this week.');
  }

  const achievementsArr: string[] = [];
  const risksArr: { id: string; text: string; severity: 'LOW' | 'MEDIUM' | 'HIGH' }[] = [];


  if (scoreTrend === 'IMPROVING') achievementsArr.push('Score Improved');
  if (scoreTrend === 'DECLINING') {
    risksArr.push({ id: `risk_${currentSummary.weekEnd}_${risksArr.length + 1}`, text: 'Score Declined', severity: 'LOW' });
  }
  if (footprintTrend === 'DECLINING') {
    risksArr.push({ id: `risk_${currentSummary.weekEnd}_${risksArr.length + 1}`, text: 'Footprint Increased', severity: 'LOW' });
  }

  if (engagementTrend === 'DECLINING') {
    const diff = (previousSummary?.engagementRate ?? 0) - currentSummary.engagementRate;
    if (diff > REVIEW_CONSTANTS.RISK_ENGAGEMENT_DROP) {
      risksArr.push({ id: `risk_${currentSummary.weekEnd}_${risksArr.length + 1}`, text: 'Significant Engagement Drop', severity: 'MEDIUM' });
    }
  }

  for (const event of currentSummary.journeyEvents) {
    achievementsArr.push(event.title);
  }

  if (currentSummary.checkInCount === 0) {
    risksArr.push({ id: `risk_${currentSummary.weekEnd}_${risksArr.length + 1}`, text: 'Zero Check-ins', severity: 'HIGH' });
  }

  return {
    insights,
    achievements: achievementsArr,
    risks: risksArr
  };
};
