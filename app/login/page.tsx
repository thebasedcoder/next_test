import LoginForm from "@/components/ui/LoginForm";
import Link from "next/link";

export default async function Page({ searchParams }: { searchParams: { from?: string } }) {
  const redirectTo = searchParams.from || '/dashboard';
  return (
    <div className="auth-layout" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="card auth-card" style={{ gap: '2rem' }}>
        <div className="text-center">
          <h2>Welcome back</h2>
          <p style={{ marginTop: '0.5rem' }}>Sign in to your account</p>
        </div>
        <LoginForm redirectTo={redirectTo} />
        <p className="text-center">
          Don't have an account?{' '}
          <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}