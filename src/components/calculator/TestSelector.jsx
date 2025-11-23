/**
 * TestSelector Component
 * Dropdown for selecting CV test type
 */

import Select from "../ui/Select";
import { TEST_CONFIGS } from "../../constants/testTypes";
import { useTheme } from "../../contexts/ThemeContext";

export default function TestSelector({ value, onChange }) {
  const { isDark } = useTheme();
  const options = Object.values(TEST_CONFIGS).map((config) => ({
    value: config.id,
    label: config.name,
  }));

  return (
    <div>
      <Select
        id="test-type"
        label="Select Test Type"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={options}
        required
      />

      {value && TEST_CONFIGS[value] && (
        <div
          className={`
          mt-2 p-3 rounded-2xl backdrop-blur-md transition-all
          ${
            isDark
              ? "bg-white/10 border border-white/20"
              : "bg-white/60 border border-white/40"
          }
        `}
        >
          <p
            className={`text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}
          >
            <strong>{TEST_CONFIGS[value].name}:</strong>{" "}
            {TEST_CONFIGS[value].description}
          </p>
          {TEST_CONFIGS[value].recommended && (
            <p
              className={`text-xs mt-1 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              ✓ Recommended
            </p>
          )}
        </div>
      )}
    </div>
  );
}
