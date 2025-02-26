export const styles = {
  mediaSlide: {
    marginBottom: "20px",
    position: "relative",
    "& .slick-slider": {
      position: "relative",
      "&:hover $mediaItemContent": {
        opacity: 1,
      },
    },
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
    height: { xs: "70vh", sm: "80vh", md: "90vh", lg: "100vh" }, // Adjust height responsively
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  mediaItemBanner: {},
  overview: {
    lineHeight: "1.6",
    fontWeight: "300",
    fontSize: { xs: "0.9rem", md: "1rem" },
    display: "-webkit-box",
    WebkitLineClamp: { xs: 3, md: 4 },
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    marginBottom: "20px",
    "@media (max-width: 768px)": {
      WebkitLineClamp: 2,
    },
    "@media (max-width: 576px)": {
      display: "none",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: { xs: "2rem", md: "3rem" },
    lineHeight: 1.2,
    marginBottom: "10px",
    "@media (max-width: 768px)": {
      fontSize: "2rem",
    },
    "@media (max-width: 576px)": {
      fontSize: "1.5rem",
    },
  },
  rating: {
    display: "flex",
    alignItems: "center",
    fontSize: { xs: "1rem", md: "1.2rem" },
    marginBottom: "10px",
    "@media (max-width: 768px)": {
      fontSize: "1rem",
    },
    "@media (max-width: 576px)": {
      fontSize: "0.8rem",
    },
  },
  miBtns: {
    display: "flex",
    gap: "4px",
    marginTop: "20px",
  },
  watchBtn: {
    whiteSpace: "nowrap",
    padding: "10px 20px",
    fontSize: { xs: "0.9rem", md: "1rem" },
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
    "@media (max-width: 576px)": {
      fontSize: "0.8rem",
      padding: "8px 15px",
    },
  },
  detailBtn: {
    padding: "10px 20px",
    fontSize: { xs: "0.9rem", md: "1rem" },
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
    "@media (max-width: 576px)": {
      fontSize: "0.8rem",
      padding: "8px 15px",
    },
  },
  mediaItemContent: {
    padding: "20px",
    zIndex: 3,
    width: { xs: "90%", md: "60%" }, // Responsive width
    position: "absolute",
    bottom: { xs: "10%", md: "unset" }, // Align to bottom on smaller screens, unset on larger screens
    top: { md: "30%" }, // Vertically center on larger screens
    left: { xs: "50%", md: "10%" }, // Center horizontally on smaller screens, align left on larger screens
    transform: { xs: "translateX(-50%)", md: "none" }, // Remove transform on larger screens
    opacity: 1,
    transition: "opacity 1s ease 150ms",
    color: "#fff",
    textAlign: { xs: "center", md: "left" }, // Text alignment
    "@media (max-width: 768px)": {
      width: "90%", // Full width on smaller screens
      padding: "10px", // Reduce padding for smaller screens
    },
    "@media (max-width: 576px)": {
      padding: "10px", // Further reduce padding for very small screens
    },
  },
  customDots: {
    "& .slick-dots": {
      bottom: { xs: "20px", md: "30px" },
      display: "flex !important",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 10px", // Add padding for small screens
      "& li": {
        width: { xs: "16px", md: "20px" }, // Fixed width for all list items
        height: { xs: "16px", md: "20px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        "& button:before": {
          display: "none",
        },
      },
      "& .custom-dot": {
        width: { xs: "8px", md: "10px" },
        height: { xs: "8px", md: "10px" },
        borderRadius: "50%",
        backgroundColor: "white",
        opacity: 0.5,
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&.active": {
          width: { xs: "16px", md: "20px" }, // Expand within parent li's fixed width
          borderRadius: "8px",
          opacity: 1,
          transform: "scale(1.1)", // Add slight scale for better effect
        },
      },
    },
  },
};
