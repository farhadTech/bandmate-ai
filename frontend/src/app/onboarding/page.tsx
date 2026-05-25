"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  GraduationCap,
  Headphones,
  Mic,
  PenLine,
  Target,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type IELTSGoal = "Academic" | "General Training";
type Skill = "Writing" | "Speaking" | "Listening" | "Reading";

const targetBands = [ "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0" ];
const currentBands = [ "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0" ];
const studyTimes = [
  "30 minutes",
  "1 hour",
  "1.5 hours",
  "2 hours",
  "3+ hours",
];

const skills: {
  label: Skill;
  icon: typeof PenLine;
  color: string;
}[] = [
    {
      label: "Writing",
      icon: PenLine,
      color: "blue",
    },
    {
      label: "Speaking",
      icon: Mic,
      color: "green",
    },
    {
      label: "Listening",
      icon: Headphones,
      color: "purple",
    },
    {
      label: "Reading",
      icon: BookOpen,
      color: "orange",
    },
  ];

export default function OnboardingPage () {
  const [ ieltsType, setIeltsType ] = useState<IELTSGoal | "">( "" );
  const [ targetBand, setTargetBand ] = useState( "" );
  const [ currentBand, setCurrentBand ] = useState( "" );
  const [ examDate, setExamDate ] = useState( "" );
  const [ weakestSkill, setWeakestSkill ] = useState<Skill | "">( "" );
  const [ studyTime, setStudyTime ] = useState( "" );

  const completedFields = useMemo( () => {
    return [
      ieltsType,
      targetBand,
      currentBand,
      examDate,
      weakestSkill,
      studyTime,
    ].filter( Boolean ).length;
  }, [ ieltsType, targetBand, currentBand, examDate, weakestSkill, studyTime ] );

  const progress = Math.round( ( completedFields / 6 ) * 100 );
  const isComplete = completedFields === 6;

  return (
    <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-slate-950">
      <header className="flex h-20 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white">
            B
          </div>

          <span className="text-xl font-black text-slate-950 dark:text-white">
            BandMate AI
          </span>
        </Link>

        <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <span className="hidden sm:inline">Already have an account?</span>

          <Link
            href="/login"
            className="rounded-xl border border-blue-600 px-5 py-2.5 text-blue-600 transition hover:bg-blue-50 active:scale-[0.98] dark:hover:bg-blue-950"
          >
            Login
          </Link>
        </div>
      </header>

      <section className="grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-2">
        <aside className="hidden bg-blue-50 px-10 py-16 dark:bg-slate-900 lg:flex lg:items-center">
          <div className="mx-auto max-w-lg animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="mb-8 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Step 1 of 6
            </div>

            <h1 className="text-5xl font-black tracking-tight text-slate-950 dark:text-white">
              Let&apos;s personalize your IELTS journey
            </h1>

            <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-300">
              Answer a few quick questions so we can create the perfect study
              plan for your target band.
            </p>

            <div className="mt-10 space-y-5">
              <Benefit text="Personalized study plan based on your goals" />
              <Benefit text="AI-powered recommendations for each module" />
              <Benefit text="Track your progress to Band 7+" />
            </div>

            <div className="mt-16 flex items-end gap-5 opacity-70">
              <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-950" />
              <div className="h-32 w-32 rounded-full bg-blue-200 dark:bg-blue-900" />
              <div className="h-16 w-16 rounded-full bg-blue-300 dark:bg-blue-800" />
            </div>
          </div>
        </aside>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70 duration-500 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30 sm:p-9">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                  Step { completedFields || 1 } of 6
                </p>

                <p className="text-sm font-bold text-blue-600">
                  { progress }%
                </p>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={ { width: `${ progress }%` } }
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                Tell us about your IELTS goals
              </h2>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                This helps us create a customized study plan just for you.
              </p>
            </div>

            <form className="mt-8 space-y-7">
              <div>
                <Label>Which IELTS test are you taking?</Label>

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <ChoiceCard
                    active={ ieltsType === "Academic" }
                    title="Academic"
                    subtitle="For university admission"
                    icon={ GraduationCap }
                    onClick={ () => setIeltsType( "Academic" ) }
                  />

                  <ChoiceCard
                    active={ ieltsType === "General Training" }
                    title="General Training"
                    subtitle="For work or migration"
                    icon={ Target }
                    onClick={ () => setIeltsType( "General Training" ) }
                  />
                </div>
              </div>

              <div>
                <Label>What&apos;s your target band score?</Label>

                <SelectBox
                  value={ targetBand }
                  placeholder="Select target band"
                  options={ targetBands }
                  onChange={ setTargetBand }
                />
              </div>

              <div>
                <Label>What&apos;s your current estimated band?</Label>

                <SelectBox
                  value={ currentBand }
                  placeholder="Select current band"
                  options={ currentBands }
                  onChange={ setCurrentBand }
                />
              </div>

              <div>
                <Label>When is your exam date?</Label>

                <div className="relative mt-3">
                  <CalendarDays
                    size={ 18 }
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={ examDate }
                    onChange={ ( event ) => setExamDate( event.target.value ) }
                    className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950"
                  />
                </div>
              </div>

              <div>
                <Label>Which skill needs the most improvement?</Label>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  { skills.map( ( skill ) => (
                    <SkillButton
                      key={ skill.label }
                      label={ skill.label }
                      icon={ skill.icon }
                      active={ weakestSkill === skill.label }
                      color={ skill.color }
                      onClick={ () => setWeakestSkill( skill.label ) }
                    />
                  ) ) }
                </div>
              </div>

              <div>
                <Label>How much time can you study daily?</Label>

                <SelectBox
                  value={ studyTime }
                  placeholder="Select study time"
                  options={ studyTimes }
                  onChange={ setStudyTime }
                />
              </div>

              <Link href={ isComplete ? "/dashboard" : "#" } className="block">
                <Button
                  type="button"
                  disabled={ !isComplete }
                  className="group w-full py-3.5 text-base"
                >
                  Create My Study Plan
                  <ArrowRight
                    size={ 20 }
                    className="ml-2 transition group-hover:translate-x-1"
                  />
                </Button>
              </Link>

              { !isComplete && (
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Complete all fields to continue.
                </p>
              ) }
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}

function Benefit ( { text }: { text: string; } ) {
  return (
    <div className="flex items-center gap-4">
      <CheckCircle2 className="text-blue-600" size={ 24 } />
      <span className="text-lg text-slate-600 dark:text-slate-300">
        { text }
      </span>
    </div>
  );
}

function Label ( { children }: { children: React.ReactNode; } ) {
  return (
    <label className="block text-sm font-black text-slate-800 dark:text-slate-100">
      { children }
    </label>
  );
}

function ChoiceCard ( {
  active,
  title,
  subtitle,
  icon: Icon,
  onClick,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  icon: typeof GraduationCap;
  onClick: () => void;
} ) {
  return (
    <button
      type="button"
      onClick={ onClick }
      className={ cn(
        "group relative rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]",
        active
          ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-600/10 dark:bg-blue-950/30"
          : "border-slate-200 bg-white hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-700"
      ) }
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={ cn(
            "rounded-xl p-3 transition group-hover:scale-110",
            active
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-500 dark:bg-slate-800"
          ) }
        >
          <Icon size={ 22 } />
        </div>

        { active && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
            <Check size={ 15 } />
          </div>
        ) }
      </div>

      <h3 className="mt-4 text-lg font-black text-slate-950 dark:text-white">
        { title }
      </h3>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        { subtitle }
      </p>
    </button>
  );
}

