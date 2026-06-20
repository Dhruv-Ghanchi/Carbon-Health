import type { DailyCheckIn, JourneyEvent, WeeklyProgressSummary } from './types';
import { calculateStreaks } from './streakEngine';
import { normalizeISOToDate } from './validators';
import type { Mission } from '../missions/types';

export const generateWeeklySummary = (
  weekStart: string,
  weekEnd: string,
  checkIns: DailyCheckIn[],
  completedMissions: Mission[],
  journeyEvents: JourneyEvent[]
): WeeklyProgressSummary => {
  const normalizedStart = normalizeISOToDate(weekStart);
  const normalizedEnd = normalizeISOToDate(weekEnd);

  const weeklyCheckIns = checkIns.filter(c => {
    const d = normalizeISOToDate(c.date);
    return d >= normalizedStart && d <= normalizedEnd;
  });
  
  // Weekly summary explicitly reports metrics strictly within the 7-day window.
  // It does NOT report global streaks.
  const metrics = calculateStreaks(weeklyCheckIns);
  
  const missionsCompletedThisWeek = completedMissions.filter(m => {
    const missionDate = normalizeISOToDate(m.updatedAt);
    return missionDate >= normalizedStart && missionDate <= normalizedEnd;
  }).length;

  const weeklyEvents = journeyEvents.filter(e => {
    const eventDate = normalizeISOToDate(e.createdAt);
    return eventDate >= normalizedStart && eventDate <= normalizedEnd;
  });

  return {
    weekStart: normalizedStart,
    weekEnd: normalizedEnd,
    checkInCount: metrics.totalCheckIns,
    yesCount: metrics.yesCount,
    noCount: metrics.noCount,
    missionsCompleted: missionsCompletedThisWeek,
    currentStreak: metrics.currentStreak,
    longestStreak: metrics.longestStreak,
    engagementRate: metrics.engagementRate,
    journeyEvents: weeklyEvents,
  };
};
