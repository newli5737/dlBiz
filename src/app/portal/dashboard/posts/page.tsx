'use client';

import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { FiFileText, FiEdit2, FiTrash2, FiCamera, FiX } from 'react-icons/fi';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false });

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  thumbnail?: string | null;
  published: boolean;
  featured: boolean;
  createdAt: string;
  category: Category;
  author: { name: string };
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts?all=true&limit=100');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
    setLoading(false);
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [fetchPosts, fetchCategories]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const openNew = () => {
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setThumbnail('');
    setCategoryId(categories[0]?.id || '');
    setPublished(false);
    setFeatured(false);
    setModalOpen(true);
  };

  const openEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt || '');
    setContent(post.content);
    setThumbnail(post.thumbnail || '');
    setCategoryId(post.category.id);
    setPublished(post.published);
    setFeatured(post.featured);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!title || !content || !categoryId) return;
    setSaving(true);

    const body = {
      title,
      slug: slug || generateSlug(title),
      excerpt,
      content,
      thumbnail,
      categoryId,
      published,
      featured,
    };

    try {
      if (editingPost) {
        await fetch(`/api/posts/${editingPost.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      }
      setModalOpen(false);
      fetchPosts();
    } catch (err) {
      console.error('Error saving post:', err);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    try {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setThumbnail(data.url);
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <>
      <div className="table-container">
        <div className="table-header">
          <h3>Danh sách bài viết ({posts.length})</h3>
          <button className="btn btn-primary" onClick={openNew} style={{ width: 'auto' }}>
            + Tạo bài viết
          </button>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner" />
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <div className="icon"><FiFileText size={32} /></div>
            <h3>Chưa có bài viết nào</h3>
            <p>Nhấn &quot;Tạo bài viết&quot; để bắt đầu.</p>
          </div>
        ) : (
          <table className="posts-table">
            <thead>
              <tr>
                <th>Bài viết</th>
                <th>Danh mục</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className="post-title-cell">
                      {post.thumbnail ? (
                        <img src={post.thumbnail} alt="" className="post-thumb-small" />
                      ) : (
                        <div
                          className="post-thumb-small"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            fontSize: '0.9rem',
                          }}
                        >
                          {post.category?.icon || '📝'}
                        </div>
                      )}
                      <span style={{ fontWeight: 600 }}>{post.title}</span>
                    </div>
                  </td>
                  <td>{post.category?.name || '-'}</td>
                  <td>
                    <span className={`badge ${post.published ? 'badge-success' : 'badge-warning'}`}>
                      {post.published ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </td>
                  <td>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="table-action-btn edit"
                        onClick={() => openEdit(post)}
                        title="Sửa"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="table-action-btn delete"
                        onClick={() => handleDelete(post.id)}
                        title="Xóa"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Post Editor Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingPost ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h2>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Tiêu đề *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập tiêu đề bài viết..."
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingPost) setSlug(generateSlug(e.target.value));
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Slug (URL)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="tu-dong-tao-tu-tieu-de"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Danh mục *</label>
                  <select
                    className="form-input"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Ảnh đại diện</label>
                  <div className={`thumbnail-upload ${thumbnail ? 'has-image' : ''}`}>
                    {thumbnail ? (
                      <img src={thumbnail} alt="Thumbnail" />
                    ) : (
                      <div className="thumbnail-upload-text">
                        <span className="icon"><FiCamera /></span>
                        Nhấn để tải ảnh lên
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleThumbnailUpload} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tóm tắt</label>
                <textarea
                  className="form-textarea"
                  placeholder="Mô tả ngắn về bài viết..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  style={{ minHeight: '80px' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nội dung *</label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>

              <div style={{ display: 'flex', gap: '32px', marginTop: '16px' }}>
                <div className="toggle-group">
                  <div
                    className={`toggle ${published ? 'active' : ''}`}
                    onClick={() => setPublished(!published)}
                  />
                  <span className="toggle-label">Xuất bản</span>
                </div>
                <div className="toggle-group">
                  <div
                    className={`toggle ${featured ? 'active' : ''}`}
                    onClick={() => setFeatured(!featured)}
                  />
                  <span className="toggle-label">Nổi bật</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModalOpen(false)}>
                Hủy
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving || !title || !content || !categoryId}
                style={{ width: 'auto' }}
              >
                {saving ? 'Đang lưu...' : editingPost ? 'Cập nhật' : 'Tạo bài viết'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
