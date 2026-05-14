"use client";

import { Pencil, DollarSign, UserMinus, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { createClient } from "@/shared/api/supabase/client";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

// 1. Esquema de validación con Zod
const paymentSchema = z.object({
  paymentType: z.enum(["full", "partial"]),
  amount: z.coerce.number().min(1, "El monto debe ser mayor a 0"),
  method: z.enum(["cash", "transfer"]),
});

// Tipos extraídos para que TS no llore
type PaymentFormInput = z.input<typeof paymentSchema>;
type PaymentFormValues = z.output<typeof paymentSchema>;

export function StudentActions({ student }: { student: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  // Datos del alumno para cálculos
  const remainingDebt = student.current_debt ?? 0;
  const planPrice = student.plan_price ?? 0;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentFormInput, unknown, PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentType: "full",
      amount: remainingDebt > 0 ? remainingDebt : planPrice,
      method: "cash",
    },
  });

  const paymentType = watch("paymentType");

  // Efecto para autocompletar monto si elige "Completo"
  useEffect(() => {
    if (paymentType === "full") {
      setValue("amount", remainingDebt > 0 ? remainingDebt : planPrice);
    }
  }, [paymentType, remainingDebt, planPrice, setValue]);

  const onSubmitPayment = async (values: PaymentFormValues) => {
    setIsPaying(true);
    try {
      // 1. Registrar el pago
      const isFull =
        values.paymentType === "full" || values.amount >= remainingDebt;

      const { error: payError } = await supabase.from("payments").insert({
        student_id: student.id,
        amount: values.amount,
        method: values.method,
        category: "cuota",
        notes: isFull ? "Pago completo" : "Pago parcial",
      });

      if (payError) throw payError;

      // 2. Lógica de Deuda y Vencimiento
      let newDebt = Math.max(0, remainingDebt - values.amount);
      let newDueDate = student.due_date;

      if (newDebt <= 0) {
        const date = student.due_date ? new Date(student.due_date) : new Date();
        date.setMonth(date.getMonth() + 1);
        newDueDate = date.toISOString();
        newDebt = planPrice;
      }

      const { error: studentError } = await supabase
        .from("students")
        .update({
          current_debt: newDebt,
          due_date: newDueDate,
        })
        .eq("id", student.id);

      if (studentError) throw studentError;

      reset();
      setIsPaymentOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error al registrar el pago");
    } finally {
      setIsPaying(false);
    }
  };

  const openWhatsApp = () => {
    if (!student.phone) return alert("No tiene teléfono registrado");
    window.open(`https://wa.me/${student.phone.replace(/\D/g, "")}`, "_blank");
  };

  const handleDeactivate = async () => {
    setIsDeactivating(true);
    await supabase
      .from("students")
      .update({ status: "inactive" })
      .eq("id", student.id);
    setIsDeactivating(false);
    setIsAlertOpen(false);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPaymentOpen(true)}
          className="h-8 w-8 text-emerald-600 hover:bg-emerald-50"
        >
          <DollarSign size={16} />
        </Button>
        <DialogContent className="sm:max-w-md rounded-[32px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading uppercase tracking-tighter">
              Registrar Pago
            </DialogTitle>
            <DialogDescription>
              Cobro para {student.full_name}
            </DialogDescription>

            {/* Info de Deuda */}
            <div className="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl mt-4 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Deuda Actual
                </p>
                <p className="text-2xl font-heading">
                  ${remainingDebt.toLocaleString()}
                </p>
              </div>
              {remainingDebt > 0 ? (
                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-bold uppercase">
                  Pendiente
                </span>
              ) : (
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold uppercase">
                  Al día
                </span>
              )}
            </div>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmitPayment)}
            className="space-y-6 pt-4 font-inter"
          >
            <div className="space-y-3">
              <Label className="font-bold text-zinc-700">
                ¿Qué está pagando?
              </Label>
              <Controller
                name="paymentType"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => field.onChange("full")}
                      className={`py-3 rounded-xl border-2 text-xs font-bold transition-all ${field.value === "full" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-100 text-zinc-400"}`}
                    >
                      TOTALIDAD
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("partial")}
                      className={`py-3 rounded-xl border-2 text-xs font-bold transition-all ${field.value === "partial" ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-100 text-zinc-400"}`}
                    >
                      PAGO PARCIAL
                    </button>
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold text-zinc-700">
                  Monto <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  {...register("amount")}
                  className="h-12 font-bold text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-zinc-700">Medio</Label>
                <Controller
                  name="method"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Efectivo</SelectItem>
                        <SelectItem value="transfer">Transferencia</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPaying}
              className="w-full h-14 bg-zinc-900 text-white rounded-2xl font-bold uppercase"
            >
              {isPaying ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Confirmar Cobro"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Button
        variant="ghost"
        size="icon"
        onClick={openWhatsApp}
        className="h-8 w-8 text-emerald-500 hover:bg-emerald-50"
      >
        <FaWhatsapp size={16} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-zinc-400 hover:bg-zinc-100"
      >
        <Pencil size={16} />
      </Button>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-400 hover:text-red-600"
          >
            <UserMinus size={16} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Dar de baja?</AlertDialogTitle>
            <AlertDialogDescription>
              El alumno pasará a estado inactivo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeactivate}
              className="bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
