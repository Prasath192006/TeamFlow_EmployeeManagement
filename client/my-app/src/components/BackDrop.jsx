import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export default function BackDrop({ open }) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: 1300,
        backdropFilter: "blur(10px)", // Apply blur effect
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      open={open}
    >
      <CircularProgress sx={{ color: "blue" }} />
    </Backdrop>
  );
}
