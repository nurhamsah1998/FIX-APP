import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";

function useFetch({
  module,
  select = "*",
  enabled = true,
}: {
  module: string;
  select?: string;
  enabled?: boolean;
}) {
  const query = useQuery(
    [module, enabled],
    () => supabase.from(module).select(select),
    {
      enabled: Boolean(enabled),
    }
  );
  const items = (query.data as any)?.data;
  return { items: items, ...query };
}

export default useFetch;
