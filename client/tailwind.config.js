/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "linear-gradient(to right,#E61E4D 0%,#E31C5F 50%,#D70466 100%)",
        hover: "linear-gradient(to left,#E61E4D 0%,#E31C5F 50%,#D70466 100%);",
      },
    },
  },
  plugins: [],
};
