import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

const Loader = () => {
  return (
    <CircularProgress
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 999,
      }}
    />
  );
};

export default Loader;
