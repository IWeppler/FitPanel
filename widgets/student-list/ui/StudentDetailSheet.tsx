"use client";

import { useStudentSheet } from "@/features/manage-students/model/use-student-sheet";
import { createClient } from "@/shared/api/supabase/client";
import { Button } from "@/shared/ui/button";
import { Calendar, CheckCircle2, Phone, User, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface Payment {
  id: string;
  amount: number;
  method: string;
  category: string;
  paid_at: string;
  notes: string | null;
}

export function StudentDetailSheet() {
  const { state, closeSheet } = useStudentSheet();
  const { isOpen, studentId, studentData } = state;
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchPayments = async () => {
      if (!studentId || !isOpen) return;

      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("payments")
          .select("*")
          .eq("student_id", studentId)
          .order("paid_at", { ascending: false });

        if (error) throw error;

        if (isMounted && data) {
          setPayments(data as Payment[]);
        }
      } catch (error) {
        console.error("Error al cargar historial de pagos:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPayments();

    return () => {
      isMounted = false;
      if (!isOpen) {
        setPayments([]);
      }
    };
  }, [studentId, isOpen]);

  const calculateAge = (birthDateString?: string | null) => {
    if (!birthDateString) return "---";

    const today = new Date();
    const birthDate = new Date(birthDateString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return Number.isNaN(age) ? "---" : age;
  };

  const handleWhatsApp = () => {
    if (!studentData?.phone) return;
    const cleanPhone = studentData.phone.replace(/\D/g, "");
    const finalPhone = cleanPhone.startsWith("54")
      ? cleanPhone
      : `549${cleanPhone}`;
    window.open(`https://wa.me/${finalPhone}`, "_blank");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  if (!isOpen && !studentData) return null;

  return (
    <>
      <div
        className={`fixed h-screen inset-0 bg-zinc-950/50 backdrop-blur-sm transition-opacity z-40 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeSheet}
      />

      {/* Panel lateral derecho */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transition-transform transform flex flex-col ease-in-out duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Cabecera */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 tracking-tight flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              {studentData?.full_name || "Cargando..."}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  studentData?.status === "active"
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                    : "bg-zinc-100 text-zinc-700 ring-1 ring-inset ring-zinc-500/20"
                }`}
              >
                {studentData?.status === "active" ? "Activo" : "Inactivo"}
              </span>
              <span className="text-sm text-zinc-500 capitalize">
                {studentData?.billing_type === "monthly"
                  ? "Mensual"
                  : "Por Clase"}
              </span>
            </div>
          </div>
          <button
            onClick={closeSheet}
            className="p-2 -mr-2 text-muted-foreground hover:text-muted-foreground/50 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Acciones Rápidas */}
          <section className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Acciones
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleWhatsApp}
                disabled={!studentData?.phone}
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1DA851] text-white py-2.5 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <FaWhatsapp />
                WhatsApp
              </button>
              <button className="flex items-center justify-center gap-2 w-full bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 py-2.5 px-4 rounded-xl font-medium transition-colors cursor-pointer">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Llamar
              </button>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4 bg-zinc-50 p-4 rounded-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 uppercase font-bold">
                DNI
              </span>
              <span className="text-sm font-medium">
                {studentData?.dni || "---"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 uppercase font-bold">
                Edad
              </span>
              <span className="text-sm font-medium">
                {calculateAge(studentData?.birth_date)} años
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 uppercase font-bold">
                Peso
              </span>
              <span className="text-sm font-medium">
                {studentData?.weight} kg
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 uppercase font-bold">
                Altura
              </span>
              <span className="text-sm font-medium">
                {studentData?.height} cm
              </span>
            </div>
          </section>

          {/* Sección Notas Editables */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              Notas Médicas
            </h3>
            <textarea
              defaultValue={studentData?.medical_notes}
              placeholder="Lesiones, patologías, objetivos..."
              className="w-full h-32 p-3 text-sm bg-white border border-zinc-200 rounded-xl focus:ring-2 ring-primary/20 outline-none resize-none"
            />
            <Button className="w-full">Actualizar Notas</Button>
          </section>

          {/* Historial de Pagos */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Historial de Pagos
              </h3>
            </div>

            <div className="space-y-3">
              {isLoading ? (
                // Skeleton loading state
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-white animate-pulse"
                  >
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-zinc-100 rounded"></div>
                      <div className="h-3 w-16 bg-zinc-50 rounded"></div>
                    </div>
                    <div className="h-5 w-20 bg-zinc-100 rounded"></div>
                  </div>
                ))
              ) : payments.length > 0 ? (
                payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="group flex items-center justify-between p-4 rounded-xl border border-border bg-white hover:border-zinc-200 transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-zinc-900">
                        {formatCurrency(payment.amount)}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(payment.paid_at)}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          payment.notes === "Pago completo"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {payment.notes}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {payment.method === "cash"
                          ? "Efectivo"
                          : "Transferencia"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 px-4 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
                  <CheckCircle2 className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                  <p className="text-sm text-zinc-500">
                    No hay pagos registrados aún.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
