import { supabase } from "@/shared/api/supabase";
import dayjs from "dayjs";

export interface PaymentWithStudent {
  id: string;
  amount: number;
  method: string;
  category: string;
  paid_at: string;
  notes: string | null;
  students: {
    full_name: string;
  } | null;
}

export async function getPayments(filters: {
  method?: string;
  range?: string;
}) {
  let query = supabase
    .from("payments")
    .select(
      `
      id, amount, method, category, paid_at, notes,
      students ( full_name )
    `,
    )
    .order("paid_at", { ascending: false });

  // Filtro por Método
  if (filters.method && filters.method !== "all") {
    query = query.eq("method", filters.method);
  }

  // Filtro por Rango de Fecha
  if (filters.range) {
    const now = dayjs();
    if (filters.range === "today") {
      query = query
        .gte("paid_at", now.startOf("day").toISOString())
        .lte("paid_at", now.endOf("day").toISOString());
    } else if (filters.range === "month") {
      query = query.gte("paid_at", now.startOf("month").toISOString());
    }
  }

  const { data, error } = await query;

  if (error) throw error;

  return data as unknown as PaymentWithStudent[];
}
