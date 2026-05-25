"use client";

import { Clock, FileCheck2, Layers, Sparkles, Target } from "lucide-react";
import Button from "@/components/ui/Button";

type Props = {
  started: boolean;
  submitted: boolean;
  onStart: () => void;
  onSubmit: () => void;
};

export default function MockTestHeader ( {
  started,
  submitted,
  onStart,
  onSubmit,
}: Props ) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-700 p-6 text-white shadow-xl shadow-indigo-600/20 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
            <Sparkles size={ 16 } />
            Full IELTS Simulation
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Mock Test
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
            Simulate a complete IELTS practice test with section tracking,
            countdown timer, progress overview, and estimated band score.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            { !started && !submitted && (
              <Button onClick={ onStart } className="bg-white text-indigo-700 hover:bg-indigo-50">
                Start Mock Test
              </Button>
            ) }

            { started && !submitted && (
              <Button onClick={ onSubmit } className="bg-white text-indigo-700 hover:bg-indigo-50">
                Submit Test
              </Button>
            ) }
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <HeroStat icon={ Clock } label="Duration" value="2h 45m" />
          <HeroStat icon={ Layers } label="Sections" value="4" />
          <HeroStat icon={ Target } label="Target" value="Band 7+" />
          <HeroStat icon={ FileCheck2 } label="Result" value="Instant" />
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
  icon: typeof Clock;
  label: string;
  value: string;
} ) {
  return (
    <div className="rounded-2xl bg-white/15 p-4 backdrop-blur transition hover:scale-[1.02]">
      <Icon size={ 22 } className="text-indigo-100" />

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-indigo-100">
        { label }
      </p>

      <p className="mt-1 text-2xl font-black text-white">{ value }</p>
    </div>
  );
}