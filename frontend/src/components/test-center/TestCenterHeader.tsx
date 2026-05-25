"use client";

import { ArrowLeft, Clock, DoorOpen, Pause, Play, Send } from "lucide-react";
import Button from "@/components/ui/Button";

type Props = {
  title: string;
  mode: string;
  activeModule: string;
  secondsLeft: number;
  paused: boolean;
  onPauseToggle: () => void;
  onExit: () => void;
  onSubmit: () => void;
};

export default function TestCenterHeader ( {
  title,
  mode,
  activeModule,
  secondsLeft,
  paused,
  onPauseToggle,
  onExit,
  onSubmit,
}: Props ) {
  const minutes = Math.floor( secondsLeft / 60 );
  const seconds = secondsLeft % 60;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex flex-col gap-4 px-4 py-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={ onExit }
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={ 20 } />
          </button>

          <div>
            <h1 className="text-lg font-black text-slate-950 dark:text-white sm:text-xl">
              { title }
            </h1>

            <p className="mt-1 text-sm font-semibold capitalize text-slate-500 dark:text-slate-400">
              { mode } mode · Current module: { activeModule }
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-black text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
            <Clock size={ 18 } className="text-blue-600 dark:text-blue-300" />
            { String( minutes ).padStart( 2, "0" ) }:
            { String( seconds ).padStart( 2, "0" ) }
          </div>

          <Button variant="outline" onClick={ onPauseToggle } className="gap-2">
            { paused ? <Play size={ 17 } /> : <Pause size={ 17 } /> }
            { paused ? "Resume" : "Pause" }
          </Button>

          <Button variant="outline" onClick={ onExit } className="gap-2">
            <DoorOpen size={ 17 } />
            Exit
          </Button>

          <Button onClick={ onSubmit } className="gap-2">
            <Send size={ 17 } />
            Submit Test
          </Button>
        </div>
      </div>
    </header>
  );
}