/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/layouts/**/*.tsx",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '3-7': '3fr 7fr',
        '7-3': '7fr 3fr',
        '8-2': '8fr 2fr',
      }
    },
    colors: {
      transparent: "transparent",
      'dark-blue': {
        700: '#19212E',
        600: '#1d2634',
        500: '#242F41',
        400: '#2c384f',
        300: '#666D7A',
        200: '#9297A0',
        100: '#D3D5D9',
      },
      green: {
        700: '#146421',
        500: '#69B14C',
        400: '#78b95e',
      },
      cyan: {
        800: '#00333E',
        700: '#005A6C',
        600: '#1a6b7b'
      },
      gray: {
        100: '#fbfcfd',
        200: '#e2e3e4',
      }
    },
    fontSize: {
      sm: '0.875rem',
      md: '1rem',
      '2md': '1.125rem',
      lg: '1.5rem',
      xl: '2rem',
      '3xl': '4rem',
    },
    fontWeight: {
      normal: 400,
      bold: 700,
    }
  },
  plugins: [],
}
