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

Training zones are calculated using two different methodologies depending on the zone system selected:

### Zone System 1: Offset-Based (Default)

**Methodology:** Hybrid calculation using percentage-based for Z1-Z4 lower bounds and fixed time offsets for Z4 upper/Z5

**Percentage-Based Zones (Z1-Z4 lower bounds):**

```javascript
// Zone calculations as percentages of CV velocity (m/s)
Zone 1 (Recovery/Easy): 70-85% of CV
Zone 2 (Steady State): 85-90% of CV
Zone 3 (Tempo): 90-97% of CV
Zone 4 Lower: 97% of CV
```

**Fixed Time Offset Zones (Z4 upper, Z5):**

```javascript
// Z4 upper and Z5 use fixed time offsets from CV pace
Zone 4 Upper: CV pace - 10 seconds per km
Zone 5 Lower: CV pace - 10 seconds per km (same as Z4 upper)
Zone 5 Upper: CV pace - 20 seconds per km
```

**Implementation:**

```javascript
// For percentage-based zones (Z1-Z3, Z4 lower)
velocityMin = cvVelocityMs * zone.speedMin;
velocityMax = cvVelocityMs * zone.speedMax;
paceSecPerKm = 1000 / velocity; // Convert velocity to pace

// For fixed time offset zones (Z4 upper, Z5)
const cvPaceSecPerKm = 1000 / cvVelocityMs;
zone4Upper = cvPaceSecPerKm - 10; // seconds per km
zone5Lower = cvPaceSecPerKm - 10; // seconds per km
zone5Upper = cvPaceSecPerKm - 20; // seconds per km
// Convert paces back to velocities: velocity = 1000 / paceSecPerKm
```

**Rationale:** This hybrid approach uses fixed time offsets for high-intensity zones to provide more intuitive pacing guidance than percentage-based calculations.

**Source:** Front Runner Sports pace zone calculator methodology, applying the general framework by Lange & Pöhlitz (1995, updated 2014)

---

### Zone System 2: Race Prediction-Based

**Methodology:** Hybrid approach combining percentage-based (Z1-Z3) and race prediction-based (Z4-Z5) calculations

This implements the original Lange & Pöhlitz methodology where high-intensity zones are anchored to specific race distances rather than simple CV percentages.

#### Zones 1-3: Percentage-Based

```javascript
Zone 1 (Recovery/Easy): 70-85% of CV
Zone 2 (Steady State): 85-90% of CV
Zone 3 (Tempo): 90-97% of CV
```

#### Zones 4-5: Race Prediction-Based

**Zone 4 (Threshold / Tempolauf - TL):**

- **Lower Bound:** 10K race pace (slower)
- **Upper Bound:** 5K race pace (faster)
- **Physiological Target:** Competition-specific endurance, develops lactate threshold

**Zone 5 (VO₂ Max / Wettkampfspezifische Ausdauer - WSA):**

- **Lower Bound:** 3K race pace (slower)
- **Upper Bound:** 1500m race pace (faster)
- **Physiological Target:** Maximal oxygen uptake, develops vVO₂max

#### Race Prediction Formula: Riegel Power Law

Race times are predicted using the Riegel Power Law formula:

```
T₂ = T₁ × (D₂/D₁)^k
```

**Where:**

- `T₁` = Reference time (30-minute test = 1800 seconds)
- `D₁` = Reference distance = CV × 1800 + D'
- `T₂` = Predicted time for target distance
- `D₂` = Target distance (1500m, 3000m, 5000m, 10000m)
- `k` = Fatigue factor (default: 1.06, range: 1.06-1.08 for amateurs)

**Implementation:**

```javascript
// Reference: 30-minute test as baseline
const referenceTimeSeconds = 1800;
const referenceDistanceMeters = cvVelocityMs * 1800 + dPrime;

// Predict race time using Riegel formula
const predictedTimeSeconds =
  referenceTimeSeconds *
  Math.pow(targetDistance / referenceDistanceMeters, fatigueFactor);

// Convert to pace
const paceSecPerKm = predictedTimeSeconds / (targetDistance / 1000);
```

**Rationale:**
The Riegel Power Law is more accurate than the hyperbolic CV model for shorter race distances (1500m-10000m) because it accounts for the non-linear relationship between pace and distance at high intensities. This reflects the physiological reality that anaerobic contribution increases exponentially at faster paces.

#### Why Race-Based Zones?

The race prediction-based methodology recognizes that high-intensity training zones (Z4-Z5) correspond to specific race paces:

- Z4 develops the ability to sustain 5K-10K race pace
- Z5 develops the ability to sustain 1500m-3K race pace

These zones scale **non-linearly** with performance - a percentage-based approach underestimates the pace increase for faster runners and overestimates it for slower runners.

**Example Comparison:**

For a runner with CV = 4.0 m/s (4:10/km):

