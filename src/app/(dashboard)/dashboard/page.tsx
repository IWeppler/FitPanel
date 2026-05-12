import { getDashboardData } from "@/entities/student/api/get-dashboard-data";
import { AttendanceList } from "@/widgets/attendance-list/ui/AttendanceList";
import { Suspense } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export default async function DashboardPage() {
  const { stats, studentsWithAttendance } = await getDashboardData();

  return (
    <main className="space-y-8">
      <header>
        <h1 className="heading-page">
          Panel Principal
        </h1>
        <p className="text-muted-foreground capitalize">
          {dayjs().format("dddd, D [de] MMMM")}
        </p>
      </header>

      {/* Métricas con datos reales */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-lg border border-border">
          <p className="text-xs font-bold text-muted-foreground uppercase">
            Alumnos Activos
          </p>
          <h3 className="text-3xl font-heading mt-2">{stats.activeStudents}</h3>
        </div>
        <div className="p-6 bg-white rounded-lg border border-border">
          <p className="text-xs font-bold text-muted-foreground uppercase">
            Ingresos Mes
          </p>
          <h3 className="text-3xl font-heading mt-2 text-green-600">
            ${stats.revenue}
          </h3>
        </div>
        <div className="p-6 bg-white rounded-lg border border-border">
          <p className="text-xs font-bold text-muted-foreground uppercase">
            Deudores
          </p>
          <h3 className="text-3xl font-heading mt-2 text-destructive">
            {stats.debtors}
          </h3>
        </div>
        <div className="p-6 bg-white rounded-lg border border-border">
          <p className="text-xs font-bold text-muted-foreground uppercase">
            Turnos Hoy
          </p>
          <h3 className="text-3xl font-heading mt-2">--</h3>
        </div>
      </section>

      {/* Lista de Asistencia Real */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="heading-section">Asistencia de Hoy</h2>
          <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-blue-500 rounded-full uppercase">
            Clase Grupal
          </span>
        </div>

        <Suspense fallback={<p>Actualizando lista...</p>}>
          <AttendanceList
            students={studentsWithAttendance}
            classId="default-class-id"
          />
        </Suspense>
      </section>
    </main>
  );
}
