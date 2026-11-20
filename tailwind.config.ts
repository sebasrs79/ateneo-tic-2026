import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#071325',
        deep: '#0b1930',
        ink: '#111c32',
        muted: '#607088',
        cream: '#f7f9fd',
        sky: {
          DEFAULT: '#36d9ff',
          glow: 'rgba(54, 217, 255, 0.4)',
        },
        blue: {
          DEFAULT: '#147cf5',
          glow: 'rgba(20, 124, 245, 0.4)',
        },
        red: {
          DEFAULT: '#f83550',
          glow: 'rgba(248, 53, 80, 0.4)',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'laser-scan': 'laserScan 2.5s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        laserScan: {
          '0%': { top: '0%' },
          '50%': { top: '95%' },
          '100%': { top: '0%' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
      },
      boxShadow: {
        'neon-sky': '0 0 25px rgba(54, 217, 255, 0.35)',
        'neon-red': '0 0 25px rgba(248, 53, 80, 0.35)',
        'neon-blue': '0 0 25px rgba(20, 124, 245, 0.35)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
