import React from "react";
import { Icon } from "@iconify/react";
import { Box } from "@mui/material";
import { SxProps } from "@mui/material";

function PicIcon({
  icon,
  sx,
  width,
  height,
  ...props
}: {
  icon: string;
  sx?: SxProps;
  height: number;
  width: number;
}) {
  return (
    <Box
      component={Icon}
      icon={icon}
      {...props}
      width={width}
      height={height}
    />
  );
}

export default PicIcon;
