/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/*.{js,jsx}",
    "./src/views/*.{js,jsx}",
    "./src/*.{js,jsx,html}"
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

