/**
 * AdvancedSettings Component
 * Collapsible section for advanced calculation options
 */

import { useState } from "react";
import Select from "../ui/Select";
import Input from "../ui/Input";
import { useTheme } from "../../contexts/ThemeContext";
import { ZONE_SYSTEMS } from "../../constants/zoneDefinitions";
import { TEST_TYPES } from "../../constants/testTypes";
import {
  D_PRIME_PRESETS,
  D_PRIME_DEFAULTS_BY_TEST,
  D_PRIME_RANGE,
} from "../../constants/raceDistances";

export default function AdvancedSettings({
  testType,
  cvMode,
  onCvModeChange,
  zoneSystem,
  onZoneSystemChange,
  dPrimePreset,
  onDPrimePresetChange,
  customDPrime,
  onCustomDPrimeChange,
}) {
  const { isDark } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if this is a one-point test (D' configuration is only for one-point tests)
  const isOnePointTest = testType !== TEST_TYPES.TWO_POINT;

  // Get recommended preset for current test type
  const recommendedPreset = D_PRIME_DEFAULTS_BY_TEST[testType];

  // Prepare options for zone system Select component
  const zoneSystemOptions = Object.values(ZONE_SYSTEMS).map((sys) => ({
    value: sys.id,
    label: sys.name,
  }));

  // Prepare options for D' preset Select component
  const dPrimeOptions = Object.values(D_PRIME_PRESETS).map((preset) => {
    // Mark the recommended option for current test type
    const isRecommended =
      recommendedPreset && preset.id === recommendedPreset.id;
    return {
      value: preset.id,
      label: isRecommended ? `${preset.label} ★` : preset.label,
      description: preset.description,
    };
  });

  // Handle D' preset change
  const handleDPrimePresetChange = (e) => {
    const newPreset = e.target.value;
    onDPrimePresetChange(newPreset);

    // If switching from custom to a preset, update the custom value to match
    if (newPreset !== "custom") {
      const preset = Object.values(D_PRIME_PRESETS).find(
        (p) => p.id === newPreset
      );
      if (preset && preset.value) {
        onCustomDPrimeChange(preset.value);
      }
    }
  };

  // Handle custom D' value change with validation
  const handleCustomDPrimeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      // Clamp to valid range
      const clampedValue = Math.max(
        D_PRIME_RANGE.MIN,
        Math.min(D_PRIME_RANGE.MAX, value)
      );
      onCustomDPrimeChange(clampedValue);
    }
  };

  return (
    <div
      className={`
        rounded-xl border backdrop-blur-md transition-all
        ${
          isDark
            ? "bg-white/[0.08] border-white/20"
            : "bg-white/60 border-white/40"
        }
      `}
      style={{
        backdropFilter: "blur(12px) saturate(150%)",
        WebkitBackdropFilter: "blur(12px) saturate(150%)",
      }}
    >
      {/* Header / Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full flex items-center justify-between px-4 py-3
          text-sm font-medium transition-colors rounded-xl
          ${
            isDark
              ? "text-gray-300 hover:bg-white/5"
              : "text-gray-700 hover:bg-black/5"
          }
        `}
        aria-expanded={isExpanded}
        aria-controls="advanced-settings-content"
      >
        <span>Advanced Settings</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div
          id="advanced-settings-content"
          className={`
            px-4 pb-4 space-y-4
            border-t
            ${isDark ? "border-white/10" : "border-black/10"}
          `}
        >
          {/* CV Mode Toggle */}
          <div className="pt-4">
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Critical Velocity Mode
            </label>
            <div
              className={`
                relative flex items-center gap-2 rounded-xl p-1 backdrop-blur-xl border transition-all
                ${
                  isDark
                    ? "bg-white/[0.08] border-white/30"
                    : "bg-white/80 border-white/60"
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
                      ? "bg-blue-800/90 border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                      : "bg-blue-700/90 border border-white/40 shadow-[0_10px_30px_rgba(88,28,135,0.3)] backdrop-blur-xl"
                  }
                `}
                style={{
                  width: "calc(50% - 4px)",
                  transform:
                    cvMode === "raw" ? "translateX(0)" : "translateX(100%)",
                }}
              />
              <button
                type="button"
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
                type="button"
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
            <p
              className={`mt-1 text-xs ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {cvMode === "raw"
                ? "Uses raw critical velocity without D' adjustment"
                : "Adjusts critical velocity using D' (anaerobic capacity)"}
            </p>
          </div>

          {/* Zone Calculation Method */}
          <div>
            <Select
              id="zone-system-advanced"
              label="Zone Calculation Method"
              value={zoneSystem}
              onChange={(e) => onZoneSystemChange(e.target.value)}
              options={zoneSystemOptions}
            />
          </div>

          {/* D' (Anaerobic Capacity) Configuration - Only for one-point tests */}
          {isOnePointTest && (
            <div className="space-y-3">
              <Select
                id="dprime-preset"
                label="Anaerobic Capacity (D')"
                value={dPrimePreset}
                onChange={handleDPrimePresetChange}
                options={dPrimeOptions}
              />

              {/* Custom D' input - shown when Custom is selected */}
              {dPrimePreset === "custom" && (
                <div className="ml-4">
                  <Input
                    id="custom-dprime"
                    label="Custom D' Value (meters)"
                    type="number"
                    value={customDPrime}
                    onChange={handleCustomDPrimeChange}
                    min={D_PRIME_RANGE.MIN}
                    max={D_PRIME_RANGE.MAX}
                    placeholder={`${D_PRIME_RANGE.MIN}-${D_PRIME_RANGE.MAX}`}
                  />
                  <p
                    className={`mt-1 text-xs ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Valid range: {D_PRIME_RANGE.MIN}-{D_PRIME_RANGE.MAX} meters
                  </p>
                </div>
              )}

              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                D&apos; adjusts CV for anaerobic contribution. Shorter tests use
                higher values. ★ marks the recommended setting for your test.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
