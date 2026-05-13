import { createClient } from "@/shared/api/supabase/server";
import { ClassActions } from "./ClassActions";
import { Clock, UsersIcon } from "lucide-react";

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
  const supabase = await createClient();
  const { data: classes } = await supabase
    .from("classes")
    .select("*")
    .order("start_time", { ascending: true });

  if (!classes) return null;

  return (
    <div className="w-full overflow-x-auto pb-6 -mx-2 px-2 scrollbar-hide">
      <div className="grid grid-cols-7 gap-4">
        {DAYS.map((dayName, dayIdx) => {
          const dayClasses = classes.filter((c) => c.day_of_week === dayIdx);

          return (
            <div key={dayIdx} className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold uppercase text-zinc-400 tracking-[0.2em] px-2">
                {dayName}
              </h4>

              <div className="space-y-3">
                {dayClasses.map((c) => (
                  <div
                    key={c.id}
                    className="group relative p-2 bg-white border rounded-lg border-zinc-100 hover:border-zinc-200 transition-all"
                  >
                    <div className="absolute top-4 right-3">
                      <ClassActions classData={c} />
                    </div>

                    <p className="text-sm font-medium text-zinc-900 leading-tight uppercase mb-4 pr-4">
                      {c.name}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-zinc-500">
                        <Clock size={12} className="text-zinc-400" />
                        <span className="text-[11px] font-inter font-semibold bg-zinc-100 px-2 py-0.5 rounded-md">
                          {c.start_time.slice(0, 5)} -{" "}
                          {c.end_time?.slice(0, 5) || "??"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500">
                        <UsersIcon size={12} className="text-zinc-400" />
                        <span className="text-[11px] font-inter">
                          CUPO:{" "}
                          <span className="font-bold text-zinc-800">
                            {c.capacity}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {dayClasses.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-zinc-50 rounded-[28px] flex items-center justify-center opacity-40">
                    <span className="text-[10px] text-zinc-300 font-inter font-bold uppercase tracking-widest">
                      Libre
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
