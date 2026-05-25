"use client";

import { BookMarked, Brain, Sparkles, Target, Wand2 } from "lucide-react";
import Button from "@/components/ui/Button";

type Props = {
  onAddWord: () => void;
};

export default function VocabularyHeader ( { onAddWord }: Props ) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-cyan-600/20 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
            <Sparkles size={ 16 } />
            IELTS Vocabulary Builder
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Vocabulary
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-cyan-100 sm:text-base">
            Save high-band words, review useful phrases, track difficulty, and
            build vocabulary for IELTS Writing and Speaking.
          </p>

          <Button
            onClick={ onAddWord }
            className="mt-6 gap-2 bg-white text-blue-700 hover:bg-cyan-50"
          >
            <Wand2 size={ 18 } />
            Add Demo Word
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <HeroStat icon={ BookMarked } label="Saved" value="48" />
          <HeroStat icon={ Brain } label="Review" value="12" />
          <HeroStat icon={ Target } label="Goal" value="100" />
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
  icon: typeof BookMarked;
  label: string;
  value: string;
} ) {
  return (
    <div className="rounded-2xl bg-white/15 p-4 backdrop-blur transition hover:scale-[1.02]">
      <Icon size={ 22 } className="text-cyan-100" />

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-cyan-100">
        { label }
      </p>

      <p className="mt-1 text-2xl font-black text-white">{ value }</p>
    </div>
  );
}