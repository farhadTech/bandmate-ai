"use client";

import { BookOpen, CheckCircle2, Headphones, Mic, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

export type CambridgeTest = {
  id: string;
  title: string;
  status: "not-started" | "in-progress" | "completed";
};

export type CambridgeBook = {
  id: string;
  title: string;
  label: string;
  tests: CambridgeTest[];
};

type Props = {
  book: CambridgeBook;
  onSelectTest: ( book: CambridgeBook, test: CambridgeTest ) => void;
};

export default function CambridgeBookCard ( { book, onSelectTest }: Props ) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          { book.label }
        </h2>

        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        { book.tests.map( ( test ) => (
          <TestCard
            key={ test.id }
            book={ book }
            test={ test }
            onClick={ () => onSelectTest( book, test ) }
          />
        ) ) }
      </div>
    </section>
  );
}

function TestCard ( {
  book,
  test,
  onClick,
}: {
  book: CambridgeBook;
  test: CambridgeTest;
  onClick: () => void;
} ) {
  const statusStyles = {
    "not-started":
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    "in-progress":
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-300",
    completed:
      "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300",
  };

  return (
    <button
      type="button"
      onClick={ onClick }
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative h-44 overflow-hidden bg-black">
        <div className="absolute inset-x-0 top-0 h-9 bg-gradient-to-r from-violet-950 via-indigo-950 to-violet-950" />
        <div className="absolute inset-x-0 top-9 h-5 bg-stone-500/70" />

        <div className="flex h-full items-center justify-center pt-8">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tight text-white">
              IELTS
            </span>
            <span className="text-5xl font-black tracking-tight text-stone-500">
              { book.title.replace( "Cambridge ", "" ) }
            </span>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/45" />

        <div className="absolute inset-0 flex translate-y-4 items-center justify-center gap-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="rounded-xl border border-white/70 bg-black/30 px-5 py-3 text-sm font-black text-white backdrop-blur">
            Practice Mode
          </span>

          <span className="rounded-xl border border-white/70 bg-black/30 px-5 py-3 text-sm font-black text-white backdrop-blur">
            Exam Mode
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-slate-950 dark:text-white">
              { test.title }
            </h3>

            <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
              { book.title }
            </p>
          </div>

          { test.status === "completed" && (
            <CheckCircle2 className="text-green-600" size={ 22 } />
          ) }
        </div>

        <div className="mb-4 flex items-center gap-2 text-slate-400">
          <Headphones size={ 17 } />
          <BookOpen size={ 17 } />
          <PenLine size={ 17 } />
          <Mic size={ 17 } />
        </div>

        <div className="flex items-center justify-between gap-3">
          <span
            className={ cn(
              "rounded-full px-3 py-1 text-xs font-black",
              statusStyles[ test.status ]
            ) }
          >
            { test.status === "not-started"
              ? "Not started"
              : test.status === "in-progress"
                ? "In progress"
                : "Completed" }
          </span>

          <span className="text-xs font-black text-blue-600 dark:text-blue-300">
            Open
          </span>
        </div>
      </div>
    </button>
  );
}