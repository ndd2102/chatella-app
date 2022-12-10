/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      lexend: ["Lexend", "sans-serif"],
      sacramento: ["Sacramento"],
    },
    extend: {
    },
  },
  plugins: [require("flowbite/plugin")],
};
