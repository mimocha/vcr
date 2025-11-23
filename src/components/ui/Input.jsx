/**
 * Input Component
 * Reusable input field with validation states
 */

export default function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  note,
  unit,
  required = false,
  ...props
}) {
  const hasError = error && error.length > 0;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-offset-0
            transition-colors
            ${
              hasError
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }
            ${unit ? "pr-16" : ""}
          `}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : note ? `${id}-note` : undefined}
          {...props}
        />

        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 text-sm">{unit}</span>
          </div>
        )}
      </div>

      {hasError && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {!hasError && note && (
        <p id={`${id}-note`} className="mt-1 text-sm text-gray-500">
          {note}
        </p>
      )}
    </div>
  );
}
