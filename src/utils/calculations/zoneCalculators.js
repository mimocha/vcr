/**
 * Training Zone Calculators
 * Based on CV-based 5-zone system (Lange & Pöhlitz methodology)
 * Reference: docs/zones.md
 */

import { velocityToPacePerKm, velocityToPacePerMile } from './paceConversions.js';

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
  const zones = [
    {
      number: 1,
      name: "Easy",
      speedMin: 0.70, // 70% of CV speed (slowest)
      speedMax: 0.85, // 85% of CV speed (fastest for this zone)
      description: "Conversational pace, sustainable for hours",
      purpose: "Base aerobic development, recovery",
      rpe: "3-4 out of 10",
    },
    {
      number: 2,
      name: "Steady State",
      speedMin: 0.85, // 85% of CV speed
      speedMax: 0.95, // 95% of CV speed
      description: "Controlled effort, can speak in phrases",
      purpose: "Aerobic efficiency, sustainable endurance",
      rpe: "5-6 out of 10",
    },
    {
      number: 3,
      name: "Tempo",
      speedMin: 0.95, // 95% of CV speed
      speedMax: 1.00, // 100% of CV speed (CV pace)
      description: "Comfortably hard, limited conversation",
      purpose: "Lactate clearance, prolonged moderate intensity",
      rpe: "7 out of 10",
    },
    {
      number: 4,
      name: "Threshold",
      speedMin: 1.00, // 100% of CV speed (CV pace)
      speedMax: 1.05, // 105% of CV speed
      description: "Hard, breathing heavily, only 1-word responses",
      purpose: "Lactate threshold, maximal lactate steady state",
      rpe: "8 out of 10",
    },
    {
      number: 5,
      name: "VO₂ Max",
      speedMin: 1.05, // 105% of CV speed
      speedMax: 1.20, // 120% of CV speed
      description: "Very hard, cannot speak, sustainable 3-8 minutes",
      purpose: "Maximal oxygen uptake, running economy at high speed",
      rpe: "9-10 out of 10",
    },
  ];

  // Calculate pace ranges for each zone
  // Note: Higher speed percentage = faster = lower pace (less time per distance)
  return zones.map((zone) => {
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
