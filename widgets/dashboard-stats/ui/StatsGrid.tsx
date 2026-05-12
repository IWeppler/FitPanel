import { StatCard } from "./StatCard";
import { getDashboardSummary } from "../api/getSummary";

export const StatsGrid = async () => {
  const stats = await getDashboardSummary();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Alumnos Activos"
        value={stats.activeStudents}
        color="blue"
      />
      <StatCard
        label="Ingresos Mes"
        value={`$${stats.revenue}`}
        description="Estimado actual"
        color="green"
      />
      <StatCard
        label="Cuotas Vencidas"
        value={stats.pendingPayments}
        description="Requieren atención"
        color="red"
      />
      <StatCard label="Turnos Hoy" value={stats.todayClasses} color="yellow" />
    </div>
  );
};
