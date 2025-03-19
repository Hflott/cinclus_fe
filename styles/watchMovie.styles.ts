import { AspectRatio, DisplaySettings } from "@mui/icons-material";

export const styles = {
  main: {
    padding: "0 24px",
    "@media (max-width: 900px)": {
      padding: "0 10px",
    },
  },
  mustWatch: {
    width: "100%",
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
  playermenu: {
    border: 2,
    color: "secondary.main",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#222",
    margin: "20px 100px 0 100px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#444",
      borderColor: "secondary.main",
    },
    "@media (max-width: 900px)": {
      margin: "20px 5px 0 5px",
    },
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
    // Aspect ratio container
    "& .aspect-ratio-box": {
      position: "relative",
      width: "100%",
      paddingTop: "56.25%", // 16:9 aspect ratio (9/16 = 0.5625)
      margin: "20px 100px",
      "@media (max-width: 900px)": {
        margin: "20px 0",
      },
      "@media (max-width: 600px)": {
        // For mobile vertical screens
        paddingTop: "75%", // Switch to 4:3 aspect ratio (16/9 = 1.7778)
      },
    },
    "& iframe": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%", // Fill the aspect ratio container
      borderRadius: "20px",
      border: 2,
      color: "secondary.main",
      boxSizing: "border-box", // Corrected typo
    },
  },
  info: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "20px 100px 20px 100px",
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
  title: {
    fontSize: "50px",
    "@media (max-width: 900px)": {
      fontSize: "40px",
    },
    "@media (max-width: 400px)": {
      fontSize: "30px",
    },
  },
  detailGrid: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "Grid",
    GridTemplateColumns: "1fr 1fr", // 2 columns
    GridGap: "20px", // Adjust spacing
    "@media (max-width: 600px)": {
      GridTemplateColumns: "1fr", // Stack into a single column on smaller screens
    },
  },
  watchlistBtn: {
    width: "300px",
    "@media (max-width: 900px)": {
      width: "100%",
    },
  },
};
