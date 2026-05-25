import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage () {
  return (
    <AuthShell
      mode="forgot"
      title="Forgot password?"
      subtitle="Enter your email address and we'll send you a link to reset your password"
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
