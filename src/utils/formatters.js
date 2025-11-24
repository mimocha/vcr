/**
 * Display Formatters
 * Format times, paces, and distances for display
 */

/**
 * Format seconds to MM:SS format
 *
 * @param {number} totalSeconds - Total seconds
 * @returns {string} Formatted time (MM:SS)
 */
export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Format seconds to HH:MM:SS format for longer durations
 *
 * @param {number} totalSeconds - Total seconds
 * @returns {string} Formatted time (HH:MM:SS)
 */
export function formatTimeWithHours(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return formatTime(totalSeconds);
}

/**
 * Format pace in seconds per kilometer to M:SS/km
 *
 * @param {number} secondsPerKm - Pace in seconds per kilometer
 * @returns {string} Formatted pace (M:SS/km)
 */
export function formatPacePerKm(secondsPerKm) {
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.floor(secondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}/km`;
}

/**
 * Format pace in seconds per mile to M:SS/mi
 *
 * @param {number} secondsPerMile - Pace in seconds per mile
 * @returns {string} Formatted pace (M:SS/mi)
 */
export function formatPacePerMile(secondsPerMile) {
  const minutes = Math.floor(secondsPerMile / 60);
  const seconds = Math.floor(secondsPerMile % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}/mi`;
}

/**
 * Format velocity in m/s to readable format
 *
 * @param {number} velocityMs - Velocity in meters per second
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted velocity (X.XX m/s)
 */
export function formatVelocity(velocityMs, decimals = 2) {
  return `${velocityMs.toFixed(decimals)} m/s`;
}

/**
 * Format pace range for a training zone
 *
 * @param {number} paceMinSec - Faster end of pace range (seconds per distance)
 * @param {number} paceMaxSec - Slower end of pace range (seconds per distance)
 * @param {string} unit - 'km' or 'mi'
 * @returns {string} Formatted pace range
 */
export function formatPaceRange(paceMinSec, paceMaxSec, unit = "km") {
  const formatFunc = unit === "km" ? formatPacePerKm : formatPacePerMile;

  // For display, show slower to faster (max to min)
  const slower = formatFunc(paceMaxSec);
  const faster = formatFunc(paceMinSec);

  return `${slower} - ${faster}`;
}
