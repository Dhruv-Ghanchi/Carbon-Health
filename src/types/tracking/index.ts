export interface DailyCheckIn {
  id: string;
  date: string;
  completed: boolean;
  missionWorkedOn?: string;
}

export interface WeeklyReview {
  id: string;
  weekStart: string;
  weekEnd: string;
  previousScore: number;
  currentScore: number;
  scoreChange: number;
  footprintChange: number;
  missionProgress: number;
  bestImprovement: string;
}
