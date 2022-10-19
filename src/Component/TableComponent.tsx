import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { cyan, green, orange, purple, red, grey } from "@mui/material/colors";

export const statusDataRebuild: (params: any) => void = (params: any) => {
  const status = [
    {
      id: "process_line",
      value: "Proses antrian servis",
      color: "#fff",
    },
    {
      id: "confirmation_awaiting",
      value: "Tunggu konfirmasi",
      color: purple[300],
    },
    {
      id: "success_not_pick",
      value: "Selesai belum diambil",
      color: orange[300],
    },
    {
      id: "cancel",
      value: "Cancel",
      color: red[300],
    },
    {
      id: "success_delivery",
      value: "Selesai diantar",
      color: cyan[300],
    },
    {
      id: "success_pick",
      value: "Selesai diambil",
      color: green[300],
    },
  ];
  const findValue = status.find((i: any) => i?.id === params);
  return findValue;
};

function TableComponent({
  tableHead,
  tableBody,
  handleClickReply,
  btnLabel = "balas",
  emptyTag,
  handleClickRow,
  variant,
}: {
  tableHead: any;
  tableBody: any;
  variant?: any;
  handleClickReply?: any;
  handleClickRow?: any;
  btnLabel?: string;
  emptyTag?: string;
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
    <Box sx={{ bgcolor: "#fff" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: COLOR(variant) }}>
            {tableBody?.length <= 0 ? (
              <TableCell>Kosyong</TableCell>
            ) : (
              tableHead?.map((head: any, index: number) => {
                const isOPtion: any =
                  index === tableHead?.length - 1 ? 6 : "false";
                return (
                  <TableCell
                    colSpan={isOPtion}
                    sx={{
                      fontWeight: 600,
                      border: "none",
                      color: "#fff",
                      py: 1,
                      px: 0.5,
                    }}
                    key={index}
                  >
                    {head.label}
                  </TableCell>
                );
              })
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBody?.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                sx={{ border: "none", textAlign: "center" }}
              >
                <Typography variant="h6" fontWeight={600} color={grey[600]}>
                  " Kosong "
                </Typography>
                <Typography color={grey[600]}>{emptyTag}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            tableBody?.map((body: any, index: number) => {
              return (
                <TableRow
                  onClick={() => handleClickRow(body)}
                  key={index}
                  sx={{
                    bgcolor: (statusDataRebuild(body?.status) as any)?.color,
                    transition: "0.3s all",
                    "&:hover": {
                      cursor: "pointer",
                    },
                    "&:active": {
                      bgcolor: cyan[500],
                    },
                  }}
                >
                  {tableHead?.map((head: any, index: number) => {
                    return (
                      <TableCell
                        sx={{
                          border: "none",
                          p: 0.5,
                        }}
                        key={index}
                      >
                        {head.isImage ? (
                          <Box sx={{ display: "flex", gap: 2 }}>
                            {/* <Box>
                          <img
                            width="90px"
                            style={{ borderRadius: "12px" }}
                            src={body.image}
                          />
                        </Box> */}
                            <Box>
                              <Typography
                                textTransform="capitalize"
                                fontWeight={600}
                              >
                                {body[head.id]}
                              </Typography>
                              <Typography fontSize={14} color={grey[500]}>
                                NIK : {body.nik}
                              </Typography>
                            </Box>
                          </Box>
                        ) : head.isGrid ? (
                          <Box>
                            <Typography
                              textTransform="capitalize"
                              fontWeight={600}
                            >
                              {body[head.id]}
                            </Typography>
                            <Typography fontSize={14} color={grey[500]}>
                              {body.status}
                            </Typography>
                          </Box>
                        ) : head.isStatus ? (
                          <Box
                            sx={{
                              width: "fit-content",
                              p: 0.5,
                              borderRadius: "5px",
                            }}
                          >
                            <Typography variant="subtitle2" fontWeight={400}>
                              {(statusDataRebuild(body[head.id]) as any)?.value}
                            </Typography>
                          </Box>
                        ) : (
                          body[head.id]
                        )}
                      </TableCell>
                    );
                  })}
                  {/* <TableCell sx={{ border: "none" }}>
                  <Button
                    onClick={() => handleClickReply(body)}
                    variant="contained"
                  >
                    {btnLabel}
                  </Button>
                </TableCell> */}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Box>
  );
}

export default TableComponent;
