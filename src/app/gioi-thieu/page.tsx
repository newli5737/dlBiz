import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import type { Metadata } from 'next';
import { FiTarget, FiZap, FiShield, FiHeart } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Giới Thiệu - dlBiz',
  description: 'Tìm hiểu về dlBiz - nền tảng tổng hợp thông tin Buôn Ma Thuột.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="page-header" style={{ backgroundImage: "url('/images/hero-about.png')" }} />

      <div className="container">
        <section className="about-section">
          <div className="about-content">
            <h2>Chào mừng đến với dlBiz</h2>
            <p>
              dlBiz là nền tảng tổng hợp thông tin, đánh giá và chia sẻ về các địa điểm,
              dịch vụ tại Buôn Ma Thuột - Đắk Lắk. Với sứ mệnh giúp người dân và du khách
              khám phá những điều tuyệt vời nhất tại thành phố cao nguyên.
            </p>
            <p>
              Chúng tôi mong muốn trở thành cầu nối giữa các doanh nghiệp địa phương và
              cộng đồng, mang đến những thông tin hữu ích và đáng tin cậy nhất về ẩm thực,
              du lịch, giáo dục, mua sắm, làm đẹp và nhiều lĩnh vực khác tại BMT.
            </p>
            <h2>Tầm nhìn</h2>
            <p>
              Trở thành nền tảng review và chia sẻ hàng đầu tại Tây Nguyên, nơi mọi người
              có thể dễ dàng tìm kiếm thông tin về mọi dịch vụ, địa điểm tại khu vực.
            </p>
            <h2>Giá trị cốt lõi</h2>
            <p style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><FiTarget /> Chính xác</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><FiZap /> Hữu ích</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><FiShield /> Tin cậy</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><FiHeart /> Tận tâm</span>
            </p>
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
