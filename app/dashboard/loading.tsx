function PanelSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel">
      <div className="skeleton" style={{ height: '2rem', width: '200px', marginBottom: '1rem' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {children}
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <div className="dashboard-panels">
      <PanelSkeleton>
        <div className="stats-grid">
          <div className="skeleton" style={{ height: '120px' }} />
          <div className="skeleton" style={{ height: '120px' }} />
          <div className="skeleton" style={{ height: '120px' }} />
        </div>
      </PanelSkeleton>

      <PanelSkeleton>
        <div className="post-list">
          <div className="skeleton" style={{ height: '60px' }} />
          <div className="skeleton" style={{ height: '60px' }} />
          <div className="skeleton" style={{ height: '60px' }} />
        </div>
      </PanelSkeleton>
    </div>
  );
}