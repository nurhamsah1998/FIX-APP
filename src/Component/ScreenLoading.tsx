import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function ScreenLoading({
  open,
  handleClose,
}: {
  open: any;
  handleClose?: any;
}) {
  return (
    <Dialog fullScreen open={open}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#1BC5BD",
        }}
      >
        <Box
          sx={{
            display: { xs: "grid", md: "grid", lg: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress
            sx={{ color: "#fff", mx: { xs: "auto", md: "auto", lg: "" } }}
            size={50}
          />
          <Typography variant="h5" color="#fff">
            Mohon ditunggu
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
}
