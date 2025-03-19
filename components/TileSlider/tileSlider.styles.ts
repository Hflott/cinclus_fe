export const styles = {
  container: {
    py: 4, // Responsive padding using theme spacing
    px: { xs: 2, sm: 3, md: 4 }, // Horizontal padding that scales
    maxWidth: {
      xs: "100%", // Full width on mobile
      sm: "720px", // 600-900px screens
      md: "1140px", // 900-1200px screens
      lg: "1366px", // 1200-1536px screens
      xl: "1600px", // Larger screens
    },
  },
  poster: {
    maxWidth: {
      xs: "120px", // Mobile
      sm: "140px", // Tablet
      md: "150px", // Desktop
      lg: "160px", // Large screens
    },
    width: "100%",
    transition: "max-width 0.3s ease", // Smooth resizing
  },
  headTxt: {
    fontSize: {
      xs: "1.25rem", // Mobile
      sm: "1.5rem", // Tablet
      md: "1.75rem", // Desktop
    },
    mb: 3, // Consistent spacing using theme units
    fontWeight: 500,
    textAlign: "center",
  },
};
