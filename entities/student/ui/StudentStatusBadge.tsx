import { PaymentStatus } from "../model/types";

export const StudentStatusBadge = ({ status }: { status: PaymentStatus }) => {
  const styles = {
    up_to_date: "bg-green-100 text-green-700 border-green-200",
    debtor: "bg-red-100 text-red-700 border-red-200",
    due_today: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  const labels = {
    up_to_date: "Al día",
    debtor: "Debe",
    due_today: "Vence hoy",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};
