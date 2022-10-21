import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";

function useGetDataSingle({
  module,
  select = "*",
  enabled = true,
  filterBy = "account_owner_id",
  value = supabase.auth.user()?.id,
}: {
  module: string;
  select?: string;
  filterBy?: string;
  enabled?: boolean;
  value?: any;
}) {
  const query = useQuery(
    [module, enabled, filterBy, value],
    () => supabase.from(module).select(select).eq(filterBy, value),
    {
      enabled: Boolean(enabled),
    }
  );
  const items = (query.data as any)?.data;
  return { items: items, ...query };
}

export default useGetDataSingle;
