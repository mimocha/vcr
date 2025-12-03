/**
 * CVDisplay Component
 * Display CV value and converted paces
 */

import { useState } from "react";
import Card from "../ui/Card";
import LearnMoreModal from "../ui/LearnMoreModal";
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
}) {
  const { isDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <Card title="Your Critical Velocity">
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
          About Critical Velocity
        </button>
      </div>

      {/* Learn More Modal */}
      <LearnMoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTab="cv"
        cvMode={cvMode}
        d_prime={d_prime}
        d_prime_estimated={d_prime_estimated}
      />
    </Card>
  );
}
