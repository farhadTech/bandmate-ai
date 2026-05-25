"use client";

import { cn } from "@/lib/utils";

type Props = {
  activeModule: string;
  activeQuestion: number;
  answeredQuestions: number[];
  onSelectQuestion: ( question: number ) => void;
};

const moduleRanges = {
  listening: {
    label: "Listening",
    parts: [
      { label: "Part 1", start: 1, end: 10 },
      { label: "Part 2", start: 11, end: 20 },
      { label: "Part 3", start: 21, end: 30 },
      { label: "Part 4", start: 31, end: 40 },
    ],
  },
  reading: {
    label: "Reading",
    parts: [
      { label: "Part 1", start: 1, end: 13 },
      { label: "Part 2", start: 14, end: 26 },
      { label: "Part 3", start: 27, end: 40 },
    ],
  },
  writing: {
    label: "Writing",
    parts: [
      { label: "Task 1", start: 1, end: 1 },
      { label: "Task 2", start: 2, end: 2 },
    ],
  },
  speaking: {
    label: "Speaking",
    parts: [
      { label: "Part 1", start: 1, end: 1 },
      { label: "Part 2", start: 2, end: 2 },
      { label: "Part 3", start: 3, end: 3 },
    ],
  },
};

export default function TestQuestionNavigator ( {
  activeModule,
  activeQuestion,
  answeredQuestions,
  onSelectQuestion,
}: Props ) {
  const range =
    moduleRanges[ activeModule as keyof typeof moduleRanges ] ||
    moduleRanges.listening;

  return (
    <footer className="sticky bottom-0 z-40 border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-5">
          { range.parts.map( ( part ) => {
            const questions = Array.from(
              { length: part.end - part.start + 1 },
              ( _, index ) => part.start + index
            );

            const answeredInPart = questions.filter( ( q ) =>
              answeredQuestions.includes( q )
            ).length;

            return (
              <div key={ part.label } className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-800 dark:text-white">
                  { part.label }
                </span>

                <div className="flex flex-wrap gap-1">
                  { questions.map( ( question ) => {
                    const answered = answeredQuestions.includes( question );
                    const active = activeQuestion === question;

                    return (
                      <button
                        key={ question }
                        type="button"
                        onClick={ () => onSelectQuestion( question ) }
                        className={ cn(
                          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border text-xs font-black transition hover:scale-105 active:scale-95",
                          active
                            ? "border-blue-600 bg-blue-600 text-white"
                            : answered
                              ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300"
                              : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                        ) }
                      >
                        { question }
                      </button>
                    );
                  } ) }
                </div>

                <span className="text-xs font-bold text-slate-400">
                  { answeredInPart }/{ questions.length }
                </span>
              </div>
            );
          } ) }
        </div>

        <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
          Answered: { answeredQuestions.length }
        </div>
      </div>
    </footer>
  );
}