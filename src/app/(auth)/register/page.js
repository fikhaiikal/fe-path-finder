import AuthLayout from "@/components/layout/auth-layout";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      description="Sign up to start your journey with PathFinder"
    >
      <RegisterForm />
    </AuthLayout>
  );
} 