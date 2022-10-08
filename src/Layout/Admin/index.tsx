import { Box } from "@mui/material";
import React from "react";
import { useNavigate, NavigateFunction, Outlet } from "react-router-dom";

function LayoutAdmin() {
  const navigate: NavigateFunction = useNavigate();
  React.useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (!token) {
      navigate("/fix/admin/login");
    }
  }, []);
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default LayoutAdmin;
