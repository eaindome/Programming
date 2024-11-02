/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          200: '#acd4f7'
        },
        red: {
          400: '#ff745c',
          600: '#ff5e43'
        },
        gray: {
          800: '#001f40'
        }
      }
    },
  },
  plugins: [],
}

