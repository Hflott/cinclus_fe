import theme from "../theme";

export const styles = {
  movieSliderContainer: {
    position: "relative",
  },
  tileSlidersContainer: {
    position: "relative",
  },
  sliderContainer: {
    marginBottom: theme.spacing(4),
  },
  headTxt: {
    color: "#fff",
    marginBottom: theme.spacing(2),
    padding: "0 20px",
  },
  subTxt: {
    "@media (max-width: 900px)": {
      fontSize: "12px",
    },
  },
};
