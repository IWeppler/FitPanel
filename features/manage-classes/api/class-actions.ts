"use server";

import { createClient } from "@/shared/api/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteClassAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("classes").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/turnos");
}

export async function updateClassAction(id: string, data: any) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("classes")
    .update({
      name: data.name,
      day_of_week: Number.parseInt(data.day_of_week),
      start_time: data.start_time,
      capacity: Number.parseInt(data.capacity),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/turnos");
}
