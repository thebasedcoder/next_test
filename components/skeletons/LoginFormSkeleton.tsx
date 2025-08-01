export default function LoginFormSkeleton() {
  return (
    <div className="form-group" style={{ gap: '1.5rem' }}>
      <div className="form-group" style={{ gap: '1rem' }}>
        {/* Skeleton for Email Input */}
        <div>
          <div className="skeleton" style={{ height: '1.25rem', width: '100px', marginBottom: '0.25rem' }} />
          <div className="skeleton" style={{ height: '2.5rem', width: '100%' }} />
        </div>
        {/* Skeleton for Password Input */}
        <div>
          <div className="skeleton" style={{ height: '1.25rem', width: '100px', marginBottom: '0.25rem' }} />
          <div className="skeleton" style={{ height: '2.5rem', width: '100%' }} />
        </div>
      </div>
      {/* Skeleton for Remember Me */}
      <div className="skeleton" style={{ height: '1.5rem', width: '150px' }} />
      {/* Skeleton for Button */}
      <div className="skeleton" style={{ height: '2.5rem', width: '100%', marginTop: '1.5rem' }} />
    </div>
  );
}