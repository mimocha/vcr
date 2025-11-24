/**
 * ZonesTable Component
 * Display training zones with pace ranges
 */

import Card from "../ui/Card";
import { UNIT_SYSTEMS, ZONE_COLORS } from "../../constants/zoneDefinitions";
import { formatPaceRange } from "../../utils/formatters";
import { useTheme } from "../../contexts/ThemeContext";

export default function ZonesTable({
  zones,
  unitSystem = UNIT_SYSTEMS.METRIC,
}) {
  const { isDark } = useTheme();

  if (!zones || zones.length === 0) {
    return null;
  }

  const isMetric = unitSystem === UNIT_SYSTEMS.METRIC;

  return (
    <Card title="Your Training Zones">
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
                    backdrop-blur-lg
                    ${isDark ? zoneColors.pillDark : zoneColors.pillLight}
                    ${zoneColors.pillText}
                    ${
                      isDark
                        ? "border border-white/20 bg-opacity-90"
                        : "border border-white/50 bg-opacity-95"
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
    </Card>
  );
}
