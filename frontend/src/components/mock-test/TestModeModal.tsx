"use client";

import {
  BookOpen,
  Check,
  Headphones,
  Mic,
  PenLine,
  Play,
  Timer,
  X,
} from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { CambridgeBook, CambridgeTest } from "./CambridgeBookCard";

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
  icon: typeof Headphones;
  color: string;
}[] = [
    {
      id: "listening",
      label: "Listening",
      icon: Headphones,
      color:
        "border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300",
    },
    {
      id: "reading",
      label: "Reading",
      icon: BookOpen,
      color:
        "border-cyan-600 bg-cyan-50 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-300",
    },
    {
      id: "writing",
      label: "Writing",
      icon: PenLine,
      color:
        "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
    },
    {
      id: "speaking",
      label: "Speaking",
      icon: Mic,
      color:
        "border-green-600 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300",
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
    setSelectedModules( ( prev ) => {
      if ( prev.includes( moduleId ) ) {
        if ( prev.length === 1 ) return prev;
        return prev.filter( ( item ) => item !== moduleId );
      }

      return [ ...prev, moduleId ];
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-8 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in-95 relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl duration-300 dark:border-slate-800 dark:bg-slate-950">
        <button
          type="button"
          onClick={ onClose }
          className="absolute right-5 top-5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <X size={ 18 } />
        </button>

        <div className="border-b border-slate-200 px-6 py-5 text-center dark:border-slate-800">
          <p className="text-sm font-black text-blue-600 dark:text-blue-300">
            { activeBook.title } · { activeTest.title }
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
            Choose Test Mode
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Select practice mode or exam mode, then choose the IELTS modules you
            want to attempt.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ModeCard
              active={ mode === "practice" }
              icon={ Play }
              title="Practice Mode"
              description="Flexible practice with pause, review, hints, and section control."
              onClick={ () => setMode( "practice" ) }
            />

            <ModeCard
              active={ mode === "exam" }
              icon={ Timer }
              title="Exam Mode"
              description="Computer-based IELTS simulation with timer and strict flow."
              onClick={ () => setMode( "exam" ) }
            />
          </div>

          <div className="mt-8">
            <div className="mb-4 text-center">
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                Select Modules
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                You can choose one or multiple modules.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              { modules.map( ( module ) => {
                const Icon = module.icon;
                const active = selectedModules.includes( module.id );

                return (
                  <button
                    key={ module.id }
                    type="button"
                    onClick={ () => toggleModule( module.id ) }
                    className={ cn(
                      "relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]",
                      active
                        ? module.color
                        : "border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    ) }
                  >
                    { active && (
                      <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                        <Check size={ 14 } />
                      </div>
                    ) }

                    <Icon size={ 28 } />

                    <span className="text-sm font-black">{ module.label }</span>
                  </button>
                );
              } ) }
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-900">
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              You must complete all selected modules before the final result is
              generated. In review mode, students can see wrong answers,
              correct answers, and explanations.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={ onClose } className="flex-1">
              Cancel
            </Button>

            <Button onClick={ handleStart } className="flex-1">
              Start Test
            </Button>
          </div>
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
  icon: typeof Play;
  title: string;
  description: string;
  onClick: () => void;
} ) {
  return (
    <button
      type="button"
      onClick={ onClick }
      className={ cn(
        "relative cursor-pointer rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]",
        active
          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      ) }
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div
          className={ cn(
            "rounded-xl p-3",
            active
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
          ) }
        >
          <Icon size={ 24 } />
        </div>

        { active && (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
            <Check size={ 16 } />
          </div>
        ) }
      </div>

      <h3 className="text-lg font-black text-slate-950 dark:text-white">
        { title }
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        { description }
      </p>
    </button>
  );
}