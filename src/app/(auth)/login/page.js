import AuthLayout from "@/components/layout/auth-layout";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back!"
      description="Access your account to continue your journey"
    >
      <LoginForm />
    </AuthLayout>
  );
} 