import LoginOwner from "../Auth/Login/LoginOwner";
import LayoutOwner from "../Layout/Owner";
import OwnerMainLayout from "../Layout/Owner/OwnerMainLayout";
import Dashboard from "../Pages/Owner/Dashboard";
import { Navigate } from "react-router-dom";
import RegisterOwner from "../Auth/Register/RegisterOwner";
import Report from "../Pages/Owner/Report";
import Employee from "../Pages/Owner/Employee/Employee";

export const ownerPathElement: {
  path: string;
  element: JSX.Element;
  children: (
    | {
        path: string;
        element: JSX.Element;
        children: {
          path: string;
          element: JSX.Element;
        }[];
      }
    | {
        path: string;
        element: JSX.Element;
        children?: undefined;
      }
  )[];
} = {
  path: "/fix/owner",
  element: <LayoutOwner />,
  children: [
    {
      path: "owner-app",
      element: <OwnerMainLayout />,
      children: [
        {
          path: "owner-dashboard",
          element: <Dashboard />,
        },
        {
          path: "owner-employee",
          element: <Employee />,
        },
        {
          path: "owner-report",
          element: <Report />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginOwner />,
    },
    {
      path: "register",
      element: <RegisterOwner />,
    },
    {
      path: "/fix/owner",
      element: <Navigate to="/fix" />,
    },
  ],
};
