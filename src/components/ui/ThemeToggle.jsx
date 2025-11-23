/**
 * ThemeToggle Component
 * Toggle between auto/light/dark theme modes
 */

import { useTheme, THEME_MODES } from "../../contexts/ThemeContext";

const ThemeIcon = ({ mode, isDark }) => {
  if (mode === THEME_MODES.AUTO) {
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
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    );
  }

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

  const getModeLabel = () => {
    switch (themeMode) {
      case THEME_MODES.AUTO:
        return "Auto";
      case THEME_MODES.LIGHT:
        return "Light";
      case THEME_MODES.DARK:
        return "Dark";
      default:
        return "Auto";
    }
  };

  return (
    <button
      onClick={cycleThemeMode}
      className={`
        fixed bottom-6 right-6
        flex items-center gap-2 px-4 py-3
        rounded-full backdrop-blur-md border
        transition-all hover:scale-105 active:scale-95
        ${
          isDark
            ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
            : "bg-white/70 border-white/50 text-gray-800 hover:bg-white/90 shadow-lg"
        }
      `}
      aria-label={`Theme mode: ${getModeLabel()}`}
      title="Change theme mode"
    >
      <ThemeIcon mode={themeMode} isDark={isDark} />
      <span className="text-sm font-medium">{getModeLabel()}</span>
    </button>
  );
}
