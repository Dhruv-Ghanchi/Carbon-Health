import { syncActiveMissions, updateMissionProgress, archiveEligibleMissions, calculateMissionPercentage, getRetiredRecommendationIds } from './missionEngine';
import { calculateMissionDifficulty } from './missionFactory';
import type { Recommendation } from '../recommendation/types';
import type { Mission } from './types';

export const TEST_CASES = {
  runAll: () => {
    console.log("Running Phase 7 Mission Engine Tests...\n");
    const timestamp = '2026-06-20T00:00:00.000Z';

    const mockRecs: Recommendation[] = [
      { id: 't1', title: 'Switch to EV', description: '', category: 'transport', type: 'ONE_TIME', difficulty: 'hard', impactScore: 95, priorityScore: 100, estimatedReduction: 100 },
      { id: 't2', title: 'Metro Twice', description: '', category: 'transport', type: 'RECURRING', recurringTarget: 2, difficulty: 'medium', impactScore: 60, priorityScore: 80, estimatedReduction: 40 },
      { id: 'd3', title: 'Go Vegan', description: '', category: 'diet', type: 'RECURRING', recurringTarget: 21, difficulty: 'hard', impactScore: 90, priorityScore: 75, estimatedReduction: 150 },
      { id: 'c1', title: 'Recycle', description: '', category: 'consumption', type: 'RECURRING', recurringTarget: 7, difficulty: 'easy', impactScore: 50, priorityScore: 50, estimatedReduction: 20 }
    ];

    console.log("=== Scenario 1: Max Mission Limit Enforcement ===");
    const initialActive = syncActiveMissions(mockRecs, [], timestamp);
    console.log(`Active missions generated: ${initialActive.length}`);
    console.log(`Expected 3? ${initialActive.length === 3 ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 2: Recurring Target Progress (Not Complete) ===");
    let metroMission = initialActive.find(m => m.recommendationId === 't2')!;
    metroMission = updateMissionProgress(metroMission, 1, timestamp);
    console.log(`Progress: ${metroMission.progress.current} / ${metroMission.progress.target}`);
    console.log(`Status remains ACTIVE? ${metroMission.status === 'ACTIVE' ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 3: Recurring Target Progress (Complete) ===");
    metroMission = updateMissionProgress(metroMission, 1, timestamp);
    console.log(`Progress: ${metroMission.progress.current} / ${metroMission.progress.target}`);
    console.log(`Status became COMPLETED? ${metroMission.status === 'COMPLETED' ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 4: One-Time Mission Archival ===");
    let evMission = initialActive.find(m => m.recommendationId === 't1')!;
    evMission = updateMissionProgress(evMission, 1, timestamp);
    const archivedList = archiveEligibleMissions([evMission], timestamp);
    const archivedEv = archivedList[0];
    console.log(`EV Mission is ONE_TIME and completed. Current status: ${archivedEv.status}`);
    console.log(`Status became ARCHIVED? ${archivedEv.status === 'ARCHIVED' ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 5: Percentage Calculation ===");
    const percent = calculateMissionPercentage(metroMission);
    console.log(`Metro Mission Percentage: ${percent}%`);
    console.log(`Percentage is exactly 100? ${percent === 100 ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 6: Negative Progress Rejection ===");
    try {
      updateMissionProgress(metroMission, -5, timestamp);
      console.log('❌ FAILED: Allowed negative progress');
    } catch (e) {
      console.log('✅ PASSED: Negative progress threw validation error');
    }

    console.log("\n=== Scenario 7: Difficulty Derivation ===");
    const veganDiff = calculateMissionDifficulty(mockRecs[2]); // Hard rec + 21 target + 90 impact
    const recycleDiff = calculateMissionDifficulty(mockRecs[3]); // Easy rec + 7 target + 50 impact
    console.log(`Vegan Difficulty mathematically derived as: ${veganDiff}`);
    console.log(`Recycle Difficulty mathematically derived as: ${recycleDiff}`);
    console.log(`Are they distinct? ${veganDiff !== recycleDiff ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 8: Determinism (Identical Inputs) ===");
    const run1 = syncActiveMissions(mockRecs, [], timestamp);
    const run2 = syncActiveMissions(mockRecs, [], timestamp);
    const identical = JSON.stringify(run1) === JSON.stringify(run2);
    console.log(`Bit-for-bit identical outputs? ${identical ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 9: Recurring Mission Regeneration ===");
    let completedRecurring = { ...metroMission, status: 'COMPLETED' as const };
    const newTimestamp = '2026-06-21T00:00:00.000Z';
    // Sync again. Should generate a new ACTIVE metro mission.
    const runRegen = syncActiveMissions([mockRecs[1]], [completedRecurring], newTimestamp);
    const hasNewActive = runRegen.some(m => m.recommendationId === 't2' && m.status === 'ACTIVE');
    console.log(`Generated new ACTIVE recurring mission? ${hasNewActive ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 10: Mission ID Uniqueness Across Cycles ===");
    const newActiveMetro = runRegen.find(m => m.recommendationId === 't2' && m.status === 'ACTIVE')!;
    console.log(`Old ID: ${completedRecurring.id} | New ID: ${newActiveMetro.id}`);
    console.log(`Are IDs unique across cycles? ${completedRecurring.id !== newActiveMetro.id ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 11: Target Equals Zero (Validation Failure) ===");
    try {
      const badRec = { ...mockRecs[1], recurringTarget: 0 };
      // @ts-ignore
      syncActiveMissions([badRec], [], timestamp);
      console.log('❌ FAILED: Allowed target of 0');
    } catch (e) {
      console.log('✅ PASSED: Target 0 threw validation error');
    }

    console.log("\n=== Scenario 12: Retirement Extraction ===");
    const retiredIds = getRetiredRecommendationIds(archivedList);
    console.log(`Extracted retired ID: ${retiredIds[0]}`);
    console.log(`Is EV Mission retired? ${retiredIds.includes('t1') ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 13: Duplicate Active Mission Prevention ===");
    const duplicateRun = syncActiveMissions(mockRecs, initialActive, timestamp);
    const activeEvCount = duplicateRun.filter(m => m.recommendationId === 't1' && m.status === 'ACTIVE').length;
    console.log(`Count of active EV missions: ${activeEvCount}`);
    console.log(`Prevented duplicates? ${activeEvCount === 1 ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 14: Expiration Lifecycle (Removed) ===");
    try {
      const badMission = { ...initialActive[0], status: 'EXPIRED' };
      // @ts-ignore
      updateMissionProgress(badMission, 0, timestamp);
      console.log('❌ FAILED: EXPIRED status allowed');
    } catch (e) {
      console.log('✅ PASSED: EXPIRED status rejected (State safely removed)');
    }

    console.log("\n=== Scenario 15: Recurring Mission Explosion Test ===");
    let multiSyncMissions: Mission[] = [completedRecurring];
    for (let i = 0; i < 5; i++) {
      multiSyncMissions = syncActiveMissions([mockRecs[1]], multiSyncMissions, newTimestamp);
    }
    const activeRecurringCount = multiSyncMissions.filter(m => m.recommendationId === 't2' && m.status === 'ACTIVE').length;
    console.log(`Total ACTIVE recurring instances after 5 syncs: ${activeRecurringCount}`);
    console.log(`Prevented explosion? ${activeRecurringCount === 1 ? '✅ PASSED' : '❌ FAILED'}`);
  }
};
