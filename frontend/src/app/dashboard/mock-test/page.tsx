"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, Headphones, Mic, PenLine } from "lucide-react";
import MockTestHeader from "@/components/mock-test/MockTestHeader";
import MockSectionCard, {
  MockSectionStatus,
} from "@/components/mock-test/MockSectionCard";
import MockTestTimer from "@/components/mock-test/MockTestTimer";
import MockProgress from "@/components/mock-test/MockProgress";
import MockResultCard from "@/components/mock-test/MockResultCard";

type SectionId = "listening" | "reading" | "writing" | "speaking";

const sectionData = [
  {
    id: "listening" as SectionId,
    title: "Listening",
    description: "Audio-based questions with answer checking.",
    time: "30 mins",
    questions: "40 questions",
    icon: Headphones,
    color: "purple" as const,
  },
  {
    id: "reading" as SectionId,
    title: "Reading",
    description: "Passages with short answers and true/false questions.",
    time: "60 mins",
    questions: "40 questions",
    icon: BookOpen,
    color: "cyan" as const,
  },
  {
    id: "writing" as SectionId,
    title: "Writing",
    description: "Task 1 and Task 2 writing simulation.",
    time: "60 mins",
    questions: "2 tasks",
    icon: PenLine,
    color: "blue" as const,
  },
  {
    id: "speaking" as SectionId,
    title: "Speaking",
    description: "Part 1, Part 2, and Part 3 speaking practice.",
    time: "15 mins",
    questions: "3 parts",
    icon: Mic,
    color: "green" as const,
  },
];

const TOTAL_SECONDS = 25 * 60;

export default function MockTestPage () {
  const [ started, setStarted ] = useState( false );
  const [ submitted, setSubmitted ] = useState( false );
  const [ running, setRunning ] = useState( false );
  const [ secondsLeft, setSecondsLeft ] = useState( TOTAL_SECONDS );
  const [ activeSection, setActiveSection ] = useState<SectionId>( "listening" );
  const [ completedSections, setCompletedSections ] = useState<SectionId[]>( [] );

  useEffect( () => {
    if ( !running || submitted ) return;

    const interval = setInterval( () => {
      setSecondsLeft( ( current ) => {
        if ( current <= 1 ) {
          setRunning( false );
          setSubmitted( true );
          return 0;
        }

        return current - 1;
      } );
    }, 1000 );

    return () => clearInterval( interval );
  }, [ running, submitted ] );

  const progressSections = useMemo( () => {
    return sectionData.map( ( section ) => ( {
      title: section.title,
      completed: completedSections.includes( section.id ),
      active: activeSection === section.id && started && !submitted,
    } ) );
  }, [ activeSection, completedSections, started, submitted ] );

  function handleStart () {
    setStarted( true );
    setSubmitted( false );
    setRunning( true );
    setSecondsLeft( TOTAL_SECONDS );
    setActiveSection( "listening" );
    setCompletedSections( [] );
  }

  function handleSubmit () {
    setSubmitted( true );
    setRunning( false );
    setCompletedSections( [ "listening", "reading", "writing", "speaking" ] );
  }

  function handleRetake () {
    setStarted( false );
    setSubmitted( false );
    setRunning( false );
    setSecondsLeft( TOTAL_SECONDS );
    setActiveSection( "listening" );
    setCompletedSections( [] );
  }

  function handleSectionClick ( sectionId: SectionId ) {
    if ( !started || submitted ) return;

    setCompletedSections( ( prev ) => {
      if ( prev.includes( activeSection ) ) return prev;
      return [ ...prev, activeSection ];
    } );

    setActiveSection( sectionId );
  }

  function getStatus ( sectionId: SectionId ): MockSectionStatus {
    if ( submitted || completedSections.includes( sectionId ) ) return "completed";
    if ( started && activeSection === sectionId ) return "active";
    return "locked";
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <MockTestHeader
        started={ started }
        submitted={ submitted }
        onStart={ handleStart }
        onSubmit={ handleSubmit }
      />

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        { sectionData.map( ( section ) => (
          <MockSectionCard
            key={ section.id }
            title={ section.title }
            description={ section.description }
            time={ section.time }
            questions={ section.questions }
            icon={ section.icon }
            color={ section.color }
            status={ getStatus( section.id ) }
            onClick={ () => handleSectionClick( section.id ) }
          />
        ) ) }
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="space-y-6">
          <ActiveSectionPanel
            started={ started }
            submitted={ submitted }
            activeSection={ activeSection }
            onCompleteSection={ () => {
              setCompletedSections( ( prev ) => {
                if ( prev.includes( activeSection ) ) return prev;
                return [ ...prev, activeSection ];
              } );

              const currentIndex = sectionData.findIndex(
                ( section ) => section.id === activeSection
              );

              const nextSection = sectionData[ currentIndex + 1 ];

              if ( nextSection ) {
                setActiveSection( nextSection.id );
              } else {
                handleSubmit();
              }
            } }
          />

          { started && !submitted && (
            <MockTestTimer
              secondsLeft={ secondsLeft }
              totalSeconds={ TOTAL_SECONDS }
              running={ running }
              onToggle={ () => setRunning( ( value ) => !value ) }
              onReset={ () => {
                setSecondsLeft( TOTAL_SECONDS );
                setRunning( false );
              } }
            />
          ) }
        </div>

        <div className="space-y-6">
          <MockProgress sections={ progressSections } />

          <MockResultCard visible={ submitted } onRetake={ handleRetake } />
        </div>
      </section>
    </div>
  );
}

function ActiveSectionPanel ( {
  started,
  submitted,
  activeSection,
  onCompleteSection,
}: {
  started: boolean;
  submitted: boolean;
  activeSection: SectionId;
  onCompleteSection: () => void;
} ) {
  const section = sectionData.find( ( item ) => item.id === activeSection )!;

  if ( !started && !submitted ) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">
          Ready to start?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Click “Start Mock Test” above to begin the simulation. You can move
          through sections and submit to see your demo result.
        </p>
      </div>
    );
  }

  if ( submitted ) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-black text-slate-950 dark:text-white">
          Test submitted successfully
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Your estimated result is now available on the right side.
        </p>
      </div>
    );
  }

  const Icon = section.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Icon size={ 24 } />
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              Current Section: { section.title }
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              { section.description }
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={ onCompleteSection }
          className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700 active:scale-[0.98]"
        >
          Complete Section
        </button>
      </div>

      <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          This is a demo simulation panel. Later, this area can load the real
          Listening, Reading, Writing, or Speaking module dynamically depending
          on the active mock test section.
        </p>
      </div>
    </div>
  );
}
