/**
 * Critical Velocity Calculators
 * Based on Tom Schwartz (Tinman) methodology
 * Reference: docs/formulas.md
 */

import { D_PRIME_ESTIMATES } from "../../constants/raceDistances";

/**
 * Calculate Critical Velocity from 30-minute test distance
 *
 * @param {number} distance - Distance covered in 30 minutes (meters)
 * @param {number} customDPrime - Optional custom D' value (meters)
 * @returns {object} CV velocity and pace data
 */
export function calculateCV30min(distance, customDPrime = null) {
  if (distance <= 0 || !isFinite(distance)) {
    throw new Error("Distance must be a positive number");
  }

  const TEST_DURATION = 1800; // 30 minutes in seconds

  // Estimate D' for single-point test (or use custom value)
  const d_prime = customDPrime !== null ? customDPrime : D_PRIME_ESTIMATES.DEFAULT;
  const d_prime_estimated = customDPrime === null;

  // Critical Velocity in m/s
  // For 30-min test: CV = (Distance - D') / 1800
  // This gives us the "true" CS by removing the anaerobic contribution
  const velocity_ms = (distance - d_prime) / TEST_DURATION;

  // Pace in seconds per kilometer
  const pace_sec_per_km = 1000 / velocity_ms;

  return {
    velocity_ms,
    pace_sec_per_km,
    distance,
    duration: TEST_DURATION,
    d_prime,
    d_prime_estimated,
  };
}

/**
 * Calculate Critical Velocity from Cooper 12-minute test
 *
 * @param {number} distance - Distance covered in 12 minutes (meters)
 * @param {number} customDPrime - Optional custom D' value (meters)
 * @returns {object} CV velocity and pace data
 */
export function calculateCVCooper(distance, customDPrime = null) {
  if (distance <= 0 || !isFinite(distance)) {
    throw new Error("Distance must be a positive number");
  }

  const TEST_DURATION = 720; // 12 minutes in seconds

  // Estimate D' for single-point test (or use custom value)
  const d_prime = customDPrime !== null ? customDPrime : D_PRIME_ESTIMATES.DEFAULT;
  const d_prime_estimated = customDPrime === null;

  // Critical Velocity in m/s
  // For Cooper test: CV = (Distance - D') / 720
  const velocity_ms = (distance - d_prime) / TEST_DURATION;

  // Pace in seconds per kilometer
  const pace_sec_per_km = 1000 / velocity_ms;

  return {
    velocity_ms,
    pace_sec_per_km,
    distance,
    duration: TEST_DURATION,
    d_prime,
    d_prime_estimated,
  };
}

/**
 * Calculate Critical Velocity from 2-point maximal effort test
 *
 * @param {number} distance1 - First test distance (meters, shorter)
 * @param {number} time1 - First test duration (seconds)
 * @param {number} distance2 - Second test distance (meters, longer)
 * @param {number} time2 - Second test duration (seconds)
 * @returns {object} CV, D', and pace data
 */
export function calculateCV2Point(distance1, time1, distance2, time2) {
  // Input validation
  if (distance1 <= 0 || distance2 <= 0 || time1 <= 0 || time2 <= 0) {
    throw new Error("All values must be positive numbers");
  }
  if (!isFinite(distance1) || !isFinite(distance2) || !isFinite(time1) || !isFinite(time2)) {
    throw new Error("All values must be finite numbers");
  }
  if (time1 >= time2) {
    throw new Error("Second test must be longer than first test");
  }
  if (distance1 >= distance2) {
    throw new Error("Second test distance should be greater than first test distance");
  }

  // Critical Velocity in m/s
  const velocity_ms = (distance2 - distance1) / (time2 - time1);

  // Anaerobic Distance Capacity (D') in meters
  const d_prime = (distance1 * time2 - distance2 * time1) / (time2 - time1);

  // Pace in seconds per kilometer
  const pace_sec_per_km = 1000 / velocity_ms;

  return {
    velocity_ms,
    d_prime,
    d_prime_estimated: false, // D' is directly calculated, not estimated
    pace_sec_per_km,
    distance1,
    time1,
    distance2,
    time2,
  };
}
