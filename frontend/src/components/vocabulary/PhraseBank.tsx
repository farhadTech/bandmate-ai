"use client";

import { MessageSquareQuote } from "lucide-react";

const phrases = [
  {
    title: "Introducing an opinion",
    phrase: "From my perspective, this issue depends largely on...",
    use: "Writing Task 2 / Speaking Part 3",
  },
  {
    title: "Adding an example",
    phrase: "A clear example of this can be seen in...",
    use: "Writing Task 2",
  },
  {
    title: "Comparing ideas",
    phrase: "In contrast, others argue that...",
    use: "Discussion essay",
  },
  {
    title: "Speaking naturally",
    phrase: "To be honest, I would say that...",
    use: "Speaking Part 1",
  },
];

export default function PhraseBank () {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300">
          <MessageSquareQuote size={ 22 } />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Phrase Bank
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Useful IELTS phrases for high-band answers.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        { phrases.map( ( item ) => (
          <div
            key={ item.phrase }
            className="rounded-2xl border border-slate-200 p-4 transition hover:translate-x-1 hover:shadow-md dark:border-slate-800"
          >
            <h3 className="font-black text-slate-950 dark:text-white">
              { item.title }
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              “{ item.phrase }”
            </p>

            <span className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600 dark:bg-blue-950/30 dark:text-blue-300">
              { item.use }
            </span>
          </div>
        ) ) }
      </div>
    </div>
  );
}