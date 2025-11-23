# Training Zones Documentation

## Overview

This document defines the CV-based 5-zone training system used in the VCR Calculator. These zones are derived from Critical Velocity testing and help runners train at appropriate intensities for different physiological adaptations.

**Last Updated:** 2025-11-23

---

## Zone System Definition

Our implementation uses a **5-zone CV-based system** derived from the Lange & Pöhlitz methodology (1995, updated 2014).

### Zone Overview

| Zone # | Name                 | Intensity        | Purpose                                 | Percent of Critical Velocity |
| ------ | -------------------- | ---------------- | --------------------------------------- | ---------------------------- |
| 1      | Recovery / Easy      | Low              | Basic endurance and fat metabolism      | ∼70%−85%                     |
| 2      | Aerobic Endurance    | Moderate         | Build aerobic base                      | ∼85%−95%                     |
| 3      | Tempo                | Comfortably hard | Improve long-run pace, comfortably hard | ∼95%−100%                    |
| 4      | Threshold / CV Pace  | Hard             | Raise CV/MLSS                           | ∼100%−105%                   |
| 5      | VO2​ Max / Intervals | Very hard        | Maximize oxygen uptake (VO2​ max)       | ∼105%−120%+                  |

---

## Zone 1: Easy

**Physiological Target:** Base aerobic development, capillary density, fat metabolism

**Feel:** Conversational pace, can speak in full sentences

**Formula:**

```javascript
// Zone 1 pace range (slower than CV)
zone1_upper = CV_pace / 0.70  // Slowest end (70% of CV speed)
zone1_lower = CV_pace / 0.85  // Fastest end (85% of CV speed)
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
zone2_upper = CV_pace / 0.85  // Slowest end (85% of CV speed)
zone2_lower = CV_pace / 0.95  // Fastest end (95% of CV speed)
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
zone3_upper = CV_pace / 0.95   // Slowest end (95% of CV speed)
zone3_lower = CV_pace / 1.00   // Fastest end (100% of CV speed = CV pace)
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
zone4_upper = CV_pace / 1.00   // Slowest end (100% of CV speed = CV pace)
zone4_lower = CV_pace / 1.05   // Fastest end (105% of CV speed)
```

**Characteristics:**

- 100-105% of Critical Velocity speed
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
zone5_upper = CV_pace / 1.05   // Slowest end (105% of CV speed)
zone5_lower = CV_pace / 1.20   // Fastest end (120% of CV speed)
```

**Characteristics:**

- 105-120%+ of Critical Velocity speed
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

All zones are calculated as percentages of Critical Velocity speed:

```
Zone 1 (Easy):        70-85% of CV speed
Zone 2 (Steady):      85-95% of CV speed
Zone 3 (Tempo):       95-100% of CV speed
Zone 4 (Threshold):   100-105% of CV speed
Zone 5 (VO₂ Max):     105-120%+ of CV speed
```

**Key Points:**

- Zones 2 and 3 overlap at 85-95% (allows for individual variation)
- Zone 4 includes CV pace as the slowest end (100%)
- Zone 5 is the only zone significantly faster than CV
- Note: When speed increases, pace (time per distance) decreases
  - Example: 105% of CV speed = faster = lower pace number (less time per km)

### Relative Intensity

Approximate relationship between zones (example assuming CV pace = 5:00 min/km):

| Zone         | % of CV Speed | Pace Range (min/km) | Relative Effort |
| ------------ | ------------- | ------------------- | --------------- |
| Easy         | 70-85%        | 5:53-7:08           | Lowest          |
| Steady State | 85-95%        | 5:16-5:53           | Low-Moderate    |
| Tempo        | 95-100%       | 5:00-5:16           | Moderate        |
| Threshold    | 100-105%      | 4:46-5:00           | Hard            |
| VO₂ Max      | 105-120%      | 4:10-4:46           | Very Hard       |

_Note: Faster speed = lower pace number. Example: 120% speed = 5:00 ÷ 1.20 = 4:10 min/km_

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

## References

- Lange, G.; Pöhlitz, L. (1995, updated 2014). Zone calculation methodology.
- Front Runner Sports CV Calculator: https://frontrunnersports.com.au/runningsquads/pacezonecalculator/
- Seiler, S. (2010). What is best practice for training intensity and duration distribution in endurance athletes? _International Journal of Sports Physiology and Performance_, 5(3), 276-291. (Polarized training)
- Daniels, J. (2013). _Daniels' Running Formula_ (3rd ed.). Human Kinetics. (Comparison reference)

---

## Changelog

- **2025-11-23:** Replaced reverse-engineered formulas with percentage-based zone calculations
  - All zones now calculated as percentages of Critical Velocity (70%-120%)
  - Simplified and more physiologically sound approach
  - Removed complex power-law and polynomial formulas
- **2025-11-23:** Initial zone system documentation based on reference calculator
- **TODO:** Add heart rate zone correlations
- **TODO:** Validate zone durations against literature
- **TODO:** Add practical training examples
