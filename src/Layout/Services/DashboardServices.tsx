import { Button } from "@mui/material";
import React from "react";

function DashboardServices() {
  return (
    <div>
      DashboardServices
      <Button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        variant="contained"
      >
        Log out
      </Button>
    </div>
  );
}

export default DashboardServices;
