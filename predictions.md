# Notes on prediction error

**The error term ($D'$) becomes mathematically insignificant as race distance increases, but the prediction accuracy paradoxically gets worse for very long events (like the marathon) because the physiological model itself breaks down.**

Here is the breakdown of how the error term affects predictions across different distances.

### 1. The Mathematical Relationship

The fundamental equation for average speed in a race is:
$$V_{race} = CV + \frac{D'}{Time}$$

- **$CV$ (Critical Velocity):** Your sustainable aerobic engine (Meters/sec).
- **$D'$ (D-prime):** Your finite anaerobic battery (Meters).
- **$Time$:** The duration of the race (Seconds).

The term $\frac{D'}{Time}$ represents the "anaerobic boost" you get during the race.

---

### 2. Short Distances (e.g., 1500m)

**Status:** $D'$ is the primary driver of error.

For a 1500m race (approx 4–6 minutes), the duration ($Time$) is small.

- **Math:** Because the denominator ($Time$) is small, the term $\frac{D'}{Time}$ is **large**.
- **Impact:** Your speed depends heavily on how big your anaerobic battery is.
- **Accuracy:** CV-based predictions here are **volatile**. If your calculated $D'$ is off by even a small amount (e.g., 20 meters), it swings the predicted pace significantly (by ~5–8 seconds per km).
- **Reality:** Two runners with the exact same CV can have vastly different 1500m times if one has a massive $D'$ (middle-distance kicker) and the other has a small $D'$ (marathoner type).

### 3. Long Distances (e.g., Marathon)

**Status:** $D'$ is mathematically irrelevant, but the _Model_ fails.

For a marathon (approx 2.5–4 hours), the duration ($Time$) is massive.

- **Math:** Dividing your small tank ($D' \approx 200m$) by a huge number ($Time \approx 10,000s$) results in a value near zero.
- **The Theoretical Prediction:** $V_{race} \approx CV$.
- **The Problem:** The Critical Power model assumes you can run at your Critical Velocity indefinitely (or at least for a very long time) without fatigue. **This is physiologically false.**
- **Reality:** You cannot sustain CV for a marathon. CV is roughly your "1-hour max" (or 10k–15k pace). If you try to run a marathon at the pace predicted by the formula ($CV + D'/Time$), you will hit the wall (bonk) halfway through.

### 4. Comparison Table: Sources of Error

| Race Distance     | Influence of $D'$ ("Anaerobic Tank") | Primary Source of Prediction Error                                         | Predictive Accuracy of Raw Formula          |
| :---------------- | :----------------------------------- | :------------------------------------------------------------------------- | :------------------------------------------ |
| **800m - 1500m**  | **Massive**                          | Inaccuracy in measuring $D'$ (anaerobic capacity).                         | Low (unless $D'$ is known perfectly)        |
| **3k - 10k**      | **Moderate**                         | **Sweet Spot.** Balance of CV and $D'$ is optimal for this model.          | **High**                                    |
| **Half Marathon** | **Low**                              | Physiological durability (glycogen, muscle fatigue).                       | Moderate (Usually slightly overestimates)   |
| **Marathon**      | **Negligible**                       | **Model Failure.** The assumption that you can hold CV this long is wrong. | **Very Low** (Massively overestimates pace) |

### Summary

- **For 1500m:** The formula is **valid**, but precise accuracy depends entirely on knowing your exact $D'$.
- **For Marathon:** The formula is **invalid**. It will tell you to run way too fast (approx. 10k race pace). Marathon prediction requires a different variable: "Durability" or "Fatigue Resistance," which is often expressed as running at a _percentage_ of CV (e.g., ~92-94% of CV for elites, ~85-90% for amateurs), rather than $CV + D'$.
