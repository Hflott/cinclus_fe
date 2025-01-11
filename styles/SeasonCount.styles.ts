import { Padding } from "@mui/icons-material";
import { m } from "nextra/dist/types-c8e621b7";

export const styles = {
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
  backIco: {
    marginRight: "5px",
    fontSize: "14px",
  },
  episodeBtns: {
    backgroundColor: "#000",
    borderRadius: "6px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(85px, 1fr) )",
    justifyItems: "center",
    width: "100%",
    margin: "20px",
    maxHeight: "230px",
    overflow: "hidden",
    overflowY: "auto",
    scrollbarColor: "#616161 transparent",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#616161",
    },
    "@media (max-width: 900px)": {
      margin: "20px 10px",
    },
  },
  episodeBtn: {
    width: "100%",
    whiteSpace: "nowrap",
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
  playermenu: {
    display: "none",
    backgroundColor: "#222",
    m: "10px 0 10px 0",
    "@media (max-width: 900px)": {
      display: "flex",
    },
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    m: "25px 24px 0 24px",
    "@media (max-width: 900px)": {
      display: "none",
    },
  },
  mustWatch: {
    width: "100%",
    p: "20px",
    "@media (max-width: 900px)": {
      p: "10px",
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
