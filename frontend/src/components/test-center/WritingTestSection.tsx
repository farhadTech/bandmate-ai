"use client";

type Props = {
  answers: Record<number, string>;
  onAnswerChange: ( question: number, value: string ) => void;
};

export default function WritingTestSection ( {
  answers,
  onAnswerChange,
}: Props ) {
  const task1 = answers[ 1 ] || "";
  const task2 = answers[ 2 ] || "";

  const task1Words = countWords( task1 );
  const task2Words = countWords( task2 );

  return (
    <div className="flex h-[calc(100vh-146px)] flex-col bg-white dark:bg-slate-950">
      <div className="border-b border-slate-200 bg-stone-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <p className="font-black text-slate-950 dark:text-white">
          Writing Section
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          You should spend about 60 minutes on both tasks.
        </p>
      </div>

      <div className="grid flex-1 overflow-hidden lg:grid-cols-2">
        <aside className="overflow-y-auto border-r border-slate-200 p-6 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Task 1
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
            The table below shows changes in the total population of New York
            City from 1800 to 2000. The second and third tables show changes in
            the population of the five districts of the city over the same
            period.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Summarise the information by selecting and reporting the main
            features, and make comparisons where relevant.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr>
                  <th
                    colSpan={ 2 }
                    className="border border-slate-500 p-2 text-center"
                  >
                    New York City
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-500 p-2">1800</td>
                  <td className="border border-slate-500 p-2">79,216</td>
                </tr>
                <tr>
                  <td className="border border-slate-500 p-2">1900</td>
                  <td className="border border-slate-500 p-2">3,437,202</td>
                </tr>
                <tr>
                  <td className="border border-slate-500 p-2">2000</td>
                  <td className="border border-slate-500 p-2">8,009,185</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mt-10 text-xl font-black text-slate-950 dark:text-white">
            Task 2
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Some people believe that technology has made communication less
            personal. Others think it has improved the way people communicate.
            Discuss both views and give your own opinion.
          </p>
        </aside>

        <main className="overflow-y-auto p-6">
          <div>
            <h3 className="mb-3 font-black text-slate-950 dark:text-white">
              Task 1 Answer
            </h3>

            <textarea
              value={ task1 }
              onChange={ ( event ) => onAnswerChange( 1, event.target.value ) }
              className="min-h-56 w-full resize-y rounded-xl border border-slate-300 bg-white p-4 text-sm leading-7 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950"
            />

            <p className="mt-2 text-right text-sm font-bold text-slate-500">
              Word count: { task1Words }
            </p>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 font-black text-slate-950 dark:text-white">
              Task 2 Answer
            </h3>

            <textarea
              value={ task2 }
              onChange={ ( event ) => onAnswerChange( 2, event.target.value ) }
              className="min-h-72 w-full resize-y rounded-xl border border-slate-300 bg-white p-4 text-sm leading-7 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950"
            />

            <p className="mt-2 text-right text-sm font-bold text-slate-500">
              Word count: { task2Words }
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

function countWords ( text: string ) {
  return text.trim().split( /\s+/ ).filter( Boolean ).length;
}