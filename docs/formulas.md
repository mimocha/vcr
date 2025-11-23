# Critical Velocity Formulas & Calculations

## Overview

This document details the mathematical formulas used for Critical Velocity (CV) calculation and training zone determination. Our implementation uses scientifically validated formulas based on the fundamental definition of Critical Velocity.

**Methodology:** We use the simplified distance/time approach popularized by Tom Schwartz (Tinman), which aligns with the physiological definition of CV and provides mathematically sound results.

**Note on Reference Sites:** While we initially examined the Front Runner Sports CV calculator, we chose not to replicate its proprietary power law formulas. Instead, we implement the standard scientific approach that gives more accurate and explainable results.

**Last Updated:** 2025-11-23

---

## References

### Primary Sources

- **Tom Schwartz (Tinman) - Critical Speed Guide:** https://runningwritings.com/2024/01/critical-speed-guide-for-runners.html
  - Comprehensive deep-dive on Critical Velocity theory and application for runners
  - Defines the 30-minute test as the primary practical approximation method

### Secondary Sources

- Jones, A. M., Vanhatalo, A., Burnley, M., Morton, R. H., & Poole, D. C. (2010). Critical power: Implications for determination of VO₂max and exercise tolerance. _Medicine and Science in Sports and Exercise_, 42(10), 1876-1890.
- Monod, H., & Scherrer, J. (1965). The work capacity of a synergic muscular group. _Ergonomics_, 8(3), 329-338.

### Reference Calculators

- **Front Runner Sports CV Calculator:** https://frontrunnersports.com.au/runningsquads/pacezonecalculator/
  - Uses power law formulas (see notes below on discrepancies)

---

## Test Protocols

### 1. 30-Minute Critical Velocity Test (CVT)

**Test Protocol:**

- Run maximum distance in exactly 30 minutes (1800 seconds)
- Record total distance in meters

**Input:** Distance (meters)

**CV Calculation:**

By definition from Tom Schwartz (Tinman), the 30-minute test provides a direct approximation of Critical Velocity:

```javascript
// Critical Velocity in meters per second
CV = distance / 1800

// Convert to pace (seconds per kilometer)
CV_pace_sec_per_km = 1000 / CV = 1800000 / distance

// Convert to min/km format
CV_min_per_km = Math.floor(CV_pace_sec_per_km / 60)
CV_sec_remainder = Math.floor(CV_pace_sec_per_km % 60)
```

**Mathematical Justification:**

