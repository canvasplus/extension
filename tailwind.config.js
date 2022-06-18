const plugin = require("tailwindcss/plugin");

module.exports = {
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
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
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
    // eslint-disable-next-line global-require
    require("tailwindcss-scoped-groups")({
      groups: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    }),
  ],
};
