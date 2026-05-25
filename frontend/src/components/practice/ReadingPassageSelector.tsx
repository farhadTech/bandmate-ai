"use client";

import { BookOpen, Check, FileText, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReadingPassageType = "passage-1" | "passage-2" | "passage-3";

type Props = {
  selectedPassage: ReadingPassageType;
  onChange: ( passage: ReadingPassageType ) => void;
};

const passages = [
  {
    id: "passage-1" as ReadingPassageType,
    title: "Passage 1",
    subtitle: "General information text",
    difficulty: "Easy",
    icon: FileText,
  },
  {
    id: "passage-2" as ReadingPassageType,
    title: "Passage 2",
    subtitle: "Workplace or academic text",
    difficulty: "Medium",
    icon: BookOpen,
  },
  {
    id: "passage-3" as ReadingPassageType,
    title: "Passage 3",
    subtitle: "Complex academic article",
    difficulty: "Hard",
    icon: GraduationCap,
  },
];

export default function ReadingPassageSelector ( {
  selectedPassage,
  onChange,
}: Props ) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      { passages.map( ( passage ) => {
        const Icon = passage.icon;
        const active = selectedPassage === passage.id;

        return (
          <button
            key={ passage.id }
            type="button"
            onClick={ () => onChange( passage.id ) }
            className={ cn(
              "group relative rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]",
              active
                ? "border-orange-600 bg-orange-50 shadow-md shadow-orange-600/10 dark:bg-orange-950/30"
                : "border-slate-200 bg-white hover:border-orange-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-700"
            ) }
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className={ cn(
                  "rounded-2xl p-3 transition group-hover:scale-110",
                  active
                    ? "bg-orange-600 text-white"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                ) }
              >
                <Icon size={ 24 } />
              </div>

              { active && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-white">
                  <Check size={ 16 } />
                </div>
              ) }
            </div>

            <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
              { passage.title }
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              { passage.subtitle }
            </p>

            <span className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              { passage.difficulty }
            </span>
          </button>
        );
      } ) }
    </div>
  );
}