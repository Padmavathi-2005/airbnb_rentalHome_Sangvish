/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: "var(--theme-color)",
        "theme-text": "var(--theme-text-color)",
        "mint-500": "oklch(0.72 0.11 178)",
      },
    },
  },
  plugins: [],
};
