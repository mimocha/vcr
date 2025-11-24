/**
 * RacePerformanceChart Component
 * Display predicted race times for standard distances
 */

import Card from "../ui/Card";
import { predictAllRaces } from "../../utils/calculations/racePerformanceCalculators";
import {
  formatTimeWithHours,
  formatPacePerKm,
  formatPacePerMile,
} from "../../utils/formatters";
import { UNIT_SYSTEMS } from "../../constants/zoneDefinitions";
import { useTheme } from "../../contexts/ThemeContext";

export default function RacePerformanceChart({
  cvData,
  unitSystem = UNIT_SYSTEMS.METRIC,
  cvMode = 'raw',
}) {
  const { isDark } = useTheme();

  if (!cvData || !cvData.velocity_ms || !cvData.d_prime) {
    return null;
  }

  const { velocity_ms, velocity_ms_raw, d_prime, d_prime_estimated } = cvData;

  // Use the selected CV velocity based on cvMode
  const selectedVelocity = cvMode === 'raw' ? velocity_ms_raw : velocity_ms;

  // Predict all standard race distances
  const racePredictions = predictAllRaces(
    selectedVelocity,
    d_prime,
    d_prime_estimated,
    true // Only show typical race distances
  );

  if (racePredictions.length === 0) {
    return null;
  }

  /**
   * Format a time prediction with confidence interval
   */
  const formatTimePrediction = (prediction) => {
    if (!prediction) return "—";

    const { best, min, max, isDPrimeEstimated } = prediction;

    if (!isDPrimeEstimated || !min || !max) {
      // No confidence interval, just show best estimate
      return formatTimeWithHours(best.timeSeconds);
    }

    // Show range: min to max
    const minTime = formatTimeWithHours(min.timeSeconds);
    const maxTime = formatTimeWithHours(max.timeSeconds);

    return `${minTime} - ${maxTime}`;
  };

  /**
   * Format a pace prediction with confidence interval
   */
  const formatPacePrediction = (prediction) => {
    if (!prediction) return "—";

    const { best, min, max, isDPrimeEstimated } = prediction;

    const paceValue =
      unitSystem === UNIT_SYSTEMS.METRIC
        ? best.paceSecPerKm
        : best.paceSecPerMile;
    const formatFunc =
      unitSystem === UNIT_SYSTEMS.METRIC ? formatPacePerKm : formatPacePerMile;

    if (!isDPrimeEstimated || !min || !max) {
      return formatFunc(paceValue);
    }

    // Show range
    const minPace =
      unitSystem === UNIT_SYSTEMS.METRIC
        ? max.paceSecPerKm
        : max.paceSecPerMile;
    const maxPace =
      unitSystem === UNIT_SYSTEMS.METRIC
        ? min.paceSecPerKm
        : min.paceSecPerMile;

    return `${formatFunc(minPace)} - ${formatFunc(maxPace)}`;
  };

  return (
    <Card title="Race Performance Predictions">
      {/* Explanatory note */}
      <p
        className={`text-xs mb-4 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Predictions based on{" "}
        <strong>{cvMode === 'raw' ? 'unadjusted' : 'adjusted'}</strong> critical
        velocity
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                isDark ? "border-white/10" : "border-gray-200"
              }`}
            >
              <th
                className={`text-left py-3 px-2 font-semibold text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Distance
              </th>
              <th
                className={`text-left py-3 px-2 font-semibold text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Predicted Time
              </th>
              <th
                className={`text-left py-3 px-2 font-semibold text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Pace
              </th>
            </tr>
          </thead>
          <tbody>
            {racePredictions.map((race) => (
              <tr
                key={race.id}
                className={`
                  border-b transition-colors
                  ${isDark ? "border-white/5" : "border-gray-100"}
                  ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50"}
                `}
              >
                <td
                  className={`py-3 px-2 font-medium ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {race.name}
                </td>
                <td
                  className={`py-3 px-2 font-mono ${
                    isDark ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  {formatTimePrediction(race.prediction)}
                </td>
                <td
                  className={`py-3 px-2 font-mono text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {formatPacePrediction(race.prediction)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Explanatory notes */}
      <div
        className={`
        mt-4 p-3 rounded-xl backdrop-blur-sm border
        ${
          isDark
            ? "bg-amber-500/10 border-amber-400/30"
            : "bg-amber-50/80 border-amber-200"
        }
      `}
      >
        <p
          className={`text-sm ${isDark ? "text-amber-200" : "text-amber-800"}`}
        >
          <strong>About these predictions:</strong>
        </p>
        <ul
          className={`text-xs mt-2 space-y-1 ${
            isDark ? "text-amber-100" : "text-amber-900"
          }`}
        >
          <li>
            • Predictions use{" "}
            <strong>{cvMode === 'raw' ? 'unadjusted (raw)' : 'adjusted'}</strong>{" "}
            critical velocity{cvMode === 'raw' ? ' (includes anaerobic contribution)' : ' (accounts for anaerobic capacity)'}
          </li>
          {d_prime_estimated && (
            <>
              <li>
                • D&apos; is estimated ({d_prime.toFixed(0)}m)
                with ±100m confidence interval
              </li>
              <li>
                • For higher accuracy, use the 2-Point Test to measure D&apos;
                directly
              </li>
            </>
          )}
          {!d_prime_estimated && (
            <li>
              • D&apos; is measured ({d_prime.toFixed(0)}m)
              from your 2-Point Test
            </li>
          )}
          <li>
            • Longer distances (10K+) are more accurate due to reduced D&apos;
            influence
          </li>
          <li>
            • Times assume optimal pacing and race conditions - adjust for
            terrain, weather, and fatigue
          </li>
        </ul>
      </div>
    </Card>
  );
}
