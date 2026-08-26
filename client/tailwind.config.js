/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        suraksha: {
          bg: '#080C16',
          card: '#0F172A',
          cardHover: '#1E293B',
          border: '#1E293B',
          borderHighlight: '#334155',
          primary: '#10B981', // Emerald safety
          primaryGlow: '#059669',
          accent: '#06B6D4', // Cyan cyber
          warning: '#F59E0B',
          danger: '#EF4444',
          dangerDark: '#991B1B',
          muted: '#94A3B8',
          text: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace']
      },
      boxShadow: {
        'shield-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'shield-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
        'shield-danger': '0 0 25px -5px rgba(239, 68, 68, 0.3)',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      },
      animation: {
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'scan': 'scanline 8s linear infinite',
      }
    },
  },
  plugins: [],
}
