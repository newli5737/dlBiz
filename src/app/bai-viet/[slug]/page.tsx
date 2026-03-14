import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FiCalendar, FiUser, FiFileText } from 'react-icons/fi';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });
  if (!post) return { title: 'Bài viết không tồn tại - dlBiz' };
  return {
    title: `${post.title} - dlBiz`,
    description: post.excerpt || '',
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      category: true,
      author: { select: { name: true } },
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  const recentPosts = await prisma.post.findMany({
    where: { published: true, id: { not: post.id } },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { category: true },
  });

  const relatedPosts = await prisma.post.findMany({
    where: {
      published: true,
      categoryId: post.categoryId,
      id: { not: post.id },
    },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: { category: true, author: { select: { name: true } } },
  });

  return (
    <>
      <Header />

      {/* Article Hero */}
      <div className="article-hero">
        {post.thumbnail ? (
          <img src={post.thumbnail} alt={post.title} className="article-hero-bg" />
        ) : (
          <div
            className="article-hero-bg"
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 100%)',
              opacity: 1,
            }}
          />
        )}
        <div className="article-hero-overlay" />
        <div className="article-hero-content">
          <Link href={`/danh-muc/${post.category.slug}`} className="article-hero-category">
            {post.category.icon} {post.category.name}
          </Link>
          <h1 className="article-hero-title">{post.title}</h1>
          <div className="article-hero-meta">
            <span><FiCalendar style={{display:'inline',verticalAlign:'middle',marginRight:'4px'}} /> {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
            <span><FiUser style={{display:'inline',verticalAlign:'middle',marginRight:'4px'}} /> {post.author.name}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="two-column">
          {/* Main Content */}
          <article>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Sidebar */}
          <aside>
            <div className="sidebar-widget">
              <h3><FiFileText style={{display:'inline',verticalAlign:'middle',marginRight:'6px'}} /> Bài viết gần đây</h3>
              {recentPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/bai-viet/${rp.slug}`}
                  className="recent-post-item"
                >
                  {rp.thumbnail ? (
                    <img
                      src={rp.thumbnail}
                      alt={rp.title}
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
                      {rp.category?.icon || '📝'}
                    </div>
                  )}
                  <div>
                    <div className="recent-post-title">{rp.title}</div>
                    <div className="recent-post-date">
                      {new Date(rp.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Bài viết liên quan</h2>
            </div>
            <div className="article-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/bai-viet/${rp.slug}`} className="article-card">
                  <div className="article-card-image">
                    {rp.thumbnail ? (
                      <img src={rp.thumbnail} alt={rp.title} />
                    ) : (
                      <div className="article-card-placeholder">
                        {rp.category?.icon || '📝'}
                      </div>
                    )}
                  </div>
                  <div className="article-card-body">
                    <div className="article-card-category">{rp.category?.name}</div>
                    <h3 className="article-card-title">{rp.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
