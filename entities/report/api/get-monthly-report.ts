import { createClient } from "@/shared/api/supabase/server";
import dayjs from "dayjs";

export async function getMonthlyReport() {
  const supabase = await createClient();

  const startOfMonth = dayjs().startOf("month").toISOString();
  const endOfMonth = dayjs().endOf("month").toISOString();

  const [paymentsRes, expensesRes, studentsRes] = await Promise.all([
    supabase
      .from("payments")
      .select("amount, method")
      .gte("paid_at", startOfMonth)
      .lte("paid_at", endOfMonth),
    supabase
      .from("expenses")
      .select("amount, category")
      .gte("spent_at", startOfMonth)
      .lte("spent_at", endOfMonth),
    supabase.from("students").select("id, status, billing_type"),
  ]);

  const income =
    paymentsRes.data?.reduce((acc, p) => acc + Number(p.amount), 0) || 0;
  const outcome =
    expensesRes.data?.reduce((acc, e) => acc + Number(e.amount), 0) || 0;

  return {
    income,
    outcome,
    net: income - outcome,
    activeStudents:
      studentsRes.data?.filter((s) => s.status === "active").length || 0,
    totalTransactions: paymentsRes.data?.length || 0,
  };
}
