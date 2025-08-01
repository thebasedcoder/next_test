"use client"
import { PostCard } from '@/components/ui/PostCard'; // Adjust path as needed
import { getAllPosts } from '@/lib/data';
import { useQuery } from '@tanstack/react-query';
import PostsLoading from './loading';

export default function Page() {
  // const posts = await getAllPosts();
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(), // Call the Server Action
  });

  if (isLoading) {
    return <PostsLoading />;
  }

  if (isError) {
    return <div className="content-section"><h2>Error loading posts.</h2></div>;
  }

  if (!posts) {
    return null
  }
  return (
    <div className="main-content-area">
      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}