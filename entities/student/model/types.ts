export type BillingType = "monthly" | "per_class";
export type StudentStatus = "active" | "inactive";

export interface Student {
  id: string;
  full_name: string;
  phone: string | null;
  status: StudentStatus;
  billing_type: BillingType;
  due_date: string | null; // ISO Date
  created_at: string;
}

// Para el estado visual en la asistencia
export type PaymentStatus = "up_to_date" | "debtor" | "due_today";
