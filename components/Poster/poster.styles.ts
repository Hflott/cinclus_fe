export const styles = {
  poster: {
    position: "relative",
    color: "secondary.main",
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
  },
  posterUp: {
    overflow: "hidden",
    borderRadius: "12px",
    "&:hover": {
      outline: "3px solid white",
    },
  },
  posterImg: {
    overflow: "hidden",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  posterDown: {
    textAlign: "left",
  },
  posterTitle: {
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: 500,
    lineHeight: 1.2,
  },
  posterYearMain: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0.5,
  },
  posterYear: {
    opacity: 0.8,
  },
  posterType: {
    borderRadius: "4px",
    padding: "0 4px",
    lineHeight: 1.3,
  },
};
