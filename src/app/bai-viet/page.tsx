import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ArticleCard from '@/components/ArticleCard';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FiChevronLeft, FiChevronRight, FiFileText, FiSearch } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Trang Bài Viết - dlBiz',
  description: 'Tổng hợp tất cả bài viết về Buôn Ma Thuột trên dlBiz.',
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const search = params.search || '';
  const limit = 8;

  const where: Record<string, unknown> = { published: true };
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { excerpt: { contains: search } },
    ];
  }

  const [posts, total, recentPosts] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { category: true, author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { category: true },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <Header />
      <div className="page-header" style={{ backgroundImage: "url('/images/hero-articles.png')" }} />

      <div className="container">
        <div className="two-column">
          <div>
            {posts.length > 0 ? (
              <>
                <div className="article-grid-2col">
                  {posts.map((post) => (
                    <ArticleCard
                      key={post.id}
                      post={{
                        ...post,
                        createdAt: post.createdAt.toISOString(),
                      }}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    {page > 1 && (
                      <Link
                        href={`/bai-viet?page=${page - 1}${search ? `&search=${search}` : ''}`}
                        className="pagination-btn"
                      >
                        ←
                      </Link>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Link
                        key={i + 1}
                        href={`/bai-viet?page=${i + 1}${search ? `&search=${search}` : ''}`}
                        className={`pagination-btn ${page === i + 1 ? 'active' : ''}`}
                      >
                        {i + 1}
                      </Link>
                    ))}
                    {page < totalPages && (
                      <Link
                        href={`/bai-viet?page=${page + 1}${search ? `&search=${search}` : ''}`}
                        className="pagination-btn"
                      >
                        →
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <div className="icon"><FiFileText size={32} /></div>
                <h3>Chưa có bài viết nào</h3>
                <p>Hãy quay lại sau để xem các bài viết mới nhất.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sidebar-widget">
              <h3><FiSearch style={{display:'inline',verticalAlign:'middle',marginRight:'6px'}} /> Tìm kiếm</h3>
              <form action="/bai-viet" method="GET">
                <input
                  type="text"
                  name="search"
                  className="search-input"
                  placeholder="Tìm kiếm bài viết..."
                  defaultValue={search}
                />
              </form>
            </div>

            <div className="sidebar-widget">
              <h3><FiFileText style={{display:'inline',verticalAlign:'middle',marginRight:'6px'}} /> Bài viết gần đây</h3>
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/bai-viet/${post.slug}`}
                  className="recent-post-item"
                >
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="recent-post-thumb"
                    />
                  ) : (
                    <div
                      className="recent-post-thumb"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        fontSize: '1.2rem',
                      }}
                    >
                      {post.category?.icon || '📝'}
                    </div>
                  )}
                  <div>
                    <div className="recent-post-title">{post.title}</div>
                    <div className="recent-post-date">
                      {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
