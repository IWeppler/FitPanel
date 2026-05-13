"use server";

import { createClient } from "@/shared/api/supabase/server";
import { studentSchema, StudentFormValues } from "../model/student-schema";
import { revalidatePath } from "next/cache";

export async function createStudentAction(data: StudentFormValues) {
  const supabase = await createClient();
  const validated = studentSchema.safeParse(data);
  if (!validated.success) return { error: "Datos inválidos" };

  const { error } = await supabase.from("students").insert([validated.data]);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/alumnos");

  return { success: true };
}
