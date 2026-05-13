"use server";

import { createClient } from "@/shared/api/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleAttendanceAction(
  studentId: string,
  classId: string,
  currentStatus: string | null,
) {
  const supabase = await createClient();

  if (currentStatus === "present") {
    // Si ya está presente, lo borramos (desmarcar)
    await supabase
      .from("attendance")
      .delete()
      .match({
        student_id: studentId,
        attendance_date: new Date().toISOString().split("T")[0],
      });
  } else {
    // Marcar presente
    await supabase.from("attendance").insert([
      {
        student_id: studentId,
        class_id: classId,
        status: "present",
        attendance_date: new Date().toISOString().split("T")[0],
      },
    ]);
  }

  revalidatePath("/dashboard");
}
