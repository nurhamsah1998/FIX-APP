import { Box, Button } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import {
  useNavigate,
  NavigateFunction,
  useLocation,
  Location,
} from "react-router-dom";
import ModalScreen from "../../../Component/ModalScreen";
import TableComponent from "../../../Component/TableComponent";
import FormCreate from "./FormCreate";

export const initialValues = {
  name: "",
  role: "",
  email: "",
  accessCode: "",
};

function Employee() {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const tahbleHead: {
    id: string;
    label: string;
  }[] = [
    {
      id: "name",
      label: "Nama",
    },
    {
      id: "accessCode",
      label: "Akses kode",
    },
    {
      id: "role",
      label: "Posisi",
    },
  ];
  const tableBody: {
    name: string;
    role: string;
    email: string;
    accessCode: string;
  }[] = [
    {
      name: "hamsah",
      role: "admin",
      email: "nurhamsah@hamsah.com",
      accessCode: "123",
    },
    {
      name: "nur",
      email: "nurhamsah@hamsah.com",
      role: "teknisi",
      accessCode: "123",
    },
    {
      name: "kunam",
      role: "services",
      email: "nurhamsah@hamsah.com",
      accessCode: "123",
    },
  ];
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => navigate("?create-employee")}
        >
          Tambah karyawan
        </Button>
      </Box>
      <TableComponent tableBody={tableBody} tableHead={tahbleHead} />
      <ModalScreen
        open={location.search?.includes("?create-employee")}
        handleClose={() => navigate(-1)}
        title="Karyawan baru"
        variant="main"
        cancelLabel="Batal"
        submitLabel="Buat"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props: FormikProps<any>) => <FormCreate {...props} />}
        </Formik>
      </ModalScreen>
    </Box>
  );
}

export default Employee;
