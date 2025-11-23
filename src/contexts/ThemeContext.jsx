import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
};

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    // Load saved theme mode from localStorage, default to LIGHT
    return localStorage.getItem("themeMode") || THEME_MODES.LIGHT;
  });

  // Save theme mode to localStorage
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // Determine if we should use dark or light theme
  const isDark = themeMode === THEME_MODES.DARK;

  const backgroundGradient = isDark
    ? "bg-gradient-to-br from-blue-950 via-cyan-950 to-sky-950"
    : "bg-gradient-to-br from-blue-100 via-cyan-100 to-sky-200";

  const cycleThemeMode = () => {
    setThemeMode((current) => {
      if (current === THEME_MODES.LIGHT) return THEME_MODES.DARK;
      return THEME_MODES.LIGHT;
    });
  };

  const value = {
    themeMode,
    setThemeMode,
    cycleThemeMode,
    isDark,
    backgroundGradient,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
