module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        screen: ["100vh", "100dvh"],
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      maxHeight: {
        screen: ["100vh", "100dvh"],
      },
      spacing: {
        0.75: "3px",
      },
      width: {
        132: "44rem",
        22: "22rem",
      },
      colors: {
        primary: {
          DEFAULT: "#7c3aed",
          dark: "#5b2e9f",
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s linear   both",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-p": {
          fontSize: "0.875rem", // text-sm のフォントサイズ
          lineHeight: "1.25rem", // text-sm の行の高さ
          fontWeight: "500", // font-medium のフォントウェイト
        },
        ".text-h4": {
          fontSize: "1rem", // text-base のフォントサイズ
          lineHeight: "1.5rem", // text-base の行の高さ
          fontWeight: "700", // font-bold のフォントウェイト
        },
        ".text-h3": {
          fontSize: "1.25rem", // text-xl のフォントサイズ
          lineHeight: "1.75rem", // text-xl の行の高さ
          fontWeight: "700", // font-bold のフォントウェイト
        },
        ".text-h2": {
          fontSize: "1.5rem", // text-2xl のフォントサイズ
          lineHeight: "2rem", // text-2xl の行の高さ
          fontWeight: "700", // font-bold のフォントウェイト
        },
        ".text-h1": {
          fontSize: "2.25rem", // text-4xl のフォントサイズ
          lineHeight: "2.5rem", // text-4xl の行の高さ
          fontWeight: "700", // font-bold のフォントウェイト
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
