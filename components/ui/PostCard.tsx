import Link from 'next/link';

interface PostCardProps {
  post: {
    id: number; // Prisma IDs are numbers unless specified otherwise
    title: string;
    content: string | null; // Content can be null
    author: {
      username: string | null; // The author object is nested
    };
    // The 'excerpt' is not in your Prisma model, so it must be
    // generated in your data fetching function or removed.
  };
}

export function PostCard({ post }: PostCardProps) {
  // Generate a simple excerpt from the content if it's not provided
  const excerpt = post.content?.substring(0, 100) + '...' || 'No content available.';

  return (
    <Link href={`/posts/${post.id}`} className="post-card-link">
      <div className="card post-card">
        <h3>{post.title}</h3>
        {/* Access the nested author name */}
        <p className="author">by {post.author.username || 'Unknown Author'}</p>
        <p className="excerpt">{excerpt}</p>
      </div>
    </Link>
  );
}