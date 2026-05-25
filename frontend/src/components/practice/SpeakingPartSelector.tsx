"use client";

import { Check, MessageCircle, Mic, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

export type SpeakingPartType = "part-1" | "part-2" | "part-3";

type Props = {
  selectedPart: SpeakingPartType;
  onChange: ( part: SpeakingPartType ) => void;
};

const parts = [
  {
    id: "part-1" as SpeakingPartType,
    title: "Part 1",
    subtitle: "Introduction & familiar topics",
    time: "4-5 mins",
    icon: MessageCircle,
  },
  {
    id: "part-2" as SpeakingPartType,
    title: "Part 2",
    subtitle: "Cue card long turn",
    time: "3-4 mins",
    icon: Timer,
  },
  {
    id: "part-3" as SpeakingPartType,
    title: "Part 3",
    subtitle: "Discussion & abstract ideas",
    time: "4-5 mins",
    icon: Mic,
  },
];

export default function SpeakingPartSelector ( { selectedPart, onChange }: Props ) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      { parts.map( ( part ) => {
        const Icon = part.icon;
        const active = selectedPart === part.id;

        return (
          <button
            key={ part.id }
            type="button"
            onClick={ () => onChange( part.id ) }
            className={ cn(
              "group relative rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]",
              active
                ? "border-green-600 bg-green-50 shadow-md shadow-green-600/10 dark:bg-green-950/30"
                : "border-slate-200 bg-white hover:border-green-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700"
            ) }
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className={ cn(
                  "rounded-2xl p-3 transition group-hover:scale-110",
                  active
                    ? "bg-green-600 text-white"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                ) }
              >
                <Icon size={ 24 } />
              </div>

              { active && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-white">
                  <Check size={ 16 } />
                </div>
              ) }
            </div>

            <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
              { part.title }
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              { part.subtitle }
            </p>

            <span className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              { part.time }
            </span>
          </button>
        );
      } ) }
    </div>
  );
}