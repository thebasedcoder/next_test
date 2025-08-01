"use client";

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { CreatePostModal } from './CreatePostModal';
import { DashboardHeaderSkeleton } from '@/components/skeletons/DashboardHeaderSkeleton';
import { Search, PlusCircle, LogOut } from 'lucide-react';

export function DashboardHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return <DashboardHeaderSkeleton />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <header className="dashboard-header">
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>

        <div className="header-actions">
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary create-post-btn">
            <PlusCircle size={18} />
            <span>Create Post</span>
          </button>

          <div className="user-profile">
            <div className="avatar">
              <span>{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
            </div>
            <span className="user-name">{user?.username || 'User'}</span>

            {/* Logout button placed directly next to the name */}
            <button onClick={logout} className="logout-button" title="Log Out">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}