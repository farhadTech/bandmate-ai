"use client";

import { Mic, Play, Square } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";

type Props = {
  answers: Record<number, string>;
  onAnswerChange: ( question: number, value: string ) => void;
};

export default function SpeakingTestSection ( {
  answers,
  onAnswerChange,
}: Props ) {
  const [ recording, setRecording ] = useState( false );

  return (
    <div className="flex h-[calc(100vh-146px)] flex-col bg-black">
      <div className="border-b border-slate-800 bg-black px-4 py-3 text-white">
        <p className="font-black">Speaking Section</p>
        <p className="text-sm text-slate-300">
          Answer the examiner questions. Recording simulation only for now.
        </p>
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="flex min-h-full flex-col">
          <div className="flex h-56 items-center justify-center bg-black">
            <div className="flex h-40 w-72 items-center justify-center rounded-3xl bg-violet-200 text-6xl">
              👩‍🏫
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center bg-white p-6 dark:bg-slate-950">
            <div className="mb-6 flex h-44 w-44 items-center justify-center rounded-full bg-slate-100 text-7xl dark:bg-slate-900">
              👨‍🎓
            </div>

            <div className="max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                Part 1 Question
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                Do you work or are you a student?
              </h2>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                onClick={ () => setRecording( ( value ) => !value ) }
                variant={ recording ? "danger" : "primary" }
                className="gap-2"
              >
                { recording ? <Square size={ 18 } /> : <Mic size={ 18 } /> }
                { recording ? "Stop Recording" : "Start Recording" }
              </Button>

              <Button variant="outline" className="gap-2">
                <Play size={ 18 } />
                Replay
              </Button>
            </div>

            <div className="mt-8 w-full max-w-2xl">
              <label className="mb-2 block text-sm font-black text-slate-800 dark:text-slate-100">
                Transcript / Notes
              </label>

              <textarea
                value={ answers[ 1 ] || "" }
                onChange={ ( event ) => onAnswerChange( 1, event.target.value ) }
                placeholder="Type transcript manually for now..."
                className="min-h-40 w-full resize-y rounded-xl border border-slate-300 bg-white p-4 text-sm leading-7 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-green-950"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}