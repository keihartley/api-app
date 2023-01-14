import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
  }
});

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    type: "light",
    primary: {
      main: "#9a4059",
    },
    secondary: {
      main: "#6750a4",
      light: "#a596cc"
    },
    tertiary: {
      primary: '#006a60'
    },
    text: {
      primary: "#141414",
      secondary: '#9b9b9b',
      tertiary: '#141414'
    },
    background: {
      default: "#f8fdff",
      paper: "#fefefd"
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    type: "dark",
    primary: {
      main: "#ffb1c1",
    },
    secondary: {
      main: "#5107ff",
      light: '#190053'
    },
    tertiary: {
      main: "#33ddc9"
    },
    text: {
      primary: '#f9f9fc',
      secondary: "#f9f9fc",
      tertiary: "#f9f9fc"
    },
    background: {
      default: "#001f25",
      paper: "#00161b"
    },
    divider: {
      borderColor: "#E7F6F2"
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#E7F6F2",
          },
          "& label.Mui-focused": {
            color: "#E7F6F2",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#E7F6F2",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#E7F6F2",
            },
            "&:hover fieldset": {
              borderColor: "#E7F6F2",
              borderWidth: "0.15rem",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#E7F6F2",
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
          color: "#E7F6F2",
        },
      },
    }
  },
});
