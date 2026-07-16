/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        biker: {
          black: '#0a0a0a',
          dark: '#1a1a1a',
          leather: '#2c1810',
          leatherLight: '#3d2317',
          chrome: '#e0e0e0',
          chromeDark: '#a0a0a0',
          blood: '#8b0000',
          bloodLight: '#c62828',
          flame: '#ff6f00',
          flameLight: '#ff8f00',
          gold: '#b8860b',
          goldLight: '#d4a017',
          steel: '#4a4a4a',
          steelLight: '#6a6a6a',
        },
        neutral: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#c0c0c0',
          300: '#a0a0a0',
          400: '#808080',
          500: '#606060',
          600: '#404040',
          700: '#303030',
          800: '#1a1a1a',
          900: '#0a0a0a',
        },
        accent: {
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          500: '#ff6f00',
          600: '#e65100',
          700: '#bf360c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Impact', 'Haettenschweiler', 'Arial Black', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
      },
      boxShadow: {
        'biker': '0 4px 14px 0 rgba(0, 0, 0, 0.5)',
        'biker-lg': '0 8px 30px 0 rgba(0, 0, 0, 0.6)',
        'flame': '0 0 20px rgba(255, 111, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
