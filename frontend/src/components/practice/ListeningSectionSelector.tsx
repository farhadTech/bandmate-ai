"use client";

import { Check, Headphones, MessageSquare, Users, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export type ListeningSectionType = "section-1" | "section-2" | "section-3" | "section-4";

type Props = {
  selectedSection: ListeningSectionType;
  onChange: ( section: ListeningSectionType ) => void;
};

const sections = [
  {
    id: "section-1" as ListeningSectionType,
    title: "Section 1",
    subtitle: "Everyday conversation",
    difficulty: "Easy",
    icon: MessageSquare,
  },
  {
    id: "section-2" as ListeningSectionType,
    title: "Section 2",
    subtitle: "Everyday monologue",
    difficulty: "Medium",
    icon: Headphones,
  },
  {
    id: "section-3" as ListeningSectionType,
    title: "Section 3",
    subtitle: "Academic discussion",
    difficulty: "Hard",
    icon: Users,
  },
  {
    id: "section-4" as ListeningSectionType,
    title: "Section 4",
    subtitle: "Academic lecture",
    difficulty: "Hard",
    icon: GraduationCap,
  },
];

export default function ListeningSectionSelector ( {
  selectedSection,
  onChange,
}: Props ) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      { sections.map( ( section ) => {
        const Icon = section.icon;
        const active = selectedSection === section.id;

        return (
          <button
            key={ section.id }
            type="button"
            onClick={ () => onChange( section.id ) }
            className={ cn(
              "group relative rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]",
              active
                ? "border-purple-600 bg-purple-50 shadow-md shadow-purple-600/10 dark:bg-purple-950/30"
                : "border-slate-200 bg-white hover:border-purple-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-purple-700"
            ) }
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className={ cn(
                  "rounded-2xl p-3 transition group-hover:scale-110",
                  active
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                ) }
              >
                <Icon size={ 24 } />
              </div>

              { active && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-white">
                  <Check size={ 16 } />
                </div>
              ) }
            </div>

            <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
              { section.title }
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              { section.subtitle }
            </p>

            <span className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              { section.difficulty }
            </span>
          </button>
        );
      } ) }
    </div>
  );
}
