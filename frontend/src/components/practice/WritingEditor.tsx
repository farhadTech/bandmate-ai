"use client";

import { Clipboard, RotateCcw, Send } from "lucide-react";
import Button from "@/components/ui/Button";

type WritingEditorProps = {
  prompt: string;
  essay: string;
  wordCount: number;
  minWords: number;
  onPromptChange: ( value: string ) => void;
  onEssayChange: ( value: string ) => void;
  onReset: () => void;
  onSubmit: () => void;
};

export default function WritingEditor ( {
  prompt,
  essay,
  wordCount,
  minWords,
  onPromptChange,
  onEssayChange,
  onReset,
  onSubmit,
}: WritingEditorProps ) {
  const progress = Math.min( Math.round( ( wordCount / minWords ) * 100 ), 100 );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Write Your Answer
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Paste the IELTS question and write your full response below.
          </p>
        </div>

        <button
          type="button"
          onClick={ onReset }
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <RotateCcw size={ 16 } />
          Reset
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-black text-slate-800 dark:text-slate-100">
            Question Prompt
          </label>

          <div className="relative">
            <Clipboard
              size={ 18 }
              className="absolute left-4 top-4 text-slate-400"
            />

            <textarea
              value={ prompt }
              onChange={ ( event ) => onPromptChange( event.target.value ) }
              placeholder="Paste your IELTS Writing question here..."
              className="min-h-32 w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-4 pl-11 text-sm leading-6 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-blue-950"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-black text-slate-800 dark:text-slate-100">
            Your Essay
          </label>

          <textarea
            value={ essay }
            onChange={ ( event ) => onEssayChange( event.target.value ) }
            placeholder="Start writing your answer here..."
            className="min-h-96 w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-4 text-sm leading-7 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-blue-950"
          />
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-bold text-slate-700 dark:text-slate-200">
              Word count
            </span>

            <span className="font-black text-blue-600">
              { wordCount } / { minWords }+ words
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={ { width: `${ progress }%` } }
            />
          </div>

          <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            { wordCount < minWords
              ? `Write at least ${ minWords - wordCount } more words for a complete IELTS response.`
              : "Great! Your answer has enough words for this task." }
          </p>
        </div>

        <Button
          type="button"
          disabled={ !prompt.trim() || wordCount < minWords }
          onClick={ onSubmit }
          className="group w-full py-3.5 text-base"
        >
          Get AI Feedback
          <Send size={ 18 } className="ml-2 transition group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
