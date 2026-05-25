"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Clock,
  FileCheck2,
  Headphones,
  Sparkles,
  Target,
} from "lucide-react";
import ListeningSectionSelector, {
  ListeningSectionType,
} from "@/components/practice/ListeningSectionSelector";
import ListeningAudioPlayer from "@/components/practice/ListeningAudioPlayer";
import ListeningQuestions, {
  ListeningQuestion,
} from "@/components/practice/ListeningQuestions";
import ListeningScorePreview from "@/components/practice/ListeningScorePreview";

const questionBank: Record<ListeningSectionType, ListeningQuestion[]> = {
  "section-1": [
    {
      id: 1,
      question: "The caller wants to book a room for how many nights?",
      correctAnswer: "three",
    },
    {
      id: 2,
      question: "What is the caller's preferred room type?",
      correctAnswer: "single",
    },
    {
      id: 3,
      question: "The booking is under which name?",
      correctAnswer: "Roberts",
    },
  ],
  "section-2": [
    {
      id: 1,
      question: "The museum opens at what time on weekends?",
      correctAnswer: "10 am",
    },
    {
      id: 2,
      question: "Visitors should collect maps from the ____.",
      correctAnswer: "reception",
    },
    {
      id: 3,
      question: "The guided tour lasts approximately ____ minutes.",
      correctAnswer: "45",
    },
  ],
  "section-3": [
    {
      id: 1,
      question: "The students are discussing their ____ project.",
      correctAnswer: "research",
    },
    {
      id: 2,
      question: "They decide to interview how many participants?",
      correctAnswer: "20",
    },
    {
      id: 3,
      question: "Their tutor suggests improving the ____ section.",
      correctAnswer: "methodology",
    },
  ],
  "section-4": [
    {
      id: 1,
      question: "The lecture focuses on climate change and ____.",
      correctAnswer: "agriculture",
    },
    {
      id: 2,
      question: "The speaker mentions water ____ as a major concern.",
      correctAnswer: "shortage",
    },
    {
      id: 3,
      question: "Farmers are encouraged to use more efficient ____ systems.",
      correctAnswer: "irrigation",
    },
  ],
};

export default function ListeningPage () {
  const [ selectedSection, setSelectedSection ] =
    useState<ListeningSectionType>( "section-1" );
  const [ isPlaying, setIsPlaying ] = useState( false );
  const [ seconds, setSeconds ] = useState( 0 );
  const [ answers, setAnswers ] = useState<Record<number, string>>( {} );
  const [ checked, setChecked ] = useState( false );

  const duration = 180;
  const questions = questionBank[ selectedSection ];

  const score = useMemo( () => {
    return questions.filter( ( q ) => {
      return (
        answers[ q.id ]?.trim().toLowerCase() ===
        q.correctAnswer.trim().toLowerCase()
      );
    } ).length;
  }, [ answers, questions ] );

  useEffect( () => {
    if ( !isPlaying ) return;

    const interval = setInterval( () => {
      setSeconds( ( value ) => {
        if ( value >= duration ) {
          setIsPlaying( false );
          return duration;
        }

        return value + 1;
      } );
    }, 1000 );

    return () => clearInterval( interval );
  }, [ isPlaying ] );

  function handleSectionChange ( section: ListeningSectionType ) {
    setSelectedSection( section );
    setIsPlaying( false );
    setSeconds( 0 );
    setAnswers( {} );
    setChecked( false );
  }

  function handleAnswerChange ( id: number, value: string ) {
    setAnswers( ( prev ) => ( {
      ...prev,
      [ id ]: value,
    } ) );
  }

  function handleReset () {
    setAnswers( {} );
    setChecked( false );
    setIsPlaying( false );
    setSeconds( 0 );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-700 p-6 text-white shadow-xl shadow-purple-600/20 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles size={ 16 } />
              IELTS Listening Practice
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Listening Practice
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-purple-100 sm:text-base">
              Practice IELTS Listening sections with audio simulation, answer
              checking, score preview, and smart recommendations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <HeroStat icon={ Clock } label="Audio" value="3m" />
            <HeroStat icon={ Headphones } label="Mode" value="Audio" />
            <HeroStat icon={ Target } label="Target" value="Band 7+" />
            <HeroStat icon={ FileCheck2 } label="Scoring" value="Auto" />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Choose Listening Section
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Select the IELTS listening section you want to practice.
          </p>
        </div>

        <ListeningSectionSelector
          selectedSection={ selectedSection }
          onChange={ handleSectionChange }
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <ListeningAudioPlayer
            isPlaying={ isPlaying }
            seconds={ seconds }
            duration={ duration }
            onPlayPause={ () => setIsPlaying( ( value ) => !value ) }
            onRestart={ () => {
              setSeconds( 0 );
              setIsPlaying( false );
            } }
          />

          <ListeningQuestions
            questions={ questions }
            answers={ answers }
            checked={ checked }
            onAnswerChange={ handleAnswerChange }
            onCheck={ () => setChecked( true ) }
            onReset={ handleReset }
          />
        </div>

        <div className="space-y-6">
          <ListeningScorePreview
            visible={ checked }
            score={ score }
            total={ questions.length }
          />

          <ListeningTips />
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
      <Icon size={ 22 } className="text-purple-100" />

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-purple-100">
        { label }
      </p>

      <p className="mt-1 text-2xl font-black text-white">{ value }</p>
    </div>
  );
}

function ListeningTips () {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-purple-50 p-3 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300">
          <BookOpen size={ 22 } />
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">
            Listening Tips
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Improve accuracy and focus.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Tip
          title="Read questions first"
          text="Underline keywords before the audio begins."
        />
        <Tip
          title="Predict the answer type"
          text="Decide whether the answer should be a number, name, noun, or date."
        />
        <Tip
          title="Do not pause too long"
          text="If you miss one answer, move on quickly to the next question."
        />
        <Tip
          title="Check spelling"
          text="Incorrect spelling can make a correct answer wrong."
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
