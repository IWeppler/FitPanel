"use server";

import { supabase } from "@/shared/api/supabase";
import { studentSchema, StudentFormValues } from "../model/student-schema";
import { revalidatePath } from "next/cache";

export async function createStudentAction(data: StudentFormValues) {
  // 1. Validar del lado del servidor
  const validated = studentSchema.safeParse(data);
  if (!validated.success) return { error: "Datos inválidos" };

  // 2. Insertar en Supabase
  const { error } = await supabase.from("students").insert([validated.data]);

  if (error) return { error: error.message };

  // 3. Refrescar la página del dashboard/alumnos para ver los cambios
  revalidatePath("/dashboard");
  revalidatePath("/alumnos");

  return { success: true };
}
