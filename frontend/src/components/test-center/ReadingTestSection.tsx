"use client";

type Props = {
  answers: Record<number, string>;
  onAnswerChange: ( question: number, value: string ) => void;
};

const questions = [
  {
    id: 1,
    text: "There are other parrots that share the kakapo's inability to fly.",
  },
  {
    id: 2,
    text: "Adult kakapo produce chicks every year.",
  },
  {
    id: 3,
    text: "Adult male kakapo bring food back to nesting females.",
  },
  {
    id: 4,
    text: "The Polynesian rat was a greater threat to the kakapo than Polynesian settlers.",
  },
  {
    id: 5,
    text: "Kakapo were transferred from Rakiura Island because they were at risk from feral cats.",
  },
];

export default function ReadingTestSection ( {
  answers,
  onAnswerChange,
}: Props ) {
  return (
    <div className="flex h-[calc(100vh-146px)] flex-col bg-white dark:bg-slate-950">
      <div className="border-b border-slate-200 bg-stone-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <p className="font-black text-slate-950 dark:text-white">Part 1</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Read the text below and answer questions 1-13
        </p>
      </div>

      <div className="grid flex-1 overflow-hidden lg:grid-cols-2">
        <article className="overflow-y-auto border-r border-slate-200 p-6 dark:border-slate-800">
          <h2 className="mb-5 text-xl font-black text-slate-950 dark:text-white">
            The kākāpō
          </h2>

          <div className="space-y-5 text-sm leading-8 text-slate-800 dark:text-slate-200">
            <p>
              The kākāpō is a nocturnal, flightless parrot that is critically
              endangered and one of New Zealand&apos;s unique treasures.
            </p>

            <p>
              The kākāpō, also known as the owl parrot, is a large,
              forest-dwelling bird, with a pale owl-like face. Up to 64 cm in
              length, it has predominantly yellow-green feathers, forward-facing
              eyes, a large grey beak, large blue feet, and relatively short
              wings and tail.
            </p>

            <p>
              Kākāpō are solitary birds and tend to occupy the same home range
              for many years. They forage on the ground and climb high into
              trees. They often leap from trees and flap their wings, but at
              best manage a controlled descent to the ground.
            </p>

            <p>
              Kākāpō breed in summer and autumn, but only in years when food is
              plentiful. Males play no part in incubation or chick-rearing.
              Females alone incubate eggs and feed the chicks.
            </p>

            <p>
              Before humans arrived, kākāpō were common throughout New
              Zealand&apos;s forests. However, this all changed with the arrival
              of the first Polynesian settlers about 700 years ago.
            </p>

            <p>
              In 1894, the New Zealand government launched its first attempt to
              save the kākāpō. Conservationist Richard Henry led an effort to
              relocate several hundred birds to predator-free Resolution Island.
            </p>
          </div>
        </article>

        <main className="overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="font-black text-slate-950 dark:text-white">
              Questions 1-6
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Do the following statements agree with the information given in
              Reading Passage 1? Choose TRUE, FALSE or NOT GIVEN.
            </p>
          </div>

          <div className="space-y-8">
            { questions.map( ( question ) => (
              <div key={ question.id }>
                <p className="mb-3 font-black leading-7 text-slate-950 dark:text-white">
                  { question.id }. { question.text }
                </p>

                <div className="space-y-2">
                  { [ "true", "false", "not given" ].map( ( option ) => (
                    <label
                      key={ option }
                      className="flex cursor-pointer items-center gap-3 text-sm font-semibold uppercase text-slate-700 dark:text-slate-300"
                    >
                      <input
                        type="radio"
                        name={ `question-${ question.id }` }
                        value={ option }
                        checked={ answers[ question.id ] === option }
                        onChange={ ( event ) =>
                          onAnswerChange( question.id, event.target.value )
                        }
                        className="h-4 w-4 cursor-pointer"
                      />
                      { option }
                    </label>
                  ) ) }
                </div>
              </div>
            ) ) }
          </div>
        </main>
      </div>
    </div>
  );
}