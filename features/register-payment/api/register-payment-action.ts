"use server";

import { revalidatePath } from "next/cache";
import dayjs from "dayjs";
import { createClient } from "@/shared/api/supabase/server";

export async function registerPaymentAction(formData: {
  studentId: string;
  amount: number;
  method: string;
  billingType: "monthly" | "per_class";
}) {
  const supabase = await createClient();
  // 1. Registrar el pago
  const { error: payError } = await supabase.from("payments").insert([
    {
      student_id: formData.studentId,
      amount: formData.amount,
      method: formData.method,
      category: formData.billingType === "monthly" ? "cuota" : "clase_suelta",
      paid_at: new Date().toISOString(),
    },
  ]);

  if (payError) return { error: payError.message };

  // 2. Actualizar vencimiento del alumno
  // Si es mensual, le sumamos un mes a partir de hoy o de su último vencimiento
  const nextDue =
    formData.billingType === "monthly"
      ? dayjs().add(1, "month").format("YYYY-MM-DD")
      : null;

  await supabase
    .from("students")
    .update({ due_date: nextDue })
    .eq("id", formData.studentId);

  revalidatePath("/dashboard");
  return { success: true };
}
