import React, { useContext, useEffect } from "react";
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { grey, green } from "@mui/material/colors";
import ListItemButton from "@mui/material/ListItemButton";
import { Formik, Form } from "formik";
import { useNavigate, NavigateFunction } from "react-router-dom";
import LoadingButton from "../../Component/LoadingButton";

function LoginServices() {
  const navigate: NavigateFunction = useNavigate();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
              console.log(values);
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
