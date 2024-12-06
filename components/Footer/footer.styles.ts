export const styles = {
  footerMain: {
    textAlign: "center",
    backgroundColor: "#212121",
    overflow: "hidden",
    "@media (max-width: 900px)": {
      paddingBottom: "50px",
    },
  },
  footerXD: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingTop: "5px",
    backgroundColor: "secondary.main",
    opacity: 1,
    // backgroundImage:
    //   "repeating-radial-gradient( circle at 0 0, transparent 0, #ff0000 10px ), repeating-linear-gradient( #ff434355, #ff4343 )",
  },
  footerimg: {
    width: "auto", // Ensure the image fills its container
    height: "100%", // Maintain the aspect ratio
    maxWidth: "8vw", // Default max width for larger screens
  },
  footerXDtxt: {
    display: "flex",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#303030",
    fontSize: "8vw",
  },
  footerInner: {
    padding: "70px 70px 50px 70px",
    backgroundColor: "#303030",
    color: "#fff",
    maxWidth: "1200px",
    margin: "0 auto",
    "@media (max-width: 900px)": {
      padding: "70px 20px 50px 20px",
    },
  },
  footerLinks: {
    width: "100%",
    flex: "1",
    "@media (max-width: 900px)": {
      display: "none",
    },
  },
  footerCol: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    padding: "0 10px",
    marginBottom: "20px",
  },
  footerColHead: {
    marginBottom: "15px",
    fontSize: "1rem",
  },
  footerTop: {
    display: "flex",
    justifyContent: "space-between",
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
  socials: {
    width: "auto",
    "@media (max-width: 1000px)": {
      marginTop: "20px",
    },
  },
  socialLogo: {
    margin: "0 10px",
    display: "block",
    width: "30px",
    height: "30px",
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
