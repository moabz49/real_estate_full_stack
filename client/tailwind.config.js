/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['DM Sans', 'sans-serif' ],
      montserrat: ['Montserrat','sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'], 
    },
    extend: {
        screens : {
          xs: '480px',
          smSwipe: '600px',
        },
    },
  },
  plugins: [],
}