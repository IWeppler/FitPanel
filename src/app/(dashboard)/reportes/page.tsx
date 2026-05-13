import { ExecutiveSummary } from "@/widgets/report-summary/ui/ExecutiveSummary";
import { PaymentMethodBreakdown } from "@/widgets/report-charts/ui/PaymentMethodBreakdown";
import { Suspense } from "react";
import { Users } from "lucide-react";

export default function ReportesPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="heading-page">Reporte de Negocio</h1>
        <p className="text-muted-foreground">
          Análisis de rendimiento mensual y salud financiera.
        </p>
      </header>

      {/* Dashboard de Números Grandes */}
      <Suspense
        fallback={
          <div className="h-40 bg-zinc-100 animate-pulse rounded-3xl" />
        }
      >
        <ExecutiveSummary />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Métodos de Pago */}
        <Suspense
          fallback={
            <div className="h-64 bg-zinc-100 animate-pulse rounded-3xl" />
          }
        >
          <PaymentMethodBreakdown />
        </Suspense>

        {/* Card de Salud de Alumnos */}
        <div className="p-8 bg-zinc-50 rounded-3xl border border-dashed border-zinc-300 flex flex-col justify-center items-center text-center space-y-4">
          <div className="p-4 bg-white rounded-full shadow-sm text-primary">
            <Users size={32} />
          </div>
          <div>
            <h4 className="text-2xl font-heading text-zinc-800 italic">
              Próximamente: Churn Rate
            </h4>
            <p className="text-sm text-zinc-500 font-inter max-w-[250px] mx-auto mt-2">
              Estamos procesando la retención de alumnos para mostrarte cuántos
              renovaron este mes.
            </p>
          </div>
        </div>
      </div>

      <footer className="pt-10 border-t border-zinc-200">
        <p className="text-xs text-zinc-400 font-inter text-center">
          Los datos se actualizan en tiempo real basándose en los módulos de
          Pagos y Gastos.
        </p>
      </footer>
    </div>
  );
}
