import { calculateCarbonHealthScore } from './calculator';
import type { ScoreInput } from './types';

export const TEST_CASES = {
  runAll: () => {
    console.log("Running Carbon Score Engine Tests...\n");

    const newPassiveUser: ScoreInput = {
      currentFootprint: 100, // Excellent -> 30 pts
      assignedActions: 5,
      completedActions: 0, // No action -> 0 pts
      // No history -> Neutral 10 pts
      // Total Expected = 40 (Eco Explorer)
    };

    const activeUserHighFootprint: ScoreInput = {
      currentFootprint: 800, // Poor -> ~7.5 pts
      previousFootprint: 800, // 0% reduction -> Neutral 10 pts
      assignedActions: 5,
      completedActions: 5, // 100% -> 40 pts
      // Total Expected = ~58 (Eco Explorer)
    };

    const newUnassignedUser: ScoreInput = {
      currentFootprint: 150, // Excellent -> 30 pts
      assignedActions: 0, // Proration triggers
      completedActions: 0,
      // No history -> Neutral 10 pts
      // Earned = 40. Prorated out of 60 = 67
      // Total Expected = 67 (Green Guardian)
    };

    const cliffTest1: ScoreInput = { currentFootprint: 300.00, assignedActions: 5, completedActions: 2 };
    const cliffTest2: ScoreInput = { currentFootprint: 300.01, assignedActions: 5, completedActions: 2 };

    const invalidUser: ScoreInput = {
      currentFootprint: 500,
      previousFootprint: null as any, // Triggers null check
      assignedActions: 5,
      completedActions: 1,
    };

    console.log("=== Scenario 1: Passive User with naturally low footprint ===");
    console.log(JSON.stringify(calculateCarbonHealthScore(newPassiveUser), null, 2));

    console.log("\n=== Scenario 2: Active User with high footprint and no trend ===");
    console.log(JSON.stringify(calculateCarbonHealthScore(activeUserHighFootprint), null, 2));

    console.log("\n=== Scenario 3: New Unassigned User (Proration Test) ===");
    console.log(JSON.stringify(calculateCarbonHealthScore(newUnassignedUser), null, 2));

    console.log("\n=== Scenario 4: Cliff Test (Interpolation) ===");
    const score1 = calculateCarbonHealthScore(cliffTest1).explanation.baselineContribution;
    const score2 = calculateCarbonHealthScore(cliffTest2).explanation.baselineContribution;
    console.log(`300.00 kg Baseline Score: ${score1}`);
    console.log(`300.01 kg Baseline Score: ${score2}`);
    console.log(`Difference: ${score1 - score2} (Smooth!)`);

    console.log("\n=== Scenario 5: Validation Edge Case (NaN) ===");
    try {
      calculateCarbonHealthScore(invalidUser);
      console.error("❌ Test failed: Should have thrown validation error");
    } catch (e) {
      console.log("✅ Validation correctly caught edge case:", (e as Error).message);
    }
  }
};
