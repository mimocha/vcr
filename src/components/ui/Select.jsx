/**
 * Select Component
 * Dropdown component with mobile optimization
 */

export default function Select({
  id,
  label,
  value,
  onChange,
  options,
  error,
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

      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-offset-0
          transition-colors cursor-pointer
          ${
            hasError
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }
        `}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hasError && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
