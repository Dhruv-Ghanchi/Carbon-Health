// Monthly emissions in kg CO2e
export const TRANSPORT_FACTORS = {
  car_gas: 250,
  car_ev: 80,
  public_transit: 50,
  motorcycle: 100,
  bike_walk: 0,
} as const;

export const COMMUTE_FACTORS = {
  less_than_5: 0.5,
  '5_to_15': 1.0,
  '15_to_30': 1.5,
  more_than_30: 2.0,
} as const;

export const DIET_FACTORS = {
  daily: 200,
  few_times_week: 120,
  rarely: 60,
  never: 30, // Even vegan diets have a carbon footprint
} as const;

export const AC_FACTORS = {
  always: 300,
  frequently: 200,
  sometimes: 100,
  rarely: 30,
} as const;

export const ELECTRICITY_FACTORS = {
  high: 250,
  medium: 150,
  low: 80,
} as const;

export const RECYCLING_FACTORS = {
  rarely: 100,
  sometimes: 50,
  always: 10,
} as const;
