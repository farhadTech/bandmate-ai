"use client";

import { Pause, Play, RotateCcw, Volume2 } from "lucide-react";

type Props = {
  playing: boolean;
  seconds: number;
  duration: number;
  onToggle: () => void;
  onRestart: () => void;
};

export default function TestAudioPlayer ( {
  playing,
  seconds,
  duration,
  onToggle,
  onRestart,
}: Props ) {
  const progress = Math.min( ( seconds / duration ) * 100, 100 );

  function formatTime ( value: number ) {
    const min = Math.floor( value / 60 );
    const sec = value % 60;
    return `${ String( min ).padStart( 2, "0" ) }:${ String( sec ).padStart( 2, "0" ) }`;
  }

  return (
    <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={ onToggle }
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 active:scale-95"
          >
            { playing ? <Pause size={ 20 } /> : <Play size={ 20 } /> }
          </button>

          <button
            type="button"
            onClick={ onRestart }
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 active:scale-95 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RotateCcw size={ 18 } />
          </button>

          <Volume2 className="text-slate-500" size={ 20 } />
        </div>

        <div className="flex-1">
          <div className="mb-1 flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>{ formatTime( seconds ) }</span>
            <span>{ formatTime( duration ) }</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={ { width: `${ progress }%` } }
            />
          </div>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600 dark:bg-blue-950/30 dark:text-blue-300">
          1.0x
        </span>
      </div>
    </div>
  );
}