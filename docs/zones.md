# Training Zones Documentation

## Overview

This document defines the CV-based 5-zone training system used in the VCR Calculator. These zones are derived from Critical Velocity testing and help runners train at appropriate intensities for different physiological adaptations.

**Last Updated:** 2025-11-24

> **Note:** The current zone percentage definitions are based on the [Front Runner Sports pace zone calculator](https://frontrunnersports.com.au/runningsquads/pacezonecalculator/) implementation, and the original work by Lange & Pöhlitz. See [Sources](#sources) for more information.

---

## Zone System Definition

Our implementation supports **two 5-zone CV-based systems**:

1. **Offset-Based (Default):** Hybrid approach with percentage-based Z1-Z4 lower bounds and fixed time offsets for Z4-Z5 upper bounds
2. **Race Prediction-Based:** Hybrid approach with race prediction-based Z4-Z5 using Riegel Power Law

### Zone System 1: Offset-Based (Hybrid)

Zones use a hybrid calculation approach: percentage-based for Z1-Z4 lower bounds, fixed time offsets for Z4 upper and Z5:

| Zone # | Name            | Intensity        | Purpose                                 | Calculation Method                  |
| ------ | --------------- | ---------------- | --------------------------------------- | ----------------------------------- |
| 1      | Recovery / Easy | Low              | Basic endurance and fat metabolism      | 70%−85% of CV                       |
| 2      | Steady State    | Moderate         | Build aerobic base                      | 85%−90% of CV                       |
| 3      | Tempo           | Comfortably hard | Improve long-run pace, comfortably hard | 90%−97% of CV                       |
| 4      | Threshold       | Hard             | Raise CV/MLSS                           | 97% of CV → **CV pace - 10s**       |
| 5      | VO₂ Max         | Very hard        | Maximize oxygen uptake (VO₂ max)        | **CV pace - 10s → CV pace - 20s**   |

**Key Feature:** Z4 upper and Z5 use **fixed time offsets** (CV pace minus 10/20 seconds per km) rather than percentages. This provides more intuitive pacing guidance at high intensities. Source: Front Runner Sports implementation of Lange & Pöhlitz framework.

### Zone System 2: Race Prediction-Based (Riegel Power Law)

Hybrid methodology: percentage-based for Z1-Z3, race prediction-based for Z4-Z5:

| Zone # | Name            | Intensity        | Purpose                            | Calculation Method       |
| ------ | --------------- | ---------------- | ---------------------------------- | ------------------------ |
| 1      | Recovery / Easy | Low              | Basic endurance and fat metabolism | 70%−85% of CV            |
| 2      | Steady State    | Moderate         | Build aerobic base                 | 85%−90% of CV            |
| 3      | Tempo           | Comfortably hard | Improve long-run pace              | 90%−97% of CV            |
| 4      | Threshold (TL)  | Hard             | Competition-specific endurance     | **10K → 5K race pace**   |
| 5      | VO₂ Max (WSA)   | Very hard        | Maximal oxygen uptake              | **3K → 1500m race pace** |

**Key Difference:** In the Race Prediction-Based system, Z4 and Z5 bounds are determined by predicted race paces using the Riegel Power Law formula, which accounts for the non-linear scaling of pace at high intensities. Source: Original Lange & Pöhlitz (1995) methodology.

#### Why Race-Based Zones for Z4-Z5?

The original Lange & Pöhlitz methodology recognizes that high-intensity training corresponds to specific race performance zones:

- **Z4 (Tempolauf - TL):** Develops competition-specific endurance for 5K-10K races
- **Z5 (Wettkampfspezifische Ausdauer - WSA):** Develops vVO₂max for 1500m-3K races

Race-based zones scale **non-linearly** with performance:

- Simple percentage-based zones **underestimate** Z4-Z5 paces for faster runners
- Simple percentage-based zones **overestimate** Z4-Z5 paces for slower runners

**Example:** Runner with CV = 4.0 m/s (4:10/km)

- Percentage-based Z5 upper: ~106% of CV = **3:56/km**
- Race-based Z5 upper (1500m): **3:45-3:50/km** (more accurate)

The race prediction uses the **Riegel Power Law** formula:

```
T₂ = T₁ × (D₂/D₁)^1.06
```

This provides physiologically accurate paces for high-intensity training zones.

> **Note on Prediction Accuracy:** The CV model works best for 5K-10K predictions, which is why Z4 uses these distances. For detailed analysis of why prediction accuracy varies by distance, see [predictions.md](predictions.md).

---

## Zone 1: Easy

**Physiological Target:** Base aerobic development, capillary density, fat metabolism

**Feel:** Conversational pace, can speak in full sentences

**Formula:**

```javascript
// Zone 1 pace range (slower than CV)
zone1_upper = CV_pace / 0.7; // Slowest end (70% of CV speed)
zone1_lower = CV_pace / 0.85; // Fastest end (85% of CV speed)
```

**Characteristics:**

- 70-85% of Critical Velocity speed
- Slowest of all training zones
- Primary volume builder
- Recovery between hard sessions

**Training Applications:**

- Long runs (90+ minutes)
- Recovery runs (30-60 minutes)
- Base building phases
- Active recovery

**RPE (Rate of Perceived Exertion):** 3-4 out of 10

---

## Zone 2: Steady State

**Physiological Target:** Aerobic efficiency, mitochondrial density, sustainable endurance

**Feel:** Controlled effort, can speak in phrases but not paragraphs

**Formula:**

```javascript
// Zone 2 pace range
zone2_upper = CV_pace / 0.85; // Slowest end (85% of CV speed)
zone2_lower = CV_pace / 0.95; // Fastest end (95% of CV speed)
```

**Characteristics:**

- 85-95% of Critical Velocity speed
- Slightly faster than Easy
- "Steady" sustainable effort
- Most time-efficient aerobic development

**Training Applications:**

- Marathon pace training
- Medium-long runs (60-90 minutes)
- Aerobic threshold work
- Tempo endurance

**RPE:** 5-6 out of 10

---

## Zone 3: Tempo

**Physiological Target:** Lactate clearance, lactate shuttle efficiency, prolonged moderate intensity

**Feel:** Comfortably hard, limited conversation (1-2 words)

**Formula:**

```javascript
// Zone 3 pace range
zone3_upper = CV_pace / 0.95; // Slowest end (95% of CV speed)
zone3_lower = CV_pace / 1.0; // Fastest end (100% of CV speed = CV pace)
```

**Characteristics:**

- 95-100% of Critical Velocity speed
- "Comfortably hard" effort
- Can be sustained 20-40 minutes
- Below lactate threshold
- Sweet spot for half-marathon performance

**Training Applications:**

- Tempo runs (20-40 min continuous)
- Half-marathon pace work
- Lactate clearance training
- Cruise intervals

**RPE:** 7 out of 10

---

## Zone 4: Threshold

**Physiological Target:** Lactate threshold, anaerobic threshold, maximal lactate steady state (MLSS)

**Feel:** Hard, breathing heavily, only 1-word responses possible

**Formula:**

```javascript
// Zone 4 pace range (faster than CV)
// Lower bound: percentage-based
zone4_lower = CV_pace / 0.97; // Slowest end (97% of CV speed)
// Upper bound: fixed time offset
zone4_upper = CV_pace - 10; // Fastest end (CV pace minus 10 seconds/km)
```

**Characteristics:**

- Lower bound: 97% of Critical Velocity speed
- Upper bound: CV pace minus 10 seconds per km (fixed time offset)
- Lactate threshold pace
- Highest sustainable "hard" effort (15-30 min)
- Critical for 10K-half marathon performance

**Training Applications:**

- Threshold intervals (3-5 × 5-8 min)
- Tempo runs (15-25 min)
- 10K race pace work
- Lactate tolerance training

**RPE:** 8 out of 10

---

## Zone 5: VO₂ Max

**Physiological Target:** Maximal oxygen uptake, cardiac output, running economy at high speed

**Feel:** Very hard, cannot speak, sustainable only 3-8 minutes

**Formula:**

```javascript
// Zone 5 pace range (significantly faster than CV)
// Both bounds use fixed time offsets
zone5_lower = CV_pace - 10; // Slowest end (CV pace minus 10 seconds/km)
zone5_upper = CV_pace - 20; // Fastest end (CV pace minus 20 seconds/km)
```

**Characteristics:**

- Lower bound: CV pace minus 10 seconds per km (same as Z4 upper)
- Upper bound: CV pace minus 20 seconds per km
- Fastest training zone
- Elicits maximal aerobic response
- Most demanding, requires full recovery

**Training Applications:**

- VO₂ max intervals (4-6 × 3-5 min)
- 5K race pace work
- Speed endurance
- 800m-3K repeats

**RPE:** 9-10 out of 10

**Recovery:** 1:1 or longer work:rest ratio

---

## Zone Relationships

### Mathematical Patterns

The Offset-Based system uses a **hybrid calculation approach**:

**Percentage-Based (Z1-Z4 lower bounds):**
```
Zone 1 (Easy):        70-85% of CV speed
Zone 2 (Steady):      85-90% of CV speed
Zone 3 (Tempo):       90-97% of CV speed
Zone 4 Lower:         97% of CV speed
```

**Fixed Time Offsets (Z4 upper, Z5):**
```
Zone 4 Upper:         CV pace - 10 seconds/km
Zone 5 (VO₂ Max):     CV pace - 10s to CV pace - 20s
```

**Key Points:**

- Z1-Z4 lower bounds use percentage-based calculation (70%, 85%, 90%, 97%)
- Z4 upper and Z5 use fixed time offsets from CV pace (-10s, -20s per km)
- Fixed time offsets provide more intuitive pacing guidance at high intensities
- Source: Front Runner Sports implementation (Lange & Pöhlitz framework)
- Note: When speed increases, pace (time per distance) decreases
  - Example: 97% of CV speed = slower = higher pace number (more time per km)

### Relative Intensity

Approximate relationship between zones (example assuming CV pace = 5:00 min/km):

| Zone         | Calculation Method      | Pace Range (min/km) | Relative Effort |
| ------------ | ----------------------- | ------------------- | --------------- |
| Easy         | 70-85% of CV            | 5:53-7:08           | Lowest          |
| Steady State | 85-90% of CV            | 5:33-5:53           | Low-Moderate    |
| Tempo        | 90-97% of CV            | 5:09-5:33           | Moderate        |
| Threshold    | 97% of CV → CV-10s      | 4:50-5:09           | Hard            |
| VO₂ Max      | CV-10s → CV-20s         | 4:40-4:50           | Very Hard       |

_Note: Z1-Z4 lower use percentage-based calculation. Z4 upper and Z5 use fixed time offsets (CV pace - 10s and - 20s)._

---

## Training Distribution

### Polarized Training Model

Recommended weekly volume distribution:

- **Zone 1 (Easy):** 70-80% of total volume
- **Zone 2 (Steady):** 10-15% of total volume
- **Zones 3-5 (Hard):** 10-20% of total volume

### Example Weekly Plan (50 km)

- Easy runs (Z1): 35-40 km
- Steady runs (Z2): 5-8 km
- Tempo/Threshold/VO₂ (Z3-5): 5-10 km

---

## Zone Transitions & Overlap

### Practical Considerations

1. **Zone boundaries are not rigid**

   - Day-to-day variability (fatigue, weather, terrain)
   - Individual responses vary
   - Use perceived exertion as secondary guide

2. **Overlap between zones**

   - Z1/Z2 boundary: easy aerobic range
   - Z3/Z4 boundary: threshold area
   - Listen to your body

3. **Heart rate correlation**
   - Zones should correlate with HR zones
   - Consider adding HR% as secondary metric
   - Temperature affects HR (not accounted for)

---

## Comparison to Other Zone Systems

### Jack Daniels' VDOT Zones

| VDOT Zone      | Approximate VCR Equivalent |
| -------------- | -------------------------- |
| Easy (E)       | Zone 1                     |
| Marathon (M)   | Zone 2                     |
| Threshold (T)  | Zone 4                     |
| Interval (I)   | Zone 5                     |
| Repetition (R) | Above Zone 5               |

**Note:** VDOT system includes Zone 2 (Marathon pace) and Zone 3 (Tempo) as distinct, similar to our Steady State and Tempo zones.

### 3-Zone Polarized System

| Polarized         | VCR Equivalent |
| ----------------- | -------------- |
| Zone 1 (Low)      | Zones 1-2      |
| Zone 2 (Moderate) | Zones 3-4      |
| Zone 3 (High)     | Zone 5         |

---

## Validation & Calibration

### Self-Assessment Questions

For each zone, ask:

1. Can I sustain this pace for the prescribed duration?
2. Does my breathing match the description?
3. Can I speak as described?
4. Does RPE match the target?

### Field Testing

**Lactate Threshold Verification:**

- 30-minute time trial pace should be near Zone 4
- If significantly different, retest CV

**VO₂ Max Verification:**

- 5K race pace should fall in Zone 5 range
- 3-5 minute maximal effort should hit Zone 5

### Adjustments

If zones feel systematically off:

1. Verify CVT test was performed correctly (flat course, proper effort)
2. Consider environmental factors (heat, altitude)
3. Retest after 4-6 weeks of training
4. Individual variation is normal

---

## Implementation Notes

### Display Format

Each zone should show:

- Zone number and name
- Pace range (or single pace for Z1-Z4)
- Optional: HR range, RPE, description

Example:

```
Zone 1 - Easy
6:55 min/km (10:58 min/mile)
"Conversational pace, sustainable for hours"
```

### Unit Conversions

Support both:

- Metric: min/km, km/h
- Imperial: min/mile, mph

### Mobile Display

- Large, readable text
- Color-coded zones (green → red)
- Swipe/scroll for details
- Compact table view

---

## Future Enhancements

### Phase 2 Features

1. **Heart Rate Zones**

   - Calculate from max HR
   - Show HR% alongside pace

2. **Elevation Adjustment**

   - Account for hills/terrain
   - Grade-adjusted pace

3. **Environmental Factors**

   - Temperature correction
   - Altitude adjustment

4. **Training Load**
   - Calculate TRIMP by zone
   - Training stress score

---

## Sources

### Current Implementation

The zone percentages used in this calculator are based on:

- **Front Runner Sports.** [Pace Zone Calculator](https://frontrunnersports.com.au/runningsquads/pacezonecalculator/). Front Runner Sports, Australia. (Primary source for current zone percentage implementation)

Front Runner Sports cites the general methodology as:

- Lange, G., & Pöhlitz, L. (1995, updated 2014). Critical Velocity and training zone methodology.

### Alternative Zone Methodologies (Future Implementation)

Alternative training zone systems are documented in [docs/sources/](sources/) for future implementation:

- **Lange, G., & Pöhlitz, L.** (2014). [_Determination of prescribed velocities in basic endurance training_](sources/vcr_table_2014.pdf). Presented at Endurance Summit 2018, Skanderborg, Denmark.
- **Lange, G., & Pöhlitz, L.** (2022). [_Determination of prescribed velocities in basic endurance training_](sources/vcr_table_2022.jpg) (Updated version).

### Additional References

- Seiler, S. (2010). What is best practice for training intensity and duration distribution in endurance athletes? _International Journal of Sports Physiology and Performance_, 5(3), 276-291. (Polarized training)
- Daniels, J. (2013). _Daniels' Running Formula_ (3rd ed.). Human Kinetics. (Comparison reference)

---

## Changelog

- **2025-11-24_04:** Renamed zone systems for clarity
  - Renamed "Front Runner Sports" → "Offset-Based" (hybrid percentage + time offset approach)
  - Renamed "Lange & Pöhlitz 1995" → "Race Prediction-Based" (Riegel Power Law approach)
  - Maintained source attributions throughout documentation
  - Updated all system references to reflect methodology rather than source names
- **2025-11-24_03:** Updated Offset-Based (formerly Front Runner Sports) methodology to hybrid approach
  - Changed Z4-Z5 upper bounds from percentage-based to fixed time offsets
  - Z4 upper: CV pace - 10 seconds per km (was 103% of CV)
  - Z5: CV pace - 10s to CV pace - 20s (was 103%-106% of CV)
  - Z1-Z4 lower bounds remain percentage-based (70%, 85%, 90%, 97%)
  - Updated zone percentages: Z2 upper 90.5%→90%, Z3 upper 97.25%→97%
  - This hybrid approach matches the actual Front Runner Sports website implementation
  - Provides more intuitive pacing guidance at high intensities
- **2025-11-24_02:** Implemented Race Prediction-Based (Lange & Pöhlitz 1995) zone system
  - Added hybrid zone calculation: percentage-based (Z1-Z3) + race-based (Z4-Z5)
  - Z4 anchored to 10K/5K race paces, Z5 anchored to 3K/1500m race paces
  - Implemented Riegel Power Law formula for race predictions
  - Documented non-linear scaling behavior of high-intensity zones
  - Added comparison between Offset-Based and Race Prediction-Based methodologies
  - Updated zone system definitions to explain both approaches
- **2025-11-24_01:** Updated documentation with proper source citations
  - Clarified that current implementation uses Front Runner Sports zone percentages
  - Added reference materials (Lange & Pöhlitz 2014/2022 tables) to docs/sources/
  - Added note about planned refactoring to support multiple zone methodologies
- **2025-11-23_02:** Replaced reverse-engineered formulas with percentage-based zone calculations
  - All zones now calculated as percentages of Critical Velocity (70%-120%)
  - Simplified and more physiologically sound approach
  - Removed complex power-law and polynomial formulas
- **2025-11-23_01:** Initial zone system documentation based on reference calculator
