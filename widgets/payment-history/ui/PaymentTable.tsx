import { getPayments } from "@/entities/payment/api/get-payments";
import dayjs from "dayjs";

export async function PaymentTable({
  filters = {},
}: {
  filters?: { method?: string; range?: string };
}) {
  const payments = await getPayments(filters);

  return (
    <div className="bg-white border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-border">
              <th className="p-4 text-xs font-bold text-muted-foreground uppercase font-inter">
                Fecha
              </th>
              <th className="p-4 text-xs font-bold text-muted-foreground uppercase font-inter">
                Alumno
              </th>
              <th className="p-4 text-xs font-bold text-muted-foreground uppercase font-inter">
                Concepto
              </th>
              <th className="p-4 text-xs font-bold text-muted-foreground uppercase font-inter">
                Método
              </th>
              <th className="p-4 text-xs font-bold text-muted-foreground uppercase font-inter text-right">
                Monto
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.map((pay) => (
              <tr
                key={pay.id}
                className="hover:bg-zinc-50/50 transition-colors"
              >
                <td className="p-4 text-sm text-zinc-600 font-inter">
                  {dayjs(pay.paid_at).format("DD/MM/YYYY")}
                </td>
                <td className="p-4 font-medium text-zinc-900 font-inter">
                  {pay.students?.full_name || "Alumno eliminado"}
                </td>
                <td className="p-4 text-sm font-inter">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      pay.category === "cuota"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-purple-50 text-purple-700"
                    }`}
                  >
                    {pay.category.replace("_", " ")}
                  </span>
                </td>
                <td className="p-4 text-sm text-zinc-500 capitalize font-inter">
                  {pay.method}
                </td>
                <td className="p-4 text-right font-heading text-lg text-zinc-900">
                  ${pay.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
