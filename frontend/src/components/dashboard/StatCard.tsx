import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: "blue" | "green" | "orange" | "purple";
};

const colorMap = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300",
  green: "bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-300",
  orange:
    "bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-300",
  purple:
    "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-300",
};

export default function StatCard ( {
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: StatCardProps ) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            { title }
          </p>
          <h3 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
            { value }
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            { subtitle }
          </p>
        </div>

        <div
          className={ cn(
            "rounded-2xl p-3 transition group-hover:scale-110",
            colorMap[ color ]
          ) }
        >
          <Icon size={ 24 } />
        </div>
      </div>
    </div>
  );
}
