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

  // Raw (unadjusted) Critical Velocity in m/s
  const velocity_ms_raw = distance / TEST_DURATION;

  // Raw pace in seconds per kilometer
  const pace_sec_per_km_raw = 1000 / velocity_ms_raw;

  // Adjusted distance (removing D' contribution)
  const adjusted_distance = distance - d_prime;

  // Adjusted Critical Velocity in m/s
  // For 30-min test: CV = (Distance - D') / 1800
  // This gives us the "true" CS by removing the anaerobic contribution
  const velocity_ms = adjusted_distance / TEST_DURATION;

  // Adjusted pace in seconds per kilometer
  const pace_sec_per_km = 1000 / velocity_ms;

  return {
    velocity_ms,
    pace_sec_per_km,
    velocity_ms_raw,
    pace_sec_per_km_raw,
    adjusted_distance,
    distance,
    duration: TEST_DURATION,
    d_prime,
    d_prime_estimated,
  };
}

/**
 * Calculate Critical Velocity from 45-minute test distance
 *
 * @param {number} distance - Distance covered in 45 minutes (meters)
 * @param {number} customDPrime - Optional custom D' value (meters)
 * @returns {object} CV velocity and pace data
 */
export function calculateCV45min(distance, customDPrime = null) {
  if (distance <= 0 || !isFinite(distance)) {
    throw new Error("Distance must be a positive number");
  }

  const TEST_DURATION = 2700; // 45 minutes in seconds

  // Estimate D' for single-point test (or use custom value)
  const d_prime = customDPrime !== null ? customDPrime : D_PRIME_ESTIMATES.DEFAULT;
  const d_prime_estimated = customDPrime === null;

  // Raw (unadjusted) Critical Velocity in m/s
  const velocity_ms_raw = distance / TEST_DURATION;

  // Raw pace in seconds per kilometer
  const pace_sec_per_km_raw = 1000 / velocity_ms_raw;

  // Adjusted distance (removing D' contribution)
  const adjusted_distance = distance - d_prime;

  // Adjusted Critical Velocity in m/s
  // For 45-min test: CV = (Distance - D') / 2700
  const velocity_ms = adjusted_distance / TEST_DURATION;

  // Adjusted pace in seconds per kilometer
  const pace_sec_per_km = 1000 / velocity_ms;

  return {
    velocity_ms,
    pace_sec_per_km,
    velocity_ms_raw,
    pace_sec_per_km_raw,
    adjusted_distance,
    distance,
    duration: TEST_DURATION,
    d_prime,
    d_prime_estimated,
  };
}

/**
 * Calculate Critical Velocity from 60-minute test distance
 *
 * @param {number} distance - Distance covered in 60 minutes (meters)
 * @param {number} customDPrime - Optional custom D' value (meters)
 * @returns {object} CV velocity and pace data
 */
export function calculateCV60min(distance, customDPrime = null) {
  if (distance <= 0 || !isFinite(distance)) {
    throw new Error("Distance must be a positive number");
  }

  const TEST_DURATION = 3600; // 60 minutes in seconds

  // Estimate D' for single-point test (or use custom value)
  const d_prime = customDPrime !== null ? customDPrime : D_PRIME_ESTIMATES.DEFAULT;
  const d_prime_estimated = customDPrime === null;

  // Raw (unadjusted) Critical Velocity in m/s
  const velocity_ms_raw = distance / TEST_DURATION;

  // Raw pace in seconds per kilometer
  const pace_sec_per_km_raw = 1000 / velocity_ms_raw;

  // Adjusted distance (removing D' contribution)
  const adjusted_distance = distance - d_prime;

  // Adjusted Critical Velocity in m/s
  // For 60-min test: CV = (Distance - D') / 3600
  const velocity_ms = adjusted_distance / TEST_DURATION;

  // Adjusted pace in seconds per kilometer
  const pace_sec_per_km = 1000 / velocity_ms;

  return {
    velocity_ms,
    pace_sec_per_km,
    velocity_ms_raw,
    pace_sec_per_km_raw,
    adjusted_distance,
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

  // Raw (unadjusted) Critical Velocity in m/s
  const velocity_ms_raw = distance / TEST_DURATION;

  // Raw pace in seconds per kilometer
  const pace_sec_per_km_raw = 1000 / velocity_ms_raw;

  // Adjusted distance (removing D' contribution)
  const adjusted_distance = distance - d_prime;

  // Adjusted Critical Velocity in m/s
  // For Cooper test: CV = (Distance - D') / 720
  const velocity_ms = adjusted_distance / TEST_DURATION;

  // Adjusted pace in seconds per kilometer
  const pace_sec_per_km = 1000 / velocity_ms;

  return {
    velocity_ms,
    pace_sec_per_km,
    velocity_ms_raw,
    pace_sec_per_km_raw,
    adjusted_distance,
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
 * @returns {object} CV, D', and pace data (includes both raw and adjusted values)
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

  // Critical Velocity in m/s (adjusted - true CV from 2-point method)
  const velocity_ms = (distance2 - distance1) / (time2 - time1);

  // Anaerobic Distance Capacity (D') in meters
  const d_prime = (distance1 * time2 - distance2 * time1) / (time2 - time1);

  // Pace in seconds per kilometer (adjusted)
  const pace_sec_per_km = 1000 / velocity_ms;

  // Raw (unadjusted) Critical Velocity - average of both test velocities
  // Each individual test includes D' contribution: d = CV*t + D'
  // So raw velocity = d/t includes both aerobic and anaerobic contributions
  const velocity1_raw = distance1 / time1;
  const velocity2_raw = distance2 / time2;
  const velocity_ms_raw = (velocity1_raw + velocity2_raw) / 2;

  // Raw pace in seconds per kilometer
  const pace_sec_per_km_raw = 1000 / velocity_ms_raw;

  // Calculate adjusted distances (what would have been covered without D')
  const adjusted_distance1 = distance1 - d_prime;
  const adjusted_distance2 = distance2 - d_prime;
  const adjusted_distance = (adjusted_distance1 + adjusted_distance2) / 2;

  return {
    velocity_ms,
    d_prime,
    d_prime_estimated: false, // D' is directly calculated, not estimated
    pace_sec_per_km,
    velocity_ms_raw,
    pace_sec_per_km_raw,
    adjusted_distance,
    distance1,
    time1,
    distance2,
    time2,
  };
}
