"use client";
import { useClassModal } from "../model/use-class-modal";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function NewClassButton() {
  const { openCreate } = useClassModal();

  return (
    <Button onClick={() => openCreate()}>
      <Plus size={20} strokeWidth={3} />
      Nuevo Turno
    </Button>
  );
}
