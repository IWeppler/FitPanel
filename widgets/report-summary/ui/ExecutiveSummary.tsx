import { getMonthlyReport } from "@/entities/report/api/get-monthly-report";

export async function ExecutiveSummary() {
  const data = await getMonthlyReport();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Ingresos Totales */}
      <div className="p-6 bg-white rounded-3xl border border-border shadow-sm">
        <p className="text-xs font-bold text-muted-foreground uppercase font-inter tracking-widest">Ingresos Totales</p>
        <h3 className="text-4xl font-heading text-emerald-600 mt-2">${data.income}</h3>
        <p className="text-xs text-zinc-400 mt-2 font-inter">{data.totalTransactions} transacciones este mes</p>
      </div>

      {/* Gastos Totales */}
      <div className="p-6 bg-white rounded-3xl border border-border shadow-sm">
        <p className="text-xs font-bold text-muted-foreground uppercase font-inter tracking-widest">Gastos Totales</p>
        <h3 className="text-4xl font-heading text-red-500 mt-2">-${data.outcome}</h3>
        <p className="text-xs text-zinc-400 mt-2 font-inter">Cargas operativas registradas</p>
      </div>

      {/* Resultado Neto */}
      <div className={`p-6 rounded-3xl border shadow-lg ${data.net >= 0 ? 'bg-zinc-900 border-zinc-800' : 'bg-red-900 border-red-800'}`}>
        <p className="text-xs font-bold text-zinc-400 uppercase font-inter tracking-widest">Resultado Neto</p>
        <h3 className="text-4xl font-heading text-white mt-2">
          {data.net < 0 && '-'}${Math.abs(data.net)}
        </h3>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[10px] font-bold py-1 px-2 bg-white/10 text-white rounded-full font-inter">
            BALANCE REAL
          </span>
        </div>
      </div>
    </div>
  );
}