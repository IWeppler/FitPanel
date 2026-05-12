import { supabase } from "@/shared/api/supabase";

export async function getDashboardSummary() {
  // En un caso real, aquí haríamos Promise.all para varias consultas
  // Por ahora, simulamos la lógica que irá a Supabase
  const { count: activeStudents } = await supabase
    .from("students")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  const { data: monthlyRevenue } = await supabase
    .from("payments")
    .select("amount");
  // .gte('paid_at', startOfMonth) -- lógica de fechas aquí

  return {
    activeStudents: activeStudents || 0,
    revenue: 1500, // Hardcoded para el ejemplo
    pendingPayments: 8,
    todayClasses: 4,
  };
}
