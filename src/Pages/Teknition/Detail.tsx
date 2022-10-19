import React from "react";
import { ListItemText, Typography, Box, Button } from "@mui/material";
import ModalScreen from "../../Component/ModalScreen";
import { grey } from "@mui/material/colors";
import { statusDataRebuild } from "../../Component/TableComponent";
import { status } from "../../Component/TableComponent";
import useMutationPatch from "../../Hook/Mutation/useMutationPatch";

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
  const [statusChange, setStatusChange] = React.useState<any>({
    open: false,
    data: "",
    index: null,
  });
  const { mutationPatch, isLoading: loadingMutate } = useMutationPatch({
    module: "service_in",
    and: true,
    doThis: () => {
      setStatusChange((i: any) => ({ ...i, open: false }));
    },
  });
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

  const handleSubmitChangeStatus: () => void = () => {
    const body: any = { status: statusChange?.data?.id, id: open?.data?.id };
    mutationPatch.mutate(body);
  };
  return (
    <Box>
      <ModalScreen
        isTecnition
        handleClickTeknition={() =>
          setStatusChange((i: any) => ({ ...i, open: true }))
        }
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
      <ModalScreen
        isLoading={loadingMutate}
        handleSubmit={handleSubmitChangeStatus}
        open={statusChange.open}
        handleClose={() => setStatusChange((i: any) => ({ ...i, open: false }))}
        title="Rubah status user servis"
        variant="main"
        cancelLabel="Batal"
        submitLabel="Simpan perubahan"
      >
        {status
          ?.filter((i: any) => i?.isTecnition)
          ?.map((x: any, y: number) => (
            <Button
              key={y}
              variant={statusChange.index === y ? "contained" : "outlined"}
              onClick={() =>
                setStatusChange((i: any) => ({ ...i, index: y, data: x }))
              }
            >
              {x?.value}
            </Button>
          ))}
      </ModalScreen>
    </Box>
  );
}

export default Detail;
