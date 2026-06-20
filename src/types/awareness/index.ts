export type AwarenessCardType = 'tip' | 'fact' | 'insight' | 'achievement';

export interface AwarenessCard {
  id: string;
  cardType: AwarenessCardType;
  title: string;
  description: string;
  priority: number;
  lastShownAt?: string;
}
