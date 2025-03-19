export const styles = {
  pageContainer: {
    padding: "20px 24px",
    "@media (max-width: 900px)": {
      padding: "20px 10px",
    },
  },
  headTxt: { fontSize: 26, mb: 1 },
  moviesContainer: {
    // Remove Grid-specific styles since we're using MUI Grid
    padding: "16px", // Add padding to the Grid container
  },
  loadBtn: { width: "100%" },
  emptyList: {
    display: "Grid",
    justifyItems: "center",
    textAlign: "center",
    gap: "30px",
  },
};
