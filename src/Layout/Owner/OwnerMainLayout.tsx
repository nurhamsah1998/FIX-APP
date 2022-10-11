import { Box } from "@mui/material";
import React from "react";
import { Outlet, useNavigate, NavigateFunction } from "react-router-dom";

function OwnerMainLayout() {
  const navigate: NavigateFunction = useNavigate();

  // React.useEffect(() => {
  //   const ownerToken = localStorage.getItem("supabase.auth.token");
  //   if (!ownerToken) {
  //     navigate("/fix/owner/login");
  //   }
  // }, []);
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default OwnerMainLayout;
