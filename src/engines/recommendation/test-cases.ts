import { generateRecommendations } from './ranking';
import { CATALOG } from './catalog';
import type { CarbonAssessment, UserProfile } from '../../types';

export const TEST_CASES = {
  runAll: () => {
    console.log("Running Carbon Recommendation Engine Tests...\n");

    const baseAssessment: CarbonAssessment = {
      householdSize: 1,
      primaryTransport: 'car_gas',
      commuteDistance: '15_to_30',
      acUsage: 'sometimes',
      meatConsumption: 'few_times_week',
      recyclingHabits: 'sometimes',
      publicTransportUsage: 'never',
      electricitySavingHabits: 'medium',
      createdAt: '2026-06-20T00:00:00Z'
    };

    const curiousUser: UserProfile = { id: '1', name: 'Curious', motivationLevel: 'casual', createdAt: '', updatedAt: '' };
    const committedUser: UserProfile = { id: '2', name: 'Committed', motivationLevel: 'urgent', createdAt: '', updatedAt: '' };

    const metroAssessment: CarbonAssessment = { ...baseAssessment, primaryTransport: 'public_transit' };
    const veganAssessment: CarbonAssessment = { ...baseAssessment, meatConsumption: 'never' };
    const motorcycleAssessment: CarbonAssessment = { ...baseAssessment, primaryTransport: 'motorcycle' };
    const publicTransitAlwaysAssessment: CarbonAssessment = { ...baseAssessment, primaryTransport: 'car_gas', publicTransportUsage: 'always' };

    console.log("=== Scenario 1: Heavy Car User (Committed) ===");
    const heavyCarRecs = generateRecommendations(baseAssessment, committedUser);
    console.log(heavyCarRecs.slice(0, 4).map(r => `[${r.category}] ${r.title} (Diff: ${r.difficulty}, Priority: ${r.priorityScore})`));

    console.log("\n=== Scenario 2: Curious User (Ceiling Test) ===");
    const curiousRecs = generateRecommendations(baseAssessment, curiousUser);
    console.log(curiousRecs.slice(0, 4).map(r => `[${r.category}] ${r.title} (Diff: ${r.difficulty}, Priority: ${r.priorityScore})`));
    const hasHard = curiousRecs.some(r => r.difficulty === 'hard');
    console.log(`Contains Hard Recommendations? ${hasHard ? '❌ FAILED' : '✅ PASSED'}`);

    console.log("\n=== Scenario 3: Vegan User (Feasibility Test) ===");
    const veganRecs = generateRecommendations(veganAssessment, committedUser);
    const hasVeganRec = veganRecs.some(r => r.id === 'd3');
    console.log(`Contains 'Go Fully Plant-Based'? ${hasVeganRec ? '❌ FAILED' : '✅ PASSED'}`);

    console.log("\n=== Scenario 4: Metro User ===");
    const metroRecs = generateRecommendations(metroAssessment, committedUser);
    console.log(metroRecs.slice(0, 3).map(r => `[${r.category}] ${r.title}`));

    console.log("\n=== Scenario 5: Diversity Enforcement Test ===");
    const top3 = heavyCarRecs.slice(0, 3);
    const catCount = top3.reduce((acc, r) => { acc[r.category] = (acc[r.category] || 0) + 1; return acc; }, {} as Record<string, number>);
    const maxCat = Math.max(...Object.values(catCount));
    console.log(`Max items from same category in top 3: ${maxCat} ${maxCat <= 2 ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 6: Completed ONE_TIME Recommendation Filtering ===");
    const e1Id = 'e1'; // Switch to LED Bulbs (ONE_TIME)
    const completedRecs = generateRecommendations(baseAssessment, committedUser, [e1Id]);
    const hasE1 = completedRecs.some(r => r.id === e1Id);
    console.log(`Contains completed 'Switch to LED Bulbs'? ${hasE1 ? '❌ FAILED' : '✅ PASSED'}`);

    console.log("\n=== Scenario 7: Tie Breaker Stability ===");
    // Just verify the array is deterministic
    const recs1 = generateRecommendations(baseAssessment, committedUser);
    const recs2 = generateRecommendations(baseAssessment, committedUser);
    const identical = recs1.every((r, i) => r.id === recs2[i].id);
    console.log(`Sort order perfectly deterministic across runs? ${identical ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 8: Diversity Ordering Preservation ===");
    // Verify an item not in top 3 isn't shoved to the bottom of the list.
    // Length is ~25 items. Find index of 'Switch to EV' (t1) or similar.
    const hasOrderingPreserved = heavyCarRecs[3].priorityScore >= heavyCarRecs[heavyCarRecs.length - 1].priorityScore;
    console.log(`Is the 4th item properly sorted greater than the last item? ${hasOrderingPreserved ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 9: Metro Feasibility with publicTransportUsage: 'always' ===");
    const ptAlwaysRecs = generateRecommendations(publicTransitAlwaysAssessment, committedUser);
    const hasMetroRec = ptAlwaysRecs.some(r => r.id === 't2');
    console.log(`Contains 'Use Metro Twice a Week'? ${hasMetroRec ? '❌ FAILED' : '✅ PASSED'}`);

    console.log("\n=== Scenario 10: Recurring Target Support ===");
    const recurringItem = heavyCarRecs.find(r => r.type === 'RECURRING');
    console.log(`Recurring item '${recurringItem?.title}' has recurringTarget? ${recurringItem?.recurringTarget !== undefined ? '✅ PASSED (' + recurringItem?.recurringTarget + ')' : '❌ FAILED'}`);

    console.log("\n=== Scenario 11: Motorcycle User Recommendations ===");
    const motoRecs = generateRecommendations(motorcycleAssessment, committedUser);
    const hasMotoTransport = motoRecs.some(r => r.category === 'transport');
    console.log(`Did motorcycle user get transport recommendations? ${hasMotoTransport ? '✅ PASSED' : '❌ FAILED'}`);

    console.log("\n=== Scenario 12: Catalog Immutability ===");
    try {
      // @ts-ignore
      CATALOG[0].impactScore = 9000;
      if (CATALOG[0].impactScore === 9000) {
        console.log('❌ FAILED: Mutated catalog impactScore successfully.');
      } else {
        console.log('✅ PASSED: Catalog is immutable (mutation failed silently).');
      }
    } catch (e) {
      console.log('✅ PASSED: Catalog is immutable (Object is not extensible/frozen threw error).');
    }
  }
};
