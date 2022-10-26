import React from "react";
import { ListItemText, Typography, Box } from "@mui/material";
import ModalScreen from "../../Component/ModalScreen";
import { grey } from "@mui/material/colors";
import { statusDataRebuild } from "../../Component/TableComponent";

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
      id: "user_note_service",
      label: "Catatan user servis",
      value: open?.data?.user_note_service || "-",
    },
    {
      id: "teknition_note",
      label: "Catatan teknisi",
      value: open?.data?.teknition_note || "-",
    },
    {
      id: "status",
      label: "Status",
      value: (statusDataRebuild(open?.data?.status) as any)?.value,
    },
  ];
  return (
    <ModalScreen
      isDetail
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      open={open.active}
      handleClose={() => setOpen({ active: false, data: [] })}
      title="Detail user servis"
      variant="main"
      cancelLabel="Tutup"
      submitLabel="Buat"
    >
      {head?.map((i: any, e: number) => (
        <Box key={e} sx={{ display: "grid", mb: 0.7 }}>
          <Typography mb={-0.5} fontSize="subtitle" color={grey[600]}>
            {i?.label}
          </Typography>
          <Typography fontSize={17} ml={1}>
            {i?.value}
          </Typography>
        </Box>
      ))}
    </ModalScreen>
  );
}

export default Detail;
