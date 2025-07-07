/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#8B5CF6',
        'purple-secondary': '#7C3AED', 
        'purple-dark': '#6D28D9',
        'blue-light': '#93C5FD',
        'blue-primary': '#60A5FA',
      }
    },
  },
  plugins: [],
}