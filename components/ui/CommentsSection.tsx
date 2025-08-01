import { AddCommentForm } from './AddCommentForm';
import { CommentList } from './CommentList';
import { getCommentsByPostId } from '@/lib/data';

export async function CommentsSection({ postId }: { postId: number }) {
  // Fetch only the first page of comments on the server
  const { comments, totalComments } = await getCommentsByPostId(postId, 1, 10);
  const serializedComments = comments.map(comment => ({
    ...comment,
    createdAt: comment.createdAt.toISOString(),
  }));
  return (
    <section className="comments-section">
      <h2>Comments ({totalComments})</h2>
      <AddCommentForm postId={postId} />
      <CommentList
        postId={postId}
        initialComments={serializedComments}
        totalComments={totalComments}
      />
    </section>
  );
}