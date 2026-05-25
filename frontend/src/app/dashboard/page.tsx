import {
  BookOpen,
  CalendarDays,
  Coins,
  Flame,
  Headphones,
  Mic,
  PenLine,
  Trophy,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import SkillCard from "@/components/dashboard/SkillCard";

export default function DashboardPage () {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <section>
        <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Welcome back, Sarah!
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Continue your journey to IELTS Band 7+
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Overall Band Score"
          value="6.5"
          subtitle="Target: 7+"
          icon={ Trophy }
          color="blue"
        />

        <StatCard
          title="Target Band"
          value="7+"
          subtitle="65% there"
          icon={ CalendarDays }
          color="green"
        />

        <StatCard
          title="Practice Streak"
          value="12 days"
          subtitle="Keep it up!"
          icon={ Flame }
          color="orange"
        />

        <StatCard
          title="Free Credits"
          value="5"
          subtitle="Remaining"
          icon={ Coins }
          color="purple"
        />
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SkillCard
          title="Writing"
          score="6.0"
          href="/dashboard/writing"
          icon={ PenLine }
          color="blue"
        />

        <SkillCard
          title="Speaking"
          score="6.5"
          href="/dashboard/speaking"
          icon={ Mic }
          color="green"
        />

        <SkillCard
          title="Listening"
          score="7.0"
          href="/dashboard/listening"
          icon={ Headphones }
          color="purple"
        />

        <SkillCard
          title="Reading"
          score="6.5"
          href="/dashboard/reading"
          icon={ BookOpen }
          color="orange"
        />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                Your Progress Journey
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Weekly improvement across all IELTS modules
              </p>
            </div>

            <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              { [ "7 Days", "30 Days", "90 Days" ].map( ( item, index ) => (
                <button
                  key={ item }
                  className={ `rounded-lg px-4 py-2 text-sm font-bold transition ${ index === 0
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-500 hover:bg-white dark:hover:bg-slate-700"
                    }` }
                >
                  { item }
                </button>
              ) ) }
            </div>
          </div>

          <div className="flex h-72 items-end gap-4 rounded-2xl bg-slate-50 p-6 dark:bg-slate-950">
            { [ 45, 55, 50, 65, 70, 72, 82 ].map( ( height, index ) => (
              <div key={ index } className="flex flex-1 flex-col items-center gap-3">
                <div
                  className="w-full rounded-t-xl bg-blue-600 transition-all duration-500 hover:bg-blue-700"
                  style={ { height: `${ height }%` } }
                />
                <span className="text-xs font-semibold text-slate-400">
                  W{ index + 1 }
                </span>
              </div>
            ) ) }
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            AI Insights
          </h2>

          <div className="mt-6 space-y-5">
            <Insight label="Complex sentences" value={ 35 } color="bg-red-500" />
            <Insight label="Pronunciation clarity" value={ 50 } color="bg-orange-500" />
            <Insight label="Vocabulary range" value={ 60 } color="bg-yellow-500" />
            <Insight label="Time management" value={ 40 } color="bg-red-500" />
          </div>

          <button className="mt-8 w-full rounded-xl border border-purple-500 py-3 text-sm font-bold text-purple-600 transition hover:scale-[1.02] hover:bg-purple-50 active:scale-[0.98] dark:text-purple-300 dark:hover:bg-purple-950/40">
            View detailed report
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title="Recommended for You ✨">
          <Recommendation
            title="Writing Task 2: Opinion Essay"
            subtitle="30 mins • Band 6.5-7.0"
            color="blue"
          />

          <Recommendation
            title="Speaking Part 2: Describe a place"
            subtitle="10 mins • Band 6.0-6.5"
            color="green"
          />

          <Recommendation
            title="Listening Section 3: Academic discussion"
            subtitle="20 mins • Band 7.0+"
            color="purple"
          />
        </Panel>

        <Panel title="Recent Activity">
          <Activity title="Completed Writing Task 1" score="Band 6.5" />
          <Activity title="Speaking Part 1 practice" score="Band 7.0" />
          <Activity title="Listening Mock Test" score="Band 6.5" />
          <Activity title="Vocabulary review: 50 words" score="100%" />
        </Panel>
      </section>
    </div>
  );
}

function Insight ( {
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
} ) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-semibold text-slate-600 dark:text-slate-300">
          { label }
        </span>
        <span className="text-slate-400">{ value }%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={ `h-full rounded-full ${ color } transition-all duration-700` }
          style={ { width: `${ value }%` } }
        />
      </div>
    </div>
  );
}

function Panel ( {
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
} ) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-black text-slate-950 dark:text-white">
        { title }
      </h2>

      <div className="mt-6 space-y-4">{ children }</div>
    </div>
  );
}

function Recommendation ( {
  title,
  subtitle,
  color,
}: {
  title: string;
  subtitle: string;
  color: "blue" | "green" | "purple";
} ) {
  const colors = {
    blue: "bg-blue-50 dark:bg-blue-950/40",
    green: "bg-green-50 dark:bg-green-950/40",
    purple: "bg-purple-50 dark:bg-purple-950/40",
  };

  const buttons = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
  };

  return (
    <div
      className={ `flex flex-col justify-between gap-4 rounded-2xl p-4 transition hover:scale-[1.01] sm:flex-row sm:items-center ${ colors[ color ] }` }
    >
      <div>
        <h3 className="font-bold text-slate-950 dark:text-white">{ title }</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          { subtitle }
        </p>
      </div>

      <button
        className={ `rounded-xl px-4 py-2 text-sm font-bold text-white transition active:scale-95 ${ buttons[ color ] }` }
      >
        Start Practice
      </button>
    </div>
  );
}

function Activity ( { title, score }: { title: string; score: string; } ) {
  return (
    <div className="border-l-4 border-blue-600 pl-4">
      <p className="font-semibold text-slate-800 dark:text-slate-200">
        { title }
      </p>
      <span className="mt-2 inline-block rounded-lg bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
        { score }
      </span>
    </div>
  );
}