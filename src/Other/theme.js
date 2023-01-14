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
      main: "#b5838d",
    },
    secondary: {
      main: "#6d6875",
    },
    text: {
      primary: "#99A799",
    },
    background: {
      default: "#faf9f9",
      paper: "#f0efeb"
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    type: "dark",
    primary: {
      main: "#ba456a",
    },
    secondary: {
      main: "#3b1621",
    },
    text: {
      primary: "#E7F6F2",
    },
    background: {
      default: "#111012",
      paper: "#201315"
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
