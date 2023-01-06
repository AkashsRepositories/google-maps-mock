/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ibm_sans: ['IBM Plex Sans', 'sans-serif'],
        work_sans: ['Work Sans', 'sans-serif'],
      }, 
    },
  },

  plugins: [],
}