/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#3b0a45',
        'darker-purple': '#2a0833',
        
       
      },
    },
  },
  plugins: [],
}