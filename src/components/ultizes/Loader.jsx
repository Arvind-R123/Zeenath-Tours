import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    // <div>Loader</div>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Box position="relative" display="inline-flex">
        {/* Bigger and bolder Circular Loader */}
        <CircularProgress size={100} thickness={4} />

        {/* Arrows inside the loader */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>
      </Box>
    </Box>
  );
}
