import { Users, FileText, MessageSquare } from 'lucide-react';
import { getCommentCountForUserPosts, getPostCount } from '@/lib/data';

export default async function UserStatsPage() {
  const [postCount, commentCount] = await Promise.all([
    getPostCount(),
    getCommentCountForUserPosts(),
  ]);

  return (
    <>
      <h2 className="panel-title">Your Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <Users className="stat-icon" />
          <p className="stat-label">Total Followers</p>
          <p className="stat-value">1,482</p>
        </div>
        <div className="stat-card">
          <FileText className="stat-icon" />
          <p className="stat-label">Your Posts</p>
          <p className="stat-value">{postCount}</p>
        </div>
        <div className="stat-card">
          <MessageSquare className="stat-icon" />
          <p className="stat-label">Comments Received</p>
          <p className="stat-value">{commentCount}</p>
        </div>
      </div>
    </>
  );
}