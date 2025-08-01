"use client";

import { useTransition, useRef } from 'react';
import { addCommentAction } from '@/features/posts/actions';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'; // Adjust path

export function AddCommentForm({ postId }: { postId: number }) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await addCommentAction(postId, formData);
      formRef.current?.reset(); // Reset the form after submission
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="add-comment-form">
      <textarea
        name="commentText"
        placeholder="Add a comment..."
        rows={3}
        required
      />
      <button type="submit" disabled={isPending} className="btn btn-primary" style={{ width: 'auto' }}>
        {isPending ? <LoadingSpinner /> : 'Post Comment'}
      </button>
    </form>
  );
}