"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { supabase } from "@/shared/api/supabase";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

// 1. Tipado fuerte sin 'any'
interface ClassFormValues {
  name: string;
  day_of_week: string; // Viene como string del Select
  start_time: string;
  capacity: string; // Viene como string del Input number
}

const DAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export function CreateClassModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<ClassFormValues>();

  const onSubmit: SubmitHandler<ClassFormValues> = async (data) => {
    // Tipamos y transformamos los datos antes de enviarlos a DB
    const { error } = await supabase.from("classes").insert([
      {
        name: data.name,
        day_of_week: Number.parseInt(data.day_of_week),
        start_time: data.start_time,
        capacity: Number.parseInt(data.capacity),
      },
    ]);

    if (!error) {
      reset();
      setOpen(false); // Cierra el modal tras el éxito
      router.refresh(); // Actualiza la grilla de turnos
    } else {
      console.error("Error al crear turno:", error.message);
      alert("Hubo un error al guardar el turno. Verifica la consola.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-inter font-bold gap-2">
          <Plus size={18} />
          Nuevo Turno
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-zinc-900">
            Configurar Nuevo Turno
          </DialogTitle>
          <DialogDescription className="font-inter">
            Añadí una nueva clase a la agenda semanal de LVEM.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-inter font-bold">
              Nombre de la Clase
            </Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder="Ej: Funcional / Yoga"
              className="font-inter"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-inter font-bold">Día de la Semana</Label>
            <Select onValueChange={(v) => setValue("day_of_week", v)} required>
              <SelectTrigger className="font-inter">
                <SelectValue placeholder="Seleccionar día" />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((day, idx) => (
                  <SelectItem key={idx} value={idx.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time" className="font-inter font-bold">
                Hora de Inicio
              </Label>
              <Input
                id="start_time"
                type="time"
                {...register("start_time", { required: true })}
                className="font-inter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity" className="font-inter font-bold">
                Cupo Máximo
              </Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                {...register("capacity", { required: true })}
                placeholder="Ej: 12"
                className="font-inter"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-primary font-bold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar Turno"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
