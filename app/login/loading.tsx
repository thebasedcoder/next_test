import LoginFormSkeleton from '@/components/skeletons/LoginFormSkeleton';
import Link from 'next/link';

export default function Loading() {
  return (
    <div className="auth-layout" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="card auth-card" style={{ gap: '2rem' }}>
        <div className="text-center">
          <h2>Welcome back</h2>
          <p style={{ marginTop: '0.5rem' }}>Sign in to your account</p>
        </div>

        <LoginFormSkeleton />

        <p className="text-center">
          Don't have an account?{' '}
          <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}