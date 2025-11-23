/**
 * ThemeToggle Component
 * Toggle between light/dark theme modes
 */

import { useTheme, THEME_MODES } from "../../contexts/ThemeContext";

const ThemeIcon = ({ mode, isDark }) => {
  if (mode === THEME_MODES.LIGHT) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  );
};

export default function ThemeToggle() {
  const { themeMode, cycleThemeMode, isDark } = useTheme();

  return (
    <button
      onClick={cycleThemeMode}
      className={`
        flex items-center justify-center p-3
        rounded-full backdrop-blur-xl border
        transition-all hover:scale-105 active:scale-95
        ${
          isDark
            ? "bg-white/[0.08] border-white/[0.15] text-white hover:bg-white/[0.12] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
            : "bg-white/80 border-white/60 text-gray-800 hover:bg-white/90 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
        }
      `}
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      }}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <ThemeIcon mode={themeMode} isDark={isDark} />
    </button>
  );
}
