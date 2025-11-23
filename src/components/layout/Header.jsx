/**
 * Header Component
 * Application header with title and unit toggle
 */

import { UNIT_SYSTEMS } from "../../constants/zoneDefinitions";
import { useTheme } from "../../contexts/ThemeContext";

export default function Header({ unitSystem, onUnitSystemChange }) {
  const { isDark } = useTheme();

  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Critical Velocity Calculator
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Calculate your Critical Velocity and training zones
          </p>
        </div>

        <div className={`
          flex items-center gap-2 rounded-xl p-1 backdrop-blur-md border
          ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/50 shadow-md'}
        `}>
          <button
            onClick={() => onUnitSystemChange(UNIT_SYSTEMS.METRIC)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${
                unitSystem === UNIT_SYSTEMS.METRIC
                  ? isDark
                    ? "bg-blue-500 text-white"
                    : "bg-blue-600 text-white"
                  : isDark
                    ? "bg-transparent text-gray-300 hover:bg-white/10"
                    : "bg-transparent text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            Metric
          </button>
          <button
            onClick={() => onUnitSystemChange(UNIT_SYSTEMS.IMPERIAL)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${
                unitSystem === UNIT_SYSTEMS.IMPERIAL
                  ? isDark
                    ? "bg-blue-500 text-white"
                    : "bg-blue-600 text-white"
                  : isDark
                    ? "bg-transparent text-gray-300 hover:bg-white/10"
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
