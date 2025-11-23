/**
 * Pace Conversion Utilities
 * Reference: docs/formulas.md
 */

export const METERS_PER_MILE = 1609.34;
export const METERS_PER_KM = 1000;

/**
 * Convert seconds per kilometer to seconds per mile
 *
 * @param {number} secondsPerKm - Pace in seconds per kilometer
 * @returns {number} Pace in seconds per mile
 */
export function secPerKmToSecPerMile(secondsPerKm) {
  return secondsPerKm * (METERS_PER_MILE / METERS_PER_KM);
}

/**
 * Convert seconds per mile to seconds per kilometer
 *
 * @param {number} secondsPerMile - Pace in seconds per mile
 * @returns {number} Pace in seconds per kilometer
 */
export function secPerMileToSecPerKm(secondsPerMile) {
  return secondsPerMile * (METERS_PER_KM / METERS_PER_MILE);
}

/**
 * Convert velocity in m/s to pace in seconds per kilometer
 *
 * @param {number} velocityMs - Velocity in meters per second
 * @returns {number} Pace in seconds per kilometer
 */
export function velocityToPacePerKm(velocityMs) {
  return METERS_PER_KM / velocityMs;
}

/**
 * Convert velocity in m/s to pace in seconds per mile
 *
 * @param {number} velocityMs - Velocity in meters per second
 * @returns {number} Pace in seconds per mile
 */
export function velocityToPacePerMile(velocityMs) {
  return METERS_PER_MILE / velocityMs;
}

/**
 * Convert pace in seconds per kilometer to velocity in m/s
 *
 * @param {number} secondsPerKm - Pace in seconds per kilometer
 * @returns {number} Velocity in meters per second
 */
export function pacePerKmToVelocity(secondsPerKm) {
  return METERS_PER_KM / secondsPerKm;
}

/**
 * Convert pace in seconds per mile to velocity in m/s
 *
 * @param {number} secondsPerMile - Pace in seconds per mile
 * @returns {number} Velocity in meters per second
 */
export function pacePerMileToVelocity(secondsPerMile) {
  return METERS_PER_MILE / secondsPerMile;
}

/**
 * Convert meters to miles
 *
 * @param {number} meters - Distance in meters
 * @returns {number} Distance in miles
 */
export function metersToMiles(meters) {
  return meters / METERS_PER_MILE;
}

/**
 * Convert miles to meters
 *
 * @param {number} miles - Distance in miles
 * @returns {number} Distance in meters
 */
export function milesToMeters(miles) {
  return miles * METERS_PER_MILE;
}

/**
 * Convert meters to kilometers
 *
 * @param {number} meters - Distance in meters
 * @returns {number} Distance in kilometers
 */
export function metersToKm(meters) {
  return meters / METERS_PER_KM;
}

/**
 * Convert kilometers to meters
 *
 * @param {number} km - Distance in kilometers
 * @returns {number} Distance in meters
 */
export function kmToMeters(km) {
  return km * METERS_PER_KM;
}
