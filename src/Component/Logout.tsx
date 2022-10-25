import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}
    >
      Keluar
    </Button>
  );
}

export default Logout;
