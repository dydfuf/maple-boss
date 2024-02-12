/* eslint-disable @typescript-eslint/no-var-requires */
import { colors } from "./tailwind/color";

const spacing = {};
const borderWidth = {};
const borderRadius = {};
const fontSize = {};
const lineHeight = {};

for (let i = 0; i <= 2000; i++) {
  spacing[i] = `${i}px`;
  borderWidth[i] = `${i}px`;
  borderRadius[i] = `${i}px`;
  fontSize[i] = `${i}px`;
  lineHeight[i] = `${i}px`;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,
      spacing,
      minWidth: spacing,
      minHeight: spacing,
      maxWidth: spacing,
      maxHeight: spacing,
      borderWidth,
      borderRadius,
      fontSize,
      lineHeight,
      boxShadow: {
        default: "0  4px 8px 0 rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