- If you run at maximum sustainable pace for 30 minutes, your average velocity is simply: `Distance / Time`
- By Tinman's definition, this 30-minute maximal effort approximates Critical Velocity
- **Important:** This is a systematic **overestimate** of the true Critical Velocity
  - True CV is the asymptote of the hyperbolic power-duration curve
  - A 30-minute maximal effort includes some contribution from anaerobic capacity (D')
  - Despite the overestimate, this is the accepted practical approximation

**Example:**

```
Distance: 7350 meters (in 30 minutes)
CV = 7350 / 1800 = 4.083 m/s
CV_pace = 1000 / 4.083 = 244.9 seconds/km
        = 4 min 05 sec per km
```

---

### 2. Cooper's 12-Minute Test

**Test Protocol:**

- Run maximum distance in exactly 12 minutes (720 seconds)
- Record total distance in meters

**Input:** Distance (meters)

**CV Calculation:**

The Cooper test follows the same principle as the 30-minute test:

```javascript
// Critical Velocity in meters per second
CV = distance / 720

// Convert to pace (seconds per kilometer)
CV_pace_sec_per_km = 1000 / CV = 720000 / distance

// Convert to min/km format
CV_min_per_km = Math.floor(CV_pace_sec_per_km / 60)
CV_sec_remainder = Math.floor(CV_pace_sec_per_km % 60)
```

**Important Considerations:**

- The 12-minute duration is significantly shorter than 30 minutes
- This results in a **larger overestimate** of true CV compared to the 30-minute test
- The shorter duration means more anaerobic contribution (D') relative to aerobic metabolism
- For best accuracy, the 30-minute test is preferred
- The 12-minute test is useful when time or facilities are limited

**Example:**

```
Cooper Distance: 2800 meters (in 12 minutes)
CV = 2800 / 720 = 3.889 m/s
CV_pace = 1000 / 3.889 = 257.2 seconds/km
        = 4 min 17 sec per km
```

---

### 3. 2-Point Maximal Effort Test

**Theory:**

The 2-point test uses two maximal efforts at different distances/durations to calculate both Critical Velocity (CV) and Anaerobic Distance Capacity (D'). This is the most scientifically rigorous method for determining true CV.

**Standard Formula:**

```javascript
// Critical Velocity (m/s)
CV = (distance₂ - distance₁) / (time₂ - time₁)

// Anaerobic Distance Capacity (meters)
D_prime = (distance₁ × time₂ - distance₂ × time₁) / (time₂ - time₁)

// Convert CV to pace
CV_pace_sec_per_km = 1000 / CV
```

**Where:**

- `distance₁, time₁`: First maximal effort (shorter duration, e.g., 3-8 minutes)
- `distance₂, time₂`: Second maximal effort (longer duration, e.g., 12-20 minutes)
- `CV`: Critical Velocity - the theoretical maximum sustainable pace
- `D'`: Finite work capacity above CV (represents anaerobic contribution)

**Advantages:**

- More accurate than single-point tests
- Provides both CV and D' values
- True CV (asymptote) rather than an overestimate

**Disadvantages:**

- Requires two separate maximal efforts (on different days)
- More time and effort intensive
- Requires precise measurement of both distance and time

**Sources:**

- Jones, A. M., Vanhatalo, A., Burnley, M., Morton, R. H., & Poole, D. C. (2010). Critical power: Implications for determination of VO₂max and exercise tolerance. _Medicine and Science in Sports and Exercise_, 42(10), 1876-1890.
- Monod, H., & Scherrer, J. (1965). The work capacity of a synergic muscular group. _Ergonomics_, 8(3), 329-338.

---

## Training Zones

**⚠️ SECTION UNDER DEVELOPMENT**

Training zones are typically calculated as percentages of Critical Velocity or related to specific physiological thresholds (lactate threshold, VO₂max, etc.). The exact methodology requires further research.

### Common Approaches

**1. Percentage-based zones (Jack Daniels, Pete Pfitzinger):**

```javascript
// Example zone calculations as percentages of CV pace
Easy = CV_pace × 1.20 // 20% slower than CV
Tempo = CV_pace × 1.05 // 5% slower than CV
Threshold = CV_pace × 0.98 // 2% faster than CV
VO2max = CV_pace × 0.90 // 10% faster than CV
```

**2. Physiological threshold-based:**

- **Lactate Threshold (LT):** Typically 85-90% of CV
- **Anaerobic Threshold (AT):** Approximately 95-100% of CV
- **VO₂max pace:** Typically faster than CV (relies on D')

**3. Heart rate-based zones:**

Requires additional testing to correlate HR with CV-based paces.

### TODO: Research & Validation Needed

- Determine scientifically validated zone percentages
- Consider individual variability and experience level
- Integrate D' (anaerobic capacity) for high-intensity zones
- Validate against established training systems (Daniels, Pfitzinger, etc.)

### Reference Site Comparison

The Front Runner Sports calculator uses empirically-fitted power law formulas that don't align with the simplified CV calculation. These may be based on specific athlete populations or alternative physiological models. Further investigation needed to determine if these zones have scientific validity or are proprietary formulations.

---

## Pace Conversions

### Seconds per Kilometer → Minutes:Seconds per Kilometer

```javascript
function formatPace(secondsPerKm) {
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.floor(secondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
```

### Seconds per Kilometer → Minutes per Mile

```javascript
const METERS_PER_MILE = 1609.34;
const secondsPerMile = secondsPerKm × (METERS_PER_MILE / 1000);
const minutesPerMile = secondsPerMile / 60;
```

### Critical Velocity (m/s) Conversion

If we want traditional CV in meters per second:

```javascript
// From pace (sec/km) to velocity (m/s)
CV_m_per_s = 1000 / secondsPerKm;

// Example: 414.95 sec/km = 2.41 m/s
```

---

## Implementation Notes

### Validation Strategy

1. **Mathematical Validation:**

   - Verify CV calculation matches distance/time definition
   - Test 2-point formula with known CV and D' values
   - Validate pace conversions (m/s ↔ min/km ↔ min/mile)

2. **Physiological Plausibility:**

   - Elite runners: ~7000-8000m in 30 minutes (CV ≈ 3:51-4:17/km)
   - Recreational runners: ~5000-6000m in 30 minutes (CV ≈ 5:00-6:00/km)
   - Ensure calculated paces fall within realistic ranges

3. **Cross-Reference:**
   - Compare with Tinman's calculator (if available)
   - Validate against Jack Daniels' VDOT tables
   - Check consistency with McMillan Running Calculator

### JavaScript Implementation

```javascript
/**
 * Calculate Critical Velocity from 30-minute test distance
 * Based on Tom Schwartz (Tinman) methodology
 *
 * @param {number} distance - Distance covered in 30 minutes (meters)
 * @returns {object} CV velocity and pace
 */
function calculateCV30min(distance) {
  if (distance <= 0) {
    throw new Error("Distance must be positive");
  }

  const TEST_DURATION = 1800; // 30 minutes in seconds

  // Critical Velocity in m/s
  const cv_ms = distance / TEST_DURATION;

  // Pace in seconds per kilometer
  const pace_sec_per_km = 1000 / cv_ms;

  return {
    velocity_ms: cv_ms,
    pace_sec_per_km: pace_sec_per_km,
    pace_min_per_km: Math.floor(pace_sec_per_km / 60),
    pace_sec: Math.floor(pace_sec_per_km % 60)
  };
}

/**
 * Calculate Critical Velocity from Cooper 12-minute test
 *
 * @param {number} distance - Distance covered in 12 minutes (meters)
 * @returns {object} CV velocity and pace
 */
function calculateCVCooper(distance) {
  if (distance <= 0) {
    throw new Error("Distance must be positive");
  }

  const TEST_DURATION = 720; // 12 minutes in seconds

  // Critical Velocity in m/s
  const cv_ms = distance / TEST_DURATION;

  // Pace in seconds per kilometer
  const pace_sec_per_km = 1000 / cv_ms;

  return {
    velocity_ms: cv_ms,
    pace_sec_per_km: pace_sec_per_km,
    pace_min_per_km: Math.floor(pace_sec_per_km / 60),
    pace_sec: Math.floor(pace_sec_per_km % 60)
  };
}

/**
 * Calculate Critical Velocity from 2-point maximal effort test
 *
 * @param {number} distance1 - First test distance (meters, shorter)
 * @param {number} time1 - First test duration (seconds)
 * @param {number} distance2 - Second test distance (meters, longer)
 * @param {number} time2 - Second test duration (seconds)
 * @returns {object} CV, D', and pace
 */
function calculateCV2Point(distance1, time1, distance2, time2) {
  if (distance1 <= 0 || distance2 <= 0 || time1 <= 0 || time2 <= 0) {
    throw new Error("All values must be positive");
  }
  if (time1 >= time2) {
    throw new Error("Second test must be longer than first test");
  }

  // Critical Velocity in m/s
  const cv_ms = (distance2 - distance1) / (time2 - time1);

  // Anaerobic Distance Capacity (D') in meters
  const d_prime = (distance1 * time2 - distance2 * time1) / (time2 - time1);

  // Pace in seconds per kilometer
  const pace_sec_per_km = 1000 / cv_ms;

  return {
    velocity_ms: cv_ms,
    d_prime: d_prime,
    pace_sec_per_km: pace_sec_per_km,
    pace_min_per_km: Math.floor(pace_sec_per_km / 60),
    pace_sec: Math.floor(pace_sec_per_km % 60)
  };
}
```

---

## Open Questions & Future Research

1. **Training Zone Validation:**

   - Determine scientifically validated zone percentages based on CV
   - Research Tinman/Tom Schwartz's specific zone recommendations
   - Compare zones from Daniels, Pfitzinger, Lydiard systems
   - Validate against lactate threshold and VO₂max research

2. **D' (Anaerobic Capacity) Integration:**

   - How to use D' for predicting race times at various distances
   - Using D' to calculate interval training prescriptions
   - Relationship between D' and sprint/speed work

3. **Individual Variability:**

   - How much do CV and zones vary by:
     - Training age/experience level
     - Race specialization (800m vs marathon)
     - Age and sex differences

4. **Practical Applications:**

   - Race time predictions from CV and D'
   - Pace calculators for various distances
   - Recovery time estimation between efforts
   - Interval prescription (work:rest ratios)

5. **Alternative Test Protocols:**
   - 3km and 6km time trial method
   - Track-based protocols (1200m + 3200m)
   - Treadmill testing considerations

---

## Changelog

- **2025-11-23 (Updated):** Major revision based on Tom Schwartz (Tinman) methodology
  - Replaced complex power law formulas with simplified distance/time calculations
  - Added Tinman's Critical Speed Guide as primary source
  - Implemented scientifically correct formulas for all three test methods
  - Marked training zones section as "under development" pending further research
  - Updated all code examples to reflect simplified calculations
- **2025-11-23 (Initial):** Initial documentation, reverse-engineered from Front Runner Sports reference site
- **TODO:** Research and validate training zone percentages from scientific sources
- **TODO:** Add unit tests validating calculations against known values
- **TODO:** Implement race time prediction formulas using CV and D'
