import { getMonthlyReport } from "@/entities/report/api/get-monthly-report";

export async function PaymentMethodBreakdown() {
  const data = await getMonthlyReport();
  const methods = data.byMethod || {};

  return (
    <div className="p-8 bg-white rounded-3xl border border-border shadow-sm space-y-6">
      <h4 className="text-xl font-heading text-zinc-800">
        Distribución por Método
      </h4>

      <div className="space-y-4">
        {Object.entries(methods).map(([method, amount]: [string, any]) => {
          const percentage = ((amount / data.income) * 100).toFixed(0);
          return (
            <div key={method} className="space-y-2">
              <div className="flex justify-between text-sm font-inter">
                <span className="capitalize font-medium text-zinc-600">
                  {method}
                </span>
                <span className="font-bold text-zinc-900">
                  ${amount} ({percentage}%)
                </span>
              </div>
              <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
