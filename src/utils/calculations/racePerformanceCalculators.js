/**
 * Race Performance Prediction Calculators
 * Based on Critical Speed hyperbolic model: Distance = CS × Time + D'
 * Reference: docs/formulas.md and critical speed research
 */

import { getRaceDistances, D_PRIME_UNCERTAINTY } from "../../constants/raceDistances";

/**
 * Predict race time for a given distance using CS and D'
 *
 * Formula: Time = (Distance - D') / CS
 *
 * @param {number} distanceMeters - Race distance in meters
 * @param {number} criticalSpeed - Critical Speed in m/s
 * @param {number} dPrime - Anaerobic distance capacity in meters
 * @returns {object} Predicted time and pace data, or null if impossible
 */
export function predictRaceTime(distanceMeters, criticalSpeed, dPrime) {
  if (distanceMeters <= 0 || criticalSpeed <= 0 || dPrime < 0) {
    throw new Error("Invalid input values");
  }

  // Check if race is physiologically possible
  // If distance <= D', the race is shorter than anaerobic capacity alone
  if (distanceMeters <= dPrime) {
    return null; // Cannot predict - distance too short
  }

  // Calculate time in seconds: Time = (Distance - D') / CS
  const timeSeconds = (distanceMeters - dPrime) / criticalSpeed;

  // Calculate average pace
  const paceSecPerKm = 1000 / (distanceMeters / timeSeconds);
  const paceSecPerMile = paceSecPerKm * 1.60934;

  return {
    timeSeconds,
    paceSecPerKm,
    paceSecPerMile,
    distanceMeters,
  };
}

/**
 * Predict race performance with confidence intervals
 * Accounts for D' uncertainty in single-point test estimates
 *
 * @param {number} distanceMeters - Race distance in meters
 * @param {number} criticalSpeed - Critical Speed in m/s
 * @param {number} dPrime - Anaerobic distance capacity in meters
 * @param {boolean} isDPrimeEstimated - Whether D' is estimated vs measured
 * @returns {object} Prediction with min/max confidence bounds
 */
export function predictRaceTimeWithConfidence(
  distanceMeters,
  criticalSpeed,
  dPrime,
  isDPrimeEstimated = false
) {
  // Best estimate using provided D'
  const bestEstimate = predictRaceTime(distanceMeters, criticalSpeed, dPrime);

  if (!bestEstimate) {
    return null;
  }

  // If D' is estimated, calculate confidence interval
  let minEstimate = null;
  let maxEstimate = null;

  if (isDPrimeEstimated) {
    // Lower D' = faster predicted time (less anaerobic buffer)
    const dPrimeLow = Math.max(0, dPrime - D_PRIME_UNCERTAINTY);
    minEstimate = predictRaceTime(distanceMeters, criticalSpeed, dPrimeLow);

    // Higher D' = slower predicted time (more anaerobic buffer)
    const dPrimeHigh = dPrime + D_PRIME_UNCERTAINTY;
    maxEstimate = predictRaceTime(distanceMeters, criticalSpeed, dPrimeHigh);
  }

  return {
    best: bestEstimate,
    min: minEstimate,
    max: maxEstimate,
    isDPrimeEstimated,
  };
}

/**
 * Predict all standard race distances
 *
 * @param {number} criticalSpeed - Critical Speed in m/s
 * @param {number} dPrime - Anaerobic distance capacity in meters
 * @param {boolean} isDPrimeEstimated - Whether D' is estimated vs measured
 * @param {boolean} typicalOnly - Only predict typical race distances
 * @returns {Array} Array of race predictions with confidence intervals
 */
export function predictAllRaces(
  criticalSpeed,
  dPrime,
  isDPrimeEstimated = false,
  typicalOnly = true
) {
  const distances = getRaceDistances(typicalOnly);

  return distances
    .map((race) => {
      const prediction = predictRaceTimeWithConfidence(
        race.distanceMeters,
        criticalSpeed,
        dPrime,
        isDPrimeEstimated
      );

      if (!prediction) {
        return null; // Skip races that are too short
      }

      return {
        ...race,
        prediction,
      };
    })
    .filter(Boolean); // Remove null entries
}

/**
 * Estimate D' for single-point tests (30-min, Cooper)
 * Uses conservative population-based estimate
 *
 * @returns {number} Estimated D' in meters
 */
export function estimateDPrime() {
  // For single-point tests, use conservative middle-ground estimate
  // Research shows typical values: 150-250m (recreational), 250-300m (trained), 300-400m (elite)
  const DEFAULT_D_PRIME = 250;

  return DEFAULT_D_PRIME;
}

/**
 * Generate hyperbolic curve data points for visualization
 * Useful for plotting the full velocity-duration relationship
 *
 * @param {number} criticalSpeed - Critical Speed in m/s
 * @param {number} dPrime - Anaerobic distance capacity in meters
 * @param {number} minTime - Minimum time in seconds (default: 180 = 3 min)
 * @param {number} maxTime - Maximum time in seconds (default: 10800 = 3 hours)
 * @param {number} points - Number of data points to generate
 * @returns {Array} Array of {time, distance, velocity} objects
 */
export function generateHyperbolicCurve(
  criticalSpeed,
  dPrime,
  minTime = 180,
  maxTime = 10800,
  points = 50
) {
  const curve = [];
  const timeStep = (maxTime - minTime) / (points - 1);

  for (let i = 0; i < points; i++) {
    const time = minTime + i * timeStep;
    const distance = criticalSpeed * time + dPrime;
    const velocity = distance / time;

    curve.push({
      timeSeconds: time,
      distanceMeters: distance,
      velocityMs: velocity,
    });
  }

  return curve;
}
