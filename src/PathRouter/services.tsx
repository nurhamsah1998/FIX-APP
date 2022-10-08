import LoginServices from "../Auth/Login/LoginServices";
import LayoutServices from "../Layout/Services";
import ServicesMainLayout from "../Layout/Services/ServicesMainLayout";
import Dashboard from "../Layout/Teknition/Pages/Dashboard/Dashboard";
import { Navigate } from "react-router-dom";

export const servicesPathElement: {
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
  path: "/fix/services",
  element: <LayoutServices />,
  children: [
    {
      path: "services-app",
      element: <ServicesMainLayout />,
      children: [
        {
          path: "services-dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginServices />,
    },
    {
      path: "/fix/services",
      element: <Navigate to="/fix" />,
    },
  ],
};
