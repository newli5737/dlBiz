'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { FiBarChart2, FiFileText, FiGlobe, FiLogOut } from 'react-icons/fi';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/portal');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="loading" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-logo">
          <h2>dlBiz</h2>
          <span>Content Management</span>
        </div>
        <ul className="dashboard-nav">
          <li>
            <Link
              href="/portal/dashboard"
              className={pathname === '/portal/dashboard' ? 'active' : ''}
            >
              <span className="nav-icon"><FiBarChart2 /></span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/portal/dashboard/posts"
              className={pathname === '/portal/dashboard/posts' ? 'active' : ''}
            >
              <span className="nav-icon"><FiFileText /></span>
              Bài viết
            </Link>
          </li>
          <li>
            <a href="/" target="_blank">
              <span className="nav-icon"><FiGlobe /></span>
              Xem website
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: '/portal' });
              }}
            >
              <span className="nav-icon"><FiLogOut /></span>
              Đăng xuất
            </a>
          </li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <h2>
            {pathname === '/portal/dashboard'
              ? 'Dashboard'
              : pathname.includes('/posts')
              ? 'Quản lý bài viết'
              : 'Dashboard'}
          </h2>
          <div className="dashboard-topbar-user">
            <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
              {session.user?.name}
            </span>
            <div className="dashboard-topbar-avatar">
              {session.user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </div>
        <div className="dashboard-content">{children}</div>
      </main>
    </div>
  );
}
