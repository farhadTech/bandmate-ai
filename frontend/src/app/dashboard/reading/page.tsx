"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Clock,
  FileCheck2,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import ReadingPassageSelector, {
  ReadingPassageType,
} from "@/components/practice/ReadingPassageSelector";
import ReadingPassage from "@/components/practice/ReadingPassage";
import ReadingQuestions, {
  ReadingQuestion,
} from "@/components/practice/ReadingQuestions";
import ReadingScorePreview from "@/components/practice/ReadingScorePreview";

const readingData: Record<
  ReadingPassageType,
  {
    title: string;
    readingTime: string;
    passage: string;
    questions: ReadingQuestion[];
  }
> = {
  "passage-1": {
    title: "The Rise of Urban Gardens",
    readingTime: "12 minutes",
    passage:
      "Urban gardening has become increasingly popular in many large cities around the world. As more people move into apartments and smaller homes, traditional gardens are often impossible. However, city residents have found creative ways to grow vegetables, herbs, and flowers in limited spaces.\n\nRooftop gardens, balcony planters, and community gardens are now common in many urban areas. These spaces provide fresh food, improve air quality, and create peaceful places for residents to relax. In some cities, local governments support gardening projects because they help reduce heat and encourage healthier lifestyles.\n\nCommunity gardens also bring people together. Neighbours who may not usually speak to each other often meet while planting, watering, or harvesting crops. This improves social connections and gives people a stronger sense of belonging. For children, urban gardens can also be educational, teaching them where food comes from and why nature is important.\n\nDespite the benefits, urban gardening has some challenges. Space is limited, soil can be poor, and plants need regular care. Nevertheless, many experts believe that urban gardening will continue to grow as cities search for greener and healthier ways to live.",
    questions: [
      {
        id: 1,
        question: "Urban gardening is popular because many city homes have limited ____.",
        correctAnswer: "space",
        type: "short-answer",
      },
      {
        id: 2,
        question: "Rooftop gardens can help improve air quality.",
        correctAnswer: "true",
        type: "true-false",
      },
      {
        id: 3,
        question: "Community gardens can improve social ____.",
        correctAnswer: "connections",
        type: "short-answer",
      },
      {
        id: 4,
        question: "Experts believe urban gardening will disappear soon.",
        correctAnswer: "false",
        type: "true-false",
      },
    ],
  },
  "passage-2": {
    title: "Remote Work and Productivity",
    readingTime: "16 minutes",
    passage:
      "Remote work has changed the way many companies operate. In the past, most employees were expected to work from an office every day. Today, advances in communication technology allow people to complete many tasks from home or other locations.\n\nSupporters of remote work argue that it gives employees greater flexibility. Workers can avoid long commutes, manage their time more effectively, and often experience better work-life balance. Some studies suggest that employees who work remotely may be more productive because they face fewer office interruptions.\n\nHowever, remote work is not suitable for every person or profession. Some employees feel isolated when they are away from colleagues for long periods. Communication can also become more difficult, especially when teams are spread across different time zones. Managers may need new strategies to monitor progress and maintain team spirit.\n\nMany organisations now use hybrid models, allowing employees to divide their time between home and the office. This approach may offer the best of both worlds: flexibility for workers and opportunities for face-to-face collaboration.",
    questions: [
      {
        id: 1,
        question: "Remote work became easier because of communication ____.",
        correctAnswer: "technology",
        type: "short-answer",
      },
      {
        id: 2,
        question: "Remote workers always become less productive.",
        correctAnswer: "false",
        type: "true-false",
      },
      {
        id: 3,
        question: "Some employees feel ____ when working away from colleagues.",
        correctAnswer: "isolated",
        type: "short-answer",
      },
      {
        id: 4,
        question: "Hybrid models combine home working and office working.",
        correctAnswer: "true",
        type: "true-false",
      },
    ],
  },
  "passage-3": {
    title: "Memory, Learning, and the Brain",
    readingTime: "20 minutes",
    passage:
      "Human memory is a complex system that allows people to store, organise, and retrieve information. Although memory is often described as a single ability, researchers usually divide it into several types. Short-term memory holds information for a brief period, while long-term memory can store knowledge and experiences for many years.\n\nLearning depends heavily on attention. When people focus carefully on new information, they are more likely to transfer it into long-term memory. Repetition also plays an important role. Reviewing material several times strengthens the connections between brain cells and makes recall easier.\n\nSleep is another important factor in memory formation. During sleep, the brain processes information learned during the day. Some scientists believe that sleep helps organise memories and remove unnecessary details. This may explain why students who sleep well often perform better than those who study all night without rest.\n\nEmotion can also influence memory. Events that produce strong feelings are often remembered more clearly than ordinary experiences. However, stress can sometimes damage memory performance, especially when pressure is extreme. For this reason, effective learning requires not only practice and attention but also rest, emotional balance, and healthy routines.",
    questions: [
      {
        id: 1,
        question: "Short-term memory holds information for a ____ period.",
        correctAnswer: "brief",
        type: "short-answer",
      },
      {
        id: 2,
        question: "Attention helps transfer information into long-term memory.",
        correctAnswer: "true",
        type: "true-false",
      },
      {
        id: 3,
        question: "Sleep helps the brain process information learned during the ____.",
        correctAnswer: "day",
        type: "short-answer",
      },
      {
        id: 4,
        question: "Extreme stress can improve memory performance.",
        correctAnswer: "false",
        type: "true-false",
      },
    ],
  },
};

