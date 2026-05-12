import { supabase } from "@/shared/api/supabase";
import dayjs from "dayjs";

export async function getDashboardData() {
  const today = dayjs().format("YYYY-MM-DD");
  const startOfMonth = dayjs().startOf("month").format("YYYY-MM-DD");

  // 1. Obtener Alumnos Activos y Deudores
  const { data: students, error: studentError } = await supabase
    .from("students")
    .select("id, full_name, due_date, billing_type, status")
    .eq("status", "active");

  if (studentError) throw studentError;

  // 2. Obtener Ingresos del Mes (Sumatoria de pagos)
  const { data: payments, error: payError } = await supabase
    .from("payments")
    .select("amount")
    .gte("paid_at", startOfMonth);

  if (payError) throw payError;

  // 3. Obtener Asistencias de hoy para saber quién ya marcó "Presente"
  const { data: attendanceToday, error: attError } = await supabase
    .from("attendance")
    .select("student_id")
    .eq("attendance_date", today);

  if (attError) throw attError;

  // --- Lógica de Negocio ---
  const revenue = payments?.reduce((acc, p) => acc + Number(p.amount), 0) || 0;

  const debtors =
    students?.filter((s) => {
      if (!s.due_date) return false;
      return (
        dayjs(s.due_date).isBefore(dayjs(), "day") ||
        dayjs(s.due_date).isSame(dayjs(), "day")
      );
    }).length || 0;

  // Combinamos alumnos con su estado de asistencia de hoy
  const studentsWithAttendance =
    students?.map((s) => ({
      ...s,
      today_attendance: attendanceToday?.some((a) => a.student_id === s.id)
        ? "present"
        : null,
    })) || [];

  return {
    stats: {
      activeStudents: students?.length || 0,
      revenue,
      debtors,
      todayClasses: 0, // Implementaremos cuando definamos la tabla 'classes'
    },
    studentsWithAttendance,
  };
}
