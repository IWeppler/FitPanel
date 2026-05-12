import { StudentList } from "@/widgets/student-list/ui/StudentList";
import { CreateStudentModal } from "@/features/create-student/ui/CreateStudentModal";
import { Suspense } from "react";

export default function AlumnosPage() {
  return (
    <main className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="heading-page">Alumnos</h1>
          <p className="text-muted-foreground">
            Gestioná la base de datos de tu gimnasio.
          </p>
        </div>
        <CreateStudentModal />
      </header>

      <section className="grid grid-cols-1 gap-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Listado Completo
        </h2>
        <Suspense fallback={<p>Cargando alumnos...</p>}>
          <StudentList />
        </Suspense>
      </section>
    </main>
  );
}
