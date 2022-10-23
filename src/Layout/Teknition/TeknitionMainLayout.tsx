import { Box } from "@mui/material";
import React from "react";
import useGetDataSingle from "../../Hook/useGetDataSingle";
import { Outlet } from "react-router-dom";
import { pickRole } from "../../Utils/RoleConfig/RoleConfig";
import { EmployeeContext } from "../../Hook/Context";

function TeknitionMainLayout() {
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
        <Outlet />
      </EmployeeContext.Provider>
    </Box>
  );
}

export default TeknitionMainLayout;
