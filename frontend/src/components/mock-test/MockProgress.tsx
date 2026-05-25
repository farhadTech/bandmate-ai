"use client";

import { CheckCircle2, Circle, Loader2 } from "lucide-react";

type Props = {
  sections: {
    title: string;
    completed: boolean;
    active: boolean;
  }[];
};

export default function MockProgress ( { sections }: Props ) {
  const completed = sections.filter( ( section ) => section.completed ).length;
  const progress = Math.round( ( completed / sections.length ) * 100 );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          Test Progress
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          { completed } of { sections.length } sections completed
        </p>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm font-bold">
          <span className="text-slate-600 dark:text-slate-300">Overall</span>
          <span className="text-indigo-600 dark:text-indigo-300">
            { progress }%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-700"
            style={ { width: `${ progress }%` } }
          />
        </div>
      </div>

      <div className="space-y-4">
        { sections.map( ( section ) => (
          <div key={ section.title } className="flex items-center gap-3">
            { section.completed ? (
              <CheckCircle2 className="text-green-600" size={ 22 } />
            ) : section.active ? (
              <Loader2 className="animate-spin text-indigo-600" size={ 22 } />
            ) : (
              <Circle className="text-slate-400" size={ 22 } />
            ) }

            <span className="font-bold text-slate-700 dark:text-slate-200">
              { section.title }
            </span>
          </div>
        ) ) }
      </div>
    </div>
  );
}