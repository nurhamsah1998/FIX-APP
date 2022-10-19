import React from "react";
import { ListItemText } from "@mui/material";
import ModalScreen from "../../Component/ModalScreen";

function Detail({
  isLoading,
  handleSubmit,
  open,
  setOpen,
}: {
  isLoading: any;
  handleSubmit: any;
  open: any;
  setOpen: any;
}) {
  console.log(open.data);
  const head = [
    {
      id: "name",
      label: "Nama",
      value: open?.data?.name,
    },
    {
      id: "phone",
      label: "No. telpon",
      value: open?.data?.phone,
    },
    {
      id: "address",
      label: "Alamat",
      value: open?.data?.address,
    },
    {
      id: "printer_type",
      label: "Type printer",
      value: open?.data?.printer_type,
    },
    {
      id: "printer_model",
      label: "Model",
      value: open?.data?.printer_model,
    },
    {
      id: "failure",
      label: "Kerusakan",
      value: open?.data?.failure,
    },
    {
      id: "status",
      label: "Status",
      value: open?.data?.status,
    },
  ];
  return (
    <ModalScreen
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      open={open.active}
      handleClose={() => setOpen({ active: false, data: [] })}
      title="Detail user servis"
      variant="main"
      cancelLabel="Batal"
      submitLabel="Buat"
    >
      {head?.map((i: any, e: number) => (
        <ListItemText key={e} primary={i.label} secondary={i?.value || "-"} />
      ))}
    </ModalScreen>
  );
}

export default Detail;
