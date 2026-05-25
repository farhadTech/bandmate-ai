"use client";

import { CheckCircle2, LucideIcon, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type MockSectionStatus = "locked" | "active" | "completed";

type Props = {
  title: string;
  description: string;
  time: string;
  questions: string;
  icon: LucideIcon;
  status: MockSectionStatus;
  color: "blue" | "green" | "purple" | "cyan";
  onClick: () => void;
};

const colors = {
  blue: {
    active: "border-blue-600 bg-blue-50 dark:bg-blue-950/30",
    icon: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300",
    button: "bg-blue-600",
  },
  green: {
    active: "border-green-600 bg-green-50 dark:bg-green-950/30",
    icon:
      "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
    button: "bg-green-600",
  },
  purple: {
    active: "border-purple-600 bg-purple-50 dark:bg-purple-950/30",
    icon:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300",
    button: "bg-purple-600",
  },
  cyan: {
    active: "border-cyan-600 bg-cyan-50 dark:bg-cyan-950/30",
    icon: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300",
    button: "bg-cyan-600",
  },
};

export default function MockSectionCard ( {
  title,
  description,
  time,
  questions,
  icon: Icon,
  status,
  color,
  onClick,
}: Props ) {
  const isActive = status === "active";
  const isCompleted = status === "completed";

  return (
    <button
      type="button"
      onClick={ onClick }
      className={ cn(
        "group w-full cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]",
        isActive
          ? colors[ color ].active
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      ) }
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div
          className={ cn(
            "rounded-2xl p-3 transition group-hover:scale-110",
            colors[ color ].icon
          ) }
        >
          <Icon size={ 26 } />
        </div>

        { isCompleted ? (
          <CheckCircle2 className="text-green-600" size={ 24 } />
        ) : (
          <PlayCircle
            className={ isActive ? "text-indigo-600" : "text-slate-400" }
            size={ 24 }
          />
        ) }
      </div>

      <h3 className="text-lg font-black text-slate-950 dark:text-white">
        { title }
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        { description }
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          { time }
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          { questions }
        </span>

        <span
          className={ cn(
            "rounded-full px-3 py-1 text-xs font-bold",
            isCompleted
              ? "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300"
              : isActive
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300"
                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
          ) }
        >
          { status }
        </span>
      </div>
    </button>
  );
}