import React from "react";
import { Form } from "formik";
import { TextField, Box } from "@mui/material";
import AsyncAutoComplete from "../../../Component/AsyncAutoComplete";

function FormCreate({ ...props }) {
  return (
    <Form>
      <Box sx={{ display: "grid", gap: 3 }}>
        <TextField
          size="small"
          label="Nama"
          fullWidth
          {...props.getFieldProps("name")}
        />
        <AsyncAutoComplete module="position" label="Posisi" />
        <TextField
          size="small"
          label="Email"
          fullWidth
          {...props.getFieldProps("name")}
        />
        <TextField
          size="small"
          label="Akses kode"
          fullWidth
          {...props.getFieldProps("name")}
          helperText="minimal 8 abjad"
        />
      </Box>
    </Form>
  );
}

export default FormCreate;
