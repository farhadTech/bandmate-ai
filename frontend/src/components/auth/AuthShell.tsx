import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  footerLabel: string;
  footerAction: string;
  footerHref: string;
  bullets: string[];
  children: React.ReactNode;
};

export default function AuthShell ( {
  title,
  subtitle,
  footerLabel,
  footerAction,
  footerHref,
  bullets,
  children,
}: Props ) {
  return (
    <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-slate-950">
      <header className="flex h-20 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800 sm:px-10">
        <Link href="/" className="flex cursor-pointer items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white">
            B
          </div>

          <span className="text-xl font-black text-slate-950 dark:text-white">
            BandMate AI
          </span>
        </Link>

        <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <span className="hidden sm:inline">{ footerLabel }</span>

          <Link
            href={ footerHref }
            className="cursor-pointer rounded-xl border border-blue-600 px-5 py-2.5 text-blue-600 transition hover:bg-blue-50 active:scale-[0.98] dark:hover:bg-blue-950"
          >
            { footerAction }
          </Link>
        </div>
      </header>

      <section className="grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-2">
        <aside className="hidden bg-blue-50 px-10 py-16 dark:bg-slate-900 lg:flex lg:items-center">
          <div className="mx-auto max-w-lg animate-in fade-in slide-in-from-left-4 duration-500">
            <h1 className="text-5xl font-black tracking-tight text-slate-950 dark:text-white">
              { title }
            </h1>

            <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-300">
              { subtitle }
            </p>

            <div className="mt-10 space-y-5">
              { bullets.map( ( bullet ) => (
                <div key={ bullet } className="flex items-center gap-4">
                  <CheckCircle2 className="text-blue-600" size={ 24 } />

                  <span className="text-lg text-slate-600 dark:text-slate-300">
                    { bullet }
                  </span>
                </div>
              ) ) }
            </div>

            <div className="mt-16 flex items-end gap-5 opacity-70">
              <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-950" />
              <div className="h-32 w-32 rounded-full bg-blue-200 dark:bg-blue-900" />
              <div className="h-16 w-16 rounded-full bg-blue-300 dark:bg-blue-800" />
            </div>
          </div>
        </aside>

        <section className="flex items-center justify-center bg-white px-5 py-10 dark:bg-slate-950 sm:px-8">
          <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70 duration-500 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30 sm:p-9">
            { children }
          </div>
        </section>
      </section>

      <footer className="border-t border-slate-200 px-5 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © 2026 BandMate AI · Privacy Policy · Terms of Service
      </footer>
    </main>
  );
}