/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      sacramento: ["Sacramento"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
    },
  },
  plugins: [require("flowbite/plugin")],
};
