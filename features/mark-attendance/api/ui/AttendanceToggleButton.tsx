"use client";

import { toggleAttendanceAction } from "@/features/mark-attendance/api/toggle-attendance-action";

interface Props {
  studentId: string;
  classId: string;
  isPresent: boolean;
}

export const AttendanceToggleButton = ({
  studentId,
  classId,
  isPresent,
}: Props) => {
  return (
    <button
      onClick={async () => {
        await toggleAttendanceAction(
          studentId,
          classId,
          isPresent ? "present" : null,
        );
      }}
      className={`px-4 py-2 rounded-lg font-bold transition-all ${
        isPresent
          ? "bg-green-600 text-white shadow-md"
          : "bg-gray-100 text-gray-400 border border-gray-200"
      }`}
    >
      {isPresent ? "PRESENTE" : "AUSENTE"}
    </button>
  );
};
