export function DashboardHeaderSkeleton() {
  return (
    <header className="dashboard-header">
      {/* Skeleton for search bar */}
      <div className="skeleton" style={{ height: '38px', width: '320px', borderRadius: 'var(--radius)' }} />

      <div className="header-actions">
        {/* Skeleton for "Create Post" button */}
        <div className="skeleton" style={{ height: '38px', width: '130px', borderRadius: 'var(--radius)' }} />
        {/* Skeleton for user profile */}
        <div className="skeleton" style={{ height: '32px', width: '100px', borderRadius: '9999px' }} />
      </div>
    </header>
  );
}