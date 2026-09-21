import type { Config } from 'tailwindcss';

const config: Config = {
  // ============================================
  // Content — file yang dicek Tailwind untuk class
  // ============================================
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './stores/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // ============================================
  // Dark mode — pakai class
  // ============================================
  darkMode: 'class',

  // ============================================
  // Theme
  // ============================================
  theme: {
    extend: {
      // ----------------------------------------
      // Warna brand Ashiro
      // ----------------------------------------
      colors: {
        // Warna utama — ungu elektrik
        ashiro: {
          50: '#f0ecff',
          100: '#e0d9ff',
          200: '#c2b3ff',
          300: '#a38cff',
          400: '#8566ff',
          500: '#7c5cff', // primary
          600: '#6340e6',
          700: '#4a2cbf',
          800: '#321d99',
          900: '#1f0f73',
          950: '#120847',
        },

        // Warna aksen — pink neon
        neon: {
          50: '#fff0fa',
          100: '#ffd9f2',
          200: '#ffb3e6',
          300: '#ff8cd9',
          400: '#ff66cc',
          500: '#ff5cc8', // accent
          600: '#e640aa',
          700: '#bf2a8c',
          800: '#991a6e',
          900: '#730f52',
          950: '#4d0637',
        },

        // Warna background gelap sinematik
        ink: {
          50: '#f5f5f8',
          100: '#e6e6ec',
          200: '#c9c9d4',
          300: '#a1a1b3',
          400: '#73738a',
          500: '#55556b',
          600: '#3d3d52',
          700: '#2a2a3c',
          800: '#1a1a28',
          900: '#12121a',
          950: '#0a0a0f', // background utama
        },

        // Warna state (untuk UI editor)
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
      },

      // ----------------------------------------
      // Font
      // ----------------------------------------
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'sans-serif'],
      },

      // ----------------------------------------
      // Font Size — tambahan untuk heading besar
      // ----------------------------------------
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // ----------------------------------------
      // Spacing tambahan
      // ----------------------------------------
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      // ----------------------------------------
      // Border Radius
      // ----------------------------------------
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ----------------------------------------
      // Box Shadow — glow effect untuk UI editor
      // ----------------------------------------
      boxShadow: {
        'glow-sm': '0 0 12px rgba(124, 92, 255, 0.25)',
        'glow': '0 0 24px rgba(124, 92, 255, 0.35)',
        'glow-lg': '0 0 48px rgba(124, 92, 255, 0.45)',
        'glow-neon': '0 0 32px rgba(255, 92, 200, 0.4)',
        'editor': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'panel': '0 2px 12px rgba(0, 0, 0, 0.3)',
      },

      // ----------------------------------------
      // Background Image — gradient siap pakai
      // ----------------------------------------
      backgroundImage: {
        'gradient-ashiro': 'linear-gradient(90deg, #7c5cff, #ff5cc8)',
        'gradient-ashiro-v': 'linear-gradient(180deg, #7c5cff, #ff5cc8)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'grid-dark':
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },

      // ----------------------------------------
      // Animation
      // ----------------------------------------
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(124, 92, 255, 0.4)' },
          '50%': { boxShadow: '0 0 32px rgba(124, 92, 255, 0.8)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-up': 'fade-up 0.5s ease-out',
        'fade-down': 'fade-down 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
      },

      // ----------------------------------------
      // Transition
      // ----------------------------------------
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },

      // ----------------------------------------
      // Z-index — biar rapi di editor
      // ----------------------------------------
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // ----------------------------------------
      // Backdrop blur
      // ----------------------------------------
      backdropBlur: {
        xs: '2px',
      },
    },
  },

  // ============================================
  // Plugins
  // ============================================
  plugins: [],
};

export default config;
