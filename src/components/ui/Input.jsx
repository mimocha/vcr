/**
 * Input Component
 * Reusable input field with validation states
 */

import { useTheme } from "../../contexts/ThemeContext";

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
  inputRef,
  onKeyDown,
  ...props
}) {
  const hasError = error && error.length > 0;
  const { isDark } = useTheme();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 ${
            isDark ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={`
            w-full px-4 py-2 border rounded-xl backdrop-blur-md
            focus:outline-none focus:ring-2 focus:ring-offset-0
            transition-all
            ${
              hasError
                ? isDark
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-500/10 text-red-200"
                  : "border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50"
                : isDark
                ? "border-white/[0.15] focus:ring-blue-400 focus:border-blue-400 bg-white/[0.30] text-gray-900 placeholder-gray-600"
                : "border-white/40 focus:ring-blue-500 focus:border-blue-500 bg-white/60"
            }
            ${unit ? "pr-16" : ""}
          `}
          style={{
            backdropFilter: "blur(12px) saturate(150%)",
            WebkitBackdropFilter: "blur(12px) saturate(150%)",
          }}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${id}-error` : note ? `${id}-note` : undefined
          }
          {...props}
        />

        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span
              className={`text-sm ${
                isDark ? "text-gray-600" : "text-gray-500"
              }`}
            >
              {unit}
            </span>
          </div>
        )}
      </div>

      {hasError && (
        <p
          id={`${id}-error`}
          className={`mt-1 text-sm ${isDark ? "text-red-400" : "text-red-600"}`}
        >
          {error}
        </p>
      )}

      {!hasError && note && (
        <p
          id={`${id}-note`}
          className={`mt-1 text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {note}
        </p>
      )}
    </div>
  );
}
