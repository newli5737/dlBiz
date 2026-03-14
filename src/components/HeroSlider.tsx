'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slides = [
  {
    badge: 'ẨM THỰC & TOPLIST',
    subtitle: 'Khám phá Buôn Ma Thuột',
    title: 'Toplist',
    titleHighlight: 'Ẩm Thực & Dịch Vụ',
    desc: 'Tổng hợp những địa điểm ăn uống, giải trí, dịch vụ được đánh giá cao nhất tại BMT.',
    bg: '/images/1.webp',
  },
  {
    badge: 'TRẢI NGHIỆM',
    subtitle: 'Thành phố Cà Phê',
    title: 'Điểm Đến',
    titleHighlight: 'Cho Mọi Trải Nghiệm',
    desc: 'Từ quán cà phê view đẹp đến nhà hàng sang trọng — tất cả đều có tại đây.',
    bg: '/images/2.webp',
  },
  {
    badge: 'DU LỊCH & LƯU TRÚ',
    subtitle: 'Đắk Lắk - Tây Nguyên',
    title: 'Hành Trình',
    titleHighlight: 'Bắt Đầu Từ Đây',
    desc: 'Khách sạn, homestay, nhà nghỉ tốt nhất cho chuyến du lịch Tây Nguyên của bạn.',
    bg: '/images/3.jpg',
  },
];

interface HeroProps {
  totalPosts: number;
  totalCategories: number;
}

export default function HeroSlider({ totalPosts, totalCategories }: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="hero">
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`}>
            <Image
              src={slide.bg}
              alt={slide.title}
              fill
              priority={i === 0}
              className="hero-slide-bg"
              style={{ objectFit: 'cover' }}
            />
            <div className="hero-overlay" />
          </div>
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {slides[current].badge}
        </div>
        <p className="hero-subtitle">{slides[current].subtitle}</p>
        <h1 className="hero-title">
          {slides[current].title}
          <br />
          <span>{slides[current].titleHighlight}</span>
        </h1>
        <p className="hero-desc">{slides[current].desc}</p>
        <a href="/bai-viet" className="hero-cta">
          Khám phá ngay <FiArrowRight />
        </a>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-number">{totalPosts}<sup>+</sup></div>
          <div className="hero-stat-label">Bài viết</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-number">{totalCategories}</div>
          <div className="hero-stat-label">Danh mục</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-number">BMT</div>
          <div className="hero-stat-label">Đắk Lắk</div>
        </div>
      </div>

      <div className="hero-arrows">
        <button className="hero-arrow" onClick={prev} aria-label="Previous">
          <FiChevronLeft />
        </button>
        <button className="hero-arrow" onClick={next} aria-label="Next">
          <FiChevronRight />
        </button>
      </div>

      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
