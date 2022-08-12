const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: [
    "./src/index/index.html",
    "./src/setup/setup.html",
    "./src/**/*.tsx",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        "gray-dark": "#566275",
        gray: "#7B838F",
        "light-sys": {
          bg: "#FFFFFF",
          heading: "#333",
          par: "#3b3b3d",
        },
        "dark-sys": {
          bg: "#313236",
          heading: "#FFF",
          par: "#e4eced",
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fade-in 0.3s linear",
        "slide-sm-left": "slide-sm-left 0.2s ease-in",
        "slide-sm-right": "slide-sm-right 0.2s ease-in",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-sm-left": {
          "0%": { opacity: 0, transform: "translateX(-50%)" },
          "100%": { opacity: 1, transform: "" },
        },
        "slide-sm-right": {
          "0%": { opacity: 0, transform: "translateX(50%)" },
          "100%": { opacity: 1, transform: "" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        "@font-face": {
          fontFamily: "Nunito",
          src: "url(font/NunitoSans-Regular.ttf)",
        },
      });
      addBase({
        "@font-face": {
          fontFamily: "Nunito",
          fontWeight: 600,
          src: "url(font/NunitoSans-SemiBold.ttf)",
        },
      });
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("next", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`next${separator}${className}`)} + *`;
        });
      });
    }),
    // eslint-disable-next-line global-require
    require("tailwindcss-scoped-groups")({
      groups: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    }),
  ],
};
