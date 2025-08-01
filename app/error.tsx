"use client";

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="error-container">
          <div className="error-card">
            <div className="error-header">
              <AlertTriangle className="error-icon" />
              <h2>Something Went Wrong</h2>
            </div>
            <p>An unexpected error occurred. You can try to recover by clicking the button below.</p>
            <button
              onClick={() => reset()}
              className="btn btn-primary"
              style={{ width: 'auto', marginTop: '1rem' }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}