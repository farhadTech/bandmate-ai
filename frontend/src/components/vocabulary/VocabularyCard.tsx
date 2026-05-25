"use client";

import { CheckCircle2, RotateCcw, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type VocabularyWord = {
  id: number;
  word: string;
  meaning: string;
  example: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "Writing" | "Speaking" | "Academic" | "General";
  status: "Learning" | "Learned" | "Review";
};

type Props = {
  word: VocabularyWord;
  onToggleStatus: ( id: number ) => void;
  onDelete: ( id: number ) => void;
};

export default function VocabularyCard ( {
  word,
  onToggleStatus,
  onDelete,
}: Props ) {
  const difficultyColors = {
    Easy: "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
    Medium:
      "bg-yellow-50 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-300",
    Hard: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300",
  };

  const statusColors = {
    Learning:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300",
    Learned:
      "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
    Review:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300",
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-950 dark:text-white">
            { word.word }
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            { word.meaning }
          </p>
        </div>

        <div className="rounded-xl bg-cyan-50 p-3 text-cyan-600 transition group-hover:scale-110 dark:bg-cyan-950/30 dark:text-cyan-300">
          <Star size={ 20 } />
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          Example
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
          “{ word.example }”
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={ cn(
            "rounded-full px-3 py-1 text-xs font-black",
            difficultyColors[ word.difficulty ]
          ) }
        >
          { word.difficulty }
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          { word.category }
        </span>

        <span
          className={ cn(
            "rounded-full px-3 py-1 text-xs font-black",
            statusColors[ word.status ]
          ) }
        >
          { word.status }
        </span>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={ () => onToggleStatus( word.id ) }
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          { word.status === "Learned" ? (
            <RotateCcw size={ 16 } />
          ) : (
            <CheckCircle2 size={ 16 } />
          ) }
          { word.status === "Learned" ? "Review Again" : "Mark Learned" }
        </button>

        <button
          type="button"
          onClick={ () => onDelete( word.id ) }
          className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50 active:scale-[0.98] dark:border-red-900 dark:hover:bg-red-950/30"
        >
          <Trash2 size={ 17 } />
        </button>
      </div>
    </div>
  );
}