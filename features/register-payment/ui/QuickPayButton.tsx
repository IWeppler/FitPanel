"use client";

import { registerPaymentAction } from "../api/register-payment-action";

export const QuickPayButton = ({
  studentId,
  billingType,
}: {
  studentId: string;
  billingType: string;
}) => {
  const handlePay = async () => {
    const amount = billingType === "monthly" ? 35 : 5; // Precios por defecto del MVP
    if (confirm(`¿Registrar pago de $${amount}?`)) {
      await registerPaymentAction({
        studentId,
        amount,
        method: "efectivo", // Por defecto para rapidez
        billingType: billingType as any,
      });
    }
  };

  return (
    <button
      onClick={handlePay}
      className="p-2 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-full transition-colors"
      title="Registrar pago rápido"
    >
      💰
    </button>
  );
};
