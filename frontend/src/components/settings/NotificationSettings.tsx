"use client";

import { Bell, Mail, MessageCircle, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationKey =
  | "emailReminders"
  | "practiceAlerts"
  | "weeklyReports"
  | "studyNudges";

type Props = {
  settings: Record<NotificationKey, boolean>;
  onToggle: ( key: NotificationKey ) => void;
};

const items: {
  key: NotificationKey;
  title: string;
  description: string;
  icon: typeof Bell;
}[] = [
    {
      key: "emailReminders",
      title: "Email reminders",
      description: "Receive email reminders for daily practice.",
      icon: Mail,
    },
    {
      key: "practiceAlerts",
      title: "Practice alerts",
      description: "Get notified when a task is due.",
      icon: Bell,
    },
    {
      key: "weeklyReports",
      title: "Weekly reports",
      description: "Receive weekly IELTS progress summaries.",
      icon: MessageCircle,
    },
    {
      key: "studyNudges",
      title: "Study nudges",
      description: "Gentle reminders to keep your streak active.",
      icon: Moon,
    },
  ];

export default function NotificationSettings ( { settings, onToggle }: Props ) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          Notification Preferences
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Choose how BandMate AI should remind you.
        </p>
      </div>

      <div className="space-y-4">
        { items.map( ( item ) => {
          const Icon = item.icon;
          const enabled = settings[ item.key ];

          return (
            <button
              key={ item.key }
              type="button"
              onClick={ () => onToggle( item.key ) }
              className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300">
                  <Icon size={ 20 } />
                </div>

                <div>
                  <h3 className="font-black text-slate-950 dark:text-white">
                    { item.title }
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    { item.description }
                  </p>
                </div>
              </div>

              <div
                className={ cn(
                  "relative h-7 w-12 rounded-full transition",
                  enabled ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
                ) }
              >
                <div
                  className={ cn(
                    "absolute top-1 h-5 w-5 rounded-full bg-white transition",
                    enabled ? "left-6" : "left-1"
                  ) }
                />
              </div>
            </button>
          );
        } ) }
      </div>
    </section>
  );
}