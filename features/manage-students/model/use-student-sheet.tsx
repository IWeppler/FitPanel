"use client";
import { createContext, useContext, useState } from "react";

type StudentSheetState = {
  isOpen: boolean;
  studentId: string | null;
  studentData: any | null;
};

const StudentSheetContext = createContext<{
  state: StudentSheetState;
  openSheet: (student: any) => void;
  closeSheet: () => void;
} | null>(null);

export const StudentSheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<StudentSheetState>({
    isOpen: false,
    studentId: null,
    studentData: null,
  });

  const openSheet = (student: any) =>
    setState({ isOpen: true, studentId: student.id, studentData: student });

  const closeSheet = () =>
    setState({ isOpen: false, studentId: null, studentData: null });

  return (
    <StudentSheetContext.Provider value={{ state, openSheet, closeSheet }}>
      {children}
    </StudentSheetContext.Provider>
  );
};

export const useStudentSheet = () => {
  const context = useContext(StudentSheetContext);
  if (!context)
    throw new Error("useStudentSheet must be used within StudentSheetProvider");
  return context;
};
