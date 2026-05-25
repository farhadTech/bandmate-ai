"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Mic2,
  Sparkles,
  Target,
} from "lucide-react";
import Button from "@/components/ui/Button";

type Props = {
  visible: boolean;
};

export default function SpeakingFeedbackPreview ( { visible }: Props ) {
  if ( !visible ) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600 dark:bg-green-950/40">
          <Sparkles size={ 28 } />
        </div>

        <h2 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
          AI Speaking Feedback
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Record or type your answer to receive fluency, grammar, vocabulary,
          and pronunciation feedback.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm duration-500 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-black text-green-600">
            AI Speaking Feedback
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
            Estimated Band: 6.5
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            This is demo feedback. Later, your backend will analyze transcript,
            pronunciation, fluency, and grammar.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-2xl font-black text-white">
          6.5
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <ScoreItem label="Fluency" score="6.5" />
        <ScoreItem label="Pronunciation" score="6.0" />
        <ScoreItem label="Vocabulary" score="7.0" />
        <ScoreItem label="Grammar" score="6.5" />
      </div>

      <div className="mt-6 space-y-4">
        <FeedbackBox
          icon={ CheckCircle2 }
          title="Strengths"
          color="green"
          points={ [
            "Answer is clear and easy to follow.",
            "Good use of everyday vocabulary.",
            "Ideas are generally relevant to the question.",
          ] }
        />

        <FeedbackBox
          icon={ AlertTriangle }
          title="Needs Improvement"
          color="orange"
          points={ [
            "Try to reduce hesitation and filler words.",
            "Use more complex sentence structures.",
            "Add more examples to extend your answer.",
          ] }
        />

        <FeedbackBox
          icon={ Lightbulb }
          title="AI Recommendation"
          color="blue"
          points={ [
            "Practice answering for 45-60 seconds without stopping.",
            "Use linking phrases like 'Another reason is...' and 'For example...'.",
            "Record yourself daily and compare fluency.",
          ] }
        />
      </div>

      <Button className="mt-6 w-full">View Full Speaking Report</Button>
    </div>
  );
}

function ScoreItem ( { label, score }: { label: string; score: string; } ) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
      <div className="mb-2 flex items-center gap-2">
        <Target size={ 15 } className="text-green-600" />
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
    green:
      "text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-300",
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

        <h3 className="font-black text-slate-950 dark:text-white">{ title }</h3>
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