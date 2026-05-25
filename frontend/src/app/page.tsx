import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HomePage () {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-10 transition-colors duration-300 dark:from-slate-950 dark:to-slate-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            B
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            BandMate AI
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Start Free</Button>
          </Link>
        </div>
      </nav>

      <section className="mx-auto flex max-w-5xl flex-col items-center justify-center py-28 text-center">
        <p className="mb-4 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          AI-powered IELTS preparation
        </p>

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl md:text-6xl">
          Prepare for IELTS smarter with AI-powered feedback
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
          Master Writing, Speaking, Listening, and Reading with personalized
          practice, instant feedback, mock tests, and progress tracking.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href="/register">
            <Button className="w-full sm:w-auto">Start Free Practice</Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="outline" className="w-full sm:w-auto">
              View Demo
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
