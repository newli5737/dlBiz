import Link from 'next/link';
import { FiFileText } from 'react-icons/fi';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  thumbnail?: string | null;
  createdAt: string;
  category: {
    name: string;
    slug: string;
    icon?: string | null;
  };
}

export default function ArticleCard({ post }: { post: Post }) {
  const date = new Date(post.createdAt);
  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
  const month = monthNames[date.getMonth()];

  return (
    <Link href={`/bai-viet/${post.slug}`} className="article-card">
      <div className="article-card-image">
        {post.thumbnail ? (
          <img src={post.thumbnail} alt={post.title} />
        ) : (
          <div className="article-card-placeholder">
            {post.category?.icon || <FiFileText size={32} />}
          </div>
        )}
        <div className="article-card-date">
          <span className="article-card-date-day">{day}</span>
          <span className="article-card-date-month">{month}</span>
        </div>
      </div>
      <div className="article-card-body">
        <div className="article-card-category">{post.category?.name}</div>
        <h3 className="article-card-title">{post.title}</h3>
        {post.excerpt && (
          <p className="article-card-excerpt">{post.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
