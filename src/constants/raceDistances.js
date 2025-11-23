/**
 * Race Distance Configurations
 * Standard running race distances with metadata
 */

export const RACE_DISTANCES = {
  MILE: {
    id: "mile",
    name: "Mile",
    distanceMeters: 1609.34,
    typical: true,
  },
  FIFTEEN_HUNDRED: {
    id: "1500m",
    name: "1500m",
    distanceMeters: 1500,
    typical: true,
  },
  THREE_K: {
    id: "3k",
    name: "3K",
    distanceMeters: 3000,
    typical: false,
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
  FIFTEEN_K: {
    id: "15k",
    name: "15K",
    distanceMeters: 15000,
    typical: false,
  },
  HALF_MARATHON: {
    id: "half",
    name: "Half Marathon",
    distanceMeters: 21097.5,
    typical: true,
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
    return distances.filter(d => d.typical);
  }

  return distances;
}

/**
 * Default D' estimates based on athlete level
 * Reference: Research shows typical D' values range from 150-400m
 */
export const D_PRIME_ESTIMATES = {
  DEFAULT: 250, // Conservative middle-ground estimate
  RECREATIONAL: 200,
  TRAINED: 275,
  ELITE: 350,
};

/**
 * Uncertainty range for D' estimates (±meters)
 * Used to show confidence intervals in predictions
 */
export const D_PRIME_UNCERTAINTY = 100;
