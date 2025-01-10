export const styles = {
  main: {
    padding: "0 24px",
    "@media (max-width: 900px)": {
      padding: "0 10px",
    },
  },
  mustWatch: {
    p: "20px",
    width: "100%",
    "@media (max-width: 900px)": {
      p: "10px",
    },
  },
  watchHead: {
    padding: "0 24px",
    color: "secondary.main",
    marginTop: "20px",
    "& .backToInfo": {
      display: "inline-flex",
      alignItems: "center",
      fontSize: "14px",
      marginBottom: "20px",
      "&:hover": {
        color: "text.primary",
      },
    },
    "@media (max-width: 900px)": {
      padding: "0 10px",
    },
  },
  btnGroup: {
    display: "flex",
    marginTop: "40px",
    justifyContent: "center",
    gap: 1,
  },
  backIco: {
    marginRight: "5px",
    fontSize: "14px",
  },
  moviePlayer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    "& #watch-iframe1": {
      backgroundColor: "primary.main",
    },
    "& iframe": {
      border: 0,
      marginTop: "20px",
      width: "80%",
      height: "calc(90vh - 80px)",
      boxSizing: "borderBox",
      "@media (max-width: 600px)": {
        height: "calc(35vh - 60px)",
        boxSizing: "border-box",
      },
      "@media (max-width: 900px)": {
        width: "100%",
      },
    },
  },
  top: {
    position: "relative",
    padding: "20px 10%",
    display: "flex", // Ensure the layout is a row, not a column
    flexWrap: "wrap",
    justifyContent: "space-between", // Adds spacing between the items
    alignItems: "flex-start", // Align items to the start
    "@media (max-width: 900px)": {
      padding: "0",
    },
  },
  imageBox: {
    display: "flex",
    alignItems: "center",
    "@media (max-width: 900px)": {
      display: "none",
    },
  },
  detailGrid: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // 2 columns
    gridGap: "20px", // Adjust spacing
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr", // Stack into a single column on smaller screens
    },
  },
  watchlistBtn: {
    width: "300px",
    "@media (max-width: 900px)": {
      width: "100%",
    },
  },
};
