import React from "react";
import { supabase } from "../supabase";
import {
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";

function useMutationPost({
  module,
  successMessage = "success",
  errorMessage = "error",
}: {
  module: string;
  errorMessage?: string;
  successMessage?: string;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const client: QueryClient = useQueryClient();
  const mutationPost = useMutation(
    [module],
    (values: any) =>
      supabase.auth.signUp({
        ...values,
      }),
    {
      onSuccess: (res: any) => {
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