function SelectBox ( {
  value,
  placeholder,
  options,
  onChange,
}: {
  value: string;
  placeholder: string;
  options: string[];
  onChange: ( value: string ) => void;
} ) {
  return (
    <div className="relative mt-3">
      <select
        value={ value }
        onChange={ ( event ) => onChange( event.target.value ) }
        className="w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950"
      >
        <option value="">{ placeholder }</option>

        { options.map( ( option ) => (
          <option key={ option } value={ option }>
            { option }
          </option>
        ) ) }
      </select>

      <ChevronDown
        size={ 18 }
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function SkillButton ( {
  label,
  icon: Icon,
  active,
  color,
  onClick,
}: {
  label: Skill;
  icon: typeof PenLine;
  active: boolean;
  color: string;
  onClick: () => void;
} ) {
  const activeColors: Record<string, string> = {
    blue: "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
    green:
      "border-green-600 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300",
    purple:
      "border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300",
    orange:
      "border-orange-600 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300",
  };

  return (
    <button
      type="button"
      onClick={ onClick }
      className={ cn(
        "flex items-center justify-center gap-3 rounded-xl border px-4 py-3 text-sm font-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]",
        active
          ? activeColors[ color ]
          : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      ) }
    >
      <Icon size={ 18 } />
      { label }
    </button>
  );
}
