"use client";

import { createPostAction } from '@/features/posts/actions';
import { ActionState } from '@/lib/definitions';
import { X } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import SubmitButton from '../shared/SubmitButton';
import { toast } from 'sonner';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState: ActionState = {
  status: '',
  message: '',
};

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [state, action, pending] = useActionState(createPostAction, initialState)
  useEffect(() => {
    if (state.status === 'error') {
      toast.error(state.message);
    }
    if (state.status === 'success') {
      toast.success(state.message);
      onClose()
    }
  }, [state]);
  if (!isOpen) {
    return null;
  }

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card modal-content" onClick={handleModalContentClick}>
        <div className="modal-header">
          <h2>Create a new post</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={24} />
          </button>
        </div>

        <form action={action} className="form-group" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
          <div>
            <label htmlFor="post-title">Title</label>
            <input id="post-title" name="title" type="text" placeholder="Your post title" />
          </div>

          {/* New two-column row for author and date */}
          <div className="form-row">
            <div>
              <label htmlFor="post-author">Author</label>
              <input id="post-author" name="author" type="text" placeholder="Jane Doe" />
            </div>
            <div>
              <label htmlFor="post-publishedAt">Published Date</label>
              <input id="post-publishedAt" name="publishedAt" type="date" />
            </div>
          </div>

          <div>
            <label htmlFor="post-content">Content</label>
            <textarea
              id="post-content"
              name="content"
              rows={8}
              placeholder="Write your post content here..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ width: 'auto' }}>
              Cancel
            </button>
            <SubmitButton pending={pending} className="btn btn-primary" style={{ width: 'auto' }}>
              Create Post
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}