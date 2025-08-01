export function UserStatsSkeleton() {
  return (
    <div className="panel">
      <div className="skeleton" style={{ height: '2rem', width: '200px' }} />
      <div className="stats-grid">
        <div className="skeleton" style={{ height: '120px' }} />
        <div className="skeleton" style={{ height: '120px' }} />
        <div className="skeleton" style={{ height: '120px' }} />
      </div>
    </div>
  );
}