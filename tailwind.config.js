/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        // Zone-specific glass tints (very subtle)
        'glass-blue': 'rgba(59, 130, 246, 0.05)',
        'glass-green': 'rgba(34, 197, 94, 0.05)',
        'glass-yellow': 'rgba(234, 179, 8, 0.05)',
        'glass-orange': 'rgba(249, 115, 22, 0.05)',
        'glass-red': 'rgba(239, 68, 68, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
