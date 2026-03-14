'use client';

import { useEffect, useState } from 'react';
import { FiFileText, FiCheckCircle, FiFolder, FiSmile } from 'react-icons/fi';

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalPosts: 0, publishedPosts: 0, totalCategories: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/posts?all=true&limit=1').then((r) => r.json()),
      fetch('/api/posts?limit=1').then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
    ]).then(([allPosts, pubPosts, cats]) => {
      setStats({
        totalPosts: allPosts.total || 0,
        publishedPosts: pubPosts.total || 0,
        totalCategories: Array.isArray(cats) ? cats.length : 0,
      });
    });
  }, []);

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon blue"><FiFileText size={24} /></div>
          <h3>{stats.totalPosts}</h3>
          <p>Tổng bài viết</p>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon green"><FiCheckCircle size={24} /></div>
          <h3>{stats.publishedPosts}</h3>
          <p>Đã xuất bản</p>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon purple"><FiFolder size={24} /></div>
          <h3>{stats.totalCategories}</h3>
          <p>Danh mục</p>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>Chào mừng đến dlBiz CMS</h3>
        </div>
        <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-light)' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
            <FiSmile style={{display:'inline',verticalAlign:'middle',marginRight:'6px'}} /> Chào bạn! Từ đây bạn có thể quản lý toàn bộ nội dung website dlBiz.
          </p>
          <p>Sử dụng menu bên trái để bắt đầu quản lý bài viết.</p>
        </div>
      </div>
    </>
  );
}
