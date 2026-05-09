/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDF8F0',
          100: '#F4E4C1',
          200: '#E8D5A3',
          300: '#DCC698',
          400: '#D4B896',
          500: '#C4A882',
          600: '#A0845C',
          700: '#7A6040',
          800: '#4A3520',
          900: '#2C1A10',
        },
        ink: {
          light: '#2C2418',
          DEFAULT: '#1A1410',
          dark: '#0D0806',
        },
        wax: {
          red: '#8B1A1A',
          burgundy: '#6B0F0F',
          gold: '#B89745',
        },
        marble: {
          warm: '#D4C5B0',
          cream: '#E8DDD0',
          gray: '#B5A992',
        },
        wood: {
          light: '#8B6914',
          DEFAULT: '#5C3A21',
          dark: '#3E2514',
          deep: '#1A0F08',
        },
        candle: {
          light: '#FFD700',
          glow: '#FFA500',
          warm: '#FF8C00',
          dim: '#CC7700',
        },
        antique: {
          gold: '#B89745',
          brass: '#8A7030',
          bronze: '#6B5220',
          sepia: '#704214',
          burgundy: '#8B1A1A',
          cream: '#F4E4C1',
          brown: '#2C1A10',
          dark: '#0D0806',
          ink: '#1A1410',
          sage: '#8A9A5B',
          rust: '#8B4513',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Lora', 'Georgia', 'serif'],
        mono: ['Courier Prime', 'Courier New', 'monospace'],
      },
      animation: {
        'dust': 'dust 12s ease-in-out infinite',
        'flicker': 'flicker 2s ease-in-out infinite',
        'flicker-slow': 'flicker 4s ease-in-out infinite',
        'settle': 'settle 8s ease-in-out infinite',
        'candle-flicker': 'candleFlicker 0.5s ease-in-out infinite alternate',
      },
      keyframes: {
        dust: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.15' },
          '33%': { transform: 'translateY(-20px) translateX(15px)', opacity: '0.35' },
          '66%': { transform: 'translateY(-8px) translateX(-10px)', opacity: '0.25' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.7' },
          '15%': { opacity: '0.5' },
          '30%': { opacity: '0.9' },
          '45%': { opacity: '0.6' },
          '60%': { opacity: '1' },
          '75%': { opacity: '0.55' },
          '90%': { opacity: '0.85' },
        },
        settle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        candleFlicker: {
          '0%': { transform: 'scaleY(1) translateY(0)', opacity: '0.9' },
          '50%': { transform: 'scaleY(1.05) translateY(-1px)', opacity: '1' },
          '100%': { transform: 'scaleY(0.95) translateY(1px)', opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
