import { Box, Button } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import {
  useNavigate,
  NavigateFunction,
  useLocation,
  Location,
} from "react-router-dom";
import ModalScreen from "../../Component/ModalScreen";
import TableComponent from "../../Component/TableComponent";
import FormCreate from "./FormCreate";
import useFetch from "../../Hook/useFetch";
import useMutationPost from "../../Hook/Mutation/useMutationPost";

export const initialValues = {
  name: "",
  phone: "",
  address: "",
  printer_model: "",
  printer_type_id: "",
  failure: "",
  account_owner_id: "",
};

function Dashboard() {
  const { mutationPost, isLoading } = useMutationPost({
    module: "service_in",
  });
  const { items } = useFetch({
    module: "service_in",
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
          Tambah servisan masuk
        </Button>
      </Box>
      <TableComponent tableBody={tableBody} tableHead={tahbleHead} />
      <ModalScreen
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        open={location.search?.includes("?create-employee")}
        handleClose={() => navigate(-1)}
        title="Tambah servisan masuk"
        variant="main"
        cancelLabel="Batal"
        submitLabel="Buat"
      >
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={(values: any) => {
            console.log(values);
            mutationPost.mutate(values);
          }}
        >
          {(props: FormikProps<any>) => <FormCreate {...props} />}
        </Formik>
      </ModalScreen>
    </Box>
  );
}

export default Dashboard;
