import React from "react";
import { Form } from "formik";
import { TextField, Box } from "@mui/material";
import AsyncAutoComplete from "../../../Component/AsyncAutoComplete";
import SubmitForm from "../../../Component/SubmitForm";

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
        <AsyncAutoComplete
          onChange={(x: any, y: any) => {
            {
              props.setFieldValue("position_id", y?.id);
            }
          }}
          module="position"
          label="Posisi"
        />
        <TextField
          size="small"
          label="Email"
          fullWidth
          {...props.getFieldProps("email")}
        />
        <TextField
          size="small"
          label="Akses kode"
          fullWidth
          {...props.getFieldProps("access_code")}
          helperText="minimal 8 abjad"
        />
      </Box>
      <SubmitForm />
    </Form>
  );
}

export default FormCreate;
