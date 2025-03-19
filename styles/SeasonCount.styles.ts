import { AspectRatio, BorderColor, DisplaySettings } from "@mui/icons-material";

export const styles = {
  main: {
    padding: "0 24px",
    "@media (max-width: 900px)": {
      padding: "0 10px",
    },
  },
  seasonNav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    mb: 4,
    px: 2,
    overflowX: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
  },
  seasonButton: {
    flexShrink: 0,
    borderRadius: "10px",
    border: 1,
    px: 3,
    "&.active": {
      backgroundColor: "secondary.main",
      color: "common.black",
      "&:hover": { backgroundColor: "secondary.dark" },
    },
  },
  episodeScrollContainer: {
    maxHeight: "600px",
    overflowY: "auto",
    pr: 2,
    "@media (max-width: 600px)": {
      maxHeight: "400px",
    },
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#EA738D",
      borderRadius: "3px",
    },
  },
  episodeGrid: {
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(auto-fill, minmax(140px, 1fr))", // Mobile-first
      sm: "repeat(auto-fill, minmax(220px, 1fr))",
      md: "repeat(auto-fill, minmax(300px, 1fr))",
    },
    gap: {
      xs: 2, // Smaller gap on mobile
      sm: 3,
    },
    p: {
      xs: 1, // Reduced padding on mobile
      sm: 2,
    },
    width: "100%",
    overflowX: "hidden", // Prevent horizontal scroll
  },
  episodeCard: {
    border: 2,
    borderRadius: "20px",
    width: "100%",
    maxWidth: "100%",
    minWidth: "0 !important", // Override any minimum widths
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  imageContainer: {
    position: "relative",
    paddingTop: "56.25%", // Maintain 16:9 aspect ratio
    overflow: "hidden",
    width: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    p: 1.5,
    background: "linear-gradient(0deg, rgba(0,0,0,0.8) 20%, transparent 100%)",
  },
  seasonSelector: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    py: 2,
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
  },
  episodeContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    py: 2,
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: 2,
    color: "secondary.main",
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