export default function ReadingPage () {
  const [ selectedPassage, setSelectedPassage ] =
    useState<ReadingPassageType>( "passage-1" );
  const [ answers, setAnswers ] = useState<Record<number, string>>( {} );
  const [ checked, setChecked ] = useState( false );

  const currentData = readingData[ selectedPassage ];

  const score = useMemo( () => {
    return currentData.questions.filter( ( q ) => {
      return (
        answers[ q.id ]?.trim().toLowerCase() ===
        q.correctAnswer.trim().toLowerCase()
      );
    } ).length;
  }, [ answers, currentData.questions ] );

  function handlePassageChange ( passage: ReadingPassageType ) {
    setSelectedPassage( passage );
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
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-6 text-white shadow-xl shadow-orange-600/20 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles size={ 16 } />
              IELTS Reading Practice
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Reading Practice
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-orange-100 sm:text-base">
              Practice IELTS Reading passages with short-answer and
              true/false/not given questions, instant scoring, and improvement
              tips.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <HeroStat icon={ Clock } label="Target Time" value="20m" />
            <HeroStat icon={ BookOpen } label="Mode" value="Passage" />
            <HeroStat icon={ Target } label="Target" value="Band 7+" />
            <HeroStat icon={ FileCheck2 } label="Scoring" value="Auto" />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Choose Reading Passage
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Select a passage based on difficulty.
          </p>
        </div>

        <ReadingPassageSelector
          selectedPassage={ selectedPassage }
          onChange={ handlePassageChange }
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <ReadingPassage
            title={ currentData.title }
            passage={ currentData.passage }
            readingTime={ currentData.readingTime }
          />
        </div>

        <div className="space-y-6">
          <ReadingQuestions
            questions={ currentData.questions }
            answers={ answers }
            checked={ checked }
            onAnswerChange={ handleAnswerChange }
            onCheck={ () => setChecked( true ) }
            onReset={ handleReset }
          />

          <ReadingScorePreview
            visible={ checked }
            score={ score }
            total={ currentData.questions.length }
          />

          <ReadingTips />
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
      <Icon size={ 22 } className="text-orange-100" />

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-orange-100">
        { label }
      </p>

      <p className="mt-1 text-2xl font-black text-white">{ value }</p>
    </div>
  );
}

function ReadingTips () {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-orange-50 p-3 text-orange-600 dark:bg-orange-950/30 dark:text-orange-300">
          <Search size={ 22 } />
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">
            Reading Tips
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Improve speed and accuracy.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Tip
          title="Skim first"
          text="Read quickly to understand the main idea before answering."
        />
        <Tip
          title="Scan keywords"
          text="Look for names, dates, numbers, and paraphrased ideas."
        />
        <Tip
          title="Watch for synonyms"
          text="IELTS often changes words from the question in the passage."
        />
        <Tip
          title="Do not overthink"
          text="For True/False/Not Given, answer only from the passage."
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
