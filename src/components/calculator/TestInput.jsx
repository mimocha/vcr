/**
 * TestInput Component
 * Dynamic input fields based on selected test type
 */

import Input from "../ui/Input";
import { TEST_CONFIGS } from "../../constants/testTypes";
import { UNIT_SYSTEMS, UNIT_LABELS } from "../../constants/zoneDefinitions";

export default function TestInput({
  testType,
  values,
  onChange,
  errors = {},
  unitSystem = UNIT_SYSTEMS.METRIC,
}) {
  const config = TEST_CONFIGS[testType];

  if (!config) {
    return null;
  }

  const handleChange = (inputId) => (e) => {
    onChange(inputId, e.target.value);
  };

  return (
    <div className="space-y-4">
      {config.inputs.map((input) => {
        const isDistanceInput = input.id.includes("distance");
        const unit = isDistanceInput
          ? unitSystem === UNIT_SYSTEMS.METRIC
            ? input.unit
            : input.unitImperial
          : input.unit;

        return (
          <Input
            key={input.id}
            id={input.id}
            label={input.label}
            type={input.type}
            value={values[input.id] || ""}
            onChange={handleChange(input.id)}
            placeholder={input.placeholder}
            unit={unit}
            error={errors[input.id]}
            note={input.note}
            required={input.required}
          />
        );
      })}
    </div>
  );
}
