/**
 * ZonesTable Component
 * Display training zones with pace ranges
 */

import Card from "../ui/Card";
import { ZONE_COLORS, UNIT_SYSTEMS } from "../../constants/zoneDefinitions";
import { formatPaceRange } from "../../utils/formatters";
import { useTheme } from "../../contexts/ThemeContext";

export default function ZonesTable({ zones, unitSystem = UNIT_SYSTEMS.METRIC }) {
  if (!zones || zones.length === 0) {
    return null;
  }

  const isMetric = unitSystem === UNIT_SYSTEMS.METRIC;
  const { isDark } = useTheme();

  return (
    <Card title="Training Zones">
      <div className="space-y-3">
        {zones.map((zone) => (
          <div
            key={zone.number}
            className={`
              rounded-2xl p-4 transition-all
              backdrop-blur-md
              ${isDark
                ? `bg-white/10 border border-white/20 ${ZONE_COLORS[zone.number].glassTint}`
                : `bg-white/60 border border-white/40 ${ZONE_COLORS[zone.number].glassTint}`
              }
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`
                    inline-flex items-center justify-center
                    w-8 h-8 rounded-full font-bold
                    ${isDark ? 'bg-white/20 backdrop-blur-sm' : ZONE_COLORS[zone.number].badge}
                    ${ZONE_COLORS[zone.number].accent}
                  `}
                >
                  {zone.number}
                </span>
                <div>
                  <h3
                    className={`font-bold text-lg ${ZONE_COLORS[zone.number].accent}`}
                  >
                    {zone.name}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {zone.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Pace Range:
                </span>
                <span className={`text-lg font-bold ${ZONE_COLORS[zone.number].accent}`}>
                  {formatPaceRange(
                    isMetric ? zone.paceMinSecPerKm : zone.paceMinSecPerMile,
                    isMetric ? zone.paceMaxSecPerKm : zone.paceMaxSecPerMile,
                    isMetric ? "km" : "mi"
                  )}
                </span>
              </div>

              <div className={`pt-2 border-t ${isDark ? 'border-white/20' : 'border-gray-200'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>Purpose:</strong> {zone.purpose}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                  <strong>Feel:</strong> {zone.feel}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                  <strong>RPE:</strong> {zone.rpe}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`
        mt-6 p-4 rounded-2xl backdrop-blur-md
        ${isDark ? 'bg-white/10 border border-white/20' : 'bg-white/60 border border-white/40'}
      `}>
        <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          Training Zone Guide
        </h4>
        <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>
            • <strong>Zone 1-2:</strong> Build aerobic base (70-80% of weekly
            volume)
          </li>
          <li>
            • <strong>Zone 3:</strong> Tempo runs, lactate clearance
          </li>
          <li>
            • <strong>Zone 4:</strong> Threshold work, 10K-Half Marathon pace
          </li>
          <li>
            • <strong>Zone 5:</strong> VO₂ max intervals, 5K pace
          </li>
        </ul>
      </div>
    </Card>
  );
}
