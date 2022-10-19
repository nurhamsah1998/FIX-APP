import LayoutTeknition from "../Layout/Teknition";
import TeknitionMainLayout from "../Layout/Teknition/TeknitionMainLayout";
import Dashboard from "../Pages/Teknition/Dashboard";
import LoginTecnition from "../Auth/Login/LoginTecnition";
import { Navigate } from "react-router-dom";

export const tecnitionPathElement: {
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
  path: "/fix/teknition",
  element: <LayoutTeknition />,
  children: [
    {
      path: "teknition-app",
      element: <TeknitionMainLayout />,
      children: [
        {
          path: "teknition-dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginTecnition />,
    },
    {
      path: "/fix/teknition",
      element: <Navigate to="/fix" />,
    },
  ],
};
