export type CheckInResponse = 'YES' | 'NO';

export interface DailyCheckIn {
  id: string;
  date: string; // Format: YYYY-MM-DD
  response: CheckInResponse;
  missionIds?: string[];
  createdAt: string; // ISO string
}

export interface StreakMetrics {
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  yesCount: number;
  noCount: number;
  engagementRate: number; // 0 to 100 percentage
}

export type JourneyEventType = 
  | 'FIRST_CHECKIN' 
  | 'STREAK_7' 
  | 'STREAK_30' 
  | 'FIRST_MISSION_COMPLETED' 
  | 'MISSIONS_5_COMPLETED' 
  | 'MISSIONS_10_COMPLETED';

export interface JourneyEvent {
  id: string;
  type: JourneyEventType;
  title: string;
  description: string;
  createdAt: string; // ISO string
  metadata?: Record<string, string | number>;
}

export interface WeeklyProgressSummary {
  weekStart: string; // YYYY-MM-DD
  weekEnd: string; // YYYY-MM-DD
  checkInCount: number;
  yesCount: number;
  noCount: number;
  missionsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  engagementRate: number;
  journeyEvents: JourneyEvent[];
}

export class ProgressValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProgressValidationError';
  }
}
