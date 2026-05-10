/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          deep: '#0d1428',
          DEFAULT: '#1a2444',
          mid: '#243156',
        },
        sunset: '#e8624c',
        amber: '#f4a261',
        paper: '#f5e8d4',
        cream: '#ede2cf',
        mist: {
          pink: '#d97a9a',
          purple: '#8b6f9e',
        },
        solar: '#f0c85a',
        ink: '#14192d',
      },
      fontFamily: {
        serifjp: ['Shippori Mincho', 'serif'],
        sansjp: ['Noto Sans JP', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        sunset: '0 12px 40px rgba(232, 98, 76, 0.4)',
      },
      backdropBlur: {
        frost: '22px',
      },
      animation: {
        'float-slow': 'float-gentle 6s ease-in-out infinite',
        'float-medium': 'float-gentle 8s ease-in-out infinite',
        'float-slower': 'float-gentle 10s ease-in-out infinite',
      },
      keyframes: {
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
