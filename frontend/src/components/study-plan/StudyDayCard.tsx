"use client";

import { CalendarDays } from "lucide-react";
import StudyTaskItem, { StudyTask } from "./StudyTaskItem";
import { cn } from "@/lib/utils";

export type StudyDay = {
  id: number;
  day: string;
  date: string;
  focus: string;
  tasks: StudyTask[];
};

type Props = {
  day: StudyDay;
  active: boolean;
  onSelect: ( id: number ) => void;
  onToggleTask: ( taskId: number ) => void;
};

export default function StudyDayCard ( {
  day,
  active,
  onSelect,
  onToggleTask,
}: Props ) {
  const completed = day.tasks.filter( ( task ) => task.completed ).length;
  const progress = Math.round( ( completed / day.tasks.length ) * 100 );

  return (
    <div
      className={ cn(
        "rounded-2xl border p-5 shadow-sm transition-all duration-300",
        active
          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/20"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      ) }
    >
      <button
        type="button"
        onClick={ () => onSelect( day.id ) }
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-300">
            <CalendarDays size={ 16 } />
            { day.date }
          </div>

          <h3 className="text-xl font-black text-slate-950 dark:text-white">
            { day.day }
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Focus: { day.focus }
          </p>
        </div>

        <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm dark:bg-slate-950">
          <p className="text-2xl font-black text-slate-950 dark:text-white">
            { progress }%
          </p>
          <p className="text-xs font-bold text-slate-400">Done</p>
        </div>
      </button>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-700"
          style={ { width: `${ progress }%` } }
        />
      </div>

      { active && (
        <div className="mt-5 animate-in fade-in slide-in-from-top-2 space-y-3 duration-300">
          { day.tasks.map( ( task ) => (
            <StudyTaskItem
              key={ task.id }
              task={ task }
              onToggle={ onToggleTask }
            />
          ) ) }
        </div>
      ) }
    </div>
  );
}