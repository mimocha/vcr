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
        rounded-2xl backdrop-blur-md p-6 border transition-colors
        ${isDark
          ? 'bg-white/10 border-white/20'
          : 'bg-white/70 border-white/50 shadow-lg'
        }
        ${className}
      `}
      {...props}
    >
      {title && (
        <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
