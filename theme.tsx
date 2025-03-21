import { createTheme } from "@mui/material/styles";

export const colors = {
  primary: {
    main: "#1B0F2A",
    contrastText: "#fff",
  },
  secondary: {
    main: "#EA738D",
    contrastText: "#000",
  },
  accent: {
    main: "#222",
    contrastText: "#fff",
  },
};

const theme = createTheme({
  palette: {
    text: {
      primary: "#fff",
    },
    background: {
      default: "#1B0F2A",
      paper: "#444",
    },
    primary: {
      main: colors.primary.main,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      main: colors.secondary.main,
      contrastText: colors.secondary.contrastText,
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "& .MuiListItemIcon-root": {
            color: colors.secondary.main,
          },
          "&.Mui-selected": {
            backgroundColor: colors.secondary.main,
            color: colors.secondary.contrastText,
            "& .MuiListItemIcon-root": {
              color: colors.secondary.contrastText,
            },
          },
          "&.Mui-selected:hover": {
            backgroundColor: colors.secondary.main,
          },
        },
      },
    },
  },
});

export default theme;
