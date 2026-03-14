import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import HeroSlider from '@/components/HeroSlider';
import CategoryBar from '@/components/CategoryBar';
import ArticleCard from '@/components/ArticleCard';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default async function HomePage() {
  const [categories, postsData, totalPosts] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: 'asc' } }),
    prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        posts: {
          where: { published: true },
          orderBy: { createdAt: 'desc' },
          take: 4,
          include: {
            category: true,
            author: { select: { name: true } },
          },
        },
      },
    }),
    prisma.post.count({ where: { published: true } }),
  ]);

  const categoriesWithPosts = postsData.filter((cat) => cat.posts.length > 0);

  return (
    <>
      <Header />
      <HeroSlider totalPosts={totalPosts} totalCategories={categories.length} />
      <CategoryBar categories={categories} />

      {/* Latest Posts Section */}
      <div className="container">
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Bài Viết Mới Nhất</h2>
            <Link href="/bai-viet" className="section-link">
              Xem tất cả <FiArrowRight style={{display:'inline',verticalAlign:'middle'}} />
            </Link>
          </div>
          <div className="article-grid">
            {(await prisma.post.findMany({
              where: { published: true },
              orderBy: { createdAt: 'desc' },
              take: 4,
              include: { category: true, author: { select: { name: true } } },
            })).map((post) => (
              <ArticleCard
                key={post.id}
                post={{
                  ...post,
                  createdAt: post.createdAt.toISOString(),
                }}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Category Sections */}
      {categoriesWithPosts.map((cat) => (
        <div className="container" key={cat.id}>
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-title-icon">{cat.icon}</span>
                {cat.name}
              </h2>
              <Link href={`/danh-muc/${cat.slug}`} className="section-link">
                Xem tất cả <FiArrowRight style={{display:'inline',verticalAlign:'middle'}} />
              </Link>
            </div>
            <div className="article-grid">
              {cat.posts.map((post) => (
                <ArticleCard
                  key={post.id}
                  post={{
                    ...post,
                    createdAt: post.createdAt.toISOString(),
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      ))}

      <Footer />
      <BackToTop />
    </>
  );
}
