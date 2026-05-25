import LoginForm from "@/components/auth/LoginForm";
import AuthShell from "@/components/auth/AuthShell";

export default function LoginPage () {
  return (
    <AuthShell
      title="Welcome back to BandMate AI"
      subtitle="Continue your journey to IELTS success"
      footerLabel="Need an account?"
      footerAction="Register"
      footerHref="/register"
      bullets={ [
        "AI-powered feedback on all four modules",
        "Track your progress toward Band 7+",
        "Practice with computer-based IELTS mock tests",
      ] }
    >
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Log in to your account
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Enter your credentials to access your dashboard.
        </p>
      </div>

      <LoginForm />
    </AuthShell>
  );
}