export interface Payment {
  id: string;
  student_id: string;
  amount: number;
  method: string; // 'efectivo', 'transferencia', etc.
  category: "cuota" | "clase_suelta";
  paid_at: string;
  notes: string | null;
}
