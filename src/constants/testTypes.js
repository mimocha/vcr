/**
 * Test Type Configurations
 * Defines available CV test protocols
 */

export const TEST_TYPES = {
  THIRTY_MIN: "30min",
  FORTY_FIVE_MIN: "45min",
  SIXTY_MIN: "60min",
  COOPER: "cooper",
  TWO_POINT: "2point",
};

export const TEST_CONFIGS = {
  [TEST_TYPES.THIRTY_MIN]: {
    id: TEST_TYPES.THIRTY_MIN,
    name: "30-Minutes Test",
    shortName: "30min",
    description: "Run maximum distance in exactly 30 minutes",
    duration: 1800, // seconds
    inputs: [
      {
        id: "distance",
        label: "Distance (meters)",
        placeholder: "e.g., 5000",
        type: "number",
        required: true,
      },
    ],
    accuracy: "Low (overestimates CV due to short duration)",
  },
  [TEST_TYPES.FORTY_FIVE_MIN]: {
    id: TEST_TYPES.FORTY_FIVE_MIN,
    name: "45-Minutes Test",
    shortName: "45min",
    description: "Run maximum distance in exactly 45 minutes",
    duration: 2700, // seconds
    inputs: [
      {
        id: "distance",
        label: "Distance (meters)",
        placeholder: "e.g., 7500",
        type: "number",
        required: true,
      },
    ],
    accuracy: "Moderate (overestimates CV due to shorter duration)",
  },
  [TEST_TYPES.SIXTY_MIN]: {
    id: TEST_TYPES.SIXTY_MIN,
    name: "60-Minutes Test",
    shortName: "60min",
    description: "Run maximum distance in exactly 60 minutes",
    duration: 3600, // seconds
    inputs: [
      {
        id: "distance",
        label: "Distance (meters)",
        placeholder: "e.g., 10000",
        type: "number",
        required: true,
      },
    ],
    accuracy: "High (direct approximation of CV)",
  },
  [TEST_TYPES.COOPER]: {
    id: TEST_TYPES.COOPER,
    name: "Cooper 12-Minute Test",
    shortName: "Cooper",
    description: "Run maximum distance in exactly 12 minutes",
    duration: 720, // seconds
    inputs: [
      {
        id: "distance",
        label: "Distance (meters)",
        placeholder: "e.g., 2800",
        type: "number",
        required: true,
      },
    ],
    accuracy: "Low (overestimates CV due to short duration)",
  },
  [TEST_TYPES.TWO_POINT]: {
    id: TEST_TYPES.TWO_POINT,
    name: "2-Point Maximal Test",
    shortName: "2-Point",
    description: "Two maximal efforts at different distances/durations",
    inputs: [
      {
        id: "distance1",
        label: "First Test Distance (meters)",
        placeholder: "e.g., 1500",
        type: "number",
        required: true,
        note: "Shorter effort (3-8 minutes)",
      },
      {
        id: "time1",
        label: "First Test Time (seconds)",
        placeholder: "e.g., 360",
        type: "number",
        required: true,
        note: "Duration of first test",
      },
      {
        id: "distance2",
        label: "Second Test Distance (meters)",
        placeholder: "e.g., 4200",
        type: "number",
        required: true,
        note: "Longer effort (12-20 minutes)",
      },
      {
        id: "time2",
        label: "Second Test Time (seconds)",
        placeholder: "e.g., 1080",
        type: "number",
        required: true,
        note: "Duration of second test",
      },
    ],
    accuracy: "Very High (true CV calculation with D')",
  },
};

export const DEFAULT_TEST_TYPE = TEST_TYPES.THIRTY_MIN;
