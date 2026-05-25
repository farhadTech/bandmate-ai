"use client";

import { Check, FileText, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

export type WritingTaskType = "task-1" | "task-2";

type WritingTaskSelectorProps = {
  selectedTask: WritingTaskType;
  onChange: ( task: WritingTaskType ) => void;
};

const tasks = [
  {
    id: "task-1" as WritingTaskType,
    title: "Writing Task 1",
    subtitle: "Report, chart, table, process, map",
    time: "20 minutes",
    words: "150+ words",
    icon: FileText,
  },
  {
    id: "task-2" as WritingTaskType,
    title: "Writing Task 2",
    subtitle: "Essay, opinion, discussion, problem-solution",
    time: "40 minutes",
    words: "250+ words",
    icon: PenLine,
  },
];

export default function WritingTaskSelector ( {
  selectedTask,
  onChange,
}: WritingTaskSelectorProps ) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      { tasks.map( ( task ) => {
        const Icon = task.icon;
        const active = selectedTask === task.id;

        return (
          <button
            key={ task.id }
            type="button"
            onClick={ () => onChange( task.id ) }
            className={ cn(
              "group relative rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]",
              active
                ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-600/10 dark:bg-blue-950/30"
                : "border-slate-200 bg-white hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
            ) }
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className={ cn(
                  "rounded-2xl p-3 transition group-hover:scale-110",
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                ) }
              >
                <Icon size={ 24 } />
              </div>

              { active && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Check size={ 16 } />
                </div>
              ) }
            </div>

            <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
              { task.title }
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              { task.subtitle }
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                { task.time }
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                { task.words }
              </span>
            </div>
          </button>
        );
      } ) }
    </div>
  );
}