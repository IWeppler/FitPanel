"use client";

import { GymClass } from "@/entities/class/model/types";
import { createContext, useContext, useState } from "react";

type ModalState = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialData?: Partial<GymClass>;
};

const ClassModalContext = createContext<{
  state: ModalState;
  openCreate: (defaultDay?: number) => void;
  openEdit: (data: GymClass) => void;
  closeModal: () => void;
} | null>(null);

export const ClassModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    mode: "create",
  });

  const openCreate = (defaultDay?: number) =>
    setState({
      isOpen: true,
      mode: "create",
      initialData: { day_of_week: defaultDay },
    });

  const openEdit = (data: GymClass) =>
    setState({ isOpen: true, mode: "edit", initialData: data });

  const closeModal = () => setState((prev) => ({ ...prev, isOpen: false }));

  return (
    <ClassModalContext.Provider
      value={{ state, openCreate, openEdit, closeModal }}
    >
      {children}
    </ClassModalContext.Provider>
  );
};

export const useClassModal = () => {
  const context = useContext(ClassModalContext);
  if (!context) throw new Error("useClassModal must be used within Provider");
  return context;
};
