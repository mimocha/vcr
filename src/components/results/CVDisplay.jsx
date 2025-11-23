/**
 * CVDisplay Component
 * Display CV value and converted paces
 */

import Card from "../ui/Card";
import {
  formatVelocity,
  formatPacePerKm,
  formatPacePerMile,
} from "../../utils/formatters";
import { UNIT_SYSTEMS } from "../../constants/zoneDefinitions";
import { useTheme } from "../../contexts/ThemeContext";

export default function CVDisplay({
  cvData,
  unitSystem = UNIT_SYSTEMS.METRIC,
}) {
  if (!cvData) {
    return null;
  }

  const { velocity_ms, pace_sec_per_km, d_prime } = cvData;
  const { isDark } = useTheme();

  // Convert to imperial if needed
  const paceSecPerMile = pace_sec_per_km * 1.60934;

  return (
    <Card title="Your Critical Velocity">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`
          rounded-xl p-4 border backdrop-blur-sm
          ${
            isDark
              ? "bg-blue-500/10 border-blue-400/30"
              : "bg-blue-50/80 border-blue-200"
          }
        `}
        >
          <p
            className={`text-sm font-medium mb-1 ${
              isDark ? "text-blue-300" : "text-blue-600"
            }`}
          >
            Critical Velocity
          </p>
          <p
            className={`text-2xl font-bold ${
              isDark ? "text-blue-100" : "text-blue-900"
            }`}
          >
            {formatVelocity(velocity_ms)}
          </p>
        </div>

        <div
          className={`
          rounded-xl p-4 border backdrop-blur-sm
          ${
            isDark
              ? "bg-blue-500/10 border-blue-400/30"
              : "bg-blue-50/80 border-blue-200"
          }
        `}
        >
          <p
            className={`text-sm font-medium mb-1 ${
              isDark ? "text-blue-300" : "text-blue-600"
            }`}
          >
            Pace
          </p>
          <p
            className={`text-2xl font-bold ${
              isDark ? "text-blue-100" : "text-blue-900"
            }`}
          >
            {unitSystem === UNIT_SYSTEMS.METRIC
              ? formatPacePerKm(pace_sec_per_km)
              : formatPacePerMile(paceSecPerMile)}
          </p>
        </div>

        {d_prime !== undefined && (
          <div
            className={`
            rounded-xl p-4 border md:col-span-2 backdrop-blur-sm
            ${
              isDark
                ? "bg-green-500/10 border-green-400/30"
                : "bg-green-50/80 border-green-200"
            }
          `}
          >
            <p
              className={`text-sm font-medium mb-1 ${
                isDark ? "text-green-300" : "text-green-600"
              }`}
            >
              Anaerobic Distance Capacity (D')
            </p>
            <p
              className={`text-2xl font-bold ${
                isDark ? "text-green-100" : "text-green-900"
              }`}
            >
              {d_prime.toFixed(0)} meters
            </p>
            <p
              className={`text-xs mt-1 ${
                isDark ? "text-green-200" : "text-green-700"
              }`}
            >
              Available energy for efforts above CV
            </p>
          </div>
        )}
      </div>

      <div
        className={`
        mt-4 p-3 rounded-xl backdrop-blur-sm
        ${isDark ? "bg-white/5 border border-white/10" : "bg-gray-50/80"}
      `}
      >
        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          <strong>What is Critical Velocity?</strong> CV represents the
          theoretical maximum sustainable running pace. Efforts above CV deplete
          your anaerobic capacity (D'), while efforts below CV can be sustained
          for extended periods.
        </p>
      </div>
    </Card>
  );
}
