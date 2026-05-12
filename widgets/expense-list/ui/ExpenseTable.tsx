import { getExpenses } from "@/entities/expense/api/get-expenses";
import dayjs from "dayjs";

export async function ExpenseTable() {
  const expenses = await getExpenses();

  return (
    <div className="bg-white border border-border overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-50 border-b border-border">
            <th className="p-4 text-xs font-bold text-muted-foreground uppercase font-inter">
              Fecha
            </th>
            <th className="p-4 text-xs font-bold text-muted-foreground uppercase font-inter">
              Categoría
            </th>
            <th className="p-4 text-xs font-bold text-muted-foreground uppercase font-inter">
              Nota
            </th>
            <th className="p-4 text-xs font-bold text-muted-foreground uppercase font-inter text-right">
              Monto
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {expenses.map((ex) => (
            <tr key={ex.id} className="hover:bg-red-50/30 transition-colors">
              <td className="p-4 text-sm font-inter">
                {dayjs(ex.spent_at).format("DD/MM/YY")}
              </td>
              <td className="p-4">
                <span className="text-xs font-bold px-2 py-0.5 bg-zinc-100 rounded-full font-inter">
                  {ex.category}
                </span>
              </td>
              <td className="p-4 text-sm text-zinc-500 font-inter">
                {ex.description}
              </td>
              <td className="p-4 text-right font-heading text-red-600 font-bold">
                - ${ex.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
