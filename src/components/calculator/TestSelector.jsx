/**
 * TestSelector Component
 * Dropdown for selecting CV test type
 */

import Select from "../ui/Select";
import { TEST_CONFIGS, TEST_TYPES } from "../../constants/testTypes";

export default function TestSelector({ value, onChange }) {
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
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>{TEST_CONFIGS[value].name}:</strong>{" "}
            {TEST_CONFIGS[value].description}
          </p>
          {TEST_CONFIGS[value].recommended && (
            <p className="text-xs text-blue-600 mt-1">✓ Recommended</p>
          )}
        </div>
      )}
    </div>
  );
}
