import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { SxProps } from "@mui/material";

function LoadingButton({
  isLoading,
  title,
  height = "50px",
  ...props
}: {
  isLoading?: boolean;
  sx?: SxProps;
  title: string;
  color?: any;
  onClick?: () => void;
  height?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: any;
}) {
  return (
    <Button variant="contained" {...props} size="small" disabled={isLoading}>
      {isLoading ? <CircularProgress size={27} /> : title}
    </Button>
  );
}

export default LoadingButton;
