"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Clock,
  FileCheck2,
  MessageCircle,
  Mic,
  Sparkles,
  Target,
} from "lucide-react";
import SpeakingPartSelector, {
  SpeakingPartType,
} from "@/components/practice/SpeakingPartSelector";
import SpeakingRecorder from "@/components/practice/SpeakingRecorder";
import SpeakingFeedbackPreview from "@/components/practice/SpeakingFeedbackPreview";

type RecorderStatus = "idle" | "recording" | "paused" | "finished";

const questions: Record<SpeakingPartType, string[]> = {
  "part-1": [
    "Do you work or are you a student?",
    "What do you usually do in your free time?",
    "Do you prefer studying alone or with others?",
  ],
  "part-2": [
    "Describe a place you visited that you found interesting. You should say where it was, when you went there, what you did there, and explain why it was interesting.",
  ],
  "part-3": [
    "Why do people like to travel to different places?",
    "How has tourism changed in recent years?",
    "Do you think virtual travel can replace real travel?",
  ],
};

export default function SpeakingPage () {
  const [ selectedPart, setSelectedPart ] = useState<SpeakingPartType>( "part-1" );
  const [ questionIndex, setQuestionIndex ] = useState( 0 );
  const [ status, setStatus ] = useState<RecorderStatus>( "idle" );
  const [ seconds, setSeconds ] = useState( 0 );
  const [ transcript, setTranscript ] = useState( "" );
  const [ showFeedback, setShowFeedback ] = useState( false );

  const currentQuestion = questions[ selectedPart ][ questionIndex ];

  useEffect( () => {
    if ( status !== "recording" ) return;

    const interval = setInterval( () => {
      setSeconds( ( value ) => value + 1 );
    }, 1000 );

    return () => clearInterval( interval );
  }, [ status ] );

  function handlePartChange ( part: SpeakingPartType ) {
    setSelectedPart( part );
    setQuestionIndex( 0 );
    setStatus( "idle" );
    setSeconds( 0 );
    setTranscript( "" );
    setShowFeedback( false );
  }

  function handleNextQuestion () {
    const total = questions[ selectedPart ].length;
    setQuestionIndex( ( current ) => ( current + 1 ) % total );
    setStatus( "idle" );
    setSeconds( 0 );
    setTranscript( "" );
    setShowFeedback( false );
  }

  function handleReset () {
    setStatus( "idle" );
    setSeconds( 0 );
    setTranscript( "" );
    setShowFeedback( false );
  }

  function handleStop () {
    setStatus( "finished" );

    if ( !transcript.trim() ) {
      setTranscript(
        "I think this is an interesting question. In my opinion, people enjoy this because it gives them a chance to learn something new and improve their daily life. For example, when people visit a new place, they can experience a different culture and meet different kinds of people. Personally, I believe this is very useful because it makes people more open-minded and confident."
      );
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-emerald-700 to-teal-700 p-6 text-white shadow-xl shadow-green-600/20 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles size={ 16 } />
              AI Speaking Evaluation
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              IELTS Speaking Practice
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-green-100 sm:text-base">
              Practice IELTS Speaking Part 1, Part 2, and Part 3 with recording,
              transcript review, and AI-powered feedback.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <HeroStat icon={ Clock } label="Session" value="15m" />
            <HeroStat icon={ Mic } label="Mode" value="Voice" />
            <HeroStat icon={ Target } label="Target" value="Band 7+" />
            <HeroStat icon={ FileCheck2 } label="Feedback" value="Instant" />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Choose Speaking Part
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Select the IELTS speaking section you want to practice.
          </p>
        </div>

        <SpeakingPartSelector
          selectedPart={ selectedPart }
          onChange={ handlePartChange }
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <QuestionCard
            part={ selectedPart }
            question={ currentQuestion }
            questionNumber={ questionIndex + 1 }
            totalQuestions={ questions[ selectedPart ].length }
            onNextQuestion={ handleNextQuestion }
          />

          <SpeakingRecorder
            status={ status }
            seconds={ seconds }
            transcript={ transcript }
            onStart={ () => setStatus( "recording" ) }
            onPause={ () => setStatus( "paused" ) }
            onResume={ () => setStatus( "recording" ) }
            onStop={ handleStop }
            onReset={ handleReset }
            onTranscriptChange={ setTranscript }
            onSubmit={ () => setShowFeedback( true ) }
          />
        </div>

        <div className="space-y-6">
          <SpeakingFeedbackPreview visible={ showFeedback } />
          <SpeakingTips />
        </div>
      </section>
    </div>
  );
}

function QuestionCard ( {
  part,
  question,
  questionNumber,
  totalQuestions,
  onNextQuestion,
}: {
  part: SpeakingPartType;
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onNextQuestion: () => void;
} ) {
  const title = {
    "part-1": "Part 1 Question",
    "part-2": "Part 2 Cue Card",
    "part-3": "Part 3 Discussion",
  }[ part ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-green-50 p-3 text-green-600 dark:bg-green-950/30 dark:text-green-300">
            <MessageCircle size={ 22 } />
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              { title }
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Question { questionNumber } of { totalQuestions }
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={ onNextQuestion }
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Next Question
        </button>
      </div>

      <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
        <p className="text-lg font-bold leading-8 text-slate-900 dark:text-white">
          { question }
        </p>
      </div>
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
      <Icon size={ 22 } className="text-green-100" />

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-green-100">
        { label }
      </p>

      <p className="mt-1 text-2xl font-black text-white">{ value }</p>
    </div>
  );
}

function SpeakingTips () {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-green-50 p-3 text-green-600 dark:bg-green-950/30 dark:text-green-300">
          <BookOpen size={ 22 } />
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">
            Speaking Tips
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Improve fluency and confidence.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Tip
          title="Extend your answers"
          text="Avoid one-word answers. Give reasons and examples."
        />
        <Tip
          title="Use natural linking phrases"
          text="Try phrases like 'Actually', 'For example', and 'Another reason is...'."
        />
        <Tip
          title="Speak clearly, not quickly"
          text="Fluency means smooth speech, not fast speech."
        />
        <Tip
          title="Practice daily"
          text="Record short answers every day to improve confidence."
        />
      </div>
    </div>
  );
}

function Tip ( { title, text }: { title: string; text: string; } ) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 transition hover:translate-x-1 dark:bg-slate-950">
      <h3 className="font-black text-slate-900 dark:text-white">{ title }</h3>

      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
        { text }
      </p>
    </div>
  );
}
