"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    // The 'data-state' attribute will be used by CSS to set the width
    <aside className="sidebar" data-state={isOpen ? 'open' : 'closed'}>
      {/* App Header Section */}
      <div className="sidebar-header">
        <Shield className="nav-icon" />
        {isOpen && <h1 className="sidebar-title">Veritas</h1>}
      </div>

      <nav className="sidebar-nav">
        <Link href="/dashboard" className="nav-item">
          <LayoutDashboard className="nav-icon" />
          {isOpen && <span className="nav-text">Dashboard</span>}
        </Link>
        <Link href="/posts" className="nav-item active">
          <FileText className="nav-icon" />
          {isOpen && <span className="nav-text">Posts</span>}
        </Link>
        <Link href="/analytics" className="nav-item">
          <BarChart2 className="nav-icon" />
          {isOpen && <span className="nav-text">Analytics</span>}
        </Link>
        <Link href="/settings" className="nav-item">
          <Settings className="nav-icon" />
          {isOpen && <span className="nav-text">Settings</span>}
        </Link>
      </nav>

      <button onClick={toggleSidebar} className="sidebar-toggle">
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </aside>
  );
}