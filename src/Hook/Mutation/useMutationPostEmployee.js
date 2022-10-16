import React from "react";
import { supabase } from "../supabase";
import {
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import useGetDataSingle from "../useGetDataSingle";

function useMutationPost({
  module,
  successMessage = "success",
  errorMessage = "error",
}) {
  const { items } = useGetDataSingle({
    module: "account_owner",
  });
  const data = items?.[0];
  const { enqueueSnackbar } = useSnackbar();
  const client = useQueryClient();
  const mutationPost = useMutation(
    [module],
    (values) =>
      supabase.auth.signUp({
        email: values?.email,
        password: values?.access_code,
      }),
    {
      onSuccess: async (res, value) => {
        localStorage.setItem("employeeID", supabase.auth.user()?.id);
        if (res.error) {
          enqueueSnackbar("email karyawan sudah terdaftar!", {
            variant: "error",
          });
          let { user: afterErrorSuccess, error: afterErrorError } =
            supabase.auth.signIn({
              email: data?.email,
              password: data?.password,
            });
        } else {
          localStorage.removeItem("supabase.auth.token");
          let { user: login_success, error: login_error } =
            await supabase.auth.signIn({
              email: data?.email,
              password: data?.password,
            });
          if (login_success) {
            let { user, error } = await supabase.from([module]).insert({
              ...value,
              id: localStorage.getItem("employeeID"),
              account_owner_id: data?.id,
            });
            client.invalidateQueries([module]);
            enqueueSnackbar(successMessage, { variant: "success" });
            localStorage.removeItem("employeeID");
          }
          if (login_error) {
            enqueueSnackbar(errorMessage, { variant: "error" });
          }
        }
      },
    }
  );

  return { mutationPost: mutationPost, ...mutationPost };
}

export default useMutationPost;
