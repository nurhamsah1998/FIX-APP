import React from "react";
import { supabase } from "../supabase";
import { useMutation } from "@tanstack/react-query";

function useLogin({ module }: { module: string }) {
  const login = useMutation([module], (values: any) =>
    supabase.auth.signIn({
      email: values?.email,
      password: values?.password,
    })
  );

  return { login: login, ...login };
}

export default useLogin;
