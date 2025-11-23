/**
 * Training Zone System Definitions
 * Reference: docs/zones.md
 */

export const ZONE_COLORS = {
  1: {
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-200",
    badge: "bg-green-100",
  },
  2: {
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
    badge: "bg-blue-100",
  },
  3: {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    border: "border-yellow-200",
    badge: "bg-yellow-100",
  },
  4: {
    bg: "bg-orange-50",
    text: "text-orange-800",
    border: "border-orange-200",
    badge: "bg-orange-100",
  },
  5: {
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200",
    badge: "bg-red-100",
  },
};

export const ZONE_INFO = [
  {
    number: 1,
    name: "Easy",
    shortDescription: "Conversational pace",
    purpose: "Base aerobic development, recovery",
    duration: "Long runs (90+ minutes), recovery runs",
    feel: "Can speak in full sentences",
    rpe: "3-4/10",
  },
  {
    number: 2,
    name: "Steady State",
    shortDescription: "Controlled effort",
    purpose: "Aerobic efficiency, sustainable endurance",
    duration: "Medium-long runs (60-90 minutes)",
    feel: "Can speak in phrases but not paragraphs",
    rpe: "5-6/10",
  },
  {
    number: 3,
    name: "Tempo",
    shortDescription: "Comfortably hard",
    purpose: "Lactate clearance, prolonged moderate intensity",
    duration: "Tempo runs (20-40 minutes)",
    feel: "Limited conversation (1-2 words)",
    rpe: "7/10",
  },
  {
    number: 4,
    name: "Threshold",
    shortDescription: "Hard effort",
    purpose: "Lactate threshold, maximal lactate steady state",
    duration: "Threshold intervals (3-5 × 5-8 min)",
    feel: "Breathing heavily, only 1-word responses",
    rpe: "8/10",
  },
  {
    number: 5,
    name: "VO₂ Max",
    shortDescription: "Very hard",
    purpose: "Maximal oxygen uptake, running economy",
    duration: "VO₂ max intervals (4-6 × 3-5 min)",
    feel: "Cannot speak, sustainable 3-8 minutes",
    rpe: "9-10/10",
  },
];

export const UNIT_SYSTEMS = {
  METRIC: "metric",
  IMPERIAL: "imperial",
};

export const UNIT_LABELS = {
  [UNIT_SYSTEMS.METRIC]: {
    distance: "meters",
    distanceShort: "m",
    pace: "/km",
    paceLabel: "min/km",
    distanceDisplay: "km",
  },
  [UNIT_SYSTEMS.IMPERIAL]: {
    distance: "miles",
    distanceShort: "mi",
    pace: "/mi",
    paceLabel: "min/mi",
    distanceDisplay: "mi",
  },
};
