"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Headphones,
  Home,
  Mic,
  PenLine,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";

const moduleResults = [
  {
    module: "Listening",
    score: "7.0",
    raw: "30/40",
    correct: 30,
    total: 40,
    icon: Headphones,
    color: "purple",
  },
  {
    module: "Reading",
    score: "6.5",
    raw: "27/40",
    correct: 27,
    total: 40,
    icon: BookOpen,
    color: "cyan",
  },
  {
    module: "Writing",
    score: "6.5",
    raw: "Task 1 + Task 2",
    correct: 65,
    total: 100,
    icon: PenLine,
    color: "blue",
  },
  {
    module: "Speaking",
    score: "7.0",
    raw: "Fluency + Grammar",
    correct: 70,
    total: 100,
    icon: Mic,
    color: "green",
  },
];

const recommendations = [
  {
    title: "Improve Reading speed",
    text: "You lost marks in True / False / Not Given. Practice scanning keywords and paraphrases.",
    icon: BookOpen,
  },
  {
    title: "Strengthen Writing examples",
    text: "Your Task 2 ideas need more specific examples and clearer development.",
    icon: PenLine,
  },
  {
    title: "Continue Listening Section 3",
    text: "Your listening score is close to Band 7.5. Keep practicing academic conversations.",
    icon: Headphones,
  },
];

export default function MockResultPage () {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-700 p-6 text-white shadow-xl shadow-indigo-600/20 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles size={ 16 } />
              Mock Test Completed
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Your IELTS Result Is Ready
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
              Review your estimated band score, module performance, strengths,
              weak areas, and recommended next actions.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard/mock-test/review">
                <Button className="w-full gap-2 bg-white text-indigo-700 hover:bg-indigo-50 sm:w-auto">
                  Review Mistakes
                  <ArrowRight size={ 18 } />
                </Button>
              </Link>

              <Link href="/dashboard/mock-test">
                <Button
                  variant="outline"
                  className="w-full border-white/50 text-white hover:bg-white/10 sm:w-auto"
                >
                  Back to Test Library
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white/15 p-6 text-center backdrop-blur">
            <p className="text-sm font-black uppercase tracking-wide text-indigo-100">
              Overall Band
            </p>

            <div className="mt-3 text-7xl font-black tracking-tight text-white">
              6.75
            </div>

            <p className="mt-3 text-sm font-semibold text-indigo-100">
              Target Band 7+ · Almost there
            </p>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[84%] rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Correct Answers"
          value="57"
          subtitle="Listening + Reading"
          icon={ CheckCircle2 }
          color="green"
        />

        <StatCard
          title="Wrong Answers"
          value="23"
          subtitle="Need review"
          icon={ XCircle }
          color="red"
        />

        <StatCard
          title="Best Module"
          value="Listening"
          subtitle="Band 7.0"
          icon={ Award }
          color="purple"
        />

        <StatCard
          title="Main Focus"
          value="Writing"
          subtitle="Improve examples"
          icon={ Target }
          color="blue"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              Module Breakdown
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Estimated band scores from this mock test.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            { moduleResults.map( ( item ) => (
              <ModuleResultCard key={ item.module } { ...item } />
            ) ) }
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-violet-950/30 dark:text-violet-300">
              <TrendingUp size={ 22 } />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                AI Recommendations
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Suggested next actions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            { recommendations.map( ( item ) => {
              const Icon = item.icon;

              return (
                <div
                  key={ item.title }
                  className="rounded-2xl border border-slate-200 p-4 transition hover:translate-x-1 hover:shadow-md dark:border-slate-800"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300">
                      <Icon size={ 18 } />
                    </div>

                    <h3 className="font-black text-slate-950 dark:text-white">
                      { item.title }
                    </h3>
                  </div>

                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    { item.text }
                  </p>
                </div>
              );
            } ) }
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Link href="/dashboard/mock-test/review">
          <ActionCard
            icon={ ClipboardList }
            title="Review Mistakes"
            text="See wrong answers, correct answers, and explanations."
          />
        </Link>

        <Link href="/dashboard/mock-test">
          <ActionCard
            icon={ RotateCcw }
            title="Take Another Test"
            text="Return to Cambridge Test Library and start again."
          />
        </Link>

        <Link href="/dashboard">
          <ActionCard
            icon={ Home }
            title="Back to Dashboard"
            text="Continue your IELTS preparation journey."
          />
        </Link>
      </section>
    </div>
  );
}

function StatCard ( {
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: typeof CheckCircle2;
  color: "green" | "red" | "purple" | "blue";
} ) {
  const colors = {
    green:
      "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
    red: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300",
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            { title }
          </p>

          <h3 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
            { value }
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            { subtitle }
          </p>
        </div>

        <div
          className={ `rounded-2xl p-3 transition group-hover:scale-110 ${ colors[ color ] }` }
        >
          <Icon size={ 24 } />
        </div>
      </div>
    </div>
  );
}

function ModuleResultCard ( {
  module,
  score,
  raw,
  correct,
  total,
  icon: Icon,
  color,
}: {
  module: string;
  score: string;
  raw: string;
  correct: number;
  total: number;
  icon: typeof Headphones;
  color: string;
} ) {
  const percentage = Math.round( ( correct / total ) * 100 );

  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300",
    green:
      "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300",
    cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300",
  };

  const bars: Record<string, string> = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    cyan: "bg-cyan-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <div className={ `rounded-xl p-3 ${ colors[ color ] }` }>
          <Icon size={ 22 } />
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          { raw }
        </span>
      </div>

      <h3 className="font-black text-slate-950 dark:text-white">{ module }</h3>

      <p className="mt-2 text-4xl font-black text-slate-950 dark:text-white">
        { score }
      </p>

      <div className="mt-4">
        <div className="mb-2 flex justify-between text-sm font-bold">
          <span className="text-slate-600 dark:text-slate-300">Progress</span>
          <span className="text-slate-400">{ percentage }%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className={ `h-full rounded-full ${ bars[ color ] } transition-all duration-700` }
            style={ { width: `${ percentage }%` } }
          />
        </div>
      </div>
    </div>
  );
}

function ActionCard ( {
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ClipboardList;
  title: string;
  text: string;
} ) {
  return (
    <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600 transition group-hover:scale-110 dark:bg-blue-950/30 dark:text-blue-300">
        <Icon size={ 22 } />
      </div>

      <h3 className="text-lg font-black text-slate-950 dark:text-white">
        { title }
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        { text }
      </p>
    </div>
  );
}