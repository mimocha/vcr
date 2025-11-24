/**
 * ZonesTable Component
 * Display training zones with pace ranges
 */

import Card from "../ui/Card";
import Select from "../ui/Select";
import {
  UNIT_SYSTEMS,
  ZONE_COLORS,
  ZONE_SYSTEMS,
  DEFAULT_ZONE_SYSTEM,
} from "../../constants/zoneDefinitions";
import { formatPaceRange } from "../../utils/formatters";
import { useTheme } from "../../contexts/ThemeContext";

export default function ZonesTable({
  zones,
  unitSystem = UNIT_SYSTEMS.METRIC,
  cvMode = "raw",
  zoneSystem = DEFAULT_ZONE_SYSTEM,
  onZoneSystemChange,
}) {
  const { isDark } = useTheme();

  if (!zones || zones.length === 0) {
    return null;
  }

  const isMetric = unitSystem === UNIT_SYSTEMS.METRIC;

  // Get current zone system metadata
  const currentSystem = Object.values(ZONE_SYSTEMS).find(
    (sys) => sys.id === zoneSystem
  );

  // Prepare options for Select component
  const zoneSystemOptions = Object.values(ZONE_SYSTEMS).map((sys) => ({
    value: sys.id,
    label: sys.name,
  }));

  return (
    <Card title="Your Training Zones">
      {/* Explanatory note */}
      <p
        className={`text-xs mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        Using training zones based on{" "}
        <strong>{cvMode === "raw" ? "unadjusted" : "adjusted"}</strong> critical
        velocity
      </p>

      {/* Training Zone Cards */}
      <div className="space-y-2.5">
        {zones.map((zone) => {
          const zoneColors = ZONE_COLORS[zone.number];

          return (
            <div
              key={zone.number}
              className={`
                rounded-2xl p-3 transition-all
                backdrop-blur-md
                ${
                  isDark
                    ? "bg-white/10 border border-white/20"
                    : "bg-white/60 border border-white/40"
                }
              `}
            >
              {/* Elongated colored pill with zone number and name */}
              <div className="mb-3">
                <div
                  className={`
                    rounded-full px-4 py-2
                    font-semibold text-sm text-center
                    backdrop-blur-xl
                    ${isDark ? zoneColors.pillDark : zoneColors.pillLight}
                    ${zoneColors.pillText}
                    ${
                      isDark
                        ? "border border-white/20 bg-opacity-90"
                        : "border border-white/50 bg-opacity-90"
                    }
                  `}
                >
                  Z{zone.number}: {zone.name}
                </div>
              </div>

              {/* Pace range - main focus */}
              <div className="text-center">
                <span
                  className={`
                    text-2xl font-bold
                    ${isDark ? "text-white" : "text-gray-900"}
                  `}
                >
                  {formatPaceRange(
                    isMetric ? zone.paceMinSecPerKm : zone.paceMinSecPerMile,
                    isMetric ? zone.paceMaxSecPerKm : zone.paceMaxSecPerMile,
                    isMetric ? "km" : "mi"
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Zone System Selector */}
      <div className="my-4">
        <Select
          id="zone-system"
          label="Zone Calculation Method"
          value={zoneSystem}
          onChange={(e) => onZoneSystemChange(e.target.value)}
          options={zoneSystemOptions}
        />
      </div>

      {/* Dynamic notes card */}
      <div
        className={`
          my-4 p-3 rounded-xl backdrop-blur-sm border
          ${
            isDark
              ? "bg-blue-500/10 border-blue-400/30"
              : "bg-blue-50/80 border-blue-200"
          }
        `}
      >
        <p
          className={`text-sm font-semibold ${
            isDark ? "text-blue-200" : "text-blue-800"
          }`}
        >
          About this zone system:
        </p>
        <ul
          className={`text-xs mt-2 space-y-1 ${
            isDark ? "text-blue-100" : "text-blue-900"
          }`}
        >
          {currentSystem?.notes.map((note, index) => (
            <li key={index}>• {note}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
