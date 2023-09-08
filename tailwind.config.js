/* eslint-disable @typescript-eslint/no-var-requires */
const spacing = {};
const borderWidth = {};
const borderRadius = {};
const fontSize = {};
const lineHeight = {};

for (let i = 0; i <= 1000; i++) {
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
      colors: {
        main: {
          DEFAULT: "#2B2B36",
        },
        "main-2": {
          DEFAULT: "#383854",
        },
        "white-100": {
          DEFAULT: "#E5E8EB",
        },
        "gray-200": {
          DEFAULT: "#F7F8FA",
        },
        "gray-300": {
          DEFAULT: "#E5E8EB",
        },
        "gray-400": {
          DEFAULT: "#ADB5BD",
        },
        "gray-500": {
          DEFAULT: "#8B95A1",
        },
        "gray-600": {
          DEFAULT: "#6B7684",
        },
        "gray-900": {
          DEFAULT: "#191F28",
        },
        "purple-100": {
          DEFAULT: "#5252A4",
        },
        "red-100": {
          DEFAULT: "#C13E31",
        },
        "red-200": {
          DEFAULT: "#FB0000",
        },
        "yellow-100": {
          DEFAULT: "#EEB524",
        },
        "blue-100": {
          DEFAULT: "#4398EC",
        },
        "green-100": {
          DEFAULT: "#12AC79",
        },
      },
      spacing,
      borderWidth,
      borderRadius,
      fontSize,
      lineHeight,
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
