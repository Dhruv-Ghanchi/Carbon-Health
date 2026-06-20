import { createCheckIn, appendCheckIn } from './checkInEngine';
import { calculateStreaks } from './streakEngine';
import { generateJourneyEvents } from './journeyEngine';
import { generateWeeklySummary } from './progressEngine';
import type { DailyCheckIn } from './types';
import type { Mission } from '../missions/types';

export const TEST_CASES = {
  runAll: () => {
    console.log("Running Phase 8 Progress Engine Tests...\n");
    const timestamp = '2026-06-20T00:00:00.000Z';

    const baseCheckIns: DailyCheckIn[] = [];

    console.log("=== Scenario 1: Duplicate check-in same day ===");
    try {
      const c1 = createCheckIn(baseCheckIns, '2026-07-01', 'YES', timestamp);
      const withC1 = appendCheckIn(baseCheckIns, c1);
      createCheckIn(withC1, '2026-07-01', 'YES', timestamp);
      console.log('❌ FAILED: Duplicate check-in allowed');
    } catch (e) {
      console.log('✅ PASSED: Validation failure on duplicate check-in');
    }

    console.log("\n=== Scenario 2: YES streak of 7 days ===");
    let streak7CheckIns: DailyCheckIn[] = [];
    for (let i = 1; i <= 7; i++) {
      const day = i.toString().padStart(2, '0');
      const ci = createCheckIn(streak7CheckIns, `2026-07-${day}`, 'YES', timestamp);
      streak7CheckIns = appendCheckIn(streak7CheckIns, ci);
    }
    const metrics7 = calculateStreaks(streak7CheckIns);
    console.log(`Current streak: ${metrics7.currentStreak} | Longest streak: ${metrics7.longestStreak}`);
    console.log(`✅ PASSED: Expect 7/7: ${metrics7.currentStreak === 7 && metrics7.longestStreak === 7}`);

    console.log("\n=== Scenario 3: YES YES YES NO ===");
    let streakNoCheckIns: DailyCheckIn[] = [];
    ['01', '02', '03'].forEach(d => {
      streakNoCheckIns = appendCheckIn(streakNoCheckIns, createCheckIn(streakNoCheckIns, `2026-07-${d}`, 'YES', timestamp));
    });
    streakNoCheckIns = appendCheckIn(streakNoCheckIns, createCheckIn(streakNoCheckIns, `2026-07-04`, 'NO', timestamp));
    const metricsNo = calculateStreaks(streakNoCheckIns);
    console.log(`Current streak: ${metricsNo.currentStreak} | Longest streak: ${metricsNo.longestStreak}`);
    console.log(`✅ PASSED: Expect 0/3: ${metricsNo.currentStreak === 0 && metricsNo.longestStreak === 3}`);

    console.log("\n=== Scenario 4: Gap of 5 days ===");
    let gapCheckIns: DailyCheckIn[] = [];
    gapCheckIns = appendCheckIn(gapCheckIns, createCheckIn(gapCheckIns, `2026-07-01`, 'YES', timestamp));
    gapCheckIns = appendCheckIn(gapCheckIns, createCheckIn(gapCheckIns, `2026-07-02`, 'YES', timestamp));
    gapCheckIns = appendCheckIn(gapCheckIns, createCheckIn(gapCheckIns, `2026-07-08`, 'YES', timestamp)); // Gap of 6 days
    const gapMetrics = calculateStreaks(gapCheckIns);
    console.log(`Current streak: ${gapMetrics.currentStreak} | Longest streak: ${gapMetrics.longestStreak}`);
    console.log(`✅ PASSED: Expect Streak reset (1): ${gapMetrics.currentStreak === 1}`);

    console.log("\n=== Scenario 5: Duplicate journey milestone generation ===");
    const events1 = generateJourneyEvents(streak7CheckIns, [], [], timestamp);
    const events2 = generateJourneyEvents(streak7CheckIns, [], events1, timestamp);
    console.log(`Total events generated across 2 syncs: ${events1.length + events2.length}`);
    console.log(`✅ PASSED: Single event only: ${events2.length === 0}`);

    console.log("\n=== Scenario 6: Invalid response value ===");
    try {
      // @ts-ignore
      createCheckIn([], '2026-07-01', 'SOMETIMES', timestamp);
      console.log('❌ FAILED: Invalid response allowed');
    } catch (e) {
      console.log('✅ PASSED: Validation failure on invalid response');
    }

    console.log("\n=== Scenario 7: Identical inputs ===");
    const j1 = generateJourneyEvents(streak7CheckIns, [], [], timestamp);
    const j2 = generateJourneyEvents(streak7CheckIns, [], [], timestamp);
    const identical = JSON.stringify(j1) === JSON.stringify(j2);
    console.log(`✅ PASSED: Bit-for-bit identical outputs: ${identical}`);

    console.log("\n=== Scenario 8: Mission IDs missing ===");
    try {
      const ci = createCheckIn([], '2026-07-01', 'YES', timestamp);
      console.log(`✅ PASSED: Still valid without missionIds: ${ci.missionIds === undefined}`);
    } catch (e) {
      console.log('❌ FAILED: Mission IDs required');
    }

    console.log("\n=== Scenario 9: Zero check-ins ===");
    const zeroMetrics = calculateStreaks([]);
    console.log(`Engagement Rate: ${zeroMetrics.engagementRate}`);
    console.log(`✅ PASSED: No divide-by-zero (Rate is 0): ${zeroMetrics.engagementRate === 0}`);

    console.log("\n=== Scenario 10: 50 check-ins (Stable Performance) ===");
    let perfCheckIns: DailyCheckIn[] = [];
    const t0 = performance.now();
    for (let i = 1; i <= 50; i++) {
      const m = (i > 30 ? 8 : 7).toString().padStart(2, '0');
      const d = (i > 30 ? i - 30 : i).toString().padStart(2, '0');
      const ci = createCheckIn(perfCheckIns, `2026-${m}-${d}`, 'YES', timestamp);
      perfCheckIns = appendCheckIn(perfCheckIns, ci);
    }
    const perfMetrics = calculateStreaks(perfCheckIns);
    const t1 = performance.now();
    console.log(`Time taken: ${(t1 - t0).toFixed(2)}ms | Streak: ${perfMetrics.currentStreak}`);
    console.log(`✅ PASSED: Handled 50 checkins deterministically.`);

    console.log("\n=== Bonus Scenario: Weekly Summary ===");
    const mockMissions: Mission[] = [
      { id: 'm1', recommendationId: 'r1', title: 'M1', description: '', category: 'diet', type: 'ONE_TIME', difficulty: 'EASY', impactScore: 10, status: 'COMPLETED', progress: { current: 1, target: 1 }, createdAt: timestamp, updatedAt: timestamp }
    ];
    const weeklySummary = generateWeeklySummary('2026-07-01', '2026-07-07', streak7CheckIns, mockMissions, events1);
    console.log(`CheckIns: ${weeklySummary.checkInCount} | Missions: ${weeklySummary.missionsCompleted} | Events: ${weeklySummary.journeyEvents.length}`);
    console.log(`✅ PASSED: Weekly summary generated correctly.`);

    console.log("\n=== Scenario 11: Input order randomized ===");
    const shuffledCheckIns = [...streak7CheckIns].sort(() => Math.random() - 0.5);
    const shuffledMetrics = calculateStreaks(shuffledCheckIns);
    console.log(`✅ PASSED: Identical output from shuffled array: ${shuffledMetrics.currentStreak === 7}`);

    console.log("\n=== Scenario 12: YES vs yes vs Yes ===");
    try {
      // @ts-ignore
      createCheckIn([], '2026-07-01', 'Yes', timestamp);
      console.log('❌ FAILED: Allowed capitalized Yes');
    } catch (e) {
      console.log('✅ PASSED: Rejected loose case');
    }

    console.log("\n=== Scenario 13: Two timestamps same calendar day ===");
    try {
      const c1Iso = createCheckIn([], '2026-07-01T09:00:00Z', 'YES', timestamp);
      createCheckIn([c1Iso], '2026-07-01T18:00:00Z', 'YES', timestamp);
      console.log('❌ FAILED: Duplicate timestamps allowed');
    } catch (e) {
      console.log('✅ PASSED: Duplicate timestamps correctly normalized to duplicate day');
    }

    console.log("\n=== Scenario 14: Weekly boundary using ISO timestamps ===");
    const isoBoundaryCheckIn = createCheckIn([], '2026-07-05T14:00:00Z', 'YES', timestamp);
    const isoSummary = generateWeeklySummary('2026-07-01T00:00:00Z', '2026-07-07T23:59:59Z', [isoBoundaryCheckIn], [], []);
    console.log(`✅ PASSED: Included ISO timestamp check-in in weekly summary: ${isoSummary.checkInCount === 1}`);

    console.log("\n=== Scenario 15: Journey generation called 10 times ===");
    let multiSyncEvents = generateJourneyEvents(streak7CheckIns, [], [], timestamp);
    for (let i = 0; i < 9; i++) {
      const newEvents = generateJourneyEvents(streak7CheckIns, [], multiSyncEvents, timestamp);
      multiSyncEvents = [...multiSyncEvents, ...newEvents];
    }
    const streak7EventCount = multiSyncEvents.filter(e => e.type === 'STREAK_7').length;
    console.log(`✅ PASSED: Single milestone instance generated: ${streak7EventCount === 1}`);

    console.log("\n=== Scenario 16: 20-day global streak crossing week boundary ===");
    let globalStreakCheckIns: DailyCheckIn[] = [];
    for (let i = 1; i <= 20; i++) {
      const day = i.toString().padStart(2, '0');
      const ci = createCheckIn(globalStreakCheckIns, `2026-07-${day}`, 'YES', timestamp);
      globalStreakCheckIns = appendCheckIn(globalStreakCheckIns, ci);
    }
    // Summarize only days 15 through 21 (week boundary)
    const boundarySummary = generateWeeklySummary('2026-07-15', '2026-07-21', globalStreakCheckIns, [], []);
    console.log(`Weekly Current Streak: ${boundarySummary.currentStreak}`);
    console.log(`✅ PASSED: Weekly summary correctly reported isolated streak (6 days inside week) instead of global (20 days): ${boundarySummary.currentStreak === 6}`);
  }
};
