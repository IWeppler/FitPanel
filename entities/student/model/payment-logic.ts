import { PaymentStatus } from "./types";

export const getPaymentStatus = (
  dueDate: string | null,
  debt: number,
  planPrice: number,
): PaymentStatus => {
  if (!dueDate) return "pending";

  const today = new Date();
  const due = new Date(dueDate);

  // Si tiene deuda pero la fecha es futura, es un pago parcial del mes actual
  if (debt > 0 && debt < planPrice) {
    return "partial";
  }

  // Si ya se pasó la fecha y sigue debiendo algo
  if (today > due && debt > 0) {
    return "late";
  }

  // Si la fecha es futura y no debe nada (o debe exactamente el plan del mes que viene)
  return "paid";
};
