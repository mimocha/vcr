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

export default function CVDisplay({ cvData, unitSystem = UNIT_SYSTEMS.METRIC }) {
  if (!cvData) {
    return null;
  }

  const { velocity_ms, pace_sec_per_km, d_prime } = cvData;

  // Convert to imperial if needed
  const paceSecPerMile = pace_sec_per_km * 1.60934;

  return (
    <Card title="Your Critical Velocity">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-600 font-medium mb-1">CV (m/s)</p>
          <p className="text-2xl font-bold text-blue-900">
            {formatVelocity(velocity_ms)}
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-600 font-medium mb-1">
            CV Pace ({unitSystem === UNIT_SYSTEMS.METRIC ? "min/km" : "min/mi"})
          </p>
          <p className="text-2xl font-bold text-blue-900">
            {unitSystem === UNIT_SYSTEMS.METRIC
              ? formatPacePerKm(pace_sec_per_km)
              : formatPacePerMile(paceSecPerMile)}
          </p>
        </div>

        {d_prime !== undefined && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200 md:col-span-2">
            <p className="text-sm text-green-600 font-medium mb-1">
              Anaerobic Distance Capacity (D')
            </p>
            <p className="text-2xl font-bold text-green-900">
              {d_prime.toFixed(0)} meters
            </p>
            <p className="text-xs text-green-700 mt-1">
              Available energy for efforts above CV
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>What is Critical Velocity?</strong> CV represents the
          theoretical maximum sustainable running pace. Efforts above CV deplete
          your anaerobic capacity (D'), while efforts below CV can be sustained
          for extended periods.
        </p>
      </div>
    </Card>
  );
}
