"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Clock,
  FileCheck2,
  PenLine,
  Sparkles,
  Target,
} from "lucide-react";
import WritingTaskSelector, {
  WritingTaskType,
} from "@/components/practice/WritingTaskSelector";
import WritingEditor from "@/components/practice/WritingEditor";
import FeedbackPreview from "@/components/practice/FeedbackPreview";

const samplePrompts = {
  "task-1":
    "The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
  "task-2":
    "Some people believe that technology has made communication between people less personal. Others think it has improved the way people communicate. Discuss both views and give your own opinion.",
};

export default function WritingPage () {
  const [ selectedTask, setSelectedTask ] = useState<WritingTaskType>( "task-2" );
  const [ prompt, setPrompt ] = useState( samplePrompts[ "task-2" ] );
  const [ essay, setEssay ] = useState( "" );
  const [ showFeedback, setShowFeedback ] = useState( false );

  const minWords = selectedTask === "task-1" ? 150 : 250;

  const wordCount = useMemo( () => {
    return essay
      .trim()
      .split( /\s+/ )
      .filter( Boolean ).length;
  }, [ essay ] );

  function handleTaskChange ( task: WritingTaskType ) {
    setSelectedTask( task );
    setPrompt( samplePrompts[ task ] );
    setEssay( "" );
    setShowFeedback( false );
  }

  function handleReset () {
    setPrompt( samplePrompts[ selectedTask ] );
    setEssay( "" );
    setShowFeedback( false );
  }

  function handleSubmit () {
    setShowFeedback( true );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles size={ 16 } />
              AI Writing Evaluation
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              IELTS Writing Practice
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              Practice Task 1 or Task 2, submit your answer, and receive
              AI-powered band score feedback based on IELTS writing criteria.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <HeroStat icon={ Clock } label="Time Limit" value={ selectedTask === "task-1" ? "20m" : "40m" } />
            <HeroStat icon={ PenLine } label="Min Words" value={ `${ minWords }+` } />
            <HeroStat icon={ Target } label="Target" value="Band 7+" />
            <HeroStat icon={ FileCheck2 } label="Feedback" value="Instant" />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Choose Writing Task
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Select the IELTS writing task you want to practice.
          </p>
        </div>

        <WritingTaskSelector
          selectedTask={ selectedTask }
          onChange={ handleTaskChange }
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <WritingEditor
          prompt={ prompt }
          essay={ essay }
          wordCount={ wordCount }
          minWords={ minWords }
          onPromptChange={ setPrompt }
          onEssayChange={ setEssay }
          onReset={ handleReset }
          onSubmit={ handleSubmit }
        />

        <div className="space-y-6">
          <FeedbackPreview visible={ showFeedback } />

          <WritingTips />
        </div>
      </section>
    </div>
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
      <Icon size={ 22 } className="text-blue-100" />

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-blue-100">
        { label }
      </p>

      <p className="mt-1 text-2xl font-black text-white">
        { value }
      </p>
    </div>
  );
}

function WritingTips () {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-purple-50 p-3 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300">
          <BookOpen size={ 22 } />
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">
            Writing Tips
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Improve your IELTS writing score.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Tip
          title="Answer the full question"
          text="Make sure every part of the prompt is clearly addressed."
        />

        <Tip
          title="Use clear paragraphs"
          text="Use introduction, body paragraphs, and conclusion for Task 2."
        />

        <Tip
          title="Support your ideas"
          text="Add examples, explanations, and logical development."
        />

        <Tip
          title="Check grammar"
          text="Avoid repeated sentence structures and simple grammar mistakes."
        />
      </div>
    </div>
  );
}

function Tip ( { title, text }: { title: string; text: string; } ) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 transition hover:translate-x-1 dark:bg-slate-950">
      <h3 className="font-black text-slate-900 dark:text-white">
        { title }
      </h3>

      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
        { text }
      </p>
    </div>
  );
}
