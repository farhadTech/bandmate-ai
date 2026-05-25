import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage () {
  return (
    <AuthShell
      mode="register"
      title="Create your account"
      subtitle="Start practicing for your target IELTS band today"
    >
      <RegisterForm />
    </AuthShell>
  );
}