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
          {...props.getFieldProps("user_name")}
        />
        <TextField
          size="small"
          label="Alamat user"
          fullWidth
          {...props.getFieldProps("user_address")}
        />
        {/* <AsyncAutoComplete
          onChange={(x: any, y: any) => {
            {
              props.setFieldValue("position_id", y?.id);
            }
          }}
          module="position"
          label="Posisi"
        /> */}
        <TextField
          size="small"
          label="No telpon"
          fullWidth
          {...props.getFieldProps("phone")}
        />
        <TextField
          size="small"
          label="Merek printer"
          fullWidth
          {...props.getFieldProps("printer_model")}
        />
        <TextField
          size="small"
          label="Type printer"
          fullWidth
          {...props.getFieldProps("printer_Type")}
        />
        <TextField
          size="small"
          label="Kerusakan"
          fullWidth
          {...props.getFieldProps("failure")}
        />
      </Box>
      <SubmitForm />
    </Form>
  );
}

export default FormCreate;
