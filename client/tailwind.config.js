/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'home-page-bg': "url('client/public/images/chair-table-dinning-beach-sea-with-blue-sky.jpg')"
    },
  },
  plugins: [],
}