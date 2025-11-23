/**
 * Training Zone System Definitions
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
    pillLight: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
    pillDark: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600",
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
    pillLight: "bg-gradient-to-br from-green-400 via-green-500 to-emerald-600",
    pillDark: "bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600",
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
    pillLight: "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500",
    pillDark: "bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-600",
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
    pillLight: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-500",
    pillDark: "bg-gradient-to-br from-orange-500 via-orange-600 to-red-600",
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
    pillLight: "bg-gradient-to-br from-red-400 via-red-500 to-rose-600",
    pillDark: "bg-gradient-to-br from-red-500 via-rose-600 to-pink-600",
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
