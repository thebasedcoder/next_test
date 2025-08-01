import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getPostById } from '@/lib/data';
import { CommentsSection } from '@/components/ui/CommentsSection';

export default async function PostDetailPage({ params }: { params: { postId: string } }) {
  const awaitedParams = await params
  const postId = parseInt(awaitedParams.postId, 10);
  const post = await getPostById(postId);

  if (!post) {
    return (
      <div className="content-section">
        <h1>Post not found</h1>
        <p>The post you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="content-section">
      <div className="post-header">
        <Link href="/posts" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to all posts</span>
        </Link>
        <div className="post-meta">
          <span>By {post.author.username}</span>
          <span>•</span>
          <span>Published on {post.published}</span>
        </div>
        <h1>{post.title}</h1>
      </div>

      <article
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content! }}
      />
      <CommentsSection postId={postId} />
    </div>
  );
}