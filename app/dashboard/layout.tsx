import { Sidebar } from '@/components/ui/Sidebar';
import { DashboardHeader } from '@/components/ui/DasboardHeader';
import { Suspense } from 'react';
import { UserStatsSkeleton } from '@/components/skeletons/UserStatsSkeleton';
import { LatestPostsSkeleton } from '@/components/skeletons/LatestPostsSkeleton';

export default function DashboardLayout({
  children,
  modal,
  user_stats,
  latest_posts,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  user_stats: React.ReactNode;
  latest_posts: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="content-wrapper">
        <DashboardHeader />
        <main className="main-content-area">
          {user_stats && latest_posts ? (
            <div className="dashboard-panels">
              <div className="panel">
                <Suspense fallback={<UserStatsSkeleton />}>
                  {user_stats}
                </Suspense>
              </div>
              <div className="panel">
                <Suspense fallback={<LatestPostsSkeleton />}>
                  {latest_posts}
                </Suspense></div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
      {modal}
    </div>
  );
}