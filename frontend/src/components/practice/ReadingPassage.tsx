"use client";

import { BookOpen, Clock, Highlighter } from "lucide-react";

type Props = {
  title: string;
  passage: string;
  readingTime: string;
};

export default function ReadingPassage ( {
  title,
  passage,
  readingTime,
}: Props ) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-50 p-3 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300">
            <BookOpen size={ 24 } />
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              { title }
            </h2>

            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock size={ 15 } />
              Suggested reading time: { readingTime }
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300">
          <Highlighter size={ 16 } />
          Read carefully
        </div>
      </div>

      <article className="max-h-[620px] overflow-y-auto rounded-2xl bg-slate-50 p-5 text-sm leading-8 text-slate-700 dark:bg-slate-950 dark:text-slate-300 sm:text-base">
        { passage.split( "\n\n" ).map( ( paragraph, index ) => (
          <p key={ index } className="mb-5 last:mb-0">
            { paragraph }
          </p>
        ) ) }
      </article>
    </div>
  );
}