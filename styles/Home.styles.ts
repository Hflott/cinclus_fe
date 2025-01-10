import zIndex from "@mui/material/styles/zIndex";

export const styles = {
  sliderContainer: {
    zIndex: 2,
    position: "relative",
    m: "60px 0",
    padding: "0 24px",
    "@media (max-width: 900px)": {
      m: "35px 0",
      padding: "0 10px",
    },
  },
  sliderContainerOverlay: {
    position: "relative",
    top: "-300px",
    m: "60px 0",
    padding: "0 24px",
    "@media (max-width: 1400px)": {
      top: "-200px",
    },
    "@media (max-width: 900px)": {
      m: "35px 0",
      padding: "0 10px",
      top: "-150px",
    },
    "@media (max-width: 768px)": {
      top: "-60px",
    },
  },
  headTxt: {
    "@media (max-width: 900px)": {
      fontSize: "18px",
    },
  },
  subTxt: {
    "@media (max-width: 900px)": {
      fontSize: "12px",
    },
  },
};
