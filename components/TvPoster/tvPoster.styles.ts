export const styles = {
  poster: {
    maxWidth: "150px",
    width: "100%",
    margin: "10px",
    "& .poster-img": {
      borderRadius: "8px",
    },
  },
  posterUp: {
    position: "relative",
    width: "150px",
    height: "225px",
  },
  posterDown: {},
  posterTitle: {
    fontSize: "0.85rem",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "500",
  },
};