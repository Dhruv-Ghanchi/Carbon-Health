import { calculateCarbonFootprint } from './calculator';
import type { CarbonAssessment } from '../../types';

export const TEST_CASES = {
  runAll: () => {
    console.log("Running Carbon Engine Tests...\n");

    const extremelySustainable: CarbonAssessment = {
      householdSize: 2,
      primaryTransport: 'bike_walk',
      commuteDistance: 'less_than_5',
      acUsage: 'rarely',
      meatConsumption: 'never',
      recyclingHabits: 'always',
      publicTransportUsage: 'frequently',
      electricitySavingHabits: 'low',
      createdAt: new Date().toISOString(),
    };

    const averageUser: CarbonAssessment = {
      householdSize: 3,
      primaryTransport: 'car_gas',
      commuteDistance: '5_to_15',
      acUsage: 'sometimes',
      meatConsumption: 'few_times_week',
      recyclingHabits: 'sometimes',
      publicTransportUsage: 'sometimes',
      electricitySavingHabits: 'medium',
      createdAt: new Date().toISOString(),
    };

    const highEmissionUser: CarbonAssessment = {
      householdSize: 1,
      primaryTransport: 'car_gas',
      commuteDistance: 'more_than_30',
      acUsage: 'always',
      meatConsumption: 'daily',
      recyclingHabits: 'rarely',
      publicTransportUsage: 'never',
      electricitySavingHabits: 'high',
      createdAt: new Date().toISOString(),
    };

    const largeHousehold: CarbonAssessment = {
      householdSize: 8, // Should cap at 5 divisor
      primaryTransport: 'car_ev',
      commuteDistance: '15_to_30',
      acUsage: 'frequently',
      meatConsumption: 'few_times_week',
      recyclingHabits: 'always',
      publicTransportUsage: 'sometimes',
      electricitySavingHabits: 'medium',
      createdAt: new Date().toISOString(),
    };

    const invalidHousehold: CarbonAssessment = {
      householdSize: 0,
      primaryTransport: 'car_gas',
      commuteDistance: '5_to_15',
      acUsage: 'sometimes',
      meatConsumption: 'few_times_week',
      recyclingHabits: 'sometimes',
      publicTransportUsage: 'sometimes',
      electricitySavingHabits: 'medium',
      createdAt: new Date().toISOString(),
    };

    console.log("=== Sustainable User ===");
    console.log(JSON.stringify(calculateCarbonFootprint(extremelySustainable), null, 2));

    console.log("\n=== Average User ===");
    console.log(JSON.stringify(calculateCarbonFootprint(averageUser), null, 2));

    console.log("\n=== High Emission User ===");
    console.log(JSON.stringify(calculateCarbonFootprint(highEmissionUser), null, 2));

    console.log("\n=== Large Household (Divisor Cap 5) ===");
    console.log(JSON.stringify(calculateCarbonFootprint(largeHousehold), null, 2));

    console.log("\n=== Validation Edge Case ===");
    try {
      calculateCarbonFootprint(invalidHousehold);
      console.error("❌ Test failed: Should have thrown validation error");
    } catch (e) {
      console.log("✅ Validation correctly caught edge case:", (e as Error).message);
    }
  }
};
