import * as React from "react";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#4caf50",
    },
    error: {
      main: red[500],
    },
  },
});

export default function MUI({ children }: { children: any }): JSX.Element {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
