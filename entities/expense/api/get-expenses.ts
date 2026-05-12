import { supabase } from "@/shared/api/supabase";

export async function getExpenses() {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("spent_at", { ascending: false });

  if (error) throw error;
  return data;
}
