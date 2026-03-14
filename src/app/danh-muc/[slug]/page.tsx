import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import CategoryBar from '@/components/CategoryBar';
import ArticleCard from '@/components/ArticleCard';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: 'Danh mục không tồn tại - dlBiz' };
  return {
    title: `${category.name} - dlBiz`,
    description: `Tổng hợp bài viết về ${category.name} tại Buôn Ma Thuột.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page || '1');
  const limit = 8;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const [categories, posts, total] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: 'asc' } }),
    prisma.post.findMany({
      where: { published: true, categoryId: category.id },
      include: { category: true, author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where: { published: true, categoryId: category.id } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <Header />
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">dlBiz</Link>
            <span>—</span>
            <span>{category.name}</span>
          </div>
          <h1>{category.icon} {category.name}</h1>
        </div>
      </div>

      <CategoryBar categories={categories} activeSlug={slug} />

      <div className="container">
        <section className="section">
          {posts.length > 0 ? (
            <>
              <div className="article-grid">
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
                    <Link href={`/danh-muc/${slug}?page=${page - 1}`} className="pagination-btn">
                      ←
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Link
                      key={i + 1}
                      href={`/danh-muc/${slug}?page=${i + 1}`}
                      className={`pagination-btn ${page === i + 1 ? 'active' : ''}`}
                    >
                      {i + 1}
                    </Link>
                  ))}
                  {page < totalPages && (
                    <Link href={`/danh-muc/${slug}?page=${page + 1}`} className="pagination-btn">
                      →
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <div className="icon">{category.icon}</div>
              <h3>Chưa có bài viết trong danh mục này</h3>
              <p>Hãy quay lại sau để xem các bài viết mới.</p>
            </div>
          )}
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
