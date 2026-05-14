"use client";

import { useStudentSheet } from "@/features/manage-students/model/use-student-sheet";
import { Student } from "@/entities/student/model/types";

export function StudentNameTrigger({
  student,
}: Readonly<{ student: Student }>) {
  const { openSheet } = useStudentSheet();

  return (
    <button
      onClick={() => openSheet(student)}
      className="flex flex-col text-left group/link focus:outline-none"
    >
      <span className="text-sm text-foreground cursor-pointer group-hover/link:text-primary transition-colors font-semibold uppercase tracking-tight">
        {student.full_name}
      </span>
      <span className="text-xs text-zinc-400 font-medium">
        {student.phone || "Sin teléfono"}
      </span>
    </button>
  );
}
