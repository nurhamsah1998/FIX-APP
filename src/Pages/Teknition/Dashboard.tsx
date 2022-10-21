import { Box, Button } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import React, { useState, useContext } from "react";
import {
  useNavigate,
  NavigateFunction,
  useLocation,
  Location,
} from "react-router-dom";
import TableComponent from "../../Component/TableComponent";
import useFetch from "../../Hook/useFetch";
import useMutationPost from "../../Hook/Mutation/useMutationPost";
import Detail from "./Detail";

export const initialValues = {
  name: "",
  phone: "",
  address: "",
  printer_model: "",
  printer_type_id: "",
  failure: "",
  account_owner_id: "",
  user_note_service: "",
};

function Dashboard() {
  const { mutationPost, isLoading } = useMutationPost({
    module: "service_in",
  });
  const { items } = useFetch({
    module: "service_in",
    select: `*,printer_type : printer_type_id(name)`,
  });
  const [open, setOpen] = useState<any>({ active: false, data: [] });
  const itemRebuild = items?.map((i: any) => ({
    ...i,
    printer_type: i?.printer_type?.name,
  }));
  const dataSort = itemRebuild?.sort(function (x: any, y: any) {
    return x.number - y.number;
  });
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const tahbleHead: {
    id: string;
    label: string;
    isStatus?: boolean;
  }[] = [
    {
      id: "number",
      label: "No.",
    },
    {
      id: "name",
      label: "Nama",
    },
    {
      id: "phone",
      label: "No. telpon",
    },
    {
      id: "address",
      label: "Alamat",
    },
    {
      id: "printer_type",
      label: "Type printer",
    },
    {
      id: "printer_model",
      label: "Model",
    },
    {
      id: "failure",
      label: "Kerusakan",
    },
    {
      id: "status",
      label: "Status",
      isStatus: true,
    },
  ];
  const formRef = React.useRef<any>();

  const handleSubmit: () => void = () => {
    formRef.current?.handleSubmit();
  };
  const handleClickRow: (item: any) => void = (item: any) => {
    setOpen({ active: true, data: item });
  };
  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Keluar
        </Button>
      </Box>
      <TableComponent
        handleClickRow={handleClickRow}
        tableBody={dataSort}
        tableHead={tahbleHead}
        variant="main"
      />
      <Detail
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
}

export default Dashboard;
