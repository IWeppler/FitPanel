"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import { studentSchema, StudentFormValues } from "../model/student-schema";
import { createStudentAction } from "../api/create-student-action";

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

export const CreateStudentModal = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      billing_type: "monthly",
      status: "active",
      due_date: null,
    },
  });

  const onSubmit: SubmitHandler<StudentFormValues> = async (data) => {
    const result = await createStudentAction(data);
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
        <Button className="font-inter font-bold gap-2">
          <Plus size={18} />
          Nuevo Alumno
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-zinc-900">
            Registrar Alumno
          </DialogTitle>
          <DialogDescription className="font-inter">
            Completa los datos para dar de alta un nuevo alumno.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="font-inter font-bold">
              Nombre Completo
            </Label>
            <Input
              id="full_name"
              {...register("full_name")}
              placeholder="Ej: Juan Pérez"
              className="font-inter"
            />
            {errors.full_name && (
              <p className="text-red-500 text-xs font-inter">
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-inter font-bold">
                Teléfono
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="11 1234 5678"
                className="font-inter"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-inter font-bold">Tipo de Pago</Label>
              <Select
                onValueChange={(v) =>
                  setValue("billing_type", v as "monthly" | "per_class")
                }
                defaultValue="monthly"
              >
                <SelectTrigger className="font-inter">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Mensual</SelectItem>
                  <SelectItem value="per_class">Por Clase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-primary font-bold font-inter text-slate-800"
          >
            {isSubmitting ? "Guardando..." : "Registrar Alumno"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
