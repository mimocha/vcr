/**
 * CalculateButton Component
 * Trigger calculation with validation
 */

import Button from "../ui/Button";

export default function CalculateButton({ onClick, disabled = false }) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="primary"
      fullWidth
      type="button"
    >
      Calculate Critical Velocity
    </Button>
  );
}
