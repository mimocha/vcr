/**
 * Training Zone Calculators
 * Based on CV-based 5-zone system (Lange & Pöhlitz methodology)
 * Reference: docs/zones.md
 */

import {
  velocityToPacePerKm,
  velocityToPacePerMile,
} from "./paceConversions.js";
import { ZONE_DEFINITION } from "../../constants/zoneDefinitions.js";

/**
 * Calculate training zones from Critical Velocity
 * All zones calculated as percentages of CV speed (velocity)
 *
 * @param {number} cvVelocityMs - Critical Velocity in meters per second
 * @returns {object} Training zones with pace ranges
 */
export function calculateTrainingZones(cvVelocityMs) {
  if (cvVelocityMs <= 0 || !isFinite(cvVelocityMs)) {
    throw new Error("CV velocity must be a positive number");
  }

  // Zone definitions as percentages of CV speed

  // Calculate pace ranges for each zone
  // Note: Higher speed percentage = faster = lower pace (less time per distance)
  return ZONE_DEFINITION.map((zone) => {
    const velocityMin = cvVelocityMs * zone.speedMin;
    const velocityMax = cvVelocityMs * zone.speedMax;

    // Pace is inverse of velocity
    // Min velocity gives max pace (slower), max velocity gives min pace (faster)
    const paceMaxSecPerKm = velocityToPacePerKm(velocityMin); // Slower pace
    const paceMinSecPerKm = velocityToPacePerKm(velocityMax); // Faster pace

    const paceMaxSecPerMile = velocityToPacePerMile(velocityMin);
    const paceMinSecPerMile = velocityToPacePerMile(velocityMax);

    return {
      ...zone,
      velocityMin,
      velocityMax,
      paceMinSecPerKm, // Faster end of zone
      paceMaxSecPerKm, // Slower end of zone
      paceMinSecPerMile,
      paceMaxSecPerMile,
    };
  });
}

/**
 * Get a specific zone by number
 *
 * @param {number} cvVelocityMs - Critical Velocity in meters per second
 * @param {number} zoneNumber - Zone number (1-5)
 * @returns {object} Zone data
 */
export function getZone(cvVelocityMs, zoneNumber) {
  const zones = calculateTrainingZones(cvVelocityMs);
  const zone = zones.find((z) => z.number === zoneNumber);

  if (!zone) {
    throw new Error(`Invalid zone number: ${zoneNumber}. Must be 1-5.`);
  }

  return zone;
}
