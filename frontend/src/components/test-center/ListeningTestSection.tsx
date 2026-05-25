"use client";

import { useEffect, useState } from "react";
import TestAudioPlayer from "./TestAudioPlayer";

type Props = {
  answers: Record<number, string>;
  onAnswerChange: ( question: number, value: string ) => void;
};

const restaurantRows = [
  {
    restaurant: "The Junction",
    location: "Greyson Street, near the station",
    reason: "Good for people who are especially keen on",
    q1: 1,
    commentBefore: "The",
    q2: 2,
    commentAfter: "is a good place for a drink",
  },
  {
    restaurant: "Paloma",
    location: "In Bow Street next to the cinema",
    reason: "",
    q1: 3,
    reasonAfter: "food, good for sharing",
    commentBefore: "A limited selection of",
    q2: 4,
    commentAfter: "food on the menu",
  },
  {
    restaurant: "The Green House",
    location: "At the top of a hill",
    reason: "All the",
    q1: 7,
    reasonAfter: "are very good",
    commentBefore: "Set lunch costs £",
    q2: 9,
    commentAfter: "per person",
  },
];

export default function ListeningTestSection ( {
  answers,
  onAnswerChange,
}: Props ) {
  const [ playing, setPlaying ] = useState( false );
  const [ audioSeconds, setAudioSeconds ] = useState( 0 );
  const duration = 7 * 60 + 58;

  useEffect( () => {
    if ( !playing ) return;

    const interval = setInterval( () => {
      setAudioSeconds( ( current ) => {
        if ( current >= duration ) {
          setPlaying( false );
          return duration;
        }

        return current + 1;
      } );
    }, 1000 );

    return () => clearInterval( interval );
  }, [ playing, duration ] );

  return (
    <div className="flex h-[calc(100vh-146px)] flex-col bg-white dark:bg-slate-950">
      <div className="border-b border-slate-200 bg-stone-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <p className="font-black text-slate-950 dark:text-white">Part 1</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Listen and answer questions 1-10
        </p>
      </div>

      <TestAudioPlayer
        playing={ playing }
        seconds={ audioSeconds }
        duration={ duration }
        onToggle={ () => setPlaying( ( value ) => !value ) }
        onRestart={ () => {
          setAudioSeconds( 0 );
          setPlaying( false );
        } }
      />

      <div className="grid flex-1 overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="hidden overflow-y-auto border-r border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900 lg:block">
          <div className="space-y-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
            <p>
              [1] I&apos;ve been meaning to ask you for some advice about
              restaurants. I need to book somewhere to celebrate my sister&apos;s
              birthday.
            </p>
            <p>
              [2] The Junction? Yes, I&apos;d definitely recommend that for a
              special occasion.
            </p>
            <p>
              [3] The food&apos;s amazing. If you like fish, it&apos;s probably
              the best restaurant in town for that.
            </p>
            <p>
              [4] Paloma is good for sharing and the staff are very friendly.
            </p>
            <p>
              [5] The Green House has a famous chef and the desserts are very
              good.
            </p>
          </div>
        </aside>

        <main className="overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="font-black text-slate-950 dark:text-white">
              Questions 1-10
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Complete the table below. Write ONE WORD AND/OR A NUMBER for each
              answer.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900">
                  <th className="border border-slate-400 p-3 text-left dark:border-slate-700">
                    Name of restaurant
                  </th>
                  <th className="border border-slate-400 p-3 text-left dark:border-slate-700">
                    Location
                  </th>
                  <th className="border border-slate-400 p-3 text-left dark:border-slate-700">
                    Reason for recommendation
                  </th>
                  <th className="border border-slate-400 p-3 text-left dark:border-slate-700">
                    Other comments
                  </th>
                </tr>
              </thead>

              <tbody>
                { restaurantRows.map( ( row ) => (
                  <tr key={ row.restaurant }>
                    <td className="border border-slate-400 p-3 dark:border-slate-700">
                      { row.restaurant }
                    </td>
                    <td className="border border-slate-400 p-3 dark:border-slate-700">
                      { row.location }
                    </td>
                    <td className="border border-slate-400 p-3 dark:border-slate-700">
                      { row.reason }{ " " }
                      <AnswerInput
                        number={ row.q1 }
                        value={ answers[ row.q1 ] || "" }
                        onChange={ onAnswerChange }
                      />{ " " }
                      { row.reasonAfter }
                    </td>
                    <td className="border border-slate-400 p-3 dark:border-slate-700">
                      { row.commentBefore }{ " " }
                      <AnswerInput
                        number={ row.q2 }
                        value={ answers[ row.q2 ] || "" }
                        onChange={ onAnswerChange }
                      />{ " " }
                      { row.commentAfter }
                    </td>
                  </tr>
                ) ) }

                <tr>
                  <td className="border border-slate-400 p-3 dark:border-slate-700">
                    The{ " " }
                    <AnswerInput
                      number={ 5 }
                      value={ answers[ 5 ] || "" }
                      onChange={ onAnswerChange }
                    />
                  </td>
                  <td className="border border-slate-400 p-3 dark:border-slate-700">
                    At the top of a{ " " }
                    <AnswerInput
                      number={ 6 }
                      value={ answers[ 6 ] || "" }
                      onChange={ onAnswerChange }
                    />
                  </td>
                  <td className="border border-slate-400 p-3 dark:border-slate-700">
                    Only uses{ " " }
                    <AnswerInput
                      number={ 8 }
                      value={ answers[ 8 ] || "" }
                      onChange={ onAnswerChange }
                    />
                  </td>
                  <td className="border border-slate-400 p-3 dark:border-slate-700">
                    Portions probably of{ " " }
                    <AnswerInput
                      number={ 10 }
                      value={ answers[ 10 ] || "" }
                      onChange={ onAnswerChange }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

function AnswerInput ( {
  number,
  value,
  onChange,
}: {
  number: number;
  value: string;
  onChange: ( question: number, value: string ) => void;
} ) {
  return (
    <input
      value={ value }
      onChange={ ( event ) => onChange( number, event.target.value ) }
      placeholder={ `${ number }` }
      className="mx-1 inline-block w-36 rounded-sm border border-slate-400 bg-white px-2 py-1 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950"
    />
  );
}