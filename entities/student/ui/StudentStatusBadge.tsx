import { PaymentStatus } from "../model/types";

export const StudentStatusBadge = ({ status }: { status: PaymentStatus }) => {
  const styles: Record<PaymentStatus, string> = {
    paid: "bg-green-100 text-green-700 border-green-200",
    late: "bg-red-100 text-red-700 border-red-200",
    partial: "bg-yellow-100 text-yellow-700 border-yellow-200",
    pending: "bg-zinc-100 text-zinc-700 border-zinc-200",
  };

  const labels: Record<PaymentStatus, string> = {
    paid: "Al dia",
    late: "Vencido",
    partial: "Pago parcial",
    pending: "Pendiente",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};
