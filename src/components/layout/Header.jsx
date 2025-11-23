/**
 * Header Component
 * Application header with title and unit toggle
 */

import { UNIT_SYSTEMS } from "../../constants/zoneDefinitions";

export default function Header({ unitSystem, onUnitSystemChange }) {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Critical Velocity Calculator
          </h1>
          <p className="text-gray-600 mt-2">
            Calculate your Critical Velocity and training zones
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-1">
          <button
            onClick={() => onUnitSystemChange(UNIT_SYSTEMS.METRIC)}
            className={`
              px-4 py-2 rounded-md font-medium transition-colors
              ${
                unitSystem === UNIT_SYSTEMS.METRIC
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            Metric
          </button>
          <button
            onClick={() => onUnitSystemChange(UNIT_SYSTEMS.IMPERIAL)}
            className={`
              px-4 py-2 rounded-md font-medium transition-colors
              ${
                unitSystem === UNIT_SYSTEMS.IMPERIAL
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            Imperial
          </button>
        </div>
      </div>
    </header>
  );
}
