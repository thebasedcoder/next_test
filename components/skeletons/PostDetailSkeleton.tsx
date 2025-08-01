export function PostDetailSkeleton() {
  return (
    <div className="content-section">
      <div className="post-header">
        {/* Skeleton for back link */}
        <div className="skeleton" style={{ height: '1.25rem', width: '150px' }} />
        {/* Skeleton for meta data */}
        <div className="skeleton" style={{ height: '1rem', width: '250px', marginTop: '1rem' }} />
        {/* Skeleton for title (h1) */}
        <div className="skeleton" style={{ height: '2.75rem', width: '70%', marginTop: '0.5rem' }} />
      </div>

      <article className="post-content">
        {/* Skeleton for paragraphs */}
        <div className="skeleton" style={{ height: '1.25rem', width: '100%', marginTop: '1rem' }} />
        <div className="skeleton" style={{ height: '1.25rem', width: '100%', marginTop: '0.75rem' }} />
        <div className="skeleton" style={{ height: '1.25rem', width: '80%', marginTop: '0.75rem' }} />

        <div className="skeleton" style={{ height: '1.25rem', width: '90%', marginTop: '2rem' }} />
        <div className="skeleton" style={{ height: '1.25rem', width: '70%', marginTop: '0.75rem' }} />
      </article>
    </div>
  );
}