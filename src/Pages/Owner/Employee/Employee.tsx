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
import useMutationPost from "../../../Hook/Mutation/useMutationPost";

export const initialValues = {
  name: "",
  position_id: "",
  email: "",
  access_code: "",
};

function Employee() {
  const { mutationPost, isLoading } = useMutationPost({
    module: "account_services",
  });
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
      id: "access_code",
      label: "Akses kode",
    },
    {
      id: "position_id",
      label: "Posisi",
    },
  ];
  const tableBody: {
    name: string;
    position_id: string;
    email: string;
    access_code: string;
  }[] = [
    {
      name: "hamsah",
      position_id: "admin",
      email: "nurhamsah@hamsah.com",
      access_code: "123",
    },
    {
      name: "nur",
      email: "nurhamsah@hamsah.com",
      position_id: "teknisi",
      access_code: "123",
    },
    {
      name: "kunam",
      position_id: "services",
      email: "nurhamsah@hamsah.com",
      access_code: "123",
    },
  ];
  const formRef = React.useRef<any>();

  const handleSubmit: () => void = () => {
    formRef.current?.handleSubmit();
  };
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
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        open={location.search?.includes("?create-employee")}
        handleClose={() => navigate(-1)}
        title="Karyawan baru"
        variant="main"
        cancelLabel="Batal"
        submitLabel="Buat"
      >
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={(values: any) => {
            mutationPost.mutate(values);
          }}
        >
          {(props: FormikProps<any>) => <FormCreate {...props} />}
        </Formik>
      </ModalScreen>
    </Box>
  );
}

export default Employee;
