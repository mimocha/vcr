/**
 * Button Component
 * Reusable button with variants
 */

import { useTheme } from "../../contexts/ThemeContext";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
  ...props
}) {
  const { isDark } = useTheme();

  const baseStyles =
    "px-6 py-3 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-xl";

  const variants = {
    primary: isDark
      ? "bg-gradient-to-r from-blue-500/90 via-indigo-600/90 to-purple-600/90 text-white hover:opacity-80 focus:ring-blue-400 active:brightness-90 border border-white/20"
      : "bg-gradient-to-r from-blue-600/90 via-blue-700/90 to-indigo-700/90 text-white hover:opacity-80 focus:ring-blue-500 active:brightness-90 border border-white/50",
    secondary: isDark
      ? "bg-white/10 text-gray-200 hover:bg-white/20 focus:ring-gray-400 active:bg-white/30 border border-white/20"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 active:bg-gray-400",
    outline: isDark
      ? "bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-500/10 focus:ring-blue-400 active:bg-blue-500/20"
      : "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass}`}
      {...props}
    >
      {children}
    </button>
  );
}
