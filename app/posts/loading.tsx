import { PostCardSkeleton } from '@/components/ui/PostCardSkeleton'; // Adjust path as needed

export default function PostsLoading() {
  return (
    <div className="content-section">
      <div className="posts-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}