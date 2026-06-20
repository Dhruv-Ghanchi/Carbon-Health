export type JourneyEventType = 'assessment_completed' | 'mission_started' | 'mission_completed' | 'level_up' | 'streak_achieved';

export interface JourneyEvent {
  id: string;
  eventType: JourneyEventType;
  title: string;
  description: string;
  timestamp: string;
}