- **Percentage-based Z5 upper:** ~106% of CV = 3:56/km
- **Race-based Z5 upper (1500m):** ~3:45-3:50/km (more accurate)

The race-based approach provides more physiologically accurate training paces, especially for Z4-Z5 work.

**Source:** Lange, G. & Pöhlitz, L. (1995, updated 2014). Original methodology from German athletics (DLV - Deutscher Leichtathletik-Verband)

---

### Implementation Notes

**D' Configuration for Single-Point Tests:**

- Single-point tests (30-min, 45-min, 60-min, Cooper) allow users to configure D' via Advanced Settings
- Each test type has a recommended default D' value:
  - Cooper 12-min: **300m** (high anaerobic contribution)
  - 30-min test: **250m** (standard default)
  - 45-min test: **200m** (moderate anaerobic contribution)
  - 60-min test: **150m** (minimal anaerobic contribution)
- Users can select from presets (Low, Moderate-Low, Moderate, High, Very High) or enter a custom value
- Custom values are validated to be within 50-500m range
- For 2-point tests, D' is **calculated** directly from the test data (no configuration needed)

**When to use D' for zone calculations:**

- For single-point tests, D' is **configurable** with test-specific defaults
- For 2-point tests, D' is **calculated** directly from the test data
- The Race Prediction-Based zone system **requires** D' for accurate predictions
- If D' is unavailable, the system falls back to percentage-based calculations

**Race prediction confidence:**

- Race predictions using estimated D' have ±100m uncertainty
- Race predictions using calculated D' are more accurate
- The Riegel fatigue factor (1.06) is optimized for trained runners
- Amateur runners may benefit from k=1.07-1.08 (steeper fatigue curve)

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
    pace_sec: Math.floor(pace_sec_per_km % 60),
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
    pace_sec: Math.floor(pace_sec_per_km % 60),
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
    pace_sec: Math.floor(pace_sec_per_km % 60),
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
   - **See [predictions.md](predictions.md) for detailed analysis of race prediction accuracy across distances**

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
   - **See [predictions.md](predictions.md) for technical analysis of prediction accuracy and limitations**

5. **Alternative Test Protocols:**
   - 3km and 6km time trial method
   - Track-based protocols (1200m + 3200m)
   - Treadmill testing considerations

---

## Changelog

- **2025-12-03:** Added configurable D' (Anaerobic Capacity) for one-point tests
  - Users can now configure D' value in Advanced Settings for single-point tests
  - Added test-specific recommended defaults: Cooper (300m), 30-min (250m), 45-min (200m), 60-min (150m)
  - Dropdown presets with custom option (validated range: 50-500m)
  - D' selection auto-adjusts when user changes test type
  - D' value now displays dynamically in results (was fixed at 250m)
- **2025-11-24_03:** Renamed zone systems for clarity
  - Renamed "Front Runner Sports" → "Offset-Based" (hybrid percentage + time offset approach)
  - Renamed "Lange & Pöhlitz 1995" → "Race Prediction-Based" (Riegel Power Law approach)
  - Maintained source attributions throughout documentation
  - Updated all system references to reflect methodology rather than source names
- **2025-11-24_02:** Updated Offset-Based (formerly Front Runner Sports) zone system to hybrid approach
  - Changed Z4 upper and Z5 from percentage-based to fixed time offsets
  - Z4 upper: CV pace - 10 seconds per km (was 103% of CV)
  - Z5: CV pace - 10s to CV pace - 20s (was 103%-106% of CV)
  - Z1-Z4 lower bounds remain percentage-based with updated percentages (90.5%→90%, 97.25%→97%)
  - This matches the actual Front Runner Sports website implementation
  - Updated implementation examples to show both percentage-based and fixed time offset calculations
- **2025-11-24_01:** Implemented Race Prediction-Based (Lange & Pöhlitz 1995) zone system
  - Added Riegel Power Law formula for race time predictions
  - Implemented hybrid zone calculation: percentage-based (Z1-Z3) + race-based (Z4-Z5)
  - Zone 4 anchored to 10K/5K race paces, Zone 5 anchored to 3K/1500m race paces
  - Documented the non-linear scaling behavior of high-intensity zones
  - Updated training zones section with both zone system methodologies
  - Added implementation notes on D' usage and race prediction confidence
- **2025-11-23 (Updated):** Major revision based on Tom Schwartz (Tinman) methodology
  - Replaced complex power law formulas with simplified distance/time calculations
  - Added Tinman's Critical Speed Guide as primary source
  - Implemented scientifically correct formulas for all three test methods
  - Marked training zones section as "under development" pending further research
  - Updated all code examples to reflect simplified calculations
- **2025-11-23 (Initial):** Initial documentation, reverse-engineered from Front Runner Sports reference site
- **TODO:** Add unit tests validating calculations against known values
- **TODO:** Validate race predictions against actual race performances
