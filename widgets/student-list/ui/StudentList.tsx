import { getAllStudents } from "@/entities/student/api/get-all-students";
import { getPaymentStatus } from "@/entities/student/model/payment-logic";
import { StudentStatusBadge } from "@/entities/student/ui/StudentStatusBadge";

export const StudentList = async () => {
  const students = await getAllStudents();

  if (students.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500">Aún no hay alumnos registrados.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      {/* Vista de Tabla para Desktop / Lista para Mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                Alumno
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase hidden md:table-cell">
                Plan
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">
                Estado Pago
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student) => {
              const pStatus = getPaymentStatus(student.due_date);

              return (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {student.full_name}
                      </span>
                      <span className="text-xs text-gray-400 md:hidden">
                        {student.billing_type === "monthly"
                          ? "Mensual"
                          : "Por Clase"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-sm text-gray-600 capitalize">
                      {student.billing_type === "monthly"
                        ? "Mensual"
                        : "Por Clase"}
                    </span>
                  </td>
                  <td className="p-4">
                    <StudentStatusBadge status={pStatus} />
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-md hover:bg-blue-50">
                      Ver Perfil
                    </button>
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
