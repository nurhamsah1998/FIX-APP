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
    module: "account_employee",
    filterBy: "id",
  });
  const data = items?.[0];
  const { enqueueSnackbar } = useSnackbar();
  const client = useQueryClient();
  const mutationPost = useMutation(
    [module],
    (values) =>
      supabase.from(module).insert({
        ...values,
        account_owner_id: data?.account_owner_id,
        account_employee_id: supabase.auth.user()?.id,
      }),
    {
      onSuccess: async (res, value) => {
        if (res.error) {
          enqueueSnackbar(errorMessage, {
            variant: "error",
          });
        } else {
          client.invalidateQueries([module]);
          enqueueSnackbar(successMessage, { variant: "success" });
        }
      },
    }
  );

  return { mutationPost: mutationPost, ...mutationPost };
}

export default useMutationPost;
