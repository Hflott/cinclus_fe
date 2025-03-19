export const styles = {
  footerMain: {
    display: "flex",
    textAlign: "center",
    background:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(234, 115, 141, 0.5) 100%)",
    overflow: "hidden",
    "@media (max-width: 900px)": {
      paddingBottom: "50px",
    },
  },
  footerimg: {
    width: "auto", // Ensure the image fills its container
    height: "100%", // Maintain the aspect ratio
    maxWidth: "8vw", // Default max width for larger screens
  },
  footerInner: {
    padding: "70px 70px 50px 70px",
    color: "text.primary",
    maxWidth: "1200px",
    margin: "0 auto",
    "@media (max-width: 900px)": {
      padding: "70px 20px 50px 20px",
    },
  },
  footerTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "50px",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
    },
  },
  footerTopHead: {
    textTransform: "uppercase",
    color: "secondary.main",
    fontWeight: "bold",
    fontSize: "2rem",
    "@media (max-width: 768px)": {
      fontSize: "28px",
    },
  },
  footerBottom: {
    display: "flex",
    "@media (max-width: 900px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  footerLinksMob: {
    display: "none",
    marginBottom: "20px",
    justifyContent: "center",
    "@media (max-width: 900px)": {
      display: "flex",
    },
    "@media (max-width: 768px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
  altlink: {
    margin: "4px 8px",
    color: "#fff",
  },
};
