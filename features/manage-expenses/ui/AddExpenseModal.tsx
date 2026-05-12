"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Plus, Loader2, Receipt } from "lucide-react";
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

interface ExpenseFormValues {
  category: string;
  amount: string;
  description: string;
  spent_at?: string;
}

const CATEGORIES = [
  "Alquiler",
  "Servicios",
  "Sueldos",
  "Limpieza",
  "Mantenimiento",
  "Marketing",
  "Otros",
];

export function AddExpenseModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<ExpenseFormValues>();

  const onSubmit: SubmitHandler<ExpenseFormValues> = async (data) => {
    const { error } = await supabase.from("expenses").insert([
      {
        category: data.category,
        amount: Number.parseFloat(data.amount),
        description: data.description,
        spent_at: data.spent_at || new Date().toISOString(),
      },
    ]);

    if (!error) {
      reset();
      setOpen(false);
      router.refresh();
    } else {
      console.error("Error al registrar gasto:", error.message);
      alert("No se pudo registrar el gasto.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="font-inter font-bold gap-2">
          <Plus size={18} />
          Registrar Gasto
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Receipt className="text-red-600" size={20} />
            <DialogTitle className="text-2xl font-heading text-zinc-900">
              Registrar Nuevo Gasto
            </DialogTitle>
          </div>
          <DialogDescription className="font-inter">
            Ingresá los detalles del egreso para mantener la caja al día.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="font-inter font-bold">
                Monto ($)
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...register("amount", { required: true })}
                placeholder="0.00"
                className="font-inter"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-inter font-bold">Categoría</Label>
              <Select onValueChange={(v) => setValue("category", v)} required>
                <SelectTrigger className="font-inter text-zinc-500">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-inter font-bold">
              Descripción / Nota
            </Label>
            <Input
              id="description"
              {...register("description")}
              placeholder="Ej: Pago de luz factura #123"
              className="font-inter"
            />
          </div>

          <Button
            type="submit"
            variant="destructive"
            disabled={isSubmitting}
            className="w-full h-12 font-bold font-inter"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              "Confirmar Gasto"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
