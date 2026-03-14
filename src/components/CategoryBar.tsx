'use client';

import Link from 'next/link';
import {
  FaHotel, FaTheaterMasks, FaBook, FaPaintBrush, FaMagic,
  FaShoppingCart, FaGlobeAmericas, FaIndustry, FaUniversity,
  FaLandmark, FaFutbol, FaTshirt, FaPaw, FaUtensils,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  'luu-tru': FaHotel,
  'giai-tri': FaTheaterMasks,
  'giao-duc-hoc-tap': FaBook,
  'lam-dep': FaPaintBrush,
  'phu-lieu-lam-dep': FaMagic,
  'mua-sam': FaShoppingCart,
  'nguoi-nuoc-ngoai-tai-bmt': FaGlobeAmericas,
  'san-xuat': FaIndustry,
  'tai-chinh-ngan-hang': FaUniversity,
  'tam-linh-van-hoa': FaLandmark,
  'the-thao': FaFutbol,
  'thoi-trang': FaTshirt,
  'thu-cung': FaPaw,
  'am-thuc': FaUtensils,
};

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

export default function CategoryBar({ categories, activeSlug }: { categories: Category[]; activeSlug?: string }) {
  const items = [...categories, ...categories];

  return (
    <div className="category-bar">
      <div className="category-marquee">
        <div className="category-marquee-track">
          {items.map((cat, i) => {
            const Icon = iconMap[cat.slug];
            return (
              <Link
                key={`${cat.id}-${i}`}
                href={`/danh-muc/${cat.slug}`}
                className={`category-item ${activeSlug === cat.slug ? 'active' : ''}`}
              >
                <span className="category-item-icon">
                  {Icon ? <Icon /> : cat.icon}
                </span>
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
