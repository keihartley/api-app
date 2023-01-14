import { createTheme } from "@mui/material";

const lightPalette = {
  type: "light",
  primary: {
    main: "#ffc107",
    variant: "#f57c00",
    light: "#fff350",
    dark: "#c79100",
  },
  secondary: {
    main: "#9fa8da",
    variant: "#1a237e",
    light: "#d1d9ff",
    dark: "#6f79a8",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#000000",
    background: "#000000",
    surface: "#000000",
  },
  background: {
    default: "#ffffff",
    paper: "#fefefd",
  },
};

const darkPalette = {
  type: "dark",
  primary: {
    main: "#ffcc80",
    variant: "#f57c00",
    light: "#ffffb0",
    dark: "#ca9b52",
  },
  secondary: {
    main: "#9fa8da",
    light: "#d1d9ff",
    dark: "#6f79a8",
  },
  text: {
    primary: "#000000",
    secondary: "#000000",
    background: "#FFFFFF",
    surface: "#FFFFFF",
  },
  background: {
    default: "#0d0d0d",
    paper: "#121212",
  },
  divider: {
    default: "#fafafa",
  },
};

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
  },
});

export { lightPalette, darkPalette, baseTheme };