/**
 * Training Zone Calculators
 *
 * Implements two zone calculation methodologies:
 * 1. Offset-Based: Percentage-based with fixed time offsets for Z4-Z5
 *    (based on Front Runner Sports implementation of Lange & Pöhlitz framework)
 * 2. Race Prediction-Based: Uses Riegel Power Law for Z4-Z5 high-intensity zones
 *    (original Lange & Pöhlitz 1995 methodology)
 *
 * Reference: docs/zones.md
 */

import {
  velocityToPacePerKm,
  velocityToPacePerMile,
} from "./paceConversions.js";
import { ZONE_SYSTEMS, DEFAULT_ZONE_SYSTEM } from "../../constants/zoneDefinitions.js";
import { predictRaceTimeRiegel } from "./racePerformanceCalculators.js";

/**
 * Calculate training zones from Critical Velocity with selectable zone system
 * Most zones calculated as percentages of CV speed (velocity)
 * Race Prediction-Based system uses race predictions for high-intensity zones
 *
 * @param {number} cvVelocityMs - Critical Velocity in meters per second
 * @param {string} zoneSystemId - ID of the zone system to use (default: offset-based)
 * @param {number} dPrime - Anaerobic distance capacity in meters (optional, required for race-based zones)
 * @returns {object} Training zones with pace ranges
 */
