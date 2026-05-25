"use client";

import { AlertTriangle, CheckCircle2, Lightbulb, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AIInsights () {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-violet-950/30 dark:text-violet-300">
          <Sparkles size={ 22 } />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            AI Insights
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Smart recommendations based on your performance.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Insight
          icon={ AlertTriangle }
          title="Main weakness"
          text="Writing Task 2 ideas need stronger examples and clearer paragraph development."
          color="orange"
        />

        <Insight
          icon={ Lightbulb }
          title="Next action"
          text="Practice one opinion essay daily and review topic sentences after each attempt."
          color="blue"
        />

        <Insight
          icon={ CheckCircle2 }
          title="Strong pattern"
          text="Listening accuracy is improving steadily. Continue Section 3 practice twice weekly."
          color="green"
        />
      </div>

      <Button className="mt-6 w-full">Generate New AI Plan</Button>
    </div>
  );
}

function Insight ( {
  icon: Icon,
  title,
  text,
  color,
}: {
  icon: typeof AlertTriangle;
  title: string;
  text: string;
  color: "orange" | "blue" | "green";
} ) {
  const colors = {
    orange:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-300",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300",
    green:
      "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
  };

  return (
    <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="mb-2 flex items-center gap-3">
        <div className={ `rounded-xl p-2 ${ colors[ color ] }` }>
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