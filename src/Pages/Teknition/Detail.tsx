import React from "react";
import {
  ListItemText,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import ModalScreen from "../../Component/ModalScreen";
import { grey } from "@mui/material/colors";
import { statusDataRebuild } from "../../Component/TableComponent";
import { status } from "../../Component/TableComponent";
import { EmployeeContext } from "../../Hook/Context";
import useMutationPatch from "../../Hook/Mutation/useMutationPatch";
import { Form, Formik } from "formik";
import PicIcon from "../../Component/PicIcon";
import SubmitForm from "../../Component/SubmitForm";

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
  const { employeeProfile } = React.useContext<any>(EmployeeContext);
  const [statusChange, setStatusChange] = React.useState<any>({
    open: false,
    data: "",
    index: null,
  });
  const [note, setNote] = React.useState<any>({
    open: false,
    data: "",
    index: null,
  });
  const icon: (params: string) => JSX.Element = (params: string) => (
    <PicIcon width={25} height={25} icon={params} />
  );
  const [noteValue, setNoteValue] = React.useState<string>("");
  const [pricing, setPricing] = React.useState<boolean>(false);
  const [confirm, setConfirm] = React.useState<any>({
    open: false,
    pricingSend: [
      {
        id: Math.random() * 5,
        name: "",
        price: "",
        quantity: "",
      },
    ],
  });
  const { mutationPatch, isLoading: loadingMutate } = useMutationPatch({
    module: "service_in",
    and: true,
    doThis: () => {
      setStatusChange((i: any) => ({ ...i, open: false }));
      setOpen({ active: false, data: [] });
      setStatusChange((i: any) => ({ ...i, index: null, open: false }));
      setPricing(false);
      setConfirm((i: any) => ({
        pricingSend: [
          { id: Math.random() * 5, name: "", price: "", quantity: "" },
        ],
        open: false,
      }));
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
      pureValue: open?.data?.status,
      value: (statusDataRebuild(open?.data?.status) as any)?.value,
    },
  ];
  const formRef = React.useRef<any>();
  const handleSubmitChangeStatus: () => void = () => {
    if (statusChange.data?.id === "success") {
      setPricing(true);
      return;
    } else {
      const body: any = {
        status: statusChange?.data?.id,
        id: open?.data?.id,
        worked_by: employeeProfile?.name,
      };
      mutationPatch.mutate(body);
    }
  };
  const handleSubmitGiveNote: () => void = () => {
    const body: any = { teknition_note: noteValue, id: open?.data?.id };
    mutationPatch.mutate(body);
  };
  const handleSubmitPricing: () => void = () => {
    formRef.current?.handleSubmit();
  };
  return (
    <Box>
      <ModalScreen
        isDetail
        isTecnition
        handleClickTeknition={() =>
          setStatusChange((i: any) => ({ ...i, open: true }))
        }
        handleClickTeknitionGiveNote={() =>
          setNote((i: any) => ({ ...i, open: true }))
        }
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        open={open.active}
        handleClose={() => setOpen({ active: false, data: [] })}
        title="Detail user servis"
        variant="main"
        cancelLabel="Tutup"
        submitLabel="Buat"
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ display: "grid" }}>
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
          </Box>
          <Box>
            <Typography variant="h5" mb={2}>
              Biaya service
            </Typography>
            {open?.data?.pricing?.map((x: any, y: number) => (
              <Box>
                <Typography mb={-0.5} fontSize="subtitle" color={grey[600]}>
                  {x?.name}
                </Typography>
                <Typography fontSize={17} ml={1}>
                  {x?.price}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </ModalScreen>
      <ModalScreen
        isLoading={loadingMutate}
        handleSubmit={handleSubmitChangeStatus}
        open={statusChange.open}
        handleClose={() =>
          setStatusChange((i: any) => ({ ...i, index: null, open: false }))
        }
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
              variant={
                open?.data?.status === x?.id || statusChange.index === y
                  ? "contained"
                  : "outlined"
              }
              disabled={open?.data?.status === x?.id}
              onClick={() =>
                setStatusChange((i: any) => ({ ...i, index: y, data: x }))
              }
            >
              {x?.value}
            </Button>
          ))}
      </ModalScreen>
      <ModalScreen
        isLoading={loadingMutate}
        handleSubmit={handleSubmitGiveNote}
        open={note.open}
        handleClose={() =>
          setNote((i: any) => ({ ...i, index: null, open: false }))
        }
        title="Beri catatan"
        variant="main"
        cancelLabel="Batal"
        submitLabel="Simpan perubahan"
      >
        <TextField
          onChange={(i) => setNoteValue(i?.target.value)}
          label="Tulis catatan"
          value={noteValue}
          multiline
          rows={4}
          fullWidth
          inputProps={{ maxLength: 200 }}
          helperText={`${noteValue?.length}/200`}
        />
      </ModalScreen>
      <ModalScreen
        isLoading={loadingMutate}
        handleSubmit={handleSubmitGiveNote}
        open={note.open}
        handleClose={() =>
          setNote((i: any) => ({ ...i, index: null, open: false }))
        }
        title="Beri catatan"
        variant="main"
        cancelLabel="Batal"
        submitLabel="Simpan perubahan"
      >
        <TextField
          onChange={(i) => setNoteValue(i?.target.value)}
          label="Tulis catatan"
          value={noteValue}
          multiline
          rows={4}
          fullWidth
          inputProps={{ maxLength: 200 }}
          helperText={`${noteValue?.length}/200`}
        />
      </ModalScreen>
      <ModalScreen
        handleSubmit={handleSubmitPricing}
        open={pricing}
        handleClose={() => setPricing(false)}
        title="Biaya servis"
        variant="main"
        cancelLabel="Batal"
        submitLabel="Simpan perubahan"
      >
        <Formik
          innerRef={formRef}
          initialValues={{
            pricing: confirm.pricingSend,
          }}
          onSubmit={(values) => {
            setConfirm({ open: true, pricingSend: values?.pricing });
          }}
          enableReinitialize
        >
          {({ getFieldProps, setFieldValue, values }) => (
            <Form>
              <Box sx={{ display: "grid", gap: 2 }}>
                {values.pricing?.map((x: any, y: number) => {
                  return (
                    <Box sx={{ display: "flex", gap: 2 }} key={y}>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="name"
                        {...getFieldProps(`pricing[${y}].name`)}
                      />
                      <TextField
                        size="small"
                        type="number"
                        placeholder="quantity"
                        {...getFieldProps(`pricing[${y}].quantity`)}
                      />
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="price"
                        type="number"
                        {...getFieldProps(`pricing[${y}].price`)}
                      />
                      {y === 0 ? null : (
                        <Button
                          onClick={() => {
                            const clone: {
                              name: string;
                              price: string;
                              quantity: string;
                            }[] = [...values.pricing];
                            const delItem = clone.filter(
                              (i: any) => i.id !== x.id
                            );
                            setFieldValue("pricing", delItem);
                          }}
                          variant="contained"
                          color="error"
                        >
                          {icon("ant-design:delete-filled")}
                        </Button>
                      )}
                    </Box>
                  );
                })}
              </Box>
              <Button
                variant="contained"
                onClick={() => {
                  setFieldValue("pricing", [
                    ...values.pricing,
                    {
                      id: Math.random() * 5,
                      name: "",
                      price: "",
                      quantity: "",
                    },
                  ]);
                }}
                fullWidth
                sx={{ mt: 3 }}
              >
                Tambah Biaya
              </Button>
              <SubmitForm />
            </Form>
          )}
        </Formik>
      </ModalScreen>
      <ModalScreen
        isLoading={loadingMutate}
        handleSubmit={() => {
          const body: any = {
            id: open?.data?.id,
            pricing: confirm.pricingSend,
            status: statusChange?.data?.id,
            worked_by: employeeProfile?.name,
          };
          mutationPatch.mutate(body);
        }}
        open={confirm.open}
        handleClose={() => setConfirm((i: any) => ({ ...i, open: false }))}
        title="Selesai ?"
        variant="main"
        cancelLabel="Batal"
        submitLabel="Kirim"
      >
        <Typography>
          Apakah anda yakin ingin mengirim status selesai?
        </Typography>
      </ModalScreen>
    </Box>
  );
}

export default Detail;
