import React from "react";
import { supabase } from "../supabase";
import {
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import useGetDataSingle from "../useGetDataSingle";

function useMutationPatch({
  module,
  successMessage = "success",
  errorMessage = "error",
  and,
  doThis,
}) {
  const { items } = useGetDataSingle({
    module: "account_employee",
    filterBy: "id",
  });
  const data = items?.[0];
  const { enqueueSnackbar } = useSnackbar();
  const client = useQueryClient();
  const mutationPatch = useMutation(
    [module],
    (values) =>
      supabase
        .from(module)
        .update({
          ...values,
        })
        .match({
          id: values?.id,
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
          if (and) {
            doThis();
          }
        }
      },
    }
  );

  return { mutationPatch: mutationPatch, ...mutationPatch };
}

export default useMutationPatch;
