/**
 * Training Zone System Definitions
 *
 * Current implementation uses zone percentages from Front Runner Sports
 * pace zone calculator (https://frontrunnersports.com.au/runningsquads/pacezonecalculator/)
 * which applies the general methodology framework by Lange, G. & Pöhlitz, L. (1995, updated 2014).
 *
 * Note: This is planned to be refactored to support multiple zone calculation methodologies.
 * Alternative zone systems are documented in docs/sources/ for future implementation.
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

export const ZONE_DEFINITION = [
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
    speedMax: 0.905,
  },
  {
    number: 3,
    name: "Tempo",
    speedMin: 0.905,
    speedMax: 0.9725,
  },
  {
    number: 4,
    name: "Threshold",
    speedMin: 0.9725,
    speedMax: 1.03,
  },
  {
    number: 5,
    name: "VO₂ Max",
    speedMin: 1.03,
    speedMax: 1.06,
  },
];

export const UNIT_SYSTEMS = {
  METRIC: "metric",
  IMPERIAL: "imperial",
};
