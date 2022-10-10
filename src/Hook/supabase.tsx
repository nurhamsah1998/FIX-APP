import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cjlxgligbracarozrrbe.supabase.co";
const supabaseKey: any = process.env.REACT_APP_NOT_SECRET_CODE;
export const supabase = createClient(supabaseUrl, supabaseKey);
