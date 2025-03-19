export const styles = {
  container: {
    py: 4,
    px: { xs: 2, sm: 3, md: 4 },
    maxWidth: {
      xs: "100%",
      sm: "720px",
      md: "1140px",
      lg: "1366px",
      xl: "1600px",
    },
  },
  tile: {
    maxWidth: {
      xs: "140px",
      sm: "180px",
      md: "220px",
      lg: "280px",
    },
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    maxWidth: {
      xs: "140px",
      sm: "180px",
      md: "220px",
      lg: "280px",
    },
    width: "100%",
    height: 0,
    paddingBottom: "150%",
    borderRadius: 2,
    bgcolor: "grey.900",
  },
  textContainer: {
    px: 0.5,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    width: "100%",
    fontSize: "1rem",
    bgcolor: "grey.800",
  },
};
