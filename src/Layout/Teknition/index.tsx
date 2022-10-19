import { Box } from "@mui/material";
import React from "react";
import { useNavigate, NavigateFunction, Outlet } from "react-router-dom";

function LayoutTeknition() {
  const navigate: NavigateFunction = useNavigate();
  React.useEffect(() => {
    const token: string | null = localStorage.getItem("supabase.auth.token");
    if (!token) {
      navigate("/fix/teknition/login");
    }
  }, []);
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default LayoutTeknition;
