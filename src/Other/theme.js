import { createTheme } from "@mui/material/styles";
import {lightPalette, darkPalette, baseTheme} from './palettes';

export const lightTheme = createTheme({
  ...baseTheme,
  palette: lightPalette
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: darkPalette,
  overrides: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: darkPalette.divider.default,
          },
          "& label.Mui-focused": {
            color: darkPalette.divider.default,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: darkPalette.divider.default,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: darkPalette.divider.default,
            },
            "&:hover fieldset": {
              borderColor: darkPalette.divider.default,
              borderWidth: "0.15rem",
            },
            "&.Mui-focused fieldset": {
              borderColor: darkPalette.divider.default,
            },
          },
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: {
          color: darkPalette.text.surface,
        },
      },
    },
  },
});
