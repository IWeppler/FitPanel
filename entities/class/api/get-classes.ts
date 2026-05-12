import { supabase } from "@/shared/api/supabase";

export async function getClasses() {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) throw error;
  return data;
}
