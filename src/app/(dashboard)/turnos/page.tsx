import { ClassSchedule } from "@/widgets/class-list/ui/ClassSchedule";
import { ClassFormModal } from "@/features/manage-classes/ui/ClassFormModal";
import { Suspense } from "react";
import { ClassModalProvider } from "@/features/manage-classes/model/use-class-modal";
import { NewClassButton } from "@/features/manage-classes/ui/NewClassButton";

export default function TurnosPage() {
  return (
    <ClassModalProvider>
      <div className="space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-heading text-zinc-900 uppercase tracking-tighter">
              Clases y Turnos
            </h1>
            <p className="text-muted-foreground font-inter">
              Definí tus horarios y cupos semanales.
            </p>
          </div>

          {/* Este botón ahora es un componente simple que dispara el provider */}
          <NewClassButton />
        </header>

        <section className="space-y-6">
          <Suspense
            fallback={
              <div className="h-96 bg-zinc-50 animate-pulse rounded-[32px]" />
            }
          >
            <ClassSchedule />
          </Suspense>
        </section>

        <ClassFormModal />
      </div>
    </ClassModalProvider>
  );
}
