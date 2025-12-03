/**
 * Input Validation Utilities
 * Validate user inputs for CV tests
 */

/**
 * Validate distance input
 *
 * @param {number} distance - Distance in meters
 * @param {object} options - Validation options
 * @param {number} options.min - Minimum distance (default: 100)
 * @param {number} options.max - Maximum distance (default: 50000)
 * @returns {object} { valid: boolean, error: string|null }
 */
export function validateDistance(distance, options = {}) {
  const { min = 100, max = 50000 } = options;

  if (distance === null || distance === undefined || distance === "") {
    return { valid: false, error: "Distance is required" };
  }

  const num = Number(distance);

  if (isNaN(num)) {
    return { valid: false, error: "Distance must be a number" };
  }

  if (!isFinite(num)) {
    return { valid: false, error: "Distance must be a finite number" };
  }

  if (num <= 0) {
    return { valid: false, error: "Distance must be positive" };
  }

  if (num < min) {
    return { valid: false, error: `Distance must be at least ${min} meters` };
  }

  if (num > max) {
    return { valid: false, error: `Distance must be at most ${max} meters` };
  }

  return { valid: true, error: null };
}

/**
 * Validate time input
 *
 * @param {number} time - Time in seconds
 * @param {object} options - Validation options
 * @param {number} options.min - Minimum time in seconds (default: 60)
 * @param {number} options.max - Maximum time in seconds (default: 7200)
 * @returns {object} { valid: boolean, error: string|null }
 */
function validateTime(time, options = {}) {
  const { min = 60, max = 7200 } = options;

  if (time === null || time === undefined || time === "") {
    return { valid: false, error: "Time is required" };
  }

  const num = Number(time);

  if (isNaN(num)) {
    return { valid: false, error: "Time must be a number" };
  }

  if (!isFinite(num)) {
    return { valid: false, error: "Time must be a finite number" };
  }

  if (num <= 0) {
    return { valid: false, error: "Time must be positive" };
  }

  if (num < min) {
    return { valid: false, error: `Time must be at least ${min} seconds` };
  }

  if (num > max) {
    return { valid: false, error: `Time must be at most ${max} seconds` };
  }

  return { valid: true, error: null };
}

/**
 * Validate 2-point test inputs
 *
 * @param {number} distance1 - First test distance in meters
 * @param {number} time1 - First test time in seconds
 * @param {number} distance2 - Second test distance in meters
 * @param {number} time2 - Second test time in seconds
 * @returns {object} { valid: boolean, errors: object }
 */
export function validate2PointTest(distance1, time1, distance2, time2) {
  const errors = {};

  // Validate individual inputs
  const d1Result = validateDistance(distance1, { min: 100, max: 50000 });
  if (!d1Result.valid) {
    errors.distance1 = d1Result.error;
  }

  const t1Result = validateTime(time1, { min: 60, max: 7200 });
  if (!t1Result.valid) {
    errors.time1 = t1Result.error;
  }

  const d2Result = validateDistance(distance2, { min: 100, max: 50000 });
  if (!d2Result.valid) {
    errors.distance2 = d2Result.error;
  }

  const t2Result = validateTime(time2, { min: 60, max: 7200 });
  if (!t2Result.valid) {
    errors.time2 = t2Result.error;
  }

  // Validate relationships between tests
  if (d1Result.valid && d2Result.valid && t1Result.valid && t2Result.valid) {
    const num1 = Number(distance1);
    const num2 = Number(distance2);
    const t1Num = Number(time1);
    const t2Num = Number(time2);

    if (t1Num >= t2Num) {
      errors.time2 = "Second test must be longer than first test";
    }

    if (num1 >= num2) {
      errors.distance2 =
        "Second test distance should be greater than first test distance";
    }

    const velocity1 = num1 / t1Num;
    const velocity2 = num2 / t2Num;

    if (velocity1 <= velocity2) {
      errors.time2 =
        "First test must have a faster pace (shorter time per meter) than second test";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
