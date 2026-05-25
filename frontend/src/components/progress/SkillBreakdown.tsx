"use client";

import { BookOpen, Headphones, Mic, PenLine } from "lucide-react";

const skills = [
  {
    name: "Writing",
    band: "6.0",
    accuracy: 62,
    hours: "8.5h",
    improvement: "+0.3",
    icon: PenLine,
    color: "blue",
  },
  {
    name: "Speaking",
    band: "6.5",
    accuracy: 72,
    hours: "6.2h",
    improvement: "+0.5",
    icon: Mic,
    color: "green",
  },
  {
    name: "Listening",
    band: "7.0",
    accuracy: 81,
    hours: "7.8h",
    improvement: "+0.6",
    icon: Headphones,
    color: "purple",
  },
  {
    name: "Reading",
    band: "6.5",
    accuracy: 69,
    hours: "5.9h",
    improvement: "+0.4",
    icon: BookOpen,
    color: "cyan",
  },
];

export default function SkillBreakdown () {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-black text-slate-950 dark:text-white">
        Skill Breakdown
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Performance by IELTS module.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        { skills.map( ( skill ) => (
          <Skill key={ skill.name } { ...skill } />
        ) ) }
      </div>
    </div>
  );
}

function Skill ( {
  name,
  band,
  accuracy,
  hours,
  improvement,
  icon: Icon,
  color,
}: {
  name: string;
  band: string;
  accuracy: number;
  hours: string;
  improvement: string;
  icon: typeof PenLine;
  color: string;
} ) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300",
    green: "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300",
    cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300",
  };

  const bars: Record<string, string> = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    cyan: "bg-cyan-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <div className={ `rounded-xl p-3 ${ colors[ color ] }` }>
          <Icon size={ 22 } />
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-600 dark:bg-green-950/30 dark:text-green-300">
          { improvement }
        </span>
      </div>

      <h3 className="font-black text-slate-950 dark:text-white">{ name }</h3>

      <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
        { band }
      </p>

      <div className="mt-4">
        <div className="mb-2 flex justify-between text-sm font-bold">
          <span className="text-slate-600 dark:text-slate-300">Accuracy</span>
          <span className="text-slate-400">{ accuracy }%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className={ `h-full rounded-full ${ bars[ color ] } transition-all duration-700` }
            style={ { width: `${ accuracy }%` } }
          />
        </div>
      </div>

      <p className="mt-4 text-sm font-bold text-slate-500 dark:text-slate-400">
        Practice: { hours }
      </p>
    </div>
  );
}