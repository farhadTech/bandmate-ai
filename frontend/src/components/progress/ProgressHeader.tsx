"use client";

import { BarChart3, CalendarDays, Sparkles, Target, TrendingUp } from "lucide-react";

export default function ProgressHeader () {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
            <Sparkles size={ 16 } />
            AI Performance Analytics
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Progress Analytics
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Track your IELTS band growth, skill performance, study consistency,
            and AI-recommended next actions.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <HeroStat icon={ TrendingUp } label="Growth" value="+0.7" />
          <HeroStat icon={ Target } label="Target" value="Band 7+" />
          <HeroStat icon={ CalendarDays } label="Streak" value="12d" />
          <HeroStat icon={ BarChart3 } label="Reports" value="24" />
        </div>
      </div>
    </section>
  );
}

function HeroStat ( {
  icon: Icon,
  label,
  value,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
} ) {
  return (
    <div className="rounded-2xl bg-white/15 p-4 backdrop-blur transition hover:scale-[1.02]">
      <Icon size={ 22 } className="text-blue-100" />
      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-blue-100">
        { label }
      </p>
      <p className="mt-1 text-2xl font-black text-white">{ value }</p>
    </div>
  );
}