import type { CatalogItem } from './types';
import type { CarbonAssessment } from '../../types';

const freezeCatalog = (items: CatalogItem[]): readonly CatalogItem[] => {
  return Object.freeze(items.map(item => Object.freeze(item)));
};

// Total 40 items (10 per category minimum)
export const CATALOG: readonly CatalogItem[] = freezeCatalog([
  // --- TRANSPORT ---
  {
    id: 't1', title: 'Switch to EV', description: 'Replace your gas vehicle with an electric vehicle.',
    category: 'transport', difficulty: 'hard', type: 'ONE_TIME', estimatedReduction: 200, impactScore: 95,
    isFeasible: (a: CarbonAssessment) => a.primaryTransport === 'car_gas' || a.primaryTransport === 'motorcycle'
  },
  {
    id: 't2', title: 'Use Metro Twice a Week', description: 'Replace two car commutes with public transit.',
    category: 'transport', difficulty: 'medium', type: 'RECURRING', recurringTarget: 2, estimatedReduction: 40, impactScore: 60,
    isFeasible: (a: CarbonAssessment) => a.primaryTransport !== 'public_transit' && a.primaryTransport !== 'bike_walk' && a.publicTransportUsage !== 'always' && a.publicTransportUsage !== 'frequently'
  },
  {
    id: 't3', title: 'Bike to Work', description: 'Use a bicycle for your daily commute.',
    category: 'transport', difficulty: 'hard', type: 'RECURRING', recurringTarget: 5, estimatedReduction: 100, impactScore: 85,
    isFeasible: (a: CarbonAssessment) => a.primaryTransport !== 'bike_walk' && a.commuteDistance === 'less_than_5'
  },
  {
    id: 't4', title: 'Carpool Once a Week', description: 'Share a ride to work to cut emissions.',
    category: 'transport', difficulty: 'medium', type: 'RECURRING', recurringTarget: 1, estimatedReduction: 20, impactScore: 50,
    isFeasible: (a: CarbonAssessment) => a.primaryTransport === 'car_gas' || a.primaryTransport === 'car_ev' || a.primaryTransport === 'motorcycle'
  },
  {
    id: 't5', title: 'Maintain Tire Pressure', description: 'Properly inflate tires to improve mileage.',
    category: 'transport', difficulty: 'easy', type: 'ONE_TIME', estimatedReduction: 10, impactScore: 20,
    isFeasible: (a: CarbonAssessment) => a.primaryTransport === 'car_gas' || a.primaryTransport === 'car_ev' || a.primaryTransport === 'motorcycle'
  },
  {
    id: 't6', title: 'Work From Home 1 Day', description: 'Eliminate one commute per week.',
    category: 'transport', difficulty: 'medium', type: 'RECURRING', recurringTarget: 1, estimatedReduction: 30, impactScore: 55,
    isFeasible: (a: CarbonAssessment) => a.primaryTransport !== 'bike_walk'
  },
  {
    id: 't7', title: 'Combine Errands', description: 'Group shopping trips to reduce driving.',
    category: 'transport', difficulty: 'easy', type: 'RECURRING', recurringTarget: 1, estimatedReduction: 15, impactScore: 30,
    isFeasible: (a: CarbonAssessment) => a.primaryTransport === 'car_gas' || a.primaryTransport === 'car_ev' || a.primaryTransport === 'motorcycle'
  },
  {
    id: 't8', title: 'Avoid Short Flights', description: 'Take trains instead of flights under 500 miles.',
    category: 'transport', difficulty: 'medium', type: 'RECURRING', recurringTarget: 1, estimatedReduction: 150, impactScore: 80,
    isFeasible: () => true
  },
  {
    id: 't9', title: 'Walk Short Distances', description: 'Walk for trips under 1 mile.',
    category: 'transport', difficulty: 'easy', type: 'RECURRING', recurringTarget: 3, estimatedReduction: 10, impactScore: 25,
    isFeasible: (a: CarbonAssessment) => a.primaryTransport !== 'bike_walk'
  },
  {
    id: 't10', title: 'Remove Roof Rack', description: 'Reduce drag on your car by removing empty roof racks.',
    category: 'transport', difficulty: 'easy', type: 'ONE_TIME', estimatedReduction: 15, impactScore: 20,
    isFeasible: (a: CarbonAssessment) => a.primaryTransport === 'car_gas' || a.primaryTransport === 'car_ev'
  },

  // --- ENERGY ---
  {
    id: 'e1', title: 'Switch to LED Bulbs', description: 'Replace all home bulbs with LEDs.',
    category: 'energy', difficulty: 'easy', type: 'ONE_TIME', estimatedReduction: 25, impactScore: 40,
    isFeasible: () => true
  },
  {
    id: 'e2', title: 'Install Smart Thermostat', description: 'Automate home temperature for efficiency.',
    category: 'energy', difficulty: 'medium', type: 'ONE_TIME', estimatedReduction: 60, impactScore: 70,
    isFeasible: (a: CarbonAssessment) => a.acUsage !== 'rarely'
  },
  {
    id: 'e3', title: 'Wash Clothes Cold', description: 'Use cold water settings for laundry.',
    category: 'energy', difficulty: 'easy', type: 'RECURRING', recurringTarget: 3, estimatedReduction: 15, impactScore: 30,
    isFeasible: () => true
  },
  {
    id: 'e4', title: 'Line Dry Clothes', description: 'Skip the dryer and air dry laundry.',
    category: 'energy', difficulty: 'medium', type: 'RECURRING', recurringTarget: 2, estimatedReduction: 40, impactScore: 50,
    isFeasible: () => true
  },
  {
    id: 'e5', title: 'Turn Off AC When Out', description: 'Ensure AC is off when leaving home.',
    category: 'energy', difficulty: 'easy', type: 'RECURRING', recurringTarget: 5, estimatedReduction: 30, impactScore: 60,
    isFeasible: (a: CarbonAssessment) => a.acUsage !== 'rarely'
  },
  {
    id: 'e6', title: 'Set AC to 24C', description: 'Raise thermostat slightly in summer.',
    category: 'energy', difficulty: 'easy', type: 'RECURRING', recurringTarget: 7, estimatedReduction: 20, impactScore: 45,
    isFeasible: (a: CarbonAssessment) => a.acUsage !== 'rarely'
  },
  {
    id: 'e7', title: 'Unplug Idle Electronics', description: 'Stop vampire power drain.',
    category: 'energy', difficulty: 'easy', type: 'RECURRING', recurringTarget: 7, estimatedReduction: 10, impactScore: 20,
    isFeasible: (a: CarbonAssessment) => a.electricitySavingHabits !== 'high'
  },
  {
    id: 'e8', title: 'Insulate Windows', description: 'Seal drafts to reduce heating/cooling needs.',
    category: 'energy', difficulty: 'medium', type: 'ONE_TIME', estimatedReduction: 50, impactScore: 65,
    isFeasible: (a: CarbonAssessment) => a.acUsage !== 'rarely'
  },
  {
    id: 'e9', title: 'Install Solar Panels', description: 'Generate your own renewable energy.',
    category: 'energy', difficulty: 'hard', type: 'ONE_TIME', estimatedReduction: 300, impactScore: 100,
    isFeasible: () => true // Hard, but massive impact
  },
  {
    id: 'e10', title: 'Shorter Showers', description: 'Reduce shower time to 5 minutes to save hot water.',
    category: 'energy', difficulty: 'easy', type: 'RECURRING', recurringTarget: 7, estimatedReduction: 20, impactScore: 35,
    isFeasible: () => true
  },

  // --- DIET ---
  {
    id: 'd1', title: 'Meat-Free Mondays', description: 'Skip meat one day a week.',
    category: 'diet', difficulty: 'easy', type: 'RECURRING', recurringTarget: 1, estimatedReduction: 20, impactScore: 40,
    isFeasible: (a: CarbonAssessment) => a.meatConsumption === 'daily' || a.meatConsumption === 'few_times_week'
  },
  {
    id: 'd2', title: 'Try a Vegan Week', description: 'Eat strictly plant-based for 7 days.',
    category: 'diet', difficulty: 'medium', type: 'ONE_TIME', estimatedReduction: 30, impactScore: 60,
    isFeasible: (a: CarbonAssessment) => a.meatConsumption !== 'never'
  },
  {
    id: 'd3', title: 'Go Fully Plant-Based', description: 'Adopt a vegan diet permanently.',
    category: 'diet', difficulty: 'hard', type: 'RECURRING', recurringTarget: 21, estimatedReduction: 150, impactScore: 90,
    isFeasible: (a: CarbonAssessment) => a.meatConsumption !== 'never'
  },
  {
    id: 'd4', title: 'Reduce Dairy', description: 'Swap cow milk for oat or almond milk.',
    category: 'diet', difficulty: 'easy', type: 'RECURRING', recurringTarget: 7, estimatedReduction: 25, impactScore: 45,
    isFeasible: () => true
  },
  {
    id: 'd5', title: 'Buy Local Produce', description: 'Reduce food miles by shopping at farmers markets.',
    category: 'diet', difficulty: 'medium', type: 'RECURRING', recurringTarget: 1, estimatedReduction: 15, impactScore: 35,
    isFeasible: () => true
  },
  {
    id: 'd6', title: 'Start Composting', description: 'Compost organic waste instead of binning it.',
    category: 'diet', difficulty: 'medium', type: 'RECURRING', recurringTarget: 7, estimatedReduction: 20, impactScore: 50,
    isFeasible: () => true
  },
  {
    id: 'd7', title: 'Avoid Food Waste', description: 'Plan meals and use leftovers.',
    category: 'diet', difficulty: 'easy', type: 'RECURRING', recurringTarget: 7, estimatedReduction: 30, impactScore: 55,
    isFeasible: () => true
  },
  {
    id: 'd8', title: 'Grow Your Own Herbs', description: 'Start a small window herb garden.',
    category: 'diet', difficulty: 'easy', type: 'ONE_TIME', estimatedReduction: 5, impactScore: 15,
    isFeasible: () => true
  },
  {
    id: 'd9', title: 'Eat Seasonal', description: 'Buy fruits and vegetables in season.',
    category: 'diet', difficulty: 'medium', type: 'RECURRING', recurringTarget: 5, estimatedReduction: 10, impactScore: 30,
    isFeasible: () => true
  },
  {
    id: 'd10', title: 'Eat Less Beef', description: 'Swap beef for poultry or fish.',
    category: 'diet', difficulty: 'easy', type: 'RECURRING', recurringTarget: 3, estimatedReduction: 40, impactScore: 65,
    isFeasible: (a: CarbonAssessment) => a.meatConsumption === 'daily' || a.meatConsumption === 'few_times_week'
  },

  // --- CONSUMPTION ---
  {
    id: 'c1', title: 'Start Recycling', description: 'Recycle paper, plastic, and glass.',
    category: 'consumption', difficulty: 'easy', type: 'RECURRING', recurringTarget: 7, estimatedReduction: 20, impactScore: 50,
    isFeasible: (a: CarbonAssessment) => a.recyclingHabits === 'rarely'
  },
  {
    id: 'c2', title: 'Improve Recycling Habits', description: 'Be consistent with your recycling.',
    category: 'consumption', difficulty: 'medium', type: 'RECURRING', recurringTarget: 7, estimatedReduction: 15, impactScore: 40,
    isFeasible: (a: CarbonAssessment) => a.recyclingHabits === 'sometimes'
  },
  {
    id: 'c3', title: 'Use Reusable Bags', description: 'Stop using single-use plastic bags.',
    category: 'consumption', difficulty: 'easy', type: 'RECURRING', recurringTarget: 3, estimatedReduction: 5, impactScore: 20,
    isFeasible: () => true
  },
  {
    id: 'c4', title: 'Reusable Water Bottle', description: 'Carry a reusable bottle daily.',
    category: 'consumption', difficulty: 'easy', type: 'ONE_TIME', estimatedReduction: 10, impactScore: 25,
    isFeasible: () => true
  },
  {
    id: 'c5', title: 'Buy Second-Hand Clothes', description: 'Thrift instead of buying fast fashion.',
    category: 'consumption', difficulty: 'medium', type: 'RECURRING', recurringTarget: 1, estimatedReduction: 30, impactScore: 60,
    isFeasible: () => true
  },
  {
    id: 'c6', title: 'Repair Electronics', description: 'Fix broken devices instead of replacing.',
    category: 'consumption', difficulty: 'hard', type: 'RECURRING', recurringTarget: 1, estimatedReduction: 50, impactScore: 75,
    isFeasible: () => true
  },
  {
    id: 'c7', title: 'Cancel Junk Mail', description: 'Opt out of unsolicited physical mail.',
    category: 'consumption', difficulty: 'easy', type: 'ONE_TIME', estimatedReduction: 5, impactScore: 15,
    isFeasible: () => true
  },
  {
    id: 'c8', title: 'Use Bar Soap', description: 'Switch from plastic body wash bottles.',
    category: 'consumption', difficulty: 'easy', type: 'RECURRING', recurringTarget: 1, estimatedReduction: 5, impactScore: 10,
    isFeasible: () => true
  },
  {
    id: 'c9', title: 'Bamboo Toothbrush', description: 'Switch to a biodegradable toothbrush.',
    category: 'consumption', difficulty: 'easy', type: 'ONE_TIME', estimatedReduction: 2, impactScore: 10,
    isFeasible: () => true
  },
  {
    id: 'c10', title: 'Eco Cleaning Products', description: 'Switch to biodegradable, refillable cleaners.',
    category: 'consumption', difficulty: 'medium', type: 'RECURRING', recurringTarget: 1, estimatedReduction: 10, impactScore: 25,
    isFeasible: () => true
  }
]);
