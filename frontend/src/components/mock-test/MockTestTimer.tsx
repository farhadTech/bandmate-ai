"use client";

import { Pause, Play, RotateCcw, Timer } from "lucide-react";
import Button from "@/components/ui/Button";

type Props = {
  secondsLeft: number;
  totalSeconds: number;
  running: boolean;
  onToggle: () => void;
  onReset: () => void;
};

export default function MockTestTimer ( {
  secondsLeft,
  totalSeconds,
  running,
  onToggle,
  onReset,
}: Props ) {
  const progress = Math.max( ( secondsLeft / totalSeconds ) * 100, 0 );
  const minutes = Math.floor( secondsLeft / 60 );
  const seconds = secondsLeft % 60;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
          <Timer size={ 24 } />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Test Timer
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Demo countdown for mock test session.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-50 p-6 text-center dark:bg-slate-950">
        <p className="text-5xl font-black tracking-tight text-slate-950 dark:text-white">
          { String( minutes ).padStart( 2, "0" ) }:{ String( seconds ).padStart( 2, "0" ) }
        </p>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-700"
            style={ { width: `${ progress }%` } }
          />
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={ onToggle } className="gap-2">
            { running ? <Pause size={ 18 } /> : <Play size={ 18 } /> }
            { running ? "Pause" : "Resume" }
          </Button>

          <Button variant="outline" onClick={ onReset } className="gap-2">
            <RotateCcw size={ 18 } />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}