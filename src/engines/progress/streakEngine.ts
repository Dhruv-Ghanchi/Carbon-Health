import type { DailyCheckIn, StreakMetrics } from './types';

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

const getDaysInMonth = (year: number, month: number): number => {
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month - 1];
};

const dateToAbsoluteDays = (dateStr: string): number => {
  const parts = dateStr.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  let totalDays = 0;
  for (let y = 1970; y < year; y++) {
    totalDays += isLeapYear(y) ? 366 : 365;
  }
  for (let m = 1; m < month; m++) {
    totalDays += getDaysInMonth(year, m);
  }
  totalDays += day;
  return totalDays;
};

const getDaysDiff = (date1: string, date2: string): number => {
  return dateToAbsoluteDays(date2) - dateToAbsoluteDays(date1);
};

export const calculateStreaks = (checkIns: DailyCheckIn[]): StreakMetrics => {
  if (checkIns.length === 0) {
    return { currentStreak: 0, longestStreak: 0, totalCheckIns: 0, yesCount: 0, noCount: 0, engagementRate: 0 };
  }

  const sortedCheckIns = [...checkIns].sort((a, b) => a.date.localeCompare(b.date));

  let currentStreak = 0;
  let longestStreak = 0;
  let yesCount = 0;
  let noCount = 0;

  for (let i = 0; i < sortedCheckIns.length; i++) {
    const current = sortedCheckIns[i];
    if (current.response === 'YES') {
      yesCount++;
      if (i > 0) {
        const prevDate = sortedCheckIns[i-1].date;
        const daysDiff = getDaysDiff(prevDate, current.date);
        
        // If contiguous logic
        if (daysDiff === 1) {
          // It's the next consecutive day
          currentStreak++;
        } else if (daysDiff > 1) {
          // Gap of any days breaks the streak
          currentStreak = 1;
        } else {
          // daysDiff === 0 means duplicate date (prevented by engine), but handled gracefully
          // No increment.
        }
      } else {
        currentStreak = 1;
      }
      
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
    } else {
      noCount++;
      currentStreak = 0;
    }
  }

  const engagementRate = Math.round((yesCount / checkIns.length) * 100);

  return {
    currentStreak,
    longestStreak,
    totalCheckIns: checkIns.length,
    yesCount,
    noCount,
    engagementRate,
  };
};
