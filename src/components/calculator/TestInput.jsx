/**
 * TestInput Component
 * Dynamic input fields based on selected test type
 */

import { useRef } from "react";
import Input from "../ui/Input";
import { TEST_CONFIGS } from "../../constants/testTypes";
import { UNIT_SYSTEMS } from "../../constants/zoneDefinitions";

export default function TestInput({
  testType,
  values,
  onChange,
  errors = {},
  unitSystem = UNIT_SYSTEMS.METRIC,
  onSubmit,
}) {
  const config = TEST_CONFIGS[testType];
  const inputRefs = useRef({});

  if (!config) {
    return null;
  }

  const handleChange = (inputId) => (e) => {
    onChange(inputId, e.target.value);
  };

  const handleKeyDown = (inputId, index) => (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Check if this is the last input
      const isLastInput = index === config.inputs.length - 1;

      if (isLastInput) {
        // Submit the form if on the last input
        if (onSubmit) {
          onSubmit();
        }
      } else {
        // Move to next input
        const nextInput = config.inputs[index + 1];
        if (nextInput && inputRefs.current[nextInput.id]) {
          inputRefs.current[nextInput.id].focus();
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      {config.inputs.map((input, index) => (
        <Input
          key={input.id}
          id={input.id}
          label={input.label}
          type={input.type}
          value={values[input.id] || ""}
          onChange={handleChange(input.id)}
          onKeyDown={handleKeyDown(input.id, index)}
          placeholder={input.placeholder}
          unit={input.unit}
          error={errors[input.id]}
          note={input.note}
          required={input.required}
          inputRef={(el) => (inputRefs.current[input.id] = el)}
        />
      ))}
    </div>
  );
}
