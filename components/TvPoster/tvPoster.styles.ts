export const styles = {
  poster: {
    position: "relative",
    color: "secondary.main",
    maxWidth: "210px",
    width: "100%",
    margin: "20px",
    transition: "transform 0.3s ease, color 0.3s ease",
    "& .poster-img": {
      borderRadius: "12px",
    },
    "&:hover": {
      color: "#fff",
      transform: "scale(1.05)",
    },
    "@media (max-width: 900px)": {
      margin: "10px 3px",
      maxWidth: "108px",
    },
  },
  posterUp: {
    position: "relative",
    width: "250px",
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
    bottom: 33,
    right: 0,
    backgroundColor: "primary.main",
    padding: "3px",
    borderRadius: "50%",
    transform: "scale(1.1)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.3)",
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
};
