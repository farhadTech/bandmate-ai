"use client";

import { Award, CheckCircle2, Lightbulb, Trophy } from "lucide-react";
import Button from "@/components/ui/Button";

type Props = {
  visible: boolean;
  onRetake: () => void;
};

export default function MockResultCard ( { visible, onRetake }: Props ) {
  if ( !visible ) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
          <Trophy size={ 28 } />
        </div>

        <h2 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
          Mock Test Result
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Complete or submit the mock test to see your estimated IELTS band.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm duration-500 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-black text-indigo-600 dark:text-indigo-300">
            Full Mock Test Result
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
            Overall Band: 6.75
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Demo score generated from your current mock test progress.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-black text-white">
          6.75
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Score label="Listening" value="7.0" />
        <Score label="Reading" value="6.5" />
        <Score label="Writing" value="6.5" />
        <Score label="Speaking" value="7.0" />
      </div>

      <div className="mt-6 space-y-4">
        <Info
          icon={ CheckCircle2 }
          title="Strong Area"
          text="Listening and Speaking are currently your stronger modules."
        />

        <Info
          icon={ Lightbulb }
          title="Recommendation"
          text="Focus on Writing Task 2 structure and Reading time management."
        />

        <Info
          icon={ Award }
          title="Next Goal"
          text="Complete one full mock test every week until your exam date."
        />
      </div>

      <Button onClick={ onRetake } className="mt-6 w-full">
        Retake Mock Test
      </Button>
    </div>
  );
}

function Score ( { label, value }: { label: string; value: string; } ) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
        { label }
      </p>
      <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
        { value }
      </p>
    </div>
  );
}

function Info ( {
  icon: Icon,
  title,
  text,
}: {
  icon: typeof CheckCircle2;
  title: string;
  text: string;
} ) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="mb-2 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
          <Icon size={ 18 } />
        </div>

        <h3 className="font-black text-slate-950 dark:text-white">{ title }</h3>
      </div>

      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        { text }
      </p>
    </div>
  );
}