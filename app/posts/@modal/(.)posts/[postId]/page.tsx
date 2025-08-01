import { Modal } from '@/components/shared/Modal';
import { getPostById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { postId: string } }) {
  const awaitedParams = await params
  const postId = parseInt(awaitedParams.postId, 10);
  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <Modal>
      <div className="post-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <div className="post-meta">
          <span>By {post.author.username}</span>
          <span>•</span>
          <span>Published on {post.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h1>{post.title}</h1>
      </div>

      <article
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content! }}
      />
    </Modal>
  );
}