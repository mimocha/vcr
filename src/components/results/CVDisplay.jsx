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
  cvMode = "raw",
  onCvModeChange,
}) {
  const { isDark } = useTheme();

  if (!cvData) {
    return null;
  }

  const {
    velocity_ms,
    pace_sec_per_km,
    velocity_ms_raw,
    pace_sec_per_km_raw,
    adjusted_distance,
    d_prime,
    d_prime_estimated,
  } = cvData;

  // Convert to imperial if needed
  const paceSecPerMile = pace_sec_per_km * 1.60934;
  const paceSecPerMileRaw =
    pace_sec_per_km_raw !== undefined
      ? pace_sec_per_km_raw * 1.60934
      : undefined;

  return (
    <Card>
      {/* Title with Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`text-xl font-semibold ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          Your Critical Velocity
        </h2>

        {/* CV Mode Toggle */}
        <div
          className={`
            relative flex items-center gap-2 rounded-xl p-1 backdrop-blur-xl border transition-all
            ${
              isDark
                ? "bg-white/[0.08] border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                : "bg-white/80 border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
            }
          `}
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
          }}
        >
          {/* Sliding background indicator */}
          <div
            className={`
              absolute top-1 bottom-1 rounded-lg transition-all duration-300 ease-in-out
              ${
                isDark
                  ? "bg-gradient-to-r from-cyan-600/80 via-blue-500/80 to-indigo-600/80"
                  : "bg-gradient-to-r from-cyan-600/80 via-blue-600/80 to-indigo-600/80"
              }
            `}
            style={{
              width: "calc(50% - 4px)",
              transform:
                cvMode === "raw" ? "translateX(0)" : "translateX(100%)",
            }}
          />
          <button
            onClick={() => onCvModeChange("raw")}
            className={`
              relative z-10 flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm text-center
              ${
                cvMode === "raw"
                  ? "text-white"
                  : isDark
                  ? "text-gray-300 hover:bg-white/10"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            Unadjusted
          </button>
          <button
            onClick={() => onCvModeChange("adjusted")}
            className={`
              relative z-10 flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm text-center
              ${
                cvMode === "adjusted"
                  ? "text-white"
                  : isDark
                  ? "text-gray-300 hover:bg-white/10"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            Adjusted
          </button>
        </div>
      </div>
      <div className="space-y-6">
        {/* Raw (Unadjusted) Section */}
        <div>
          <h3
            className={`text-sm font-semibold mb-3 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Raw Critical Velocity (Unadjusted)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`
              rounded-xl p-4 border backdrop-blur-sm
              ${
                isDark
                  ? "bg-purple-500/10 border-purple-400/30"
                  : "bg-purple-50/80 border-purple-200"
              }
            `}
            >
              <p
                className={`text-sm font-medium mb-1 ${
                  isDark ? "text-purple-300" : "text-purple-600"
                }`}
              >
                Critical Velocity
              </p>
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-purple-100" : "text-purple-900"
                }`}
              >
                {formatVelocity(velocity_ms_raw)}
              </p>
            </div>

            <div
              className={`
              rounded-xl p-4 border backdrop-blur-sm
              ${
                isDark
                  ? "bg-purple-500/10 border-purple-400/30"
                  : "bg-purple-50/80 border-purple-200"
              }
            `}
            >
              <p
                className={`text-sm font-medium mb-1 ${
                  isDark ? "text-purple-300" : "text-purple-600"
                }`}
              >
                Pace
              </p>
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-purple-100" : "text-purple-900"
                }`}
              >
                {unitSystem === UNIT_SYSTEMS.METRIC
                  ? formatPacePerKm(pace_sec_per_km_raw)
                  : formatPacePerMile(paceSecPerMileRaw)}
              </p>
            </div>
          </div>
        </div>

        {/* Adjusted Section */}
        <div>
          <h3
            className={`text-sm font-semibold mb-3 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Adjusted Critical Velocity (with D&apos;)
          </h3>
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

            <div
              className={`
              rounded-xl p-4 border backdrop-blur-sm
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
                D&apos; (Anaerobic Capacity)
              </p>
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-green-100" : "text-green-900"
                }`}
              >
                {d_prime.toFixed(0)} meters
                <span
                  className={`text-xs font-normal ml-2 ${
                    isDark ? "text-green-200" : "text-green-700"
                  }`}
                >
                  {d_prime_estimated ? "(estimated)" : "(calculated)"}
                </span>
              </p>
            </div>

            <div
              className={`
              rounded-xl p-4 border backdrop-blur-sm
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
                Adjusted Distance
              </p>
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-green-100" : "text-green-900"
                }`}
              >
                {adjusted_distance.toFixed(0)} meters
              </p>
              <p
                className={`text-xs mt-1 ${
                  isDark ? "text-green-200" : "text-green-700"
                }`}
              >
                Distance minus D&apos;
              </p>
            </div>
          </div>
        </div>
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
          your anaerobic capacity (D&apos;), while efforts below CV can be
          sustained for extended periods.
        </p>
      </div>
    </Card>
  );
}
