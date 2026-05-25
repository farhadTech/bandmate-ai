import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SkillCardProps = {
  title: string;
  score: string;
  href: string;
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "orange";
};

const colorMap = {
  blue: {
    text: "text-blue-600 dark:text-blue-300",
    bar: "bg-blue-500",
    button:
      "border-blue-500 text-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950/40",
  },
  green: {
    text: "text-green-600 dark:text-green-300",
    bar: "bg-green-500",
    button:
      "border-green-500 text-green-600 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-950/40",
  },
  purple: {
    text: "text-purple-600 dark:text-purple-300",
    bar: "bg-purple-500",
    button:
      "border-purple-500 text-purple-600 hover:bg-purple-50 dark:text-purple-300 dark:hover:bg-purple-950/40",
  },
  orange: {
    text: "text-orange-600 dark:text-orange-300",
    bar: "bg-orange-500",
    button:
      "border-orange-500 text-orange-600 hover:bg-orange-50 dark:text-orange-300 dark:hover:bg-orange-950/40",
  },
};

export default function SkillCard ( {
  title,
  score,
  href,
  icon: Icon,
  color,
}: SkillCardProps ) {
  const styles = colorMap[ color ];

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <Icon
        size={ 34 }
        className={ cn( "transition group-hover:scale-110", styles.text ) }
      />

      <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
        { title }
      </h3>

      <p className="mt-2 text-4xl font-black text-slate-950 dark:text-white">
        { score }
      </p>

      <div className="mt-5 flex gap-1">
        { Array.from( { length: 7 } ).map( ( _, index ) => (
          <div
            key={ index }
            className={ cn(
              "h-4 flex-1 rounded-sm transition-all duration-300",
              styles.bar,
              index < 5 ? "opacity-100" : "opacity-30"
            ) }
          />
        ) ) }
      </div>

      <Link
        href={ href }
        className={ cn(
          "mt-6 flex w-full items-center justify-center rounded-xl border py-2.5 text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
          styles.button
        ) }
      >
        Practice now
      </Link>
    </div>
  );
}