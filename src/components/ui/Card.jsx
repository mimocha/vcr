/**
 * Card Component
 * Container component with consistent styling
 */

import { useTheme } from "../../contexts/ThemeContext";

export default function Card({ children, title, className = "", ...props }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`
        rounded-2xl backdrop-blur-xl p-6 border transition-all
        ${
          isDark
            ? "bg-white/[0.12] border-white/[0.15] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
            : "bg-white/[0.01] border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
        }
        ${className}
      `}
      style={{
        backdropFilter: isDark
          ? "blur(6px) saturate(180%)"
          : "blur(6px) saturate(70%)",
        WebkitBackdropFilter: isDark
          ? "blur(6px) saturate(180%)"
          : "blur(6px) saturate(70%)",
      }}
      {...props}
    >
      {title && (
        <h2
          className={`text-xl font-semibold mb-4 ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
