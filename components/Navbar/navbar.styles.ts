export const styles = {
  logo: {
    display: "inline-block",
    margin: "0 15px 0 0",
    height: { xs: 30, sm: 50 },
    width: { xs: 30, sm: 50 },
  },
  logoTxt: {
    mr: 2,
    display: {
      md: "flex",
      "@media (max-width: 980px)": {
        display: "none",
      },
    },
    fontFamily: "arial",
    fontWeight: 400,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
    fontSize: "2rem",
  },

  logoTxtMob: {
    mr: 2,
    display: {
      md: "none",
      "@media (max-width: 980px)": {
        display: "flex",
      },
    },
    flexGrow: 1,
    fontSize: { xs: "1rem", sm: "2rem" },
    fontFamily: "arial",
    fontWeight: 400,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
  },
};
