export function LatestPostsSkeleton() {
  return (
    <div className="panel">
      <div className="skeleton" style={{ height: '2rem', width: '200px' }} />
      <div className="post-list">
        <div className="skeleton" style={{ height: '60px' }} />
        <div className="skeleton" style={{ height: '60px' }} />
        <div className="skeleton" style={{ height: '60px' }} />
      </div>
    </div>
  );
}