export interface EnvironmentalEquivalents {
  treesPlanted: number;
  kmDriven: number;
  smartphoneCharges: number;
}

export function calculateEquivalents(kgCO2: number): EnvironmentalEquivalents {
  // Constants:
  // 1 tree absorbs ~22kg of CO2 per year
  // Average gas car emits ~0.25kg CO2 per km -> 4km per kg
  // 1 smartphone charge is ~0.008kg CO2 -> 125 charges per kg
  
  return {
    treesPlanted: Math.round(kgCO2 / 22),
    kmDriven: Math.round(kgCO2 * 4),
    smartphoneCharges: Math.round(kgCO2 * 125)
  };
}

export function formatEquivalentsText(kgCO2: number): string {
  const { treesPlanted, kmDriven, smartphoneCharges } = calculateEquivalents(kgCO2);
  
  if (treesPlanted > 0) {
    return `Equivalent to the CO₂ absorbed by ${treesPlanted} mature trees in a year.`;
  } else if (kmDriven > 10) {
    return `Equivalent to driving ${kmDriven} km in an average gas car.`;
  } else {
    return `Equivalent to charging your smartphone ${smartphoneCharges} times.`;
  }
}
