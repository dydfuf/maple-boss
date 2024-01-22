const LEGACY_COLORS = {
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
  "red-900": {
    DEFAULT: "#B71C1C",
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
  "tomato-100": {
    DEFAULT: "#EC6142",
  },
  "brown-700": {
    DEFAULT: "#5D4037",
  },
};

export const DEFAULT_COLORS = {
  primary1: {
    DEFAULT: "#E78B33",
  },
  primary2: {
    DEFAULT: "#F1B780",
  },
  primary3: {
    DEFAULT: "#FCE7D4",
  },
  secondary1: {
    DEFAULT: "#3C5078",
  },
  secondary2: {
    DEFAULT: "#7189BA",
  },
  secondary3: {
    DEFAULT: "#7189BA",
  },
  gray1: {
    DEFAULT: "#26292C",
  },
  gray2: {
    DEFAULT: "#3B3E42",
  },
  gray3: {
    DEFAULT: "#535A61",
  },
  gray4: {
    DEFAULT: "#666666",
  },
  gray5: {
    DEFAULT: "#999999",
  },
  gray6: {
    DEFAULT: "#B0B0B0",
  },
  gray7: {
    DEFAULT: "#DDDDDD",
  },
  gray8: {
    DEFAULT: "#EEEEEE",
  },
  gray9: {
    DEFAULT: "#F2F2F2",
  },
  error: {
    DEFAULT: "#F36872",
  },
  white: {
    DEFAULT: "#FFFFFF",
  },
};

export const colors = {
  // @TODO :ann 이 합류하기전 사용하던 레거시 컬러셋 추후 제거되어야 합니다.
  ...LEGACY_COLORS,
  ...DEFAULT_COLORS,
};
