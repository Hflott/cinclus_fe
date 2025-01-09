import { BorderAllRounded, Height } from "@mui/icons-material";

export const styles = {
  poster: {
    position: "relative",
    color: "secondary.main",
    maxWidth: "220px",
    width: "100%",
    height: "100%",
    margin: "20px",
    transition: "transform 0.3s ease, color 0.3s ease",
    "& .poster-img": {
      borderRadius: "15px",
    },
    "@media (max-width: 900px)": {
      margin: "10px 3px",
      maxWidth: "108px",
    },
  },
  posterUp: {
    position: "relative",
    width: "220px",
    height: "320px",
    "@media (max-width: 900px)": {
      width: "108px",
      height: "162px",
    },
  },
  posterDown: {
    paddingTop: "20px",
  },
  posterTitle: {
    fontSize: "1rem",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "500",
    "@media (max-width: 900px)": {
      fontSize: "11px",
    },
  },
  posterYearMain: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    pr: "3px",
  },
  posterYear: {
    "@media (max-width: 900px)": {
      fontSize: "11px",
    },
  },
  posterType: {
    borderRadius: "4px",
    color: "primary.main",
    backgroundColor: "secondary.main",
    fontSize: "11px",
    padding: "0 5px",
    "@media (max-width: 900px)": {
      fontSize: "8px",
    },
  },
  ratings: {
    position: "absolute",
    bottom: "20%",
    right: 0,
    backgroundColor: "primary.main",
    padding: "3px",
    borderRadius: "50%",
    transition: "transform 0.3s ease",
    "@media (max-width: 900px)": {
      transform: "scale(0.8)", // Scale down the rating to 50% on small screens
    },
  },
  ratingsInner: { position: "relative", display: "flex" },
  ratingsTxt: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark semi-transparent overlay
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    zIndex: 3,
    "@media (max-width: 1024px)": {
      display: "none",
    },
  },
  overlayContent: {
    overflowY: "auto", // Enables vertical scrolling
    borderRadius: "10px",
    paddingRight: "5px",
    height: "calc(100% - 50px)",

    // WebKit-based browser scrollbar styling
    "&::-webkit-scrollbar": {
      width: "8px", // Set width of scrollbar
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Track color
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255, 255, 255, 0.4)", // Thumb color
      borderRadius: "10px",
      border: "2px solid rgba(0, 0, 0, 0.8)", // Optional border for contrast
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.6)", // Hover effect on the thumb
    },

    // Firefox scrollbar styling
    scrollbarWidth: "thin", // Makes the scrollbar thinner
    scrollbarColor: "rgba(255, 255, 255, 0.4) rgba(0, 0, 0, 0.8)", // Thumb and track colors for Firefox
  },
};
