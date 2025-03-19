export const styles = {
  poster: {
    position: "relative",
    color: "secondary.main",
    height: "100%", // Fill parent container
    width: "100%", // Fill slide width
    margin: 0, // Remove external margins
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
    transition: "opacity 0.4s ease, transform 0.2s ease",
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
