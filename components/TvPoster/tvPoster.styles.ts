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
    transition: "transform 0.3s ease",
    "&:hover": {
      outline: "3px solid white",
      transform: "translateY(-6px)",
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
  posterType: {
    borderRadius: "4px",
    padding: "0 4px",
    lineHeight: 1.3,
  },
};
