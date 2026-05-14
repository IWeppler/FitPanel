import { createClient } from "@/shared/api/supabase/server";
import { getPaymentStatus } from "@/entities/student/model/payment-logic";
import { StudentStatusBadge } from "@/entities/student/ui/StudentStatusBadge";
import { StudentActions } from "./StudentActions";
import { StudentNameTrigger } from "./StudentNameTrigger";

export const StudentList = async () => {
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("*")
    .order("full_name", { ascending: true });

  if (!students || students.length === 0) {
    return (
      <p className="text-muted-foreground italic p-8 text-center">
        No hay alumnos en la base de datos.
      </p>
    );
  }

  return (
    <div className="bg-white border border-zinc-100 shadow-sm overflow-hidden font-inter">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50 border-b border-zinc-100">
              <th className="px-4 py-2 font-heading text-lg font-medium text-muted-foreground uppercase tracking-widest">
                Alumno
              </th>
              <th className="px-4 py-2 font-heading text-lg font-medium text-muted-foreground uppercase tracking-widest md:table-cell">
                Plan
              </th>
              <th className="px-4 py-2 font-heading text-lg font-medium text-muted-foreground uppercase tracking-widest">
                Estado Pago
              </th>
              <th className="px-4 md:pr-12 py-2 font-heading text-lg font-medium text-muted-foreground uppercase tracking-widest text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {students.map((student) => {
              const pStatus = getPaymentStatus(student.due_date, student.current_debt, student.plan_price);

              return (
                <tr
                  key={student.id}
                  className="hover:bg-zinc-50/80 transition-all group"
                >
                  <td className="p-5">
                    <StudentNameTrigger student={student} />
                  </td>
                  <td className="p-5 hidden md:table-cell">
                    <span className="text-xs font-bold text-zinc-600 bg-zinc-100 px-2 py-1 uppercase tracking-tighter">
                      {student.billing_type === "monthly"
                        ? "Mensual"
                        : "Por Clase"}
                    </span>
                  </td>
                  <td className="p-5">
                    <StudentStatusBadge status={pStatus} />
                  </td>
                  <td className="p-5 text-right">
                    <StudentActions student={student} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
