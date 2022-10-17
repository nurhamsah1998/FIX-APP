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
import useGetData from "../../../Hook/useGetDataSingle";
import useMutationPostEmployee from "../../../Hook/Mutation/useMutationPostEmployee";
import { supabase } from "../../../Hook/supabase";

export const initialValues = {
  name: "",
  position_id: "",
  email: "",
  access_code: "",
};

function Employee() {
  const { mutationPost, isLoading } = useMutationPostEmployee({
    module: "account_employee",
  });
  const { items } = useGetData({
    module: "account_employee",
    select: `*, position_name:position_id(name)`,
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
      id: "email",
      label: "Akses kode",
    },
    {
      id: "position_name",
      label: "Posisi",
    },
  ];
  const tableBody = items?.map((i: any) => ({
    ...i,
    position_name: i?.position_name?.name,
  }));
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
