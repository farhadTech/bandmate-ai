"use client";

import { Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  isPlaying: boolean;
  seconds: number;
  duration: number;
  onPlayPause: () => void;
  onRestart: () => void;
};

export default function ListeningAudioPlayer ( {
  isPlaying,
  seconds,
  duration,
  onPlayPause,
  onRestart,
}: Props ) {
  const progress = Math.min( ( seconds / duration ) * 100, 100 );

  const formatTime = ( time: number ) => {
    const min = Math.floor( time / 60 );
    const sec = time % 60;
    return `${ String( min ).padStart( 2, "0" ) }:${ String( sec ).padStart( 2, "0" ) }`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-purple-50 p-3 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300">
          <Volume2 size={ 24 } />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Listening Audio
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Demo audio player for IELTS listening practice.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mb-5 flex items-center justify-between text-sm font-bold">
          <span className="text-slate-600 dark:text-slate-300">
            { formatTime( seconds ) }
          </span>
          <span className="text-slate-400">{ formatTime( duration ) }</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-purple-600 transition-all duration-500"
            style={ { width: `${ progress }%` } }
          />
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={ onPlayPause }
            className={ cn(
              "flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 active:scale-95",
              isPlaying ? "bg-orange-500" : "bg-purple-600"
            ) }
          >
            { isPlaying ? <Pause size={ 24 } /> : <Play size={ 24 } /> }
          </button>

          <button
            type="button"
            onClick={ onRestart }
            className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:scale-105 hover:bg-slate-100 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RotateCcw size={ 22 } />
          </button>
        </div>
      </div>
    </div>
  );
}