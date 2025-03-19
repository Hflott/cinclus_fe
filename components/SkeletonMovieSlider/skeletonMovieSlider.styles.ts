export const styles = {
  mediaSlide: {
    marginBottom: "20px",
    position: "relative",
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
    width: "100vw", // Full viewport width
    height: { xs: "60vh", md: "60vh", lg: "75vh" },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
};
