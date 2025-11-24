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
        <div className="mt-1.5">
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            <strong className={isDark ? "text-gray-300" : "text-gray-700"}>
              {TEST_CONFIGS[value].name}:
            </strong>{" "}
            {TEST_CONFIGS[value].description}
          </p>
          {TEST_CONFIGS[value].recommended && (
            <p
              className={`text-xs mt-0.5 ${
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
