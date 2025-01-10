import { Scale } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";

export const styles = {
  mediaSlide: {
    marginBottom: "20px",
  },
  mediaItem: {
    position: "relative",
    width: "100%",
    outline: "none",
    "@media (max-width: 768px)": {
      margin: "0 3px",
    },
  },
  mediaItemImg: {
    position: "relative",
    height: "1000px",
    width: "100%",
    overflow: "hidden",
    "@media (max-width: 1400px)": {
      height: "700px",
    },
    "@media (max-width: 1300px)": {
      height: "600px",
    },
    "@media (max-width: 768px)": {
      height: "400px",
    },
    "@media (max-width: 576px)": {
      height: "220px",
    },
    "& > span": {
      width: "100%",
      height: "100%",
      "& img": {
        width: "100%",
        height: "100%",
        margin: "0 auto",
        transition: "opacity 0.5s ease",
      },
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "50%", // Adjust the width for the amount of opacity fade
      height: "100%",
      background:
        "linear-gradient(to right, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)", // Fade from black to transparent
      zIndex: 1,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: -1,
      borderRadius: "0px 0px 5px 5px",
      // background: '#242428',
      // background: "-moz-linear-gradient(0deg,#242428 0,rgba(36,36,40,0) 50%,#242428 100%)",
      // background: "-webkit-linear-gradient(0deg,#242428 0,rgba(36,36,40,0) 50%,#242428 100%)",
      background:
        "linear-gradient(0deg,#000 0%,rgba(86, 86, 91, 0) 80%,#000 100%)",
      zIndex: 2,
    },
  },

  mediaItemBanner: {},
  overview: {
    lineHeight: "1.6",
    fontWeight: "300",
    mb: "20px",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    fontSize: "15px",
    "@media (max-width: 1300px)": {
      WebkitLineClamp: "2",
    },
    "@media (max-width: 576px)": {
      display: "none",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "48px",
    "@media (max-width: 1400px)": {
      fontSize: "40px",
    },
    "@media (max-width: 1300px)": {
      fontSize: "30px",
    },
    "@media (max-width: 768px)": {
      fontSize: "20px",
    },
    "@media (max-width: 576px)": {
      fontSize: "16px",
    },
  },
  rating: {
    fontSize: "18px",
    "@media (max-width: 1400px)": {
      fontSize: "18px",
    },
    "@media (max-width: 1300px)": {
      fontSize: "14px",
    },
    "@media (max-width: 768px)": {
      fontSize: "14px",
    },
    "@media (max-width: 576px)": {
      fontSize: "10px",
    },
  },
  miBtns: {
    display: "flex",
  },
  watchBtn: {
    whiteSpace: "nowrap",
    width: "120px",
    "@media (max-width: 1400px)": {
      fontSize: "14px",
    },
    "@media (max-width: 1300px)": {
      fontSize: "14px",
    },
    "@media (max-width: 768px)": {
      fontSize: "12px",
      width: "100px",
    },
    "@media (max-width: 576px)": {
      fontSize: "10px",
      width: "80px",
    },
  },
  detailBtn: {
    ml: "20px",
    width: "120px",
    "@media (max-width: 1400px)": {
      fontSize: "14px",
    },
    "@media (max-width: 1300px)": {
      fontSize: "14px",
    },
    "@media (max-width: 768px)": {
      fontSize: "12px",
      width: "100px",
      ml: "10px",
    },
    "@media (max-width: 576px)": {
      fontSize: "10px",
      width: "80px",
    },
  },
  mediaItemContent: {
    padding: "20px",
    zIndex: 3,
    width: "50%",
    top: "30%",
    position: "absolute",
    bottom: 0,
    opacity: 0,
    transition: "opacity 1s ease 150ms",
    "@media (max-width: 768px)": {
      width: "90%",
    },
    "@media (max-width: 576px)": {
      p: "10px",
    },
  },
  miContent: {
    mb: "20px",
    "@media (max-width: 768px)": {
      mb: "5px",
    },
  },
  dotsContainer: {
    position: "absolute",
    bottom: "30%",
    left: 30,
    "@media (max-width: 1400px)": {
      bottom: "28%",
    },
    "@media (max-width: 1300px)": {
      bottom: "28%",
    },
    "@media (max-width: 768px)": {
      bottom: "22%",
    },
    "@media (max-width: 576px)": {
      display: "none",
    },
  },
};
