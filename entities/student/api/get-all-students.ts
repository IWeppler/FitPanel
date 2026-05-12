import { supabase } from "@/shared/api/supabase";
import { Student } from "../model/types";

export async function getAllStudents() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Student[];
}
