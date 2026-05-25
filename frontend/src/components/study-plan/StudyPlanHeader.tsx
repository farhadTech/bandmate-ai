"use client";

import { CalendarDays, Clock, Sparkles, Target, Wand2 } from "lucide-react";
import Button from "@/components/ui/Button";

type Props = {
  onRegenerate: () => void;
};

export default function StudyPlanHeader ( { onRegenerate }: Props ) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
            <Sparkles size={ 16 } />
            Personalized AI Plan
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Study Plan
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Follow your weekly IELTS plan based on target band, weakest skill,
            available study time, and upcoming exam date.
          </p>

          <Button
            onClick={ onRegenerate }
            className="mt-6 gap-2 bg-white text-blue-700 hover:bg-blue-50"
          >
            <Wand2 size={ 18 } />
            Regenerate Plan
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <HeroStat icon={ CalendarDays } label="Plan" value="7 Days" />
          <HeroStat icon={ Clock } label="Daily" value="2h" />
          <HeroStat icon={ Target } label="Target" value="Band 7+" />
          <HeroStat icon={ Wand2 } label="AI" value="Smart" />
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
  icon: typeof CalendarDays;
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