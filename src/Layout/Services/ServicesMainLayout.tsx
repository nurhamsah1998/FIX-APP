import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { EmployeeContext } from "../../Hook/Context";
import useGetData from "../../Hook/useGetData";

function ServicesMainLayout() {
  const { items, isFetched } = useGetData({
    module: "account_employee",
    filterBy: "id",
    select: "*, position_name:position_id(name)",
  });
  const [employeeProfile, setEmployeeProfile] = React.useState<any>();
  React.useEffect(() => {
    if (items) {
      const itemRebuild = items?.map((i: any) => ({
        ...i,
        position_name: i?.position_name?.name,
      }));
      setEmployeeProfile(itemRebuild?.[0]);
    }
  }, [isFetched]);
  console.log(employeeProfile);
  return (
    <Box sx={{ p: 3 }}>
      <EmployeeContext.Provider value={{ employeeProfile, setEmployeeProfile }}>
        <Outlet />
      </EmployeeContext.Provider>
    </Box>
  );
}

export default ServicesMainLayout;
