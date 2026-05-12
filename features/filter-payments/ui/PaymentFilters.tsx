"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export function PaymentFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value === "all") params.delete(key);
    else params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const getRangeLabel = (r: string) => {
    if (r === "all") return "Todo";
    if (r === "today") return "Hoy";
    return "Mes";
  };

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-border">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-muted-foreground uppercase font-inter">
          Período:
        </span>
        <div className="flex bg-zinc-100 p-1 rounded-lg">
          {["all", "today", "month"].map((r) => (
            <Button
              variant="ghost"
              key={r}
              onClick={() => updateFilter("range", r)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all font-inter capitalize ${
                (searchParams?.get("range") ?? "all") === r
                  ? "bg-white text-foreground shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {getRangeLabel(r)}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-6 w-px bg-zinc-200 hidden md:block" />

      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-muted-foreground uppercase font-inter">
          Método:
        </span>
        <Select
          value={searchParams?.get("method") ?? "all"}
          onValueChange={(v) => updateFilter("method", v)}
        >
          <SelectTrigger className="w-[140px] h-9 text-xs font-bold font-inter">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="efectivo">Efectivo</SelectItem>
            <SelectItem value="transferencia">Transferencia</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
