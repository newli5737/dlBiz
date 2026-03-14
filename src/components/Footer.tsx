'use client';

import Link from 'next/link';
import {
  FaFacebookF, FaTiktok, FaTwitter, FaYoutube,
} from 'react-icons/fa';
import { FiMail, FiMapPin, FiPhone, FiChevronRight } from 'react-icons/fi';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-title">Về dlBiz</h3>
              <p className="footer-desc">
                dlBiz là nền tảng tổng hợp thông tin, đánh giá và chia sẻ về các địa điểm,
                dịch vụ tại Buôn Ma Thuột - Đắk Lắk. Chúng tôi giúp bạn khám phá những
                điều tuyệt vời nhất tại thành phố cao nguyên.
              </p>
              <div className="footer-socials">
                <button className="footer-social" aria-label="Facebook"><FaFacebookF /></button>
                <button className="footer-social" aria-label="TikTok"><FaTiktok /></button>
                <button className="footer-social" aria-label="Twitter"><FaTwitter /></button>
                <button className="footer-social" aria-label="YouTube"><FaYoutube /></button>
              </div>
            </div>
            <div>
              <h3 className="footer-title">Trang chính</h3>
              <ul className="footer-links">
                <li><Link href="/gioi-thieu"><FiChevronRight /> Giới thiệu</Link></li>
                <li><Link href="/lien-he"><FiChevronRight /> Liên hệ</Link></li>
                <li><Link href="/bai-viet"><FiChevronRight /> Trang bài viết</Link></li>
                <li><Link href="/"><FiChevronRight /> Chính sách bảo mật</Link></li>
                <li><Link href="/"><FiChevronRight /> Điều khoản sử dụng</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="footer-title">Thông tin liên hệ</h3>
              <ul className="footer-links">
                <li><a href="mailto:contact@dlbiz.vn"><FiMail /> contact@dlbiz.vn</a></li>
                <li><a href="#"><FiMapPin /> TP. Buôn Ma Thuột, Đắk Lắk</a></li>
                <li><a href="#"><FiPhone /> 0123 456 789</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            © 2026 dlBiz. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
