"use client";

import { Award, BookOpen, Target, TrendingUp } from "lucide-react";

export default function ProgressStats () {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <Stat title="Current Band" value="6.5" subtitle="+0.4 this month" icon={ TrendingUp } color="blue" />
      <Stat title="Target Band" value="7.0+" subtitle="65% completed" icon={ Target } color="green" />
      <Stat title="Best Skill" value="Listening" subtitle="Band 7.0" icon={ Award } color="purple" />
      <Stat title="Weakest Skill" value="Writing" subtitle="Needs focus" icon={ BookOpen } color="cyan" />
    </div>
  );
}

function Stat ( {
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: typeof TrendingUp;
  color: "blue" | "green" | "purple" | "cyan";
} ) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300",
    green: "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300",
    cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300",
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            { title }
          </p>
          <h3 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
            { value }
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            { subtitle }
          </p>
        </div>

        <div className={ `rounded-2xl p-3 transition group-hover:scale-110 ${ colors[ color ] }` }>
          <Icon size={ 24 } />
        </div>
      </div>
    </div>
  );
}