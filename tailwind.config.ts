import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
      colors: {
        primary: "#F1F1F1",
        goOnGrey: "#484848",
        goOnBlue: "#003EF9",
        goOnBlack: "#0E0E0E",
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        marquee2: "marquee2 45s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "#0E0E0E",
          secondary: "#F1F1F1",
          info: "#484848",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
