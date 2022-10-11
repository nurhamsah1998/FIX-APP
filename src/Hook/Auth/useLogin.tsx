import React from "react";
import { supabase } from "../supabase";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

function useLogin({ module }: { module: string }) {
  const { enqueueSnackbar } = useSnackbar();
  const login = useMutation(
    [module],
    (values: any) =>
      supabase.auth.signIn({
        email: values?.email,
        password: values?.password,
      }),
    {
      onSuccess: (res: any) => {
        if (res.error) {
          enqueueSnackbar("Periksa email atau sandi", { variant: "error" });
        } else {
          enqueueSnackbar("login berhasil", { variant: "success" });
          window.location.reload();
        }
      },
    }
  );

  return { login: login, ...login };
}

export default useLogin;
