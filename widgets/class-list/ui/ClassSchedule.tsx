import { getClasses } from "@/entities/class/api/get-classes";

const DAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export async function ClassSchedule() {
  const classes = await getClasses();

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      {DAYS.map((dayName, dayIdx) => {
        const dayClasses = classes.filter((c) => c.day_of_week === dayIdx);

        return (
          <div key={dayIdx} className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-muted-foreground border-b pb-2 font-inter">
              {dayName}
            </h4>
            <div className="space-y-2">
              {dayClasses.map((c) => (
                <div
                  key={c.id}
                  className="p-3 bg-white border border-border rounded-xl shadow-sm hover:border-primary/50 transition-colors"
                >
                  <p className="font-bold text-sm text-zinc-900 font-heading">
                    {c.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-inter">
                    {c.start_time.slice(0, 5)} hs
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-zinc-100 rounded text-zinc-600">
                      CUPOS: {c.capacity}
                    </span>
                  </div>
                </div>
              ))}
              {dayClasses.length === 0 && (
                <p className="text-[10px] text-zinc-300 italic font-inter">
                  Sin clases
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
