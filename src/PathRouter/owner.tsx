import LoginOwner from "../Auth/Login/LoginOwner";
import LayoutOwner from "../Layout/Owner";
import OwnerMainLayout from "../Layout/Owner/OwnerMainLayout";
import Dashboard from "../Layout/Teknition/Pages/Dashboard/Dashboard";
import { Navigate } from "react-router-dom";

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
      ],
    },
    {
      path: "login",
      element: <LoginOwner />,
    },
    {
      path: "/fix/owner",
      element: <Navigate to="/fix" />,
    },
  ],
};
