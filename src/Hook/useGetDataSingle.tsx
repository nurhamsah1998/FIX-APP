import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";

function useGetDataSingle({
  module,
  select = "*",
  enabled = true,
  filterBy = "account_owner_id",
}: {
  module: string;
  select?: string;
  filterBy?: string;
  enabled?: boolean;
}) {
  const query = useQuery(
    [module, enabled, filterBy],
    () =>
      supabase
        .from(module)
        .select(select)
        .eq(filterBy, supabase.auth.user()?.id),
    {
      enabled: Boolean(enabled),
    }
  );
  const items = (query.data as any)?.data;
  return { items: items, ...query };
}

export default useGetDataSingle;
