import { PaymentTable } from "@/widgets/payment-history/ui/PaymentTable";
import { PaymentFilters } from "@/features/filter-payments/ui/PaymentFilters";
import { getPayments } from "@/entities/payment/api/get-payments";
import { Suspense } from "react";

export default async function PagosPage({
  searchParams,
}: {
  searchParams: Promise<{ method?: string; range?: string }>;
}) {
  const filters = await searchParams;
  const payments = await getPayments(filters);

  // Cálculo de totales para los Mini Stats (Reales)
  const totalCash = payments
    ?.filter((p) => p.method === "efectivo")
    .reduce((acc, p) => acc + Number(p.amount), 0);

  const totalTrans = payments
    ?.filter((p) => p.method === "transferencia")
    .reduce((acc, p) => acc + Number(p.amount), 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-page">
          Caja y Movimientos
        </h1>
        <p className="text-muted-foreground font-inter italic">
          Viendo: {filters.range || "todo el historial"}
        </p>
      </header>

      {/* Mini Stats Dinámicos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 bg-emerald-600 rounded-2xl text-white shadow-md">
          <p className="text-[10px] font-bold uppercase opacity-80 font-inter">
            Efectivo
          </p>
          <h2 className="text-3xl font-heading mt-1">${totalCash}</h2>
        </div>
        <div className="p-6 bg-sky-600 rounded-2xl text-white shadow-md">
          <p className="text-[10px] font-bold uppercase opacity-80 font-inter">
            Transferencias
          </p>
          <h2 className="text-3xl font-heading mt-1">${totalTrans}</h2>
        </div>
      </div>

      {/* Feature de Filtros */}
      <PaymentFilters />

      {/* Listado Principal */}
      <section className="space-y-4">
        <h3 className="heading-section">Últimos Movimientos</h3>
        <Suspense
          fallback={
            <div className="h-64 bg-zinc-100 animate-pulse rounded-2xl" />
          }
        >
          <PaymentTable />
        </Suspense>
      </section>
    </div>
  );
}
