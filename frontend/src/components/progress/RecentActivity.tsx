"use client";

import { CheckCircle2, Clock, FileText, Headphones, Trophy } from "lucide-react";

const activities = [
  {
    title: "Completed Writing Task 2",
    detail: "Estimated Band 6.5",
    time: "Today",
    icon: FileText,
  },
  {
    title: "Finished Listening Section 3",
    detail: "Score 8/10",
    time: "Yesterday",
    icon: Headphones,
  },
  {
    title: "Submitted Full Mock Test",
    detail: "Overall Band 6.75",
    time: "2 days ago",
    icon: Trophy,
  },
  {
    title: "Completed Study Plan Tasks",
    detail: "5 tasks done",
    time: "3 days ago",
    icon: CheckCircle2,
  },
];

export default function RecentActivity () {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-black text-slate-950 dark:text-white">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-4">
        { activities.map( ( activity ) => {
          const Icon = activity.icon;

          return (
            <div
              key={ activity.title }
              className="flex gap-4 rounded-2xl bg-slate-50 p-4 transition hover:translate-x-1 dark:bg-slate-950"
            >
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300">
                <Icon size={ 20 } />
              </div>

              <div className="flex-1">
                <h3 className="font-black text-slate-950 dark:text-white">
                  { activity.title }
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  { activity.detail }
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                <Clock size={ 13 } />
                { activity.time }
              </div>
            </div>
          );
        } ) }
      </div>
    </div>
  );
}