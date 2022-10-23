import { Box } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import ScreenLoading from "../../Component/ScreenLoading";
import { EmployeeContext } from "../../Hook/Context";
import useGetDataSingle from "../../Hook/useGetDataSingle";
import { pickRole } from "../../Utils/RoleConfig/RoleConfig";

function ServicesMainLayout() {
  const { items, isFetched, isLoading } = useGetDataSingle({
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
      pickRole(items?.[0]?.position_id);
    }
  }, [isFetched]);
  return (
    <Box sx={{ p: 3 }}>
      <EmployeeContext.Provider value={{ employeeProfile, setEmployeeProfile }}>
        <ScreenLoading open={isLoading} />
        <Box sx={{ display: isLoading ? "none" : "block" }}>
          <Outlet />
        </Box>
      </EmployeeContext.Provider>
    </Box>
  );
}

export default ServicesMainLayout;
