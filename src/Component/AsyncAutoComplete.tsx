import React from "react";
import useGetData from "../Hook/Auth/useGetData";
import { Autocomplete, TextField, Box } from "@mui/material";

function AsyncAutoComplete({
  onChange,
  module,
  label,
}: {
  onChange?: any;
  module?: any;
  label: string;
}) {
  const { items, refetch, isLoading } = useGetData({
    module: module,
    enabled: false,
  });
  return (
    <Box>
      <Autocomplete
        disablePortal
        size="small"
        loading={isLoading}
        onOpen={() => refetch()}
        getOptionLabel={(items: any) => items?.name || ""}
        options={items || []}
        fullWidth
        onChange={onChange}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Box>
  );
}

export default AsyncAutoComplete;
