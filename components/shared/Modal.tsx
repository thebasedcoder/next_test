"use client";

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Add event listener for the Escape key to close the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  // This prevents clicks inside the modal from closing it
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={() => router.back()}>
      <div
        ref={dialogRef}
        className="card modal-content wide-modal"
        onClick={handleModalContentClick}
      >
        <button onClick={() => router.back()} className="modal-close-btn">
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}