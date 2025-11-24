# Race Predictions & Model Accuracy

## Overview

This document provides a technical analysis of race prediction accuracy when using the Critical Velocity model across different race distances. It explains why prediction errors vary systematically with race distance, detailing both the mathematical behavior of the model and its physiological limitations.

**Purpose:** Provide developers, researchers, and advanced users with a rigorous understanding of when and why CV-based race predictions are accurate or unreliable.

**Audience:** Technical documentation for contributors, academic validation, and serious practitioners seeking deep understanding of model behavior.

**Last Updated:** 2025-11-24

---

## Key Insight

**The error term (D') becomes mathematically insignificant as race distance increases, but the prediction accuracy paradoxically gets worse for very long events (like the marathon) because the physiological model itself breaks down.**

This counterintuitive behavior is explained in detail below.

---

## The Mathematical Relationship

### Fundamental Equation

The fundamental equation for average speed in a race is:

$$V_{race} = CV + \frac{D'}{Time}$$

**Where:**
- **CV (Critical Velocity):** Your sustainable aerobic engine (meters/second)
- **D' (D-prime):** Your finite anaerobic battery (meters)
- **Time:** The duration of the race (seconds)

The term $\frac{D'}{Time}$ represents the "anaerobic boost" you get during the race.

### Mathematical Behavior by Distance

As race duration increases, $\frac{D'}{Time}$ approaches zero:

```
Short race (5 minutes):  D'/Time = 200m / 300s  = 0.67 m/s  (significant)
Medium race (30 minutes): D'/Time = 200m / 1800s = 0.11 m/s  (moderate)
Long race (3 hours):     D'/Time = 200m / 10800s = 0.02 m/s  (negligible)
```

At marathon distance, the theoretical prediction simplifies to:

$$V_{race} \approx CV$$

**However**, this is where the model fails physiologically.

---

## Prediction Accuracy by Distance

### Short Distances (1500m - 3000m)

**Status:** D' is the primary driver of error

**Race Duration:** Approximately 4–8 minutes

**Mathematical Behavior:**
- Because the denominator (Time) is small, the term $\frac{D'}{Time}$ is **large**
- Your speed depends heavily on how big your anaerobic battery is
- Small errors in D' measurement translate to large pace errors

**Accuracy Issues:**
- If your calculated D' is off by even 20 meters, it swings the predicted pace significantly (by ~5–8 seconds per km at 1500m)
- CV-based predictions here are **volatile** and sensitive to D' precision

**Reality Check:**
Two runners with the exact same CV can have vastly different 1500m times if one has a massive D' (middle-distance specialist) and the other has a small D' (marathoner type).

**Recommendation:** Use with caution. Best accuracy requires precise D' measurement from a 2-point test.

---

### Middle Distances (5K - 10K)

**Status:** Sweet spot for the CV model

**Race Duration:** Approximately 15–50 minutes

**Mathematical Behavior:**
- Balanced contribution between CV (aerobic) and D' (anaerobic)
- The model's assumptions align well with physiological reality
- Most runners can sustain near-CV pace for these durations

**Accuracy:** **High** - This is the optimal range for CV-based predictions

**Why It Works:**
- CV represents approximately the 1-hour maximal pace
- 5K-10K falls well within this physiological timeframe
- The hyperbolic relationship between distance and time is most accurate here

**Recommendation:** Trust these predictions. They closely match race performances.

---

### Long Distances (Half Marathon)

**Status:** Model begins to break down

**Race Duration:** Approximately 75–120 minutes

**Mathematical Behavior:**
- D' contribution becomes small: $\frac{D'}{Time} \approx 0.05$ m/s
- Theoretical prediction: $V_{race} \approx 0.98 \times CV$

**Physiological Reality:**
- Glycogen depletion becomes significant
- Muscular fatigue accumulates
- Running economy deteriorates
- Durability and fatigue resistance become limiting factors **not captured by the model**

**Accuracy:** **Moderate** - Usually overestimates pace slightly

**Recommendation:** Use as an upper-bound estimate. Actual pace will typically be 2-5% slower than predicted, depending on individual durability.

---

### Very Long Distances (Marathon)

**Status:** Model failure - Physiologically invalid

**Race Duration:** Approximately 2.5–4 hours

**Mathematical Behavior:**
- D' is mathematically irrelevant: $\frac{D'}{Time} \approx 0.02$ m/s
- Theoretical prediction: $V_{race} \approx CV$

**The Problem:**
The Critical Power model assumes you can run at your Critical Velocity indefinitely (or at least for a very long time) without fatigue. **This is physiologically false.**

**Physiological Reality:**
- CV is roughly your "1-hour max" pace (approximately 10K–15K pace)
- You **cannot** sustain CV for a marathon
- If you try to run a marathon at the pace predicted by the formula ($CV + D'/Time$), you will hit the wall (bonk) halfway through
- Marathon pace requires a different variable: "Durability" or "Fatigue Resistance"

**Accuracy:** **Very Low** - Massively overestimates pace

**What Actually Works:**
Marathon pace is better expressed as a **percentage of CV**:
- **Elite runners:** ~92-94% of CV
- **Trained amateurs:** ~85-90% of CV
- **Recreational runners:** ~80-85% of CV

These percentages reflect individual durability, which is **not measured** by the CV model.

**Recommendation:** Do not use CV-based predictions for marathon. Use percentage-of-CV approach or empirical race data.

---

## Comparison Table: Sources of Error

| Race Distance     | Influence of D' | Primary Source of Prediction Error                                         | Predictive Accuracy          |
| :---------------- | :-------------- | :------------------------------------------------------------------------- | :--------------------------- |
| **800m - 1500m**  | **Massive**     | Inaccuracy in measuring D' (anaerobic capacity).                           | Low (unless D' is precise)   |
| **3K - 10K**      | **Moderate**    | **Sweet Spot.** Balance of CV and D' is optimal for this model.            | **High**                     |
| **Half Marathon** | **Low**         | Physiological durability (glycogen, muscle fatigue).                       | Moderate (slight overestimate) |
| **Marathon**      | **Negligible**  | **Model Failure.** The assumption that you can hold CV this long is wrong. | **Very Low** (major overestimate) |

---

## Practical Recommendations

### For 1500m - 3000m Predictions
- ✅ Use if you have a **calculated D'** from a 2-point test
- ⚠️ Use cautiously if using **estimated D'** (default 250m)
- ❌ Don't trust predictions if D' is unknown or wildly estimated
- **Alternative:** Use Riegel Power Law or time-trial-based predictions

### For 5K - 10K Predictions
- ✅ **Highly reliable** - use with confidence
- ✅ Works well with both calculated and estimated D'
- ✅ Excellent for training zone anchoring (Z4-Z5 in Race Prediction-Based system)

### For Half Marathon Predictions
- ⚠️ Use as an **optimistic estimate**
- ⚠️ Expect actual pace to be 2-5% slower than predicted
- ⚠️ Individual durability matters significantly
- **Recommendation:** Validate with empirical race data or tune with a durability factor

### For Marathon Predictions
- ❌ **Do not use** the CV formula directly
- ✅ Use percentage-of-CV approach instead:
  - Start with 88-92% of CV as a baseline
  - Adjust based on training volume, long run strength, and race history
- ✅ Use empirical race calculators that account for durability

---

## Connection to Training Zones

The CV model's accuracy patterns have important implications for training zone calculations:

### Race Prediction-Based Zones (Z4-Z5)

The [Race Prediction-Based zone system](zones.md#zone-system-2-race-prediction-based-riegel-power-law) anchors high-intensity zones to predicted race paces:

- **Zone 4:** 10K → 5K race pace
- **Zone 5:** 3K → 1500m race pace

**Why This Works:**
These distances fall within or near the CV model's "sweet spot" (5K-10K), making the race predictions reliable and physiologically meaningful for training.

### Why Not Marathon-Based Zones?

Marathon pace is **not** used for zone anchoring because:
1. The CV model fails at marathon distance
2. Marathon pace depends on durability, not just CV
3. Marathon pace is too slow to provide useful training stimulus for Z4-Z5

---

## Validation Strategies

### For Short Distances (1500m - 3000m)
- Perform a **2-point test** to calculate D' precisely
- Validate predictions against actual race times
- If predictions are consistently off, recalculate D'

### For Middle Distances (5K - 10K)
- Compare predictions to recent race performances
- Should match within ±2-3% for trained runners
- If systematically different, retest CV

### For Long Distances (Half Marathon+)
- Use predictions as a **starting point only**
- Incorporate durability factor based on:
  - Training volume (higher volume → better durability)
  - Long run performance (strong long runs → better durability)
  - Previous race data
- Consider individual fatigue resistance

---

## References

### Primary Sources

- **Tom Schwartz (Tinman).** [Critical Speed Guide for Runners](https://runningwritings.com/2024/01/critical-speed-guide-for-runners.html). Running Writings, 2024.
  - Comprehensive guide on Critical Velocity theory and practical application

### Scientific Literature

- Jones, A. M., Vanhatalo, A., Burnley, M., Morton, R. H., & Poole, D. C. (2010). Critical power: Implications for determination of VO₂max and exercise tolerance. _Medicine and Science in Sports and Exercise_, 42(10), 1876-1890.
- Monod, H., & Scherrer, J. (1965). The work capacity of a synergic muscular group. _Ergonomics_, 8(3), 329-338.

### Related Documentation

- [Critical Velocity Formulas & Calculations](formulas.md) - Implementation details for CV calculation
- [Training Zones Documentation](zones.md) - How CV translates to training zones
- [Sources & References](sources/) - Reference materials and scientific papers

---

## Future Research Directions

### Durability Modeling
- Develop quantitative durability metrics
- Integrate long run performance into marathon predictions
- Research correlation between training volume and fatigue resistance

### D' Precision Improvement
- Better estimation methods for single-point tests
- Validation of default D' values across runner populations
- Seasonal variation in D' (base training vs. speed training)

### Race-Specific Adjustments
- Environmental factor corrections (temperature, altitude, terrain)
- Pacing strategy integration (even vs. negative split)
- Individual response patterns

---

## Changelog

- **2025-11-24:** Initial documentation
  - Comprehensive analysis of prediction accuracy across race distances
  - Mathematical explanation of D' influence by distance
  - Physiological limitations of the CV model for marathon predictions
  - Practical recommendations for each distance category
  - Integration with training zone documentation
  - Validation strategies for different race distances
