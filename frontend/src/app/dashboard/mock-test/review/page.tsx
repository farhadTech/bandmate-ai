"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Filter,
  Headphones,
  Lightbulb,
  Mic,
  PenLine,
  RotateCcw,
  Search,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ReviewItem = {
  id: number;
  module: "Listening" | "Reading" | "Writing" | "Speaking";
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  status: "correct" | "wrong" | "partial";
};

const reviewItems: ReviewItem[] = [
  {
    id: 1,
    module: "Listening",
    question: "Good for people who are especially keen on ____.",
    userAnswer: "food",
    correctAnswer: "fish",
    explanation:
      "The speaker says the restaurant is best for people who like fish.",
    status: "wrong",
  },
  {
    id: 2,
    module: "Listening",
    question: "The ____ is a good place for a drink.",
    userAnswer: "bar",
    correctAnswer: "bar",
    explanation:
      "The answer is directly stated after the restaurant recommendation.",
    status: "correct",
  },
  {
    id: 3,
    module: "Reading",
    question:
      "Adult kakapo produce chicks every year. TRUE / FALSE / NOT GIVEN",
    userAnswer: "true",
    correctAnswer: "false",
    explanation:
      "The passage says kakapo breed only in years when food is plentiful, not every year.",
    status: "wrong",
  },
  {
    id: 4,
    module: "Reading",
    question:
      "Attention helps transfer information into long-term memory. TRUE / FALSE / NOT GIVEN",
    userAnswer: "true",
    correctAnswer: "true",
    explanation:
      "The passage clearly says focused attention helps transfer information into long-term memory.",
    status: "correct",
  },
  {
    id: 5,
    module: "Writing",
    question: "Writing Task 2: Technology and communication essay",
    userAnswer:
      "The essay has a clear opinion but examples are too general and body paragraph 2 needs more development.",
    correctAnswer:
      "A high-band essay should include clear topic sentences, specific examples, logical progression, and accurate grammar.",
    explanation:
      "Your response is partially successful. Improve by adding specific examples and stronger paragraph development.",
    status: "partial",
  },
  {
    id: 6,
    module: "Speaking",
    question: "Do you work or are you a student?",
    userAnswer:
      "I am student and I study computer science. I like it because useful.",
    correctAnswer:
      "I am a student, and I am currently studying computer science. I enjoy it because it is practical and useful for my future career.",
    explanation:
      "The answer is understandable but needs better grammar, articles, and sentence development.",
    status: "partial",
  },
];

export default function MockReviewPage () {
  const [ searchQuery, setSearchQuery ] = useState( "" );
  const [ moduleFilter, setModuleFilter ] = useState( "All Modules" );
  const [ statusFilter, setStatusFilter ] = useState( "All Status" );

  const filteredItems = useMemo( () => {
    return reviewItems.filter( ( item ) => {
      const matchesSearch =
        item.question.toLowerCase().includes( searchQuery.toLowerCase() ) ||
        item.userAnswer.toLowerCase().includes( searchQuery.toLowerCase() ) ||
        item.correctAnswer.toLowerCase().includes( searchQuery.toLowerCase() );

      const matchesModule =
        moduleFilter === "All Modules" || item.module === moduleFilter;

      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      return matchesSearch && matchesModule && matchesStatus;
    } );
  }, [ searchQuery, moduleFilter, statusFilter ] );

  const correctCount = reviewItems.filter( ( item ) => item.status === "correct" ).length;
  const wrongCount = reviewItems.filter( ( item ) => item.status === "wrong" ).length;
  const partialCount = reviewItems.filter( ( item ) => item.status === "partial" ).length;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <Link
              href="/dashboard/mock-test/result"
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25"
            >
              <ArrowLeft size={ 16 } />
              Back to Result
            </Link>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Review Mistakes
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              Review your answers, compare with correct answers, understand
              explanations, and retry weak question types.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MiniStat label="Correct" value={ correctCount } color="green" />
            <MiniStat label="Wrong" value={ wrongCount } color="red" />
            <MiniStat label="Partial" value={ partialCount } color="yellow" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <ReviewSummaryCard
          icon={ CheckCircle2 }
          title="Correct"
          value={ `${ correctCount }` }
          text="Strong answers"
          color="green"
        />

        <ReviewSummaryCard
          icon={ XCircle }
          title="Wrong"
          value={ `${ wrongCount }` }
          text="Needs correction"
          color="red"
        />

        <ReviewSummaryCard
          icon={ Lightbulb }
          title="Partial"
          value={ `${ partialCount }` }
          text="Improve quality"
          color="yellow"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_220px_220px]">
          <div className="relative">
            <Search
              size={ 18 }
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={ searchQuery }
              onChange={ ( event ) => setSearchQuery( event.target.value ) }
              placeholder="Search questions or answers..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-blue-950"
            />
          </div>

          <div className="relative">
            <Filter
              size={ 18 }
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={ moduleFilter }
              onChange={ ( event ) => setModuleFilter( event.target.value ) }
              className="w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950"
            >
              <option>All Modules</option>
              <option>Listening</option>
              <option>Reading</option>
              <option>Writing</option>
              <option>Speaking</option>
            </select>
          </div>

          <select
            value={ statusFilter }
            onChange={ ( event ) => setStatusFilter( event.target.value ) }
            className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950"
          >
            <option>All Status</option>
            <option value="correct">correct</option>
            <option value="wrong">wrong</option>
            <option value="partial">partial</option>
          </select>
        </div>
      </section>

      <section className="space-y-5">
        { filteredItems.map( ( item ) => (
          <ReviewQuestionCard key={ item.id } item={ item } />
        ) ) }

        { filteredItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-xl font-black text-slate-950 dark:text-white">
              No review items found
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        ) }
      </section>

      <section className="flex flex-col gap-3 sm:flex-row">
        <Link href="/dashboard/mock-test/test-center" className="flex-1">
          <Button className="w-full gap-2">
            <RotateCcw size={ 18 } />
            Retry Test
          </Button>
        </Link>

        <Link href="/dashboard/mock-test" className="flex-1">
          <Button variant="outline" className="w-full">
            Back to Test Library
          </Button>
        </Link>
      </section>
    </div>
  );
}

