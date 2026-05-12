import { ClassSchedule } from "@/widgets/class-list/ui/ClassSchedule";
import { CreateClassModal } from "@/features/manage-classes/ui/CreateClassModal";
import { Suspense } from "react";

export default function TurnosPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="heading-page">Clases y Turnos</h1>
          <p className="text-muted-foreground">
            Define tus horarios y cupos semanales.
          </p>
        </div>
        <CreateClassModal />
      </header>

      <section className="space-y-6">
        <h2 className="text-xl font-heading text-zinc-700">Agenda Semanal</h2>
        <Suspense fallback={<p>Cargando agenda...</p>}>
          <ClassSchedule />
        </Suspense>
      </section>
    </div>
  );
}
