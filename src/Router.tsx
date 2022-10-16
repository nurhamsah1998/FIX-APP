import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "./Layout";
import { tecnitionPathElement } from "./PathRouter/tecnition";
import { servicesPathElement } from "./PathRouter/services";
import { ownerPathElement } from "./PathRouter/owner";
import { adminPathElement } from "./PathRouter/admin";
import PageNotFound from "./Pages/404/PageNotFound";

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
      path: "/404",
      element: <PageNotFound />,
    },
    {
      path: "/",
      element: <Navigate to="/fix" />,
    },
  ]);
}

export default Router;
