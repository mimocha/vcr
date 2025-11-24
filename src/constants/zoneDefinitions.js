/**
 * Training Zone System Definitions
 *
 * Implements two zone calculation methodologies:
 * 1. Offset-Based: Hybrid approach with percentage-based lower bounds and fixed time offsets
 *    for upper bounds (based on Front Runner Sports implementation of Lange & Pöhlitz framework)
 * 2. Race Prediction-Based: Uses Riegel Power Law for high-intensity zones
 *    (original Lange & Pöhlitz 1995 methodology)
 *
 * Source references and methodology details documented in docs/zones.md
 *
 * Reference: docs/zones.md
 */

export const ZONE_COLORS = {
  1: {
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
    badge: "bg-blue-100",
    accent: "text-blue-600 dark:text-blue-400",
    glassTint: "bg-blue-500/5",
    glowColor: "blue",
    pill: "bg-blue-500",
    pillText: "text-white",
    pillLight: "bg-blue-600",
    pillDark: "bg-blue-800",
  },
  2: {
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-200",
    badge: "bg-green-100",
    accent: "text-green-600 dark:text-green-400",
    glassTint: "bg-green-500/5",
    glowColor: "green",
    pill: "bg-green-500",
    pillText: "text-white",
    pillLight: "bg-green-600",
    pillDark: "bg-emerald-800",
  },
  3: {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    border: "border-yellow-200",
    badge: "bg-yellow-100",
    accent: "text-yellow-600 dark:text-yellow-400",
    glassTint: "bg-yellow-500/5",
    glowColor: "yellow",
    pill: "bg-yellow-500",
    pillText: "text-white",
    pillLight: "bg-amber-500",
    pillDark: "bg-amber-700",
  },
  4: {
    bg: "bg-orange-50",
    text: "text-orange-800",
    border: "border-orange-200",
    badge: "bg-orange-100",
    accent: "text-orange-600 dark:text-orange-400",
    glassTint: "bg-orange-500/5",
    glowColor: "orange",
    pill: "bg-orange-500",
    pillText: "text-white",
    pillLight: "bg-orange-600",
    pillDark: "bg-orange-800",
  },
  5: {
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200",
    badge: "bg-red-100",
    accent: "text-red-600 dark:text-red-400",
    glassTint: "bg-red-500/5",
    glowColor: "red",
    pill: "bg-red-500",
    pillText: "text-white",
    pillLight: "bg-red-600",
    pillDark: "bg-rose-800",
  },
};

/**
 * Zone System Definitions
 * Multiple methodologies for calculating training zones
 */
export const ZONE_SYSTEMS = {
  OFFSET_BASED: {
    id: "offset-based",
    name: "Offset-Based",
    description:
      "Hybrid zone system using percentage-based Z1-Z4 lower bounds and fixed time offsets for Z4-Z5 upper bounds",
    zones: [
      {
        number: 1,
        name: "Recovery / Easy",
        speedMin: 0.7, // 70% of CV speed (slowest for this zone)
        speedMax: 0.85, // 85% of CV speed (fastest for this zone)
      },
      {
        number: 2,
        name: "Steady State",
        speedMin: 0.85,
        speedMax: 0.9,
      },
      {
        number: 3,
        name: "Tempo",
        speedMin: 0.9,
        speedMax: 0.97,
      },
      {
        number: 4,
        name: "Threshold",
        speedMin: 0.97,
        speedMax: null, // Calculated as CV pace - 10 seconds
        useFixedTimeOffset: true,
        timeOffsetSeconds: -10, // CV pace - 10 seconds
      },
      {
        number: 5,
        name: "VO₂ Max",
        speedMin: null, // Calculated as CV pace - 10 seconds (same as Z4 upper)
        speedMax: null, // Calculated as CV pace - 20 seconds
        useFixedTimeOffset: true,
        timeOffsetSecondsMin: -10, // Z5 lower = CV pace - 10 seconds
        timeOffsetSecondsMax: -20, // Z5 upper = CV pace - 20 seconds
      },
    ],
    notes: [
      "Hybrid methodology: percentage-based lower bounds, fixed time offsets for upper bounds",
      "Z1-Z4 lower bounds: Percentage-based (70%, 85%, 90%, 97% of CV)",
      "Z4 upper / Z5 lower: CV pace - 10 seconds (fixed time offset)",
      "Z5 upper: CV pace - 20 seconds (fixed time offset)",
      "Source: Front Runner Sports pace zone calculator methodology (Lange & Pöhlitz framework)",
    ],
  },
  RACE_PREDICTION_BASED: {
    id: "race-prediction-based",
    name: "Race Prediction-Based",
    description:
      "Hybrid zone system using percentage-based Z1-Z3 and race prediction-based Z4-Z5",
    requiresRacePrediction: true,
    racePredictionMethod: "riegel",
    fatigueFactor: 1.06,
    zones: [
      {
        number: 1,
        name: "Recovery / Easy",
        speedMin: 0.7,
        speedMax: 0.85,
      },
      {
        number: 2,
        name: "Steady State",
        speedMin: 0.85,
        speedMax: 0.9,
      },
      {
        number: 3,
        name: "Tempo",
        speedMin: 0.9,
        speedMax: 0.97,
      },
      {
        number: 4,
        name: "Threshold (TL)",
        description: "Tempolauf - Competition-specific endurance (5K-10K race pace)",
        speedMin: 0.97,
        speedMax: 1.0,
        // Note: Z4 bounds are calculated from 10K (lower) and 5K (upper) race predictions
      },
      {
        number: 5,
        name: "VO₂ Max (WSA)",
        description: "Wettkampfspezifische Ausdauer - Max oxygen uptake (1500m-3K race pace)",
        speedMin: 1.04,
        speedMax: 1.09,
        // Note: Z5 bounds are calculated from 3K (lower) and 1500m (upper) race predictions
      },
    ],
    notes: [
      "Uses Riegel Power Law for race-based Z4-Z5 calculation (non-linear scaling)",
      "Z1-Z3: Calculated as percentages of CV (70-85%, 85-90%, 90-97%)",
      "Z4: Anchored to 10K pace (lower) → 5K pace (upper) using Riegel predictions",
      "Z5: Anchored to 3K pace (lower) → 1500m pace (upper) using Riegel predictions",
      "High-intensity zones scale non-linearly with performance level",
      "Source: Original Lange & Pöhlitz methodology (1995, updated 2014)",
    ],
  },
};

/**
 * Default zone system
 */
export const DEFAULT_ZONE_SYSTEM = ZONE_SYSTEMS.OFFSET_BASED.id;

/**
 * Legacy export for backward compatibility
 * @deprecated Use ZONE_SYSTEMS.OFFSET_BASED.zones instead
 */
export const ZONE_DEFINITION = ZONE_SYSTEMS.OFFSET_BASED.zones;

export const UNIT_SYSTEMS = {
  METRIC: "metric",
  IMPERIAL: "imperial",
};
