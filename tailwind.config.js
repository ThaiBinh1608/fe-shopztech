/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 16 row grid
        10: "repeat(10, minmax(0, 1fr))",

        // Complex site-specific row configuration
        layout: "200px minmax(900px, 1fr) 100px",
      },
      gridRow: {
        "span-7": "span 7 / span 7",
      },
      backgroundColor: {
        main: "#7f11e0",
      },
      fontFamily: ["Poppins", "sans-serif"],
      width: {
        main: "1220px",
      },
      color: {
        main: "#7f11e0",
      },
      backgroundColor: {
        main: "#ee3131",
        overlay: "rgba(0, 0, 0, 0.5)",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
      },
      keyframes: {
        "slice-top": {
          "0%": {
            "-webkit-transform": "translateY(40px);",
            transform: "translateY(40px);",
          },
          "100%": {
            "-webkit-transform": "translateY(0px);",
            transform: "translateY(0px);",
          },
        },
        "scale-up-center": {
          " 0%": {
            " -webkit-transform": "scale(0.5);",
            transform: "scale(0.5);",
          },
          "100%": {
            "-webkit-transform": "scale(1);",
            transform: "scale(1);",
          },
        },
      },
      animation: {
        "slice-top":
          "slide-top 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "scale-up-center":
          "scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;",
      },
    },
    listStyleType: {
      square: "square",
      roman: "upper-roman",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
