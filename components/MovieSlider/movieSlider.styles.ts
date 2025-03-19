export const styles = {
  mediaSlide: {
    marginBottom: "20px",
    position: "relative",
    "& .slick-slider": {
      position: "relative",
    },
  },
  mediaItem: {
    position: "relative",
    width: "100%",
    outline: "none",
  },
  mediaItemImg: {
    position: "relative",
    width: "100vw",
    height: { xs: "450px", sm: "500px", md: "600px", lg: "700px", xl: "750px" },
    overflow: "hidden",
  },

  mediaItemBanner: {
    height: "100%",
  },
  overview: {
    lineHeight: "1.5",
    fontWeight: "400",
    fontSize: { xs: "15px", md: "18px" },
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    marginBottom: "10px",
    textAlign: { xs: "center", md: "start" },
  },
  title: {
    display: "flex",
    justifyContent: { xs: "center", md: "flex-start" },
    whiteSpace: "nowrap",
    fontWeight: "bold",
    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "4rem" },
    lineHeight: 1.2,
    marginBottom: "10px",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    justifyContent: { xs: "center", md: "flex-start" },
    fontSize: { xs: "0.7rem", sm: "1rem", md: "1.2rem" },
  },
  miBtns: {
    display: "flex",
    gap: 2,
    justifyContent: { xs: "center", sm: "flex-start" },
  },
  watchBtn: {
    whiteSpace: "nowrap",
    borderRadius: "20px",
    fontSize: "0.8rem",
    transition: "transform 0.3s ease",
  },
  mediaItemContent: {
    zIndex: 3,
    width: { xs: "70vw", sm: "50vw", md: "40vw", lg: "50vw", xl: "750px" },
    position: "absolute",
    left: { xs: "50%", md: "100px" },
    bottom: { xs: "40px", md: "40px" },
    transform: { xs: "translateX(-50%)", md: "translateX(0)" },
    transition: "opacity 1s ease 150ms",
  },
};
