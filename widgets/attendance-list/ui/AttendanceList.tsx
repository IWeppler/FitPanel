import { getPaymentStatus } from "@/entities/student/model/payment-logic";
import { StudentStatusBadge } from "@/entities/student/ui/StudentStatusBadge";
import { AttendanceToggleButton } from "@/features/mark-attendance/api/ui/AttendanceToggleButton";

export const AttendanceList = ({
  students,
  classId,
}: {
  students: any[];
  classId: string;
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="divide-y divide-gray-100">
        {students.map((student) => {
          const pStatus = getPaymentStatus(
            student.due_date,
            student.current_debt,
            student.plan_price,
          );
          const isPresent = student.today_attendance === "present";

          return (
            <div
              key={student.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">
                  {student.full_name}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <StudentStatusBadge status={pStatus} />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AttendanceToggleButton
                  studentId={student.id}
                  classId={classId}
                  isPresent={isPresent}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
