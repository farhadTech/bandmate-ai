import Link from "next/link";

export default function HomePage () {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-6 dark:from-slate-950 dark:via-slate-900 dark:to-black">
      <div className="max-w-3xl text-center">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
          BandMate AI Platform
        </div>

        <h1 className="mt-8 text-5xl font-black leading-tight text-slate-950 dark:text-white md:text-7xl">
          Real Computer-Based
          <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            IELTS Practice
          </span>
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
          Practice Cambridge IELTS tests with a real CBT experience.
          Improve Listening, Reading, Writing, and Speaking using AI-powered analysis.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className="cursor-pointer rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="cursor-pointer rounded-2xl border border-slate-300 bg-white px-8 py-4 text-lg font-bold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}