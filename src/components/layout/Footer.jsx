/**
 * Footer Component
 * Application footer with attribution
 */

import { useTheme } from "../../contexts/ThemeContext";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`mt-12 pt-6 border-t ${isDark ? 'border-white/20' : 'border-gray-200'}`}>
      <div className={`text-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>
          Based on Tom Schwartz (Tinman) CV methodology and{' '}
          <a
            href="https://frontrunnersports.com.au/runningsquads/pacezonecalculator/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${
              isDark
                ? 'text-blue-400 hover:text-blue-300 hover:underline'
                : 'text-blue-600 hover:text-blue-800 hover:underline'
            }`}
          >
            Front Runner Sports
          </a>{' '}
          zone system
        </p>
        <p className="mt-2">
          <a
            href="https://github.com/mimocha/vcr"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${
              isDark
                ? 'text-blue-400 hover:text-blue-300 hover:underline'
                : 'text-blue-600 hover:text-blue-800 hover:underline'
            }`}
          >
            View on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
