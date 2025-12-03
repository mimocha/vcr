/**
 * Race Distance Configurations
 * Standard running race distances with metadata
 */

export const RACE_DISTANCES = {
  ONE_HUNDRED: {
    id: "100m",
    name: "100m",
    distanceMeters: 100,
    typical: false,
  },
  FOUR_HUNDRED: {
    id: "400m",
    name: "400m",
    distanceMeters: 400,
    typical: false,
  },
  EIGHT_HUNDRED: {
    id: "800m",
    name: "800m",
    distanceMeters: 800,
    typical: false,
  },
  FIFTEEN_HUNDRED: {
    id: "1500m",
    name: "1500m",
    distanceMeters: 1500,
    typical: true,
  },
  MILE: {
    id: "mile",
    name: "Mile",
    distanceMeters: 1609.34,
    typical: true,
  },
  FIVE_K: {
    id: "5k",
    name: "5K",
    distanceMeters: 5000,
    typical: true,
  },
  TEN_K: {
    id: "10k",
    name: "10K",
    distanceMeters: 10000,
    typical: true,
  },
  TEN_MILE: {
    id: "10mile",
    name: "10 Mile",
    distanceMeters: 16093.4,
    typical: true,
  },
  HALF_MARATHON: {
    id: "half",
    name: "Half Marathon",
    distanceMeters: 21097.5,
    typical: true,
  },
  THIRTY_K: {
    id: "30k",
    name: "30K",
    distanceMeters: 30000,
    typical: false,
  },
  MARATHON: {
    id: "marathon",
    name: "Marathon",
    distanceMeters: 42195,
    typical: true,
  },
};

/**
 * Get ordered list of race distances for display
 * @param {boolean} typicalOnly - If true, only return typical race distances
 * @returns {Array} Array of race distance objects
 */
export function getRaceDistances(typicalOnly = true) {
  const distances = Object.values(RACE_DISTANCES);

  if (typicalOnly) {
    return distances.filter((d) => d.typical);
  }

  return distances;
}

/**
 * D' (Anaerobic Capacity) Presets
 *
 * D' represents the finite energy resource above critical velocity.
 * Shorter tests have proportionally higher anaerobic contribution,
 * so the "effective" D' varies by test duration.
 *
 * Reference: Research shows typical D' values range from 150-400m
 * See: docs/formulas.md for detailed explanation
 */
export const D_PRIME_PRESETS = {
  LOW: {
    id: "low",
    value: 150,
    label: "Low (150m)",
    description: "Recommended for 60-minute test",
  },
  MODERATE_LOW: {
    id: "moderate-low",
    value: 200,
    label: "Moderate-Low (200m)",
    description: "Recommended for 45-minute test",
  },
  MODERATE: {
    id: "moderate",
    value: 250,
    label: "Moderate (250m)",
    description: "Recommended for 30-minute test",
  },
  HIGH: {
    id: "high",
    value: 300,
    label: "High (300m)",
    description: "Recommended for Cooper 12-minute test",
  },
  VERY_HIGH: {
    id: "very-high",
    value: 350,
    label: "Very High (350m)",
    description: "Speed-focused / elite sprinter type",
  },
  CUSTOM: {
    id: "custom",
    value: null,
    label: "Custom",
    description: "Enter your own D' value (50-500m)",
  },
};

/**
 * Default D' preset for each test type
 * Maps test type ID to recommended D' preset
 */
export const D_PRIME_DEFAULTS_BY_TEST = {
  "30min": D_PRIME_PRESETS.MODERATE,
  "45min": D_PRIME_PRESETS.MODERATE_LOW,
  "60min": D_PRIME_PRESETS.LOW,
  cooper: D_PRIME_PRESETS.HIGH,
  "2point": null, // D' is calculated, not estimated
};

/**
 * Legacy default for backward compatibility
 */
export const D_PRIME_ESTIMATES = {
  DEFAULT: 250,
};

/**
 * D' validation range
 */
export const D_PRIME_RANGE = {
  MIN: 50,
  MAX: 500,
};

/**
 * Uncertainty range for D' estimates (±meters)
 * Used to show confidence intervals in predictions
 */
export const D_PRIME_UNCERTAINTY = 100;
