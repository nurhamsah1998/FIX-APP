import React from "react";
import { Outlet } from "react-router-dom";

function ServicesMainLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ServicesMainLayout;
