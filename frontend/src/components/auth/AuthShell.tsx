import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  mode: "login" | "register" | "forgot";
};

export default function AuthShell ( {
  title,
  subtitle,
  children,
  mode,
}: AuthShellProps ) {
  const leftContent = {
    login: {
      heading: "Welcome back to BandMate AI",
      text: "Continue your journey to IELTS success",
      points: [
        "AI-powered feedback on all four modules",
        "Track your progress toward Band 7+",
        "Personalized practice recommendations",
      ],
    },
    register: {
      heading: "Start your journey to IELTS success",
      text: "Join learners improving with AI-powered practice",
      points: [
        "Personalized study plans based on your target band",
        "Real-time AI feedback on Writing, Speaking, Reading & Listening",
        "Track your progress with smart analytics",
      ],
    },
    forgot: {
      heading: "Reset your password",
      text: "We'll help you get back to learning in no time",
      points: [
        "Secure password reset link sent to your email",
        "Link valid for 1 hour for your security",
        "Create a new strong password in seconds",
      ],
    },
  };

  const data = leftContent[ mode ];

  return (
    <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-slate-950">
      <header className="flex h-20 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white">
            B
          </div>
          <span className="text-xl font-black text-slate-950 dark:text-white">
            BandMate AI
          </span>
        </Link>

        <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
          { mode === "login" ? (
            <>
              <span className="hidden sm:inline">Need an account?</span>
              <Link
                href="/register"
                className="rounded-xl border border-blue-600 px-5 py-2.5 text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Already have an account?</span>
              <Link
                href="/login"
                className="rounded-xl border border-blue-600 px-5 py-2.5 text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                Login
              </Link>
            </>
          ) }
        </div>
      </header>

      <section className="grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-2">
        <div className="hidden bg-blue-50 px-10 py-16 dark:bg-slate-900 lg:flex lg:items-center">
          <div className="mx-auto max-w-lg animate-in fade-in slide-in-from-left-4 duration-500">
            <h1 className="text-5xl font-black tracking-tight text-slate-950 dark:text-white">
              { data.heading }
            </h1>

            <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-300">
              { data.text }
            </p>

            <div className="mt-10 space-y-5">
              { data.points.map( ( point ) => (
                <div key={ point } className="flex items-center gap-4">
                  <CheckCircle2 className="text-blue-600" size={ 24 } />
                  <span className="text-lg text-slate-600 dark:text-slate-300">
                    { point }
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
        </div>

        <div className="flex items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70 duration-500 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30 sm:p-10">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white">
              { title }
            </h2>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
              { subtitle }
            </p>

            <div className="mt-8">{ children }</div>
          </div>
        </div>
      </section>
    </main>
  );
}