"use client";

import { Pencil, Trash2, DollarSign, MessageCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { createClient } from "@/shared/api/supabase/client";
import { useRouter } from "next/navigation";

interface StudentActionsProps {
  student: {
    id: string;
    full_name: string;
    phone: string | null;
  };
}

export function StudentActions({ student }: Readonly<StudentActionsProps>) {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar permanentemente a ${student.full_name}?`)) return;
    await supabase.from("students").delete().eq("id", student.id);
    router.refresh();
  };

  const openWhatsApp = () => {
    if (!student.phone) return alert("No tiene teléfono registrado");
    const num = student.phone.replace(/\s+/g, "");
    window.open(`https://wa.me/${num}`, "_blank");
  };

  return (
    <div className="flex items-center justify-end gap-1">
      {/* Acción de Cobro Rápido */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
        title="Registrar Pago"
      >
        <DollarSign size={16} />
      </Button>

      {/* WhatsApp Directo */}
      <Button
        variant="ghost"
        size="icon"
        onClick={openWhatsApp}
        className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
        title="Enviar WhatsApp"
      >
        <MessageCircle size={16} />
      </Button>

      {/* Editar */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
        title="Editar"
      >
        <Pencil size={16} />
      </Button>

      {/* Eliminar */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="h-8 w-8 text-zinc-300 hover:text-red-600 hover:bg-red-50"
        title="Eliminar"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
