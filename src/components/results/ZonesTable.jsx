/**
 * ZonesTable Component
 * Display training zones with pace ranges
 */

import Card from "../ui/Card";
import { ZONE_COLORS, UNIT_SYSTEMS } from "../../constants/zoneDefinitions";
import { formatPaceRange } from "../../utils/formatters";

export default function ZonesTable({ zones, unitSystem = UNIT_SYSTEMS.METRIC }) {
  if (!zones || zones.length === 0) {
    return null;
  }

  const isMetric = unitSystem === UNIT_SYSTEMS.METRIC;

  return (
    <Card title="Training Zones">
      <div className="space-y-3">
        {zones.map((zone) => (
          <div
            key={zone.number}
            className={`
              rounded-lg border-2 p-4 transition-all
              ${ZONE_COLORS[zone.number].bg}
              ${ZONE_COLORS[zone.number].border}
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`
                    inline-flex items-center justify-center
                    w-8 h-8 rounded-full font-bold
                    ${ZONE_COLORS[zone.number].badge}
                    ${ZONE_COLORS[zone.number].text}
                  `}
                >
                  {zone.number}
                </span>
                <div>
                  <h3
                    className={`font-bold text-lg ${
                      ZONE_COLORS[zone.number].text
                    }`}
                  >
                    {zone.name}
                  </h3>
                  <p className="text-sm text-gray-600">{zone.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Pace Range:
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {formatPaceRange(
                    isMetric ? zone.paceMinSecPerKm : zone.paceMinSecPerMile,
                    isMetric ? zone.paceMaxSecPerKm : zone.paceMaxSecPerMile,
                    isMetric ? "km" : "mi"
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  <strong>Purpose:</strong> {zone.purpose}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <strong>Feel:</strong> {zone.feel}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <strong>RPE:</strong> {zone.rpe}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">
          Training Zone Guide
        </h4>
        <ul className="text-sm text-gray-700 space-y-1">
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
