import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const pickRole: (paramsCorrect?: any) => void = (
  paramsCorrect?: any
) => {
  const dataRole = [
    {
      id: "c7a8c27d-3e68-431f-8089-5f3c42426caf",
      value: "TEKNISI",
      path: "/fix/teknition/teknition-app/teknition-dashboard",
    },
    {
      id: "d160393b-8c30-456f-8a4f-d53f9d77f5fc",
      value: "PELAYANAN USER",
      path: "/fix/services/services-app/services-dashboard",
    },
    {
      id: "0dfe1276-1240-410e-bfea-f99e88623a49",
      value: "TEKADMIN ONLINENISI",
      path: "/fix/owner/owner-app/owner-dashboard",
    },
    {
      id: "17871b2f-627d-49cb-9b68-5b6db5c78c3f",
      value: "ADMIN OFFLINE",
      path: "/fix/admin/admin-app/admin-dashboard",
    },
  ];
  const result: any = dataRole.find((i: any) => i?.id === paramsCorrect);
  if (result) {
    return false;
  } else {
    window.location.href = "/404";
    return false;
  }
};
