import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: "rgba(255,255,255,0.3)",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "100",
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loading;
