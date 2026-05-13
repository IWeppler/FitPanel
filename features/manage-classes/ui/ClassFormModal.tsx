"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useClassModal } from "../model/use-class-modal";
import { createClient } from "@/shared/api/supabase/client";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Loader2 } from "lucide-react";

const classFormSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  days: z.array(z.string()).min(1, "Elegí al menos un día"),
  start_time: z.string().min(5, "Hora requerida"),
  end_time: z.string().min(5, "Hora requerida"),
  capacity: z.number().min(1, "Mínimo 1"),
});

type ClassFormValues = z.infer<typeof classFormSchema>;

const DAYS = [
  { id: "0", label: "Dom" },
  { id: "1", label: "Lun" },
  { id: "2", label: "Mar" },
  { id: "3", label: "Mié" },
  { id: "4", label: "Jue" },
  { id: "5", label: "Vie" },
  { id: "6", label: "Sáb" },
];

export function ClassFormModal() {
  const { state, closeModal } = useClassModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      name: "",
      days: [],
      start_time: "14:00",
      capacity: 10,
    },
  });

  useEffect(() => {
    if (state.isOpen) {
      if (state.mode === "edit" && state.initialData) {
        reset({
          name: state.initialData.name,
          days: [state.initialData.day_of_week?.toString()],
          start_time: state.initialData.start_time,
          end_time: state.initialData.end_time,
          capacity: state.initialData.capacity,
        });
      } else {
        reset({
          name: "",
          days: state.initialData?.day_of_week
            ? [state.initialData.day_of_week.toString()]
            : [],
          start_time: "14:00",
          end_time: "15:00",
          capacity: 10,
        });
      }
    }
  }, [state, reset]);

  const onSubmit = async (values: ClassFormValues) => {
    try {
      const supabase = createClient();

      const payloadBase = {
        name: values.name,
        start_time: values.start_time,
        end_time: values.end_time,
        capacity: Number(values.capacity),
      };

      if (state.mode === "edit" && state.initialData?.id) {
        const { error } = await supabase
          .from("classes")
          .update({
            ...payloadBase,
            day_of_week: Number(values.days[0]),
          })
          .eq("id", state.initialData.id);

        if (error) {
          alert("Error de Supabase al editar: " + error.message);
          return;
        }
      } else {
        const records = values.days.map((dayId) => ({
          ...payloadBase,
          day_of_week: Number(dayId),
        }));

        const { error } = await supabase.from("classes").insert(records);

        if (error) {
          alert("Error de Supabase al crear: " + error.message);
          return;
        }
      }

      router.refresh();
      closeModal();
    } catch (error: any) {
      console.error("Error general:", error);
      alert("Error inesperado en la app: " + error.message);
    }
  };

  return (
    <Dialog open={state.isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md rounded-[32px] border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading uppercase">
            {state.mode === "edit" ? "Editar Turno" : "Nuevo Turno"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 font-inter"
        >
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-bold text-zinc-700">
              Nombre de la Clase
            </Label>
            <Input
              id="name"
              className="bg-zinc-50 border-zinc-100"
              placeholder="Ej: Entrenamiento Funcional"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Días */}
          <div className="space-y-3">
            <Label className="text-sm font-bold text-zinc-700">
              {state.mode === "create" ? "Días de la semana" : "Día"}
            </Label>
            <Controller
              name="days"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((day) => {
                    const isChecked = field.value.includes(day.id);
                    return (
                      <div key={day.id} className="flex items-center">
                        <Checkbox
                          id={`day-${day.id}`}
                          className="hidden"
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            if (state.mode === "edit") {
                              field.onChange([day.id]);
                            } else {
                              const newValue = checked
                                ? [...field.value, day.id]
                                : field.value.filter((v) => v !== day.id);
                              field.onChange(newValue);
                            }
                          }}
                        />
                        <Label
                          htmlFor={`day-${day.id}`}
                          className={`
                            cursor-pointer px-3 py-2 rounded-xl border text-xs font-bold transition-all
                            ${
                              isChecked
                                ? "bg-zinc-900 text-white border-zinc-900 shadow-md scale-105"
                                : "bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300"
                            }
                          `}
                        >
                          {day.label}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              )}
            />
            {errors.days && (
              <p className="text-xs text-red-500">{errors.days.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="start_time"
                className="text-sm font-bold text-zinc-700"
              >
                Hora Inicio
              </Label>
              <Input
                id="start_time"
                type="time"
                className="bg-zinc-50"
                {...register("start_time")}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="end_time"
                className="text-sm font-bold text-zinc-700"
              >
                Fin
              </Label>
              <Input
                id="end_time"
                type="time"
                className="rounded-xl bg-zinc-50"
                {...register("end_time")}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="capacity"
                className="text-sm font-bold text-zinc-700"
              >
                Cupo Máximo
              </Label>
              <Input
                id="capacity"
                type="number"
                className="bg-zinc-50"
                {...register("capacity")}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 text-white  uppercase tracking-tight shadow-xl shadow-zinc-200"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : state.mode === "edit" ? (
              "Guardar Cambios"
            ) : (
              "Crear Turnos"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
