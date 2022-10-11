import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import PicIcon from "../Component/PicIcon";
import { useNavigate, NavigateFunction } from "react-router-dom";

interface AUTH {
  title: string;
  icon: any;
  desc: string;
  auth: string;
}

function MainLayout(): JSX.Element {
  const icon: (params: string) => JSX.Element = (params: string) => (
    <PicIcon width={100} height={100} icon={params} />
  );
  const navigate: NavigateFunction = useNavigate();
  const [paper, setPaper] = React.useState<number>(99);
  const user: AUTH[] = [
    {
      title: "Owner",
      icon: icon("wpf:administrator"),
      auth: "owner",
      desc: "Pemilik perusahaan",
    },
    {
      title: "Teknisi",
      icon: icon("ic:baseline-account-circle"),
      auth: "teknition",
      desc: "teknisi printer",
    },
    {
      title: "Admin",
      icon: icon("ic:baseline-account-circle"),
      auth: "admin",
      desc: "admin penjulan online maupun offline",
    },
    {
      title: "Pelayanan",
      icon: icon("ic:baseline-account-circle"),
      auth: "services",
      desc: "pelayanan user depan/servis masuk",
    },
  ];
  const handleClick: (item: any) => void = (item: any) => {
    navigate(`/fix/${item.auth}/login`);
  };
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="100%"
        gap={2}
      >
        {user.map((item: AUTH, index: number) => (
          <Grid item xs={6} sm={5} md={4} lg={3} key={index}>
            <Box
              component="span"
              onClick={() => handleClick(item)}
              sx={{
                p: 2,
                transition: "0.3s all",
                borderRadius: "5px",
                border: "1px solid gray",
                "&:hover": {
                  cursor: "pointer",
                  transform: "translateY(-5px)",
                  boxShadow: "#000 5px 5px 9px -5px",
                },
                display: { xs: "grid", sm: "grid", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box>{item?.icon}</Box>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography color="gray">{item.desc}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MainLayout;
