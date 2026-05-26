"use client";

import {
  BookOpen,
  CheckCircle2,
  Headphones,
  Mic,
  PenLine,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  CambridgeBookWithTests,
  CambridgeTest,
  TestStatus,
} from "@/types/cambridge";

type Props = {
  book: CambridgeBookWithTests;
  onSelectTest: ( book: CambridgeBookWithTests, test: CambridgeTest ) => void;
};

export default function CambridgeBookCard ( { book, onSelectTest }: Props ) {
  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-blue-600 px-3 py-1 text-sm font-black text-white shadow-lg shadow-blue-600/20">
            { book.label }
          </span>

          <h2 className="text-xl font-black text-slate-950 dark:text-white sm:text-2xl">
            { book.title }
          </h2>
        </div>

        <div className="hidden h-px flex-1 bg-slate-200 dark:bg-slate-800 sm:block" />

        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          { book.tests.length } full CBT tests
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        { book.tests.map( ( test: CambridgeTest ) => (
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
  book: CambridgeBookWithTests;
  test: CambridgeTest;
  onClick: () => void;
} ) {
  const bookNumber =
    book.book_number ||
    book.title.replace( /\D/g, "" ) ||
    book.label.replace( /\D/g, "" );

  const status: TestStatus = test.status || "not-started";

  return (
    <button
      type="button"
      onClick={ onClick }
      className="group cursor-pointer overflow-hidden rounded-3xl border border-white/70 bg-white/80 text-left shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-600/10 active:scale-[0.98] dark:border-slate-800/80 dark:bg-slate-900/80 dark:hover:border-blue-800"
    >
      <div className="relative h-44 overflow-hidden bg-black sm:h-48">
        <div className="absolute inset-x-0 top-0 h-9 bg-gradient-to-r from-violet-950 via-indigo-950 to-violet-950" />
        <div className="absolute inset-x-0 top-9 h-5 bg-stone-500/70" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.22),transparent_35%)]" />

        <div className="flex h-full items-center justify-center pt-8">
          <div className="flex items-baseline gap-2 transition duration-300 group-hover:scale-105">
            <span className="text-5xl font-black tracking-tight text-white">
              IELTS
            </span>

            <span className="text-5xl font-black tracking-tight text-stone-500">
              { bookNumber }
            </span>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/45" />

        <div className="absolute inset-0 flex translate-y-4 items-center justify-center gap-3 px-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="rounded-xl border border-white/70 bg-black/30 px-4 py-3 text-xs font-black text-white backdrop-blur-xl sm:text-sm">
            Practice Mode
          </span>

          <span className="rounded-xl border border-white/70 bg-black/30 px-4 py-3 text-xs font-black text-white backdrop-blur-xl sm:text-sm">
            Exam Mode
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-950 dark:text-white">
              { test.title }
            </h3>

            <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
              { book.title }
            </p>
          </div>

          { status === "completed" && (
            <CheckCircle2 className="shrink-0 text-green-600" size={ 22 } />
          ) }
        </div>

        <p className="mb-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Full computer-based IELTS simulation with Listening, Reading, Writing,
          and Speaking modules.
        </p>

        <div className="mb-5 grid grid-cols-2 gap-2">
          <ModulePill icon={ Headphones } label="Listening" />
          <ModulePill icon={ BookOpen } label="Reading" />
          <ModulePill icon={ PenLine } label="Writing" />
          <ModulePill icon={ Mic } label="Speaking" />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/80">
          <StatusBadge status={ status } />

          <span className="flex items-center gap-2 text-xs font-black text-blue-600 transition group-hover:translate-x-1 dark:text-blue-300">
            Open
            <PlayCircle size={ 17 } />
          </span>
        </div>
      </div>
    </button>
  );
}

function StatusBadge ( { status }: { status: TestStatus; } ) {
  const statusStyles: Record<TestStatus, string> = {
    "not-started":
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    "in-progress":
      "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    completed:
      "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
  };

  const label =
    status === "not-started"
      ? "Not started"
      : status === "in-progress"
        ? "In progress"
        : "Completed";

  return (
    <span
      className={ cn(
        "rounded-full px-3 py-1 text-xs font-black",
        statusStyles[ status ]
      ) }
    >
      { label }
    </span>
  );
}

function ModulePill ( {
  icon: Icon,
  label,
}: {
  icon: typeof BookOpen;
  label: string;
} ) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition group-hover:border-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      <Icon size={ 14 } />
      <span>{ label }</span>
    </div>
  );
}