export function calculateTrainingZones(cvVelocityMs, zoneSystemId = DEFAULT_ZONE_SYSTEM, dPrime = null) {
  if (cvVelocityMs <= 0 || !isFinite(cvVelocityMs)) {
    throw new Error("CV velocity must be a positive number");
  }

  // Get zone system definition
  const zoneSystem = Object.values(ZONE_SYSTEMS).find(sys => sys.id === zoneSystemId);
  if (!zoneSystem) {
    throw new Error(`Unknown zone system: ${zoneSystemId}`);
  }

  // Use race prediction-based calculation when D' is available
  if (zoneSystemId === 'race-prediction-based' && dPrime !== null && dPrime !== undefined) {
    return calculateRacePredictionBasedZones(cvVelocityMs, dPrime, zoneSystem.fatigueFactor);
  }

  // Default: percentage-based zone calculation
  // Calculate pace ranges for each zone
  // Note: Higher speed percentage = faster = lower pace (less time per distance)

  // For Offset-Based system, we need CV pace for fixed time offset calculations
  const cvPaceSecPerKm = zoneSystemId === 'offset-based' ? velocityToPacePerKm(cvVelocityMs) : null;

  return zoneSystem.zones.map((zone) => {
    let velocityMin, velocityMax;
    let paceMaxSecPerKm, paceMinSecPerKm;

    // Handle zones with fixed time offsets (Offset-Based system Z4-Z5)
    if (zone.useFixedTimeOffset) {
      // Zone 4: speedMin is percentage-based, speedMax is fixed time offset
      if (zone.number === 4) {
        velocityMin = cvVelocityMs * zone.speedMin;
        paceMaxSecPerKm = velocityToPacePerKm(velocityMin); // Slower pace from percentage
        paceMinSecPerKm = cvPaceSecPerKm + zone.timeOffsetSeconds; // Faster pace from fixed offset (CV - 10s)
        velocityMax = 1000 / paceMinSecPerKm; // Convert pace back to velocity
      }
      // Zone 5: both bounds are fixed time offsets
      else if (zone.number === 5) {
        paceMaxSecPerKm = cvPaceSecPerKm + zone.timeOffsetSecondsMin; // Slower pace (CV - 10s)
        paceMinSecPerKm = cvPaceSecPerKm + zone.timeOffsetSecondsMax; // Faster pace (CV - 20s)
        velocityMin = 1000 / paceMaxSecPerKm; // Convert paces back to velocities
        velocityMax = 1000 / paceMinSecPerKm;
      }
    } else {
      // Standard percentage-based calculation
      velocityMin = cvVelocityMs * zone.speedMin;
      velocityMax = cvVelocityMs * zone.speedMax;

      // Pace is inverse of velocity
      // Min velocity gives max pace (slower), max velocity gives min pace (faster)
      paceMaxSecPerKm = velocityToPacePerKm(velocityMin); // Slower pace
      paceMinSecPerKm = velocityToPacePerKm(velocityMax); // Faster pace
    }

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
 * Calculate training zones using race prediction methodology
 * Z1-Z3 use percentage-based calculation, Z4-Z5 use Riegel race predictions
 *
 * High-intensity zones are anchored to specific race distances rather than CV percentages:
 * - Z4: 10K pace (lower) to 5K pace (upper)
 * - Z5: 3K pace (lower) to 1500m pace (upper)
 *
 * Source: Original Lange & Pöhlitz (1995) methodology
 *
 * @param {number} cvVelocityMs - Critical Velocity in meters per second
 * @param {number} dPrime - Anaerobic distance capacity in meters
 * @param {number} fatigueFactor - Riegel fatigue coefficient (default: 1.06)
 * @returns {object} Training zones with pace ranges
 */
export function calculateRacePredictionBasedZones(
  cvVelocityMs,
  dPrime,
  fatigueFactor = 1.06
) {
  if (cvVelocityMs <= 0 || !isFinite(cvVelocityMs)) {
    throw new Error("CV velocity must be a positive number");
  }
  if (dPrime < 0 || !isFinite(dPrime)) {
    throw new Error("D' must be a non-negative number");
  }

  // Get Race Prediction-Based zone system for Z1-Z3 definitions
  const raceZoneSystem = ZONE_SYSTEMS.RACE_PREDICTION_BASED;
  if (!raceZoneSystem) {
    throw new Error("Race Prediction-Based zone system not found");
  }

  // Predict race paces using Riegel formula
  const race10k = predictRaceTimeRiegel(cvVelocityMs, dPrime, 10000, fatigueFactor);
  const race5k = predictRaceTimeRiegel(cvVelocityMs, dPrime, 5000, fatigueFactor);
  const race3k = predictRaceTimeRiegel(cvVelocityMs, dPrime, 3000, fatigueFactor);
  const race1500 = predictRaceTimeRiegel(cvVelocityMs, dPrime, 1500, fatigueFactor);

  // Calculate Z1-Z3 using percentage method (same as before)
  const zones = raceZoneSystem.zones.map((zoneDefinition, index) => {
    // For Z1-Z3 (indices 0-2), use percentage-based calculation
    if (index < 3) {
      const velocityMin = cvVelocityMs * zoneDefinition.speedMin;
      const velocityMax = cvVelocityMs * zoneDefinition.speedMax;

      const paceMaxSecPerKm = velocityToPacePerKm(velocityMin);
      const paceMinSecPerKm = velocityToPacePerKm(velocityMax);
      const paceMaxSecPerMile = velocityToPacePerMile(velocityMin);
      const paceMinSecPerMile = velocityToPacePerMile(velocityMax);

      return {
        ...zoneDefinition,
        velocityMin,
        velocityMax,
        paceMinSecPerKm,
        paceMaxSecPerKm,
        paceMinSecPerMile,
        paceMaxSecPerMile,
      };
    }

    // For Z4 (index 3), use 10K → 5K race predictions
    if (index === 3) {
      // Z4 Lower = 10K pace (slower), Z4 Upper = 5K pace (faster)
      const paceMaxSecPerKm = race10k.paceSecPerKm; // Slower
      const paceMinSecPerKm = race5k.paceSecPerKm;  // Faster
      const paceMaxSecPerMile = race10k.paceSecPerMile;
      const paceMinSecPerMile = race5k.paceSecPerMile;

      // Convert paces back to velocities
      const velocityMin = 1000 / paceMaxSecPerKm;
      const velocityMax = 1000 / paceMinSecPerKm;

      return {
        ...zoneDefinition,
        velocityMin,
        velocityMax,
        paceMinSecPerKm,
        paceMaxSecPerKm,
        paceMinSecPerMile,
        paceMaxSecPerMile,
        raceAnchors: ['10K', '5K'],
      };
    }

    // For Z5 (index 4), use 3K → 1500m race predictions
    if (index === 4) {
      // Z5 Lower = 3K pace (slower), Z5 Upper = 1500m pace (faster)
      const paceMaxSecPerKm = race3k.paceSecPerKm;  // Slower
      const paceMinSecPerKm = race1500.paceSecPerKm; // Faster
      const paceMaxSecPerMile = race3k.paceSecPerMile;
      const paceMinSecPerMile = race1500.paceSecPerMile;

      // Convert paces back to velocities
      const velocityMin = 1000 / paceMaxSecPerKm;
      const velocityMax = 1000 / paceMinSecPerKm;

      return {
        ...zoneDefinition,
        velocityMin,
        velocityMax,
        paceMinSecPerKm,
        paceMaxSecPerKm,
        paceMinSecPerMile,
        paceMaxSecPerMile,
        raceAnchors: ['3K', '1500m'],
      };
    }

    return null;
  }).filter(Boolean);

  return zones;
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
