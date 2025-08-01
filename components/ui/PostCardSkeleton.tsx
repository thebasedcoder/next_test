export function PostCardSkeleton() {
  return (
    <div className="card post-card" aria-hidden="true">
      {/* Skeleton for title */}
      <div className="skeleton" style={{ height: '1.75rem', width: '80%', marginBottom: '0.5rem' }} />
      {/* Skeleton for author */}
      <div className="skeleton" style={{ height: '1rem', width: '40%', marginBottom: '1rem' }} />
      {/* Skeleton for excerpt */}
      <div className="skeleton" style={{ height: '1rem', width: '100%' }} />
      <div className="skeleton" style={{ height: '1rem', width: '100%', marginTop: '0.5rem' }} />
      <div className="skeleton" style={{ height: '1rem', width: '60%', marginTop: '0.5rem' }} />
    </div>
  );
}