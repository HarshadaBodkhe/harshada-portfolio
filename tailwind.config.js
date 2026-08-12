/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#060B14',
          secondary: '#0C1320',
          surface: '#101827',
          nav: '#0F1624',
        },
        border: {
          subtle: '#24354D',
          hover: '#3A5275',
        },
        text: {
          primary: '#F4F7FB',
          secondary: '#8E9CB2',
          muted: '#5A6E85',
        },
        accent: {
          DEFAULT: '#00E599',
          hover: '#00C885',
          glow: 'rgba(0, 229, 153, 0.15)',
          muted: '#054B36',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.03)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
