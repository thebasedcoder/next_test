import { getUserPosts } from '@/lib/data';
import Link from 'next/link';

export default async function LatestPostsPage() {
  const latestPosts = await getUserPosts();

  return (
    <>
      <h2 className="panel-title">Latest Posts</h2>
      <ul className="post-list">
        {latestPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} className="post-list-item">
              <div>
                <p className="post-title">{post.title}</p>
              </div>
              <span>&rarr;</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}