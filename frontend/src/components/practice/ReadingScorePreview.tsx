"use client";

import { Award, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";
import Button from "@/components/ui/Button";

type Props = {
  visible: boolean;
  score: number;
  total: number;
};

export default function ReadingScorePreview ( { visible, score, total }: Props ) {
  if ( !visible ) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-950/40">
          <BookOpen size={ 28 } />
        </div>

        <h2 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
          Reading Score Preview
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Complete the questions and check your answers to see your score.
        </p>
      </div>
    );
  }

  const percentage = Math.round( ( score / total ) * 100 );
  const estimatedBand =
    percentage >= 90
      ? "8.5"
      : percentage >= 75
        ? "7.5"
        : percentage >= 60
          ? "6.5"
          : "5.5";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm duration-500 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-black text-orange-600">
            Reading Result
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
            Estimated Band: { estimatedBand }
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            You scored { score } out of { total } in this demo practice.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600 text-2xl font-black text-white">
          { score }/{ total }
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
        <div className="mb-2 flex justify-between text-sm font-bold">
          <span className="text-slate-700 dark:text-slate-200">Accuracy</span>
          <span className="text-orange-600">{ percentage }%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-orange-600 transition-all duration-700"
            style={ { width: `${ percentage }%` } }
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <InfoBox
          icon={ CheckCircle2 }
          title="Good Work"
          text="You completed the passage questions and checked your answers."
        />

        <InfoBox
          icon={ Lightbulb }
          title="Recommendation"
          text="Practice scanning for names, dates, keywords, and paraphrases."
        />

        <InfoBox
          icon={ Award }
          title="Next Goal"
          text="Try to finish each passage within 20 minutes with at least 75% accuracy."
        />
      </div>

      <Button className="mt-6 w-full">View Detailed Reading Report</Button>
    </div>
  );
}

function InfoBox ( {
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
        <div className="rounded-xl bg-orange-50 p-2 text-orange-600 dark:bg-orange-950/30 dark:text-orange-300">
          <Icon size={ 18 } />
        </div>

        <h3 className="font-black text-slate-950 dark:text-white">
          { title }
        </h3>
      </div>

      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        { text }
      </p>
    </div>
  );
}