/**
 * RacePerformanceChart Component
 * Display predicted race times for standard distances
 */

import { useState } from "react";
import Card from "../ui/Card";
import LearnMoreModal from "../ui/LearnMoreModal";
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
  cvMode = "raw",
}) {
  const { isDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!cvData || !cvData.velocity_ms || !cvData.d_prime) {
    return null;
  }

  const { velocity_ms, velocity_ms_raw, d_prime, d_prime_estimated } = cvData;

  // Use the selected CV velocity based on cvMode
  const selectedVelocity = cvMode === "raw" ? velocity_ms_raw : velocity_ms;

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
    const slowestTime = formatTimeWithHours(min.timeSeconds);
    const fastestTime = formatTimeWithHours(max.timeSeconds);

    return `${fastestTime} - ${slowestTime}`;
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
        className={`text-xs mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        Predictions based on{" "}
        <strong>{cvMode === "raw" ? "unadjusted" : "adjusted"}</strong> critical
        velocity
      </p>

      {/* Warning note */}
      <p
        className={`text-xs mb-4 px-3 py-2 rounded-lg ${
          isDark
            ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700/50"
            : "bg-yellow-50 text-yellow-800 border border-yellow-300"
        }`}
      >
        <strong>
          Warning: This race prediction model is still under development.
          Results are known to be inaccurate.
        </strong>
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

      {/* Learn More Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className={`
            px-6 py-2 rounded-full font-medium text-sm transition-all
            ${
              isDark
                ? "bg-white/10 hover:bg-white/15 border border-white/20 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800"
            }
          `}
        >
          About Race Predictions
        </button>
      </div>

      {/* Learn More Modal */}
      <LearnMoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTab="predictions"
        cvMode={cvMode}
        d_prime={d_prime}
        d_prime_estimated={d_prime_estimated}
      />
    </Card>
  );
}
