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
      onSuccess: async (res: any, value: any) => {
        if (res.error) {
          enqueueSnackbar("Email sudah terdaftar!", { variant: "error" });
        } else {
          const { data, error } = await supabase.from("account_owner").insert([
            {
              name: value?.name,
              email: value?.email,
              password: value?.password,
              company_name: value?.company_name,
              user_id: supabase.auth.user()?.id,
              id: supabase.auth.user()?.id,
            },
          ]);
          if (data) {
            enqueueSnackbar("Register berhasil", { variant: "success" });
          }
        }
      },
    }
  );

  return { register: register, ...register };
}

export default useRegister;
