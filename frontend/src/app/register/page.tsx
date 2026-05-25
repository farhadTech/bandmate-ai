import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthShell from "@/components/auth/AuthShell";

export default function RegisterPage () {
  return (
    <AuthShell
      title="Start your journey to IELTS success"
      subtitle="Join thousands of learners achieving Band 7+ with AI-powered practice"
      footerLabel="Already have an account?"
      footerAction="Login"
      footerHref="/login"
      bullets={ [
        "Personalized study plans based on your target band",
        "Real-time AI feedback on Speaking, Writing, Reading & Listening",
        "Proven results: improve your band score with focused practice",
      ] }
    >
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Create your account
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Start practicing for your target IELTS band today.
        </p>
      </div>

      <RegisterForm />
    </AuthShell>
  );
}