/**
 * ExportButton Component
 * Floating download button that appears when results exist
 */

import { useTheme } from "../../contexts/ThemeContext";

export default function ExportButton({ onClick, visible = true }) {
  const { isDark } = useTheme();

  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-8 right-8 z-40
        w-14 h-14 rounded-full
        flex items-center justify-center
        backdrop-blur-xl border transition-all
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          isDark
            ? "bg-blue-900/60 border-white/30 focus:ring-blue-300 shadow-[0_12px_40px_0_rgba(0,0,0,0.45)] hover:bg-blue-800/60"
            : "bg-blue-700/60 border-white/50 focus:ring-blue-500 shadow-[0_12px_34px_0_rgba(84,63,196,0.35)] hover:bg-blue-600/60"
        }
      `}
      style={{
        backdropFilter: isDark
          ? "blur(6px) saturate(180%)"
          : "blur(6px) saturate(70%)",
        WebkitBackdropFilter: isDark
          ? "blur(6px) saturate(180%)"
          : "blur(6px) saturate(70%)",
      }}
      aria-label="Export results"
      title="Export results as image"
    >
      {/* Download icon SVG */}
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </button>
  );
}
