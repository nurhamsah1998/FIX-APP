import React from "react";
import { Form } from "formik";
import { TextField, Box } from "@mui/material";
import AsyncAutoComplete from "../../Component/AsyncAutoComplete";
import SubmitForm from "../../Component/SubmitForm";

function FormCreate({ ...props }) {
  return (
    <Form>
      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField
          size="small"
          label="Nama user"
          fullWidth
          {...props.getFieldProps("name")}
        />
        <TextField
          size="small"
          label="Alamat user"
          fullWidth
          {...props.getFieldProps("address")}
        />

        <TextField
          size="small"
          label="No telpon"
          fullWidth
          {...props.getFieldProps("phone")}
        />
        <AsyncAutoComplete
          onChange={(x: any, y: any) => {
            {
              props.setFieldValue("printer_type_id", y?.id);
            }
          }}
          module="printer_type"
          label="Tipe printer"
        />
        <TextField
          size="small"
          label="Merek printer"
          fullWidth
          {...props.getFieldProps("printer_model")}
        />

        <TextField
          size="small"
          label="Kerusakan"
          fullWidth
          {...props.getFieldProps("failure")}
        />
        <TextField
          size="small"
          label="Catatan user service"
          fullWidth
          {...props.getFieldProps("user_note_service")}
        />
      </Box>
      <SubmitForm />
    </Form>
  );
}

export default FormCreate;
