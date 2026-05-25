import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage () {
  return (
    <AuthShell
      mode="login"
      title="Log in to your account"
      subtitle="Enter your credentials to access your dashboard"
    >
      <LoginForm />
    </AuthShell>
  );
}