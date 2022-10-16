import React, { useContext, useEffect } from "react";
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate, NavigateFunction } from "react-router-dom";
import LoadingButton from "../../Component/LoadingButton";
import { supabase } from "../../Hook/supabase";
import useLogin from "../../Hook/Auth/useLogin";
import { useSnackbar } from "notistack";

function LoginServices() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate: NavigateFunction = useNavigate();
  const { login, isLoading } = useLogin({
    module: "login",
  });
  const [show, setShow] = React.useState(false);
  const USER_SERVICES: string = "d160393b-8c30-456f-8a4f-d53f9d77f5fc";
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const token: string | null = localStorage.getItem("supabase.auth.token");
    if (token) {
      navigate("/fix/services/services-app/services-dashboard");
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
              Pelayanan
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
                  .from("account_employee")
                  .select("*")
                  .eq("id", supabase.auth.user()?.id);
                if (data?.[0]?.position_id === USER_SERVICES) {
                  setLoading(false);
                  console.log(data);
                  navigate("/fix/services/services-app/services-dashboard");
                } else {
                  setLoading(false);
                  localStorage.clear();
                  enqueueSnackbar("Periksa emal dan kode akses anda!", {
                    variant: "error",
                  });
                }
              }
              if (login_error) {
                setLoading(false);
                enqueueSnackbar("Periksa emal dan kode akses anda!", {
                  variant: "error",
                });
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
                        placeholder: "kode akses",
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
                  <LoadingButton
                    isLoading={loading}
                    sx={{ mt: 2 }}
                    fullWidth
                    type="submit"
                    title="Login"
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginServices;
