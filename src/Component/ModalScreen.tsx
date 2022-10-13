import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import LoadingButton from "./LoadingButton";
import { grey, orange, red } from "@mui/material/colors";

export default function ModalScreen({
  open,
  handleClose,
  isMutation = false,
  title,
  children,
  handleSubmit,
  isLoading,
  isDetail = false,
  variant = "main",
  cancelLabel = "batal",
  submitLabel = "simpan",
}: {
  open: any;
  handleClose: any;
  isMutation?: any;
  title: any;
  children: any;
  handleSubmit?: any;
  isLoading?: any;
  isDetail?: any;
  variant: any;
  cancelLabel: any;
  submitLabel: any;
}) {
  const COLOR = (params: any) => {
    const color = [
      {
        id: "main",
        color: "#3f51b5",
      },
      {
        id: "danger",
        color: red[500],
      },
      {
        id: "warning",
        color: orange[500],
      },
    ];
    const chooseColor = color?.find((i) => i?.id === params);
    if (chooseColor) {
      return chooseColor.color;
    }
    if (!chooseColor) {
      return "#1bc5bd";
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", md: "70%", lg: "70%" },
              bgcolor: "background.paper",
              borderRadius: "5px",
              boxShadow: 1,
            }}
          >
            <Box>
              <Box
                sx={{
                  p: 1,
                  bgcolor: COLOR(variant),
                  borderRadius: "5px 5px 0px 0px",
                  color: "#fff",
                }}
              >
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  fontWeight={600}
                >
                  {title}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  maxHeight: "400px",
                  overflow: "auto",
                  mb: 6.5,
                  borderTop: `${grey[300]} solid 1px`,
                  borderBottom: `${grey[300]} solid 1px`,
                }}
              >
                {children}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  justifyContent: "flex-end",
                  gap: 2,
                  p: 1,
                }}
              >
                <LoadingButton
                  onClick={handleClose}
                  title={cancelLabel}
                  color="error"
                />
                {!isDetail ? (
                  <LoadingButton
                    title={submitLabel}
                    type="submit"
                    isLoading={isLoading}
                    onClick={handleSubmit}
                  />
                ) : null}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
