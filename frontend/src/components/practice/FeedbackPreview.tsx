"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Target,
} from "lucide-react";
import Button from "@/components/ui/Button";

type FeedbackPreviewProps = {
  visible: boolean;
};

export default function FeedbackPreview ( { visible }: FeedbackPreviewProps ) {
  if ( !visible ) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
          <Sparkles size={ 28 } />
        </div>

        <h2 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
          AI Feedback Preview
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Submit your writing to receive band score, rubric analysis,
          strengths, weaknesses, and improvement tips.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm duration-500 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-black text-blue-600">AI Writing Feedback</p>

          <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
            Estimated Band: 6.5
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            This is demo feedback. Later, it will come from your FastAPI backend
            and AI model.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white">
          6.5
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <ScoreItem label="Task Response" score="6.5" />
        <ScoreItem label="Coherence" score="6.0" />
        <ScoreItem label="Vocabulary" score="7.0" />
        <ScoreItem label="Grammar" score="6.5" />
      </div>

      <div className="mt-6 space-y-4">
        <FeedbackBox
          icon={ CheckCircle2 }
          title="Strengths"
          color="green"
          points={ [
            "Clear position throughout the answer.",
            "Good use of topic-specific vocabulary.",
            "Paragraph structure is easy to follow.",
          ] }
        />

        <FeedbackBox
          icon={ AlertTriangle }
          title="Needs Improvement"
          color="orange"
          points={ [
            "Some ideas need stronger examples.",
            "Sentence variety can be improved.",
            "A few grammar mistakes reduce clarity.",
          ] }
        />

        <FeedbackBox
          icon={ Lightbulb }
          title="AI Recommendation"
          color="blue"
          points={ [
            "Add one specific example in each body paragraph.",
            "Use more complex sentence structures.",
            "Review linking phrases for contrast and result.",
          ] }
        />
      </div>

      <Button className="mt-6 w-full">
        View Full Detailed Report
      </Button>
    </div>
  );
}

function ScoreItem ( { label, score }: { label: string; score: string; } ) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
      <div className="mb-2 flex items-center gap-2">
        <Target size={ 15 } className="text-blue-600" />
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
          { label }
        </p>
      </div>

      <p className="text-2xl font-black text-slate-950 dark:text-white">
        { score }
      </p>
    </div>
  );
}

function FeedbackBox ( {
  icon: Icon,
  title,
  points,
  color,
}: {
  icon: typeof CheckCircle2;
  title: string;
  points: string[];
  color: "green" | "orange" | "blue";
} ) {
  const colors = {
    green: "text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-300",
    orange:
      "text-orange-600 bg-orange-50 dark:bg-orange-950/30 dark:text-orange-300",
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-300",
  };

  return (
    <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="mb-3 flex items-center gap-3">
        <div className={ `rounded-xl p-2 ${ colors[ color ] }` }>
          <Icon size={ 18 } />
        </div>

        <h3 className="font-black text-slate-950 dark:text-white">
          { title }
        </h3>
      </div>

      <ul className="space-y-2">
        { points.map( ( point ) => (
          <li
            key={ point }
            className="text-sm leading-6 text-slate-600 dark:text-slate-300"
          >
            • { point }
          </li>
        ) ) }
      </ul>
    </div>
  );
}