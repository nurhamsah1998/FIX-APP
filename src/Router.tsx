import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "./Layout";
import Dashboard from "./Layout/Teknition/Pages/Dashboard/Dashboard";
import OwnerMainLayout from "./Layout/Owner/OwnerMainLayout";
import LayoutAdmin from "./Layout/Admin";
import LoginAdmin from "./Auth/Login/LoginAdmin";
import { tecnitionPathElement } from "./PathRouter/tecnition";
import { servicesPathElement } from "./PathRouter/services";
import { ownerPathElement } from "./PathRouter/owner";
import { adminPathElement } from "./PathRouter/admin";

function Router() {
  return useRoutes([
    { ...tecnitionPathElement },
    { ...adminPathElement },
    { ...ownerPathElement },
    { ...servicesPathElement },
    {
      path: "/fix",
      element: <MainLayout />,
    },
    {
      path: "/",
      element: <Navigate to="/fix" />,
    },
  ]);
}

export default Router;
