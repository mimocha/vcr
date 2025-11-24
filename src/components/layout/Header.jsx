/**
 * Header Component
 * Application header with title and unit toggle
 */

import { UNIT_SYSTEMS } from "../../constants/zoneDefinitions";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header({ unitSystem, onUnitSystemChange }) {
  const { isDark } = useTheme();

  return (
    <header className="mb-8">
      <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-center md:text-left">
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Critical Velocity Calculator
          </h1>
          <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Calculate your Critical Velocity and training zones
          </p>
        </div>

        <div className="flex items-center gap-2">
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
                  unitSystem === UNIT_SYSTEMS.METRIC
                    ? "translateX(0)"
                    : "translateX(100%)",
              }}
            />
            <button
              onClick={() => onUnitSystemChange(UNIT_SYSTEMS.METRIC)}
              className={`
                relative z-10 flex-1 px-4 py-2 rounded-lg font-medium transition-all text-center
                ${
                  unitSystem === UNIT_SYSTEMS.METRIC
                    ? "text-white"
                    : isDark
                    ? "text-gray-300 hover:bg-white/10"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              Metric
            </button>
            <button
              onClick={() => onUnitSystemChange(UNIT_SYSTEMS.IMPERIAL)}
              className={`
                relative z-10 flex-1 px-4 py-2 rounded-lg font-medium transition-all text-center
                ${
                  unitSystem === UNIT_SYSTEMS.IMPERIAL
                    ? "text-white"
                    : isDark
                    ? "text-gray-300 hover:bg-white/10"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              Imperial
            </button>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
