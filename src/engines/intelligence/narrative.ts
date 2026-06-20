import type { AdaptationModifiers, Insight, UnifiedNarrative } from './types';

export function buildUnifiedNarrative(
  modifiers: AdaptationModifiers,
  insights: Insight[]
): UnifiedNarrative {
  let headline = 'Your Climate Journey';
  let subheadline = 'Every action counts.';

  if (modifiers.awarenessTone === 'CELEBRATORY') {
    headline = 'Fantastic Progress!';
    subheadline = 'You are crushing your carbon reduction goals.';
  } else if (modifiers.awarenessTone === 'ENCOURAGING') {
    headline = 'Keep Going!';
    subheadline = 'Small steps lead to massive impact over time.';
  } else if (modifiers.awarenessTone === 'URGENT') {
    headline = 'Action Needed';
    subheadline = 'Your emissions are trending up. Let\'s get back on track.';
  }

  return {
    headline,
    subheadline,
    tone: modifiers.awarenessTone,
    insights
  };
}
