"use client";

import {
  BookOpen,
  CheckCircle2,
  Clock3,
  PlayCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  CambridgeBook,
  CambridgeTest,
} from "@/types/cambridge";

interface Props {
  book: CambridgeBook & {
    label?: string;
    tests: ( CambridgeTest & {
      status?: string;
    } )[];
  };

  onSelectTest: (
    book: CambridgeBook,
    test: CambridgeTest
  ) => void;
}

export default function CambridgeBookCard ( {
  book,
  onSelectTest,
}: Props ) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-600 px-3 py-1 text-sm font-black text-white">
          { book.label }
        </div>

        <h2 className="text-2xl font-black text-slate-950 dark:text-white">
          { book.title }
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        { book.tests.map( ( test ) => (
          <button
            key={ test.id }
            onClick={ () =>
              onSelectTest( book, test )
            }
            className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                <BookOpen size={ 24 } />
              </div>

              <StatusBadge
                status={ test.status }
              />
            </div>

            <h3 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
              { test.title }
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Computer-based IELTS simulation
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              { [
                "Listening",
                "Reading",
                "Writing",
                "Speaking",
              ].map( ( module ) => (
                <span
                  key={ module }
                  className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  { module }
                </span>
              ) ) }
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Start CBT Test
              </span>

              <PlayCircle className="text-blue-600 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </button>
        ) ) }
      </div>
    </div>
  );
}

function StatusBadge ( {
  status,
}: {
  status?: string;
} ) {
  if ( status === "completed" ) {
    return (
      <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-950 dark:text-green-300">
        <CheckCircle2 size={ 14 } />
        Completed
      </div>
    );
  }

  if ( status === "in-progress" ) {
    return (
      <div className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
        <Clock3 size={ 14 } />
        Progress
      </div>
    );
  }

  return (
    <div
      className={ cn(
        "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
      ) }
    >
      Not Started
    </div>
  );
}