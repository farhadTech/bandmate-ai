"use client";

import {
  BookOpen,
  Check,
  Headphones,
  Mic,
  PenLine,
  ShieldCheck,
  Timer,
  X,
} from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { CambridgeBook, CambridgeTest } from "@/types/cambridge";

export type TestMode = "practice" | "exam";

export type SelectedModule = "listening" | "reading" | "writing" | "speaking";

type Props = {
  open: boolean;
  book: CambridgeBook | null;
  test: CambridgeTest | null;
  onClose: () => void;
  onStart: ( payload: {
    book: CambridgeBook;
    test: CambridgeTest;
    mode: TestMode;
    modules: SelectedModule[];
  } ) => void;
};

const modules: {
  id: SelectedModule;
  label: string;
  description: string;
  icon: typeof Headphones;
}[] = [
    {
      id: "listening",
      label: "Listening",
      description: "Audio, notes, and 40 questions",
      icon: Headphones,
    },
    {
      id: "reading",
      label: "Reading",
      description: "Passages with full CBT layout",
      icon: BookOpen,
    },
    {
      id: "writing",
      label: "Writing",
      description: "Task 1 and Task 2 editor",
      icon: PenLine,
    },
    {
      id: "speaking",
      label: "Speaking",
      description: "Recorder-style practice flow",
      icon: Mic,
    },
  ];

export default function TestModeModal ( {
  open,
  book,
  test,
  onClose,
  onStart,
}: Props ) {
  const [ mode, setMode ] = useState<TestMode>( "practice" );
  const [ selectedModules, setSelectedModules ] = useState<SelectedModule[]>( [
    "listening",
    "reading",
    "writing",
    "speaking",
  ] );

  if ( !open || !book || !test ) {
    return null;
  }

  const activeBook = book;
  const activeTest = test;

  function toggleModule ( moduleId: SelectedModule ) {
    setSelectedModules( ( previous ) => {
      if ( previous.includes( moduleId ) ) {
        if ( previous.length === 1 ) return previous;
        return previous.filter( ( item ) => item !== moduleId );
      }

      return [ ...previous, moduleId ];
    } );
  }

  function handleStart () {
    onStart( {
      book: activeBook,
      test: activeTest,
      mode,
      modules: selectedModules,
    } );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-md">
      <div className="animate-in fade-in zoom-in-95 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/20 bg-white/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl duration-300 dark:border-slate-700/70 dark:bg-slate-950/90 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
              <ShieldCheck size={ 14 } />
              CBT Test Setup
            </div>

            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              { activeBook.title } · { activeTest.title }
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Choose your mode and modules before entering the computer-based
              IELTS test center.
            </p>
          </div>

          <button
            type="button"
            onClick={ onClose }
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-500 transition hover:scale-105 hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close modal"
          >
            <X size={ 20 } />
          </button>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
          <ModeCard
            active={ mode === "practice" }
            icon={ BookOpen }
            title="Practice Mode"
            description="Flexible practice with review, pause, and module switching."
            onClick={ () => setMode( "practice" ) }
          />

          <ModeCard
            active={ mode === "exam" }
            icon={ Timer }
            title="Exam Mode"
            description="Strict CBT simulation with timer and exam-style flow."
            onClick={ () => setMode( "exam" ) }
          />
        </div>

        <div className="mt-8">
          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                Select Modules
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                You can select one or multiple IELTS modules.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              { selectedModules.length }/4 selected
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            { modules.map( ( module ) => {
              const Icon = module.icon;
              const active = selectedModules.includes( module.id );

              return (
                <button
                  key={ module.id }
                  type="button"
                  onClick={ () => toggleModule( module.id ) }
                  className={ cn(
                    "group flex cursor-pointer items-center justify-between gap-4 rounded-3xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]",
                    active
                      ? "border-blue-500 bg-blue-50 shadow-blue-500/10 dark:border-blue-700 dark:bg-blue-950/30"
                      : "border-slate-200 bg-white/70 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-blue-800"
                  ) }
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={ cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-110",
                        active
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                      ) }
                    >
                      <Icon size={ 22 } />
                    </div>

                    <div>
                      <h4 className="font-black text-slate-950 dark:text-white">
                        { module.label }
                      </h4>
                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        { module.description }
                      </p>
                    </div>
                  </div>

                  { active && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check size={ 16 } />
                    </div>
                  ) }
                </button>
              );
            } ) }
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={ onClose } className="w-full sm:w-auto">
            Cancel
          </Button>

          <Button onClick={ handleStart } className="w-full sm:w-auto">
            Start Test
          </Button>
        </div>
      </div>
    </div>
  );
}

function ModeCard ( {
  active,
  icon: Icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: typeof BookOpen;
  title: string;
  description: string;
  onClick: () => void;
} ) {
  return (
    <button
      type="button"
      onClick={ onClick }
      className={ cn(
        "group cursor-pointer rounded-3xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]",
        active
          ? "border-blue-500 bg-blue-50 shadow-blue-500/10 dark:border-blue-700 dark:bg-blue-950/30"
          : "border-slate-200 bg-white/70 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-blue-800"
      ) }
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div
          className={ cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-110",
            active
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
          ) }
        >
          <Icon size={ 22 } />
        </div>

        { active && (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
            <Check size={ 16 } />
          </div>
        ) }
      </div>

      <h4 className="text-lg font-black text-slate-950 dark:text-white">
        { title }
      </h4>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        { description }
      </p>
    </button>
  );
}