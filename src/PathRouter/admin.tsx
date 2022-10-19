import LoginAdmin from "../Auth/Login/LoginAdmin";
import LayoutAdmin from "../Layout/Admin";
import Dashboard from "../Pages/Admin/Dashboard";
import { Navigate } from "react-router-dom";
import AdminMainLayout from "../Layout/Admin/AdminMainLayout";

export const adminPathElement = {
  path: "/fix/admin",
  element: <LayoutAdmin />,
  children: [
    {
      path: "admin-app",
      element: <AdminMainLayout />,
      children: [
        {
          path: "admin-dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginAdmin />,
    },
    {
      path: "/fix/admin",
      element: <Navigate to="/fix" />,
    },
  ],
};
