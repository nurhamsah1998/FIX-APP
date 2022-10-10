import React from "react";
import { supabase } from "../supabase";
import { useMutation } from "@tanstack/react-query";

function useRegister({ module }: { module: string }) {
  const register = useMutation([module], (values: any) =>
    supabase.auth.signUp({
      ...values,
    })
  );

  return { register: register, ...register };
}

export default useRegister;
