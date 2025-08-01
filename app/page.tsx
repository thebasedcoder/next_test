// app/page.tsx
import Link from 'next/link';
import { Database, Zap, ShieldCheck } from 'lucide-react';

function FeatureCard({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function Header() {
  return (
    <header className="landing-header">
      <div className="container">
        <nav className="navbar">
          <div className="navbar-logo">
            <ShieldCheck size={28} />
            <span>YourApp</span>
          </div>
          <div className="navbar-links">
            <Link href="/login" className="nav-link">Sign In</Link>
            <Link href="/signup" className="btn btn-primary" style={{ width: 'auto' }}>
              Sign Up Free
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Header />

      <main>
        <section className="hero-section">
          <div className="container">
            <h1 className="hero-title">The Modern Platform for Your Data</h1>
            <p className="hero-subtitle">
              Secure, scalable, and built for performance. Manage your infrastructure with confidence and ease.
            </p>
            <Link href="/signup" className="btn btn-primary hero-cta">
              Get Started for Free
            </Link>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>Why Choose Us?</h2>
              <p>Everything you need to scale your application, all in one place.</p>
            </div>
            <div className="features-grid">
              <FeatureCard icon={<Database size={32} />} title="Robust Infrastructure">
                Leverage our globally distributed infrastructure for low latency and high availability.
              </FeatureCard>
              <FeatureCard icon={<Zap size={32} />} title="Blazing Fast Performance">
                Built from the ground up for speed, ensuring your queries and connections are instant.
              </FeatureCard>
              <FeatureCard icon={<ShieldCheck size={32} />} title="Enterprise-Grade Security">
                Your data is protected with multiple layers of security, including encryption at rest and in transit.
              </FeatureCard>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Ready to Get Started?</h2>
            <p>Create an account in minutes and experience the future of data management.</p>
            <Link href="/signup" className="btn btn-primary hero-cta">
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} YourApp. All rights reserved.</p>
      </footer>
    </div>
  );
}