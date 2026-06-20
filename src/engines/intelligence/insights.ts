import type { IntelligenceContext, Insight } from './types';

export function generateInsights(context: IntelligenceContext): Insight[] {
  const insights: Insight[] = [];

  if (context.engagementLevel === 'HIGH') {
    insights.push({
      id: 'insight_engagement_high',
      type: 'BEHAVIORAL',
      text: 'You have a strong check-in streak. Consistent habits lead to the biggest carbon reductions.',
      priority: 1
    });
  } else if (context.engagementLevel === 'LOW') {
    insights.push({
      id: 'insight_engagement_low',
      type: 'BEHAVIORAL',
      text: 'Checking in more often can keep your climate goals top of mind.',
      priority: 1
    });
  }

  if (context.missionSuccessRate > 0.8) {
    insights.push({
      id: 'insight_success_high',
      type: 'IMPROVEMENT',
      text: 'Your mission completion rate is excellent. Consider tackling higher-impact actions next week.',
      priority: 2
    });
  }

  if (context.trendDelta < 0) {
    insights.push({
      id: 'insight_trend_good',
      type: 'WEEKLY',
      text: `Your footprint is trending down by ${Math.abs(Math.round(context.trendDelta * 100))}% compared to your baseline.`,
      priority: 3
    });
  }

  insights.sort((a, b) => a.priority - b.priority);
  return insights;
}
