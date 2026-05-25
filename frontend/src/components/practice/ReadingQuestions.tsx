"use client";

import { CheckCircle2, CircleHelp, XCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type ReadingQuestion = {
  id: number;
  question: string;
  correctAnswer: string;
  type: "short-answer" | "true-false";
};

type Props = {
  questions: ReadingQuestion[];
  answers: Record<number, string>;
  checked: boolean;
  onAnswerChange: ( id: number, value: string ) => void;
  onCheck: () => void;
  onReset: () => void;
};

export default function ReadingQuestions ( {
  questions,
  answers,
  checked,
  onAnswerChange,
  onCheck,
  onReset,
}: Props ) {
  const answeredCount = questions.filter( ( q ) => answers[ q.id ]?.trim() ).length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Reading Questions
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Answer based on the passage.
          </p>
        </div>

        <span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-black text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300">
          { answeredCount }/{ questions.length } answered
        </span>
      </div>

      <div className="space-y-4">
        { questions.map( ( item ) => {
          const userAnswer = answers[ item.id ] || "";
          const isCorrect =
            userAnswer.trim().toLowerCase() ===
            item.correctAnswer.trim().toLowerCase();

          return (
            <div
              key={ item.id }
              className="rounded-2xl border border-slate-200 p-4 transition hover:shadow-md dark:border-slate-800"
            >
              <div className="mb-3 flex items-start gap-3">
                <div className="mt-1 rounded-lg bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300">
                  <CircleHelp size={ 18 } />
                </div>

                <div className="flex-1">
                  <p className="font-bold leading-7 text-slate-900 dark:text-white">
                    { item.id }. { item.question }
                  </p>
                </div>

                { checked && (
                  <div
                    className={ cn(
                      "mt-1",
                      isCorrect ? "text-green-600" : "text-red-600"
                    ) }
                  >
                    { isCorrect ? (
                      <CheckCircle2 size={ 22 } />
                    ) : (
                      <XCircle size={ 22 } />
                    ) }
                  </div>
                ) }
              </div>

              { item.type === "true-false" ? (
                <select
                  value={ userAnswer }
                  onChange={ ( event ) =>
                    onAnswerChange( item.id, event.target.value )
                  }
                  className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-950"
                >
                  <option value="">Select answer</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                  <option value="not given">Not Given</option>
                </select>
              ) : (
                <input
                  value={ userAnswer }
                  onChange={ ( event ) =>
                    onAnswerChange( item.id, event.target.value )
                  }
                  placeholder="Type your answer..."
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-cyan-950"
                />
              ) }

              { checked && !isCorrect && (
                <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Correct answer:{ " " }
                  <span className="text-green-600">
                    { item.correctAnswer }
                  </span>
                </p>
              ) }
            </div>
          );
        } ) }
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          onClick={ onCheck }
          disabled={ answeredCount === 0 }
          className="flex-1"
        >
          Check Answers
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={ onReset }
          className="flex-1"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}