function MiniStat ( {
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "green" | "red" | "yellow";
} ) {
  const colors = {
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-400",
  };

  return (
    <div className="rounded-2xl bg-white/15 p-4 text-center backdrop-blur">
      <p className="text-3xl font-black text-white">{ value }</p>
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className={ `h-2 w-2 rounded-full ${ colors[ color ] }` } />
        <span className="text-xs font-black uppercase tracking-wide text-blue-100">
          { label }
        </span>
      </div>
    </div>
  );
}

function ReviewSummaryCard ( {
  icon: Icon,
  title,
  value,
  text,
  color,
}: {
  icon: typeof CheckCircle2;
  title: string;
  value: string;
  text: string;
  color: "green" | "red" | "yellow";
} ) {
  const colors = {
    green:
      "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
    red: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300",
    yellow:
      "bg-yellow-50 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-300",
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            { title }
          </p>

          <h3 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
            { value }
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            { text }
          </p>
        </div>

        <div
          className={ `rounded-2xl p-3 transition group-hover:scale-110 ${ colors[ color ] }` }
        >
          <Icon size={ 24 } />
        </div>
      </div>
    </div>
  );
}

function ReviewQuestionCard ( { item }: { item: ReviewItem; } ) {
  const moduleIcons = {
    Listening: Headphones,
    Reading: BookOpen,
    Writing: PenLine,
    Speaking: Mic,
  };

  const Icon = moduleIcons[ item.module ];

  const statusColors = {
    correct:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/20 dark:text-green-300",
    wrong:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-300",
    partial:
      "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950/20 dark:text-yellow-300",
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300">
            <Icon size={ 22 } />
          </div>

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                { item.module }
              </span>

              <span
                className={ cn(
                  "rounded-full border px-3 py-1 text-xs font-black capitalize",
                  statusColors[ item.status ]
                ) }
              >
                { item.status }
              </span>
            </div>

            <h2 className="text-lg font-black leading-7 text-slate-950 dark:text-white">
              Question { item.id }: { item.question }
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AnswerBox
          title="Your Answer"
          value={ item.userAnswer || "No answer" }
          type={ item.status === "correct" ? "correct" : "wrong" }
        />

        <AnswerBox
          title="Correct / Suggested Answer"
          value={ item.correctAnswer }
          type="correct"
        />
      </div>

      <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
        <div className="mb-2 flex items-center gap-2 font-black text-blue-700 dark:text-blue-300">
          <Lightbulb size={ 18 } />
          Explanation
        </div>

        <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
          { item.explanation }
        </p>
      </div>
    </article>
  );
}

function AnswerBox ( {
  title,
  value,
  type,
}: {
  title: string;
  value: string;
  type: "correct" | "wrong";
} ) {
  return (
    <div
      className={ cn(
        "rounded-2xl border p-4",
        type === "correct"
          ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20"
          : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
      ) }
    >
      <p
        className={ cn(
          "mb-2 text-sm font-black",
          type === "correct"
            ? "text-green-700 dark:text-green-300"
            : "text-red-700 dark:text-red-300"
        ) }
      >
        { title }
      </p>

      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
        { value }
      </p>
    </div>
  );
}