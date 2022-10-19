import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function TeknitionMainLayout() {
  return (
    <Box sx={{ p: 3 }}>
      <Outlet />
    </Box>
  );
}

export default TeknitionMainLayout;
