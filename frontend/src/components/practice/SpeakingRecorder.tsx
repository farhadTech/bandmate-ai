"use client";

import { Mic, Pause, Play, RotateCcw, Send, Square } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type RecorderStatus = "idle" | "recording" | "paused" | "finished";

type Props = {
  status: RecorderStatus;
  seconds: number;
  transcript: string;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReset: () => void;
  onTranscriptChange: ( value: string ) => void;
  onSubmit: () => void;
};

export default function SpeakingRecorder ( {
  status,
  seconds,
  transcript,
  onStart,
  onPause,
  onResume,
  onStop,
  onReset,
  onTranscriptChange,
  onSubmit,
}: Props ) {
  const minutes = Math.floor( seconds / 60 );
  const remainingSeconds = seconds % 60;
  const formattedTime = `${ String( minutes ).padStart( 2, "0" ) }:${ String(
    remainingSeconds
  ).padStart( 2, "0" ) }`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Record Your Answer
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Practice speaking and review your transcript before feedback.
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

      <div className="rounded-3xl bg-slate-50 p-6 text-center dark:bg-slate-950">
        <div
          className={ cn(
            "mx-auto flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300",
            status === "recording"
              ? "animate-pulse bg-red-100 text-red-600 dark:bg-red-950/40"
              : "bg-green-100 text-green-600 dark:bg-green-950/40"
          ) }
        >
          <Mic size={ 42 } />
        </div>

        <p className="mt-5 text-5xl font-black tracking-tight text-slate-950 dark:text-white">
          { formattedTime }
        </p>

        <p className="mt-2 text-sm font-semibold capitalize text-slate-500 dark:text-slate-400">
          Status: { status }
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          { status === "idle" && (
            <Button onClick={ onStart } className="gap-2">
              <Play size={ 18 } />
              Start Recording
            </Button>
          ) }

          { status === "recording" && (
            <>
              <Button onClick={ onPause } variant="secondary" className="gap-2">
                <Pause size={ 18 } />
                Pause
              </Button>

              <Button onClick={ onStop } variant="danger" className="gap-2">
                <Square size={ 18 } />
                Stop
              </Button>
            </>
          ) }

          { status === "paused" && (
            <>
              <Button onClick={ onResume } className="gap-2">
                <Play size={ 18 } />
                Resume
              </Button>

              <Button onClick={ onStop } variant="danger" className="gap-2">
                <Square size={ 18 } />
                Stop
              </Button>
            </>
          ) }

          { status === "finished" && (
            <Button
              onClick={ onSubmit }
              disabled={ !transcript.trim() }
              className="group gap-2"
            >
              Get AI Feedback
              <Send
                size={ 18 }
                className="transition group-hover:translate-x-1"
              />
            </Button>
          ) }
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-black text-slate-800 dark:text-slate-100">
          Transcript
        </label>

        <textarea
          value={ transcript }
          onChange={ ( event ) => onTranscriptChange( event.target.value ) }
          placeholder="Your transcript will appear here. For now, you can type your spoken answer manually..."
          className="min-h-56 w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-4 text-sm leading-7 text-slate-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-green-950"
        />

        <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          Later, this transcript will be generated automatically from audio using
          Whisper or Google Speech-to-Text.
        </p>
      </div>
    </div>
  );
}