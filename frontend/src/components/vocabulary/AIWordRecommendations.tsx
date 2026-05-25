"use client";

import { Lightbulb, Plus, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

type Props = {
  onAddRecommendation: ( word: {
    word: string;
    meaning: string;
    example: string;
  } ) => void;
};

const recommendations = [
  {
    word: "substantial",
    meaning: "large in amount, value, or importance",
    example:
      "There has been a substantial increase in online learning in recent years.",
  },
  {
    word: "mitigate",
    meaning: "to make something less harmful or serious",
    example:
      "Governments should take steps to mitigate the effects of climate change.",
  },
  {
    word: "compelling",
    meaning: "very convincing or persuasive",
    example:
      "There are several compelling reasons why public transport should be improved.",
  },
];

export default function AIWordRecommendations ( {
  onAddRecommendation,
}: Props ) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-violet-950/30 dark:text-violet-300">
          <Sparkles size={ 22 } />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            AI Word Recommendations
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Suggested high-band IELTS vocabulary.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        { recommendations.map( ( item ) => (
          <div
            key={ item.word }
            className="rounded-2xl border border-slate-200 p-4 transition hover:shadow-md dark:border-slate-800"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">
                  { item.word }
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  { item.meaning }
                </p>
              </div>

              <button
                type="button"
                onClick={ () => onAddRecommendation( item ) }
                className="cursor-pointer rounded-xl bg-violet-600 p-2 text-white transition hover:bg-violet-700 active:scale-[0.98]"
              >
                <Plus size={ 18 } />
              </button>
            </div>

            <p className="rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
              “{ item.example }”
            </p>
          </div>
        ) ) }
      </div>

      <div className="mt-5 rounded-2xl bg-violet-50 p-4 dark:bg-violet-950/20">
        <div className="mb-2 flex items-center gap-2 font-black text-violet-700 dark:text-violet-300">
          <Lightbulb size={ 18 } />
          Tip
        </div>

        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Save words you can actually use in essays and speaking answers. Avoid
          memorizing rare words without context.
        </p>
      </div>

      <Button className="mt-5 w-full">Generate More Words</Button>
    </div>
  );
}