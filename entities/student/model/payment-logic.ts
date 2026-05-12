import dayjs from "dayjs";
import { PaymentStatus } from "./types";

export const getPaymentStatus = (dueDate: string | null): PaymentStatus => {
  if (!dueDate) return "debtor"; // Si no tiene fecha, asumimos que debe o es nuevo

  const today = dayjs().startOf("day");
  const expiration = dayjs(dueDate).startOf("day");

  if (expiration.isSame(today)) return "due_today";
  if (expiration.isBefore(today)) return "debtor";
  return "up_to_date";
};
