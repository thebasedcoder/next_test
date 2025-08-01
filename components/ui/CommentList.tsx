"use client";

import { useState, useEffect, useRef } from 'react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'; // Adjust path as needed
import { ClientComment } from '@/lib/definitions';

// Define the shape of a comment to match your data
interface CommentListProps {
  postId: number;
  initialComments: ClientComment[]; // Use the client-side type
  totalComments: number;
}

const PAGE_SIZE = 10;

export function CommentList({ postId, initialComments, totalComments }: CommentListProps) {
  const [comments, setComments] = useState(initialComments);
  const [page, setPage] = useState(2); // Start loading from the second page
  const [hasMore, setHasMore] = useState(initialComments.length < totalComments);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
          loadMoreComments();
        }
      },
      { rootMargin: '200px' } // Load more when 200px away from the bottom
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, isLoading]);

  const loadMoreComments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comments?page=${page}`);
      const { comments: newComments } = await res.json();

      setComments(prev => [...prev, ...newComments]);
      setPage(prev => prev + 1);
      setHasMore(comments.length + newComments.length < totalComments);
    } catch (error) {
      console.error('Failed to load more comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <p className="comment-text">{comment.text}</p>
          <p className="comment-meta">
            by {comment.author.username || 'Anonymous'} on {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}

      {hasMore && (
        <div ref={loaderRef} className="comment-loader">
          {isLoading && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
}