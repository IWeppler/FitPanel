import { ExpenseTable } from "@/widgets/expense-list/ui/ExpenseTable";
import { AddExpenseModal } from "@/features/manage-expenses/ui/AddExpenseModal";
import { getExpenses } from "@/entities/expense/api/get-expenses";
import { Suspense } from "react";

export default async function GastosPage() {
  const expenses = await getExpenses();
  const totalSpent = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0,
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="heading-page">Gastos</h1>
          <p className="text-zinc-500 font-inter">
            Control de egresos y costos operativos.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-bold text-muted-foreground uppercase font-inter tracking-widest">
              Total Acumulado
            </p>
            <h2 className="text-3xl font-heading text-red-600">
              -${totalSpent.toLocaleString()}
            </h2>
          </div>
          <AddExpenseModal />
        </div>
      </header>

      <section className="space-y-4">
        <h3 className="heading-section">Historial de Movimientos</h3>
        <Suspense
          fallback={
            <div className="h-40 bg-zinc-100 animate-pulse rounded-3xl" />
          }
        >
          <ExpenseTable />
        </Suspense>
      </section>
    </div>
  );
}
