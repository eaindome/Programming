/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#F7F9FC',
        green: '#2D5A27',
        oragne: '#FF6B35',
        blue: {
          100: '#4A90E2',
          200: '#1A2633',
          300: '#2C3E50'
        },
        orange: {
          100: '#FF6B35'
        }

      }
    },
  },
  plugins: [],
}

