import React from "react";
import { supabase } from "../supabase";
import {
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import useGetData from "../useGetData";

function useMutationPost({
  module,
  successMessage = "success",
  errorMessage = "error",
}) {
  const { items } = useGetData({
    module: "account_owner",
  });
  const data = items?.[0];
  const { enqueueSnackbar } = useSnackbar();
  const client = useQueryClient();
  const mutationPost = useMutation(
    [module],
    (values) =>
      supabase.from(module).insert({
        ...values,
        account_owner_id: data?.id,
      }),
    {
      onSuccess: (res) => {
        if (res.error) {
          enqueueSnackbar(errorMessage, { variant: "error" });
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
