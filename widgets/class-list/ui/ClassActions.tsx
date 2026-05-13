"use client";

import { useClassModal } from "@/features/manage-classes/model/use-class-modal";
import { createClient } from "@/shared/api/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { GymClass } from "@/entities/class/model/types";
import { useRouter } from "next/navigation";

export function ClassActions({ classData }: Readonly<{ classData: GymClass }>) {
  const { openEdit } = useClassModal();
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar la clase "${classData.name}"?`))
      return;

    const { error } = await supabase
      .from("classes")
      .delete()
      .eq("id", classData.id);

    if (error) {
      alert("Error al eliminar: " + error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1 hover:bg-zinc-50 rounded-full cursor-pointer">
        <MoreVertical size={14} className="text-zinc-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl">
        <DropdownMenuItem onClick={() => openEdit(classData)} className="gap-2">
          <Pencil size={12} /> Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="gap-2 text-red-600">
          <Trash2 size={12} /> Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
