import React from "react";
import { supabase } from "../supabase";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

function useRegister({ module }: { module: string }) {
  const { enqueueSnackbar } = useSnackbar();
  const register = useMutation(
    [module],
    (values: any) =>
      supabase.auth.signUp({
        ...values,
      }),
    {
      onSuccess: () => {
        enqueueSnackbar("Register berhasil", { variant: "success" });
      },
    }
  );

  return { register: register, ...register };
}

export default useRegister;
