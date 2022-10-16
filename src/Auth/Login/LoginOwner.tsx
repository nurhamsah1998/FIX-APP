import React, { useContext, useEffect } from "react";
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { grey, green } from "@mui/material/colors";
import ListItemButton from "@mui/material/ListItemButton";
import { Formik, Form } from "formik";
import { useNavigate, NavigateFunction } from "react-router-dom";
import LoadingButton from "../../Component/LoadingButton";
import useLogin from "../../Hook/Auth/useLogin";
import { useSnackbar } from "notistack";
import { supabase } from "../../Hook/supabase";

function LoginOwner() {
  const navigate: NavigateFunction = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { login, isLoading } = useLogin({
    module: "login",
  });
  React.useEffect(() => {
    const ownerToken = localStorage.getItem("supabase.auth.token");
    if (ownerToken) {
      navigate("/fix/owner/owner-app/owner-dashboard");
    }
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "80%", sm: "40%", lg: "30%", xl: "30%" },
          mx: "auto",
          p: 2,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <LoadingButton
              onClick={() => navigate("/fix")}
              color="error"
              sx={{ minHeight: 0, minWidth: 0, fontWeight: 600 }}
              title="<"
            />
            <Typography variant="h6" fontWeight={400}>
              Pemilik / CEO
            </Typography>
          </Box>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              setLoading(true);
              let { user: login_success, error: login_error } =
                await supabase.auth.signIn({
                  email: values?.email,
                  password: values?.password,
                });
              if (login_success) {
                let { data, error } = await supabase
                  .from("account_owner")
                  .select("id");
                if ((data as any)?.[0]?.id) {
                  window.location.reload();
                  setLoading(false);
                  return false;
                } else {
                  localStorage.clear();
                  enqueueSnackbar("Cek email dan katasandi anda", {
                    variant: "error",
                  });
                  setLoading(false);
                }
              }
              if (login_error) {
                enqueueSnackbar("Cek email dan katasandi anda", {
                  variant: "error",
                });
                setLoading(false);
              }
            }}
          >
            {({ getFieldProps }) => (
              <Form>
                <Box>
                  {(
                    [
                      { name: "email", placeholder: "email", type: "email" },
                      {
                        name: "password",
                        placeholder: "password",
                        type: show ? "text" : "password",
                      },
                    ] as const
                  ).map((item: any, index: number) => (
                    <Box key={index} sx={{ mt: 3 }}>
                      <TextField
                        size="small"
                        fullWidth
                        type={item.type}
                        {...getFieldProps(item.name)}
                        label={item.placeholder}
                      />
                    </Box>
                  ))}
                  <Box sx={{ display: "grid" }}>
                    <LoadingButton
                      sx={{ mt: 2 }}
                      isLoading={loading}
                      fullWidth
                      type="submit"
                      title="Masuk"
                    />
                    <Typography
                      sx={{ mt: 1, textAlign: "center", fontSize: 13 }}
                    >
                      Belum punya akun?
                    </Typography>
                    <LoadingButton
                      onClick={() => navigate("/fix/owner/register")}
                      sx={{ mt: 1 }}
                      fullWidth
                      color="secondary"
                      title="Daftar"
                    />
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginOwner;
