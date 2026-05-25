"use client";

import { CheckCircle2, Circle, Clock, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type StudyTask = {
  id: number;
  title: string;
  skill: string;
  duration: string;
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "cyan";
  completed: boolean;
};

type Props = {
  task: StudyTask;
  onToggle: ( id: number ) => void;
};

const colors = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300",
  green:
    "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
  purple:
    "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300",
  cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300",
};

export default function StudyTaskItem ( { task, onToggle }: Props ) {
  const Icon = task.icon;

  return (
    <button
      type="button"
      onClick={ () => onToggle( task.id ) }
      className={ cn(
        "flex w-full cursor-pointer items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]",
        task.completed
          ? "border-green-200 bg-green-50/70 dark:border-green-900 dark:bg-green-950/20"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      ) }
    >
      <div className="mt-1">
        { task.completed ? (
          <CheckCircle2 size={ 22 } className="text-green-600" />
        ) : (
          <Circle size={ 22 } className="text-slate-400" />
        ) }
      </div>

      <div className={ cn( "rounded-xl p-3", colors[ task.color ] ) }>
        <Icon size={ 20 } />
      </div>

      <div className="flex-1">
        <h4
          className={ cn(
            "font-black text-slate-950 dark:text-white",
            task.completed && "line-through opacity-70"
          ) }
        >
          { task.title }
        </h4>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            { task.skill }
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <Clock size={ 12 } />
            { task.duration }
          </span>
        </div>
      </div>
    </button>
  );
}