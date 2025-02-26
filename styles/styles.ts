export const styles = {
  pageContainer: {
    padding: "20px 24px",
    "@media (max-width: 900px)": {
      padding: "20px 10px",
    },
  },
  headTxt: { fontSize: 26, mb: 1 },
  moviesContainer: {
    // Remove grid-specific styles since we're using MUI Grid
    padding: "16px", // Add padding to the grid container
  },
  loadBtn: { width: "100%" },
  emptyList: {
    display: "grid",
    justifyItems: "center",
    textAlign: "center",
    gap: "30px",
  },
};
