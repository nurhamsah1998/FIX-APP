import React, { useContext, useEffect } from "react";
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate, NavigateFunction } from "react-router-dom";
import LoadingButton from "../../Component/LoadingButton";
import useLogin from "../../Hook/Auth/useLogin";

function LoginServices() {
  const navigate: NavigateFunction = useNavigate();
  const { login, isLoading } = useLogin({
    module: "login",
  });
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const token: string | null = localStorage.getItem("token");
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
          <Typography variant="h6" fontWeight={400}>
            Pelayanan
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              login.mutate(values);
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
                  <LoadingButton
                    isLoading={isLoading}
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
