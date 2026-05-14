"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, User, Phone, Scale, ClipboardList } from "lucide-react";

import { studentSchema, type StudentFormInput } from "../model/student-schema";
import { createStudentAction } from "../api/create-student-action";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
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
import { ScrollArea } from "@/shared/ui/scroll-area";

export const CreateStudentModal = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<StudentFormInput>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      dni: "",
      birth_date: "",
      weight: "",
      height: "",
      billing_type: "monthly",
      status: "active",
      medical_notes: "",
      emergency_contact: "",
    },
  });

  const onSubmit: SubmitHandler<StudentFormInput> = async (data) => {
    const result = await createStudentAction(data as any);
    if (result.success) {
      reset();
      setOpen(false);
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-inter font-bold gap-2 shadow-lg shadow-primary/20">
          <Plus size={18} />
          Nuevo Alumno
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-3xl border-none">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-heading text-zinc-900 uppercase tracking-tight">
            Registrar Alumno
          </DialogTitle>
          <DialogDescription className="font-inter">
            Completa la ficha técnica para dar de alta al nuevo integrante de
            LVEM.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <ScrollArea className="max-h-[70vh] px-6 py-4">
            <div className="space-y-6">
              {/* SECCIÓN: DATOS PERSONALES */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <User size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Información Personal
                  </span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="full_name" className="font-bold">
                    Nombre Completo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="full_name"
                    {...register("full_name")}
                    placeholder="Juan Pérez"
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-xs">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dni" className="font-bold">
                      DNI
                    </Label>
                    <Input
                      id="dni"
                      {...register("dni")}
                      placeholder="12.345.678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birth_date" className="font-bold">
                      Fecha de Nacimiento
                    </Label>
                    <Input
                      id="birth_date"
                      type="date"
                      {...register("birth_date")}
                    />
                  </div>
                </div>
              </div>

              {/* SECCIÓN: CONTACTO */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Phone size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Contacto
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-bold">
                      Teléfono Celular
                    </Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="11 5470 2118"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact" className="font-bold">
                      Contacto de Emergencia
                    </Label>
                    <Input
                      id="emergency_contact"
                      {...register("emergency_contact")}
                      placeholder="Nombre / Tel"
                    />
                  </div>
                </div>
              </div>

              {/* SECCIÓN: DATOS FÍSICOS Y PLAN */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Scale size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Físico y Plan
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="font-bold">
                      Peso (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      {...register("weight")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height" className="font-bold">
                      Altura (cm)
                    </Label>
                    <Input id="height" type="number" {...register("height")} />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">
                      Plan <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={(v) =>
                        setValue("billing_type", v as "monthly" | "per_class")
                      }
                      defaultValue="monthly"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Mensual</SelectItem>
                        <SelectItem value="per_class">Por Clase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* SECCIÓN: SALUD */}
              <div className="space-y-4 pt-2 pb-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <ClipboardList size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Notas Médicas
                  </span>
                </div>
                <div className="space-y-2">
                  <Textarea
                    id="medical_notes"
                    {...register("medical_notes")}
                    placeholder="Lesiones, patologías o medicación relevante..."
                    className="h-24 resize-none"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-6 bg-zinc-50 border-t border-zinc-100">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-2xl transition-all"
            >
              {isSubmitting ? "Registrando..." : "Confirmar Alta de Alumno"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
