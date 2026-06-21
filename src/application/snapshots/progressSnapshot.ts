import { calculateStreaks } from '../../engines/progress/streakEngine';
import { generateJourneyEvents } from '../../engines/progress/journeyEngine';
import { generateWeeklySummary } from '../../engines/progress/progressEngine';
import type { DailyCheckIn, Mission } from '../../types';

export function buildProgressSnapshot(
  dailyCheckIns: DailyCheckIn[],
  completedMissions: Mission[]
) {
  // Use existing engines to derive progress intelligence
  const streakMetrics = calculateStreaks(dailyCheckIns as any); // Type cast if needed, the engine expects 'response' field, but the real data has 'completed' boolean.
  
  const timestampISO = new Date().toISOString();
  const journeyEvents = generateJourneyEvents(dailyCheckIns as any, completedMissions as any, [], timestampISO);
  
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  const weekStart = oneWeekAgo.toISOString().split('T')[0];
  const weekEnd = today.toISOString().split('T')[0];

  const weeklySummary = generateWeeklySummary(weekStart, weekEnd, dailyCheckIns as any, completedMissions as any, journeyEvents);

  return {
    isReady: true,
    streakMetrics,
    journeyEvents,
    weeklySummary,
    completedMissions,
    dailyCheckIns
  };
}
