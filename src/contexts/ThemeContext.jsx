import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const THEME_MODES = {
  AUTO: "auto",
  LIGHT: "light",
  DARK: "dark",
};

// Time-of-day thresholds (24-hour format)
const TIME_PERIODS = {
  DAWN: { start: 5, end: 8 },
  DAY: { start: 8, end: 17 },
  DUSK: { start: 17, end: 20 },
  NIGHT: { start: 20, end: 5 }, // wraps around midnight
};

// Background gradient configurations for each time period
const GRADIENTS = {
  DAWN: {
    light: "bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200",
    dark: "bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900",
  },
  DAY: {
    light: "bg-gradient-to-br from-blue-100 via-cyan-100 to-sky-200",
    dark: "bg-gradient-to-br from-blue-950 via-cyan-950 to-sky-950",
  },
  DUSK: {
    light: "bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200",
    dark: "bg-gradient-to-br from-orange-900 via-pink-900 to-purple-900",
  },
  NIGHT: {
    light: "bg-gradient-to-br from-indigo-300 via-purple-300 to-blue-300",
    dark: "bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950",
  },
};

function getTimePeriod(hour) {
  if (hour >= TIME_PERIODS.DAWN.start && hour < TIME_PERIODS.DAWN.end) {
    return "DAWN";
  }
  if (hour >= TIME_PERIODS.DAY.start && hour < TIME_PERIODS.DAY.end) {
    return "DAY";
  }
  if (hour >= TIME_PERIODS.DUSK.start && hour < TIME_PERIODS.DUSK.end) {
    return "DUSK";
  }
  return "NIGHT";
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    // Load saved theme mode from localStorage
    return localStorage.getItem("themeMode") || THEME_MODES.AUTO;
  });
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  // Update current hour every minute
  useEffect(() => {
    const updateHour = () => {
      setCurrentHour(new Date().getHours());
    };

    const interval = setInterval(updateHour, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Save theme mode to localStorage
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const timePeriod = getTimePeriod(currentHour);

  // Determine if we should use dark or light theme
  const isDark =
    themeMode === THEME_MODES.DARK ||
    (themeMode === THEME_MODES.AUTO &&
      (timePeriod === "NIGHT" || timePeriod === "DUSK"));

  const backgroundGradient = isDark
    ? GRADIENTS[timePeriod].dark
    : GRADIENTS[timePeriod].light;

  const cycleThemeMode = () => {
    setThemeMode((current) => {
      if (current === THEME_MODES.AUTO) return THEME_MODES.LIGHT;
      if (current === THEME_MODES.LIGHT) return THEME_MODES.DARK;
      return THEME_MODES.AUTO;
    });
  };

  const value = {
    themeMode,
    setThemeMode,
    cycleThemeMode,
    isDark,
    timePeriod,
    backgroundGradient,
    currentHour,
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
