export type TransportType = 'car_gas' | 'car_ev' | 'public_transit' | 'bike_walk' | 'motorcycle';
export type CommuteDistance = 'less_than_5' | '5_to_15' | '15_to_30' | 'more_than_30';
export type ACUsage = 'rarely' | 'sometimes' | 'frequently' | 'always';
export type MeatConsumption = 'daily' | 'few_times_week' | 'rarely' | 'never';
export type RecyclingHabit = 'rarely' | 'sometimes' | 'always';
export type PublicTransportUsage = 'never' | 'sometimes' | 'frequently' | 'always';
export type ElectricitySavingHabit = 'low' | 'medium' | 'high';

export interface CarbonAssessment {
  householdSize: number;
  primaryTransport: TransportType;
  commuteDistance: CommuteDistance;
  acUsage: ACUsage;
  meatConsumption: MeatConsumption;
  recyclingHabits: RecyclingHabit;
  publicTransportUsage: PublicTransportUsage;
  electricitySavingHabits: ElectricitySavingHabit;
  createdAt: string;
}
