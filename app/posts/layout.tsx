import { Sidebar } from '@/components/ui/Sidebar';
import { DashboardHeader } from '@/components/ui/DasboardHeader';

export default function PostsDashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="content-wrapper">
        <DashboardHeader />
        <main className="main-content-area">
          {children}
        </main>
      </div>
      {modal}
    </div>
  );
}