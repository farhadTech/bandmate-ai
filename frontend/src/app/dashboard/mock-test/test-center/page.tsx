"use client";

import { useEffect, useMemo, useState } from "react";
import TestCenterHeader from "@/components/test-center/TestCenterHeader";
import TestQuestionNavigator from "@/components/test-center/TestQuestionNavigator";
import ListeningTestSection from "@/components/test-center/ListeningTestSection";
import ReadingTestSection from "@/components/test-center/ReadingTestSection";
import WritingTestSection from "@/components/test-center/WritingTestSection";
import SpeakingTestSection from "@/components/test-center/SpeakingTestSection";

type ModuleType = "listening" | "reading" | "writing" | "speaking";

const moduleOrder: ModuleType[] = [ "listening", "reading", "writing", "speaking" ];

const totalSecondsByModule: Record<ModuleType, number> = {
  listening: 30 * 60,
  reading: 60 * 60,
  writing: 60 * 60,
  speaking: 15 * 60,
};

export default function TestCenterPage () {
  const [ activeModule, setActiveModule ] = useState<ModuleType>( "listening" );
  const [ activeQuestion, setActiveQuestion ] = useState( 1 );
  const [ paused, setPaused ] = useState( false );
  const [ secondsLeft, setSecondsLeft ] = useState( totalSecondsByModule.listening );

  const [ answers, setAnswers ] = useState<Record<ModuleType, Record<number, string>>>( {
    listening: {},
    reading: {},
    writing: {},
    speaking: {},
  } );

  const currentAnswers = answers[ activeModule ];

  const answeredQuestions = useMemo( () => {
    return Object.entries( currentAnswers )
      .filter( ( [ , value ] ) => value.trim() )
      .map( ( [ key ] ) => Number( key ) );
  }, [ currentAnswers ] );

  useEffect( () => {
    setSecondsLeft( totalSecondsByModule[ activeModule ] );
    setActiveQuestion( 1 );
  }, [ activeModule ] );

  useEffect( () => {
    if ( paused ) return;

    const interval = setInterval( () => {
      setSecondsLeft( ( current ) => {
        if ( current <= 1 ) {
          handleFinishSection();
          return 0;
        }

        return current - 1;
      } );
    }, 1000 );

    return () => clearInterval( interval );
  }, [ paused, activeModule ] );

  function handleAnswerChange ( question: number, value: string ) {
    setAnswers( ( prev ) => ( {
      ...prev,
      [ activeModule ]: {
        ...prev[ activeModule ],
        [ question ]: value,
      },
    } ) );

    setActiveQuestion( question );
  }

  function handleFinishSection () {
    const currentIndex = moduleOrder.indexOf( activeModule );
    const nextModule = moduleOrder[ currentIndex + 1 ];

    if ( nextModule ) {
      setActiveModule( nextModule );
      setPaused( false );
    } else {
      handleSubmit();
    }
  }

  function handleSubmit () {
    const encoded = encodeURIComponent( JSON.stringify( answers ) );
    localStorage.setItem( "bandmate_mock_answers", encoded );
    window.location.href = "/dashboard/mock-test/result";
  }

  function handleExit () {
    window.location.href = "/dashboard/mock-test";
  }

  const title = `Computer-Based IELTS · ${ capitalize( activeModule ) }`;

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <TestCenterHeader
        title={ title }
        mode="practice"
        activeModule={ activeModule }
        secondsLeft={ secondsLeft }
        paused={ paused }
        onPauseToggle={ () => setPaused( ( value ) => !value ) }
        onExit={ handleExit }
        onSubmit={ handleSubmit }
      />

      { activeModule === "listening" && (
        <ListeningTestSection
          answers={ currentAnswers }
          onAnswerChange={ handleAnswerChange }
        />
      ) }

      { activeModule === "reading" && (
        <ReadingTestSection
          answers={ currentAnswers }
          onAnswerChange={ handleAnswerChange }
        />
      ) }

      { activeModule === "writing" && (
        <WritingTestSection
          answers={ currentAnswers }
          onAnswerChange={ handleAnswerChange }
        />
      ) }

      { activeModule === "speaking" && (
        <SpeakingTestSection
          answers={ currentAnswers }
          onAnswerChange={ handleAnswerChange }
        />
      ) }

      <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            { moduleOrder.map( ( module ) => (
              <button
                key={ module }
                type="button"
                onClick={ () => setActiveModule( module ) }
                className={ `cursor-pointer rounded-xl px-4 py-2 text-sm font-black capitalize transition active:scale-[0.98] ${ activeModule === module
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }` }
              >
                { module }
              </button>
            ) ) }
          </div>

          <button
            type="button"
            onClick={ handleFinishSection }
            className="cursor-pointer rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 active:scale-[0.98] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Finish Section
          </button>
        </div>
      </div>

      <TestQuestionNavigator
        activeModule={ activeModule }
        activeQuestion={ activeQuestion }
        answeredQuestions={ answeredQuestions }
        onSelectQuestion={ setActiveQuestion }
      />
    </div>
  );
}

function capitalize ( value: string ) {
  return value.charAt( 0 ).toUpperCase() + value.slice( 1 );
}
