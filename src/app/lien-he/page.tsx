import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import type { Metadata } from 'next';
import { FiMail, FiMessageCircle, FiMapPin } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Liên Hệ - dlBiz',
  description: 'Liên hệ với dlBiz để được hỗ trợ.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="page-header" style={{ backgroundImage: "url('/images/hero-contact.png')" }} />

      <div className="container">
        <section className="contact-section">
          <div className="contact-intro">
            <h2>Liên hệ với chúng tôi</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, đừng ngần ngại liên hệ với chúng tôi.
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
            </p>
          </div>

          <div className="contact-cards">
            <a href="mailto:lienhe@dlBiz.vn" className="contact-card">
              <div className="contact-card-icon" style={{ background: 'linear-gradient(135deg, #4a9ff5, #2d7dd2)' }}>
                <FiMail size={28} />
              </div>
              <span className="contact-card-label">EMAIL</span>
              <h3 className="contact-card-value">lienhe@dlBiz.vn</h3>
              <p className="contact-card-note">Phản hồi trong 24h</p>
            </a>

            <a href="https://facebook.com/dlBiz.vn" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-icon" style={{ background: 'linear-gradient(135deg, #f5587b, #e84393)' }}>
                <FiMessageCircle size={28} />
              </div>
              <span className="contact-card-label">FACEBOOK</span>
              <h3 className="contact-card-value">Nhắn tin Fanpage</h3>
              <p className="contact-card-note">Phản hồi nhanh nhất</p>
            </a>

            <a href="https://maps.google.com/?q=27b+Phan+Ki%E1%BB%87m,+Ea+Tam,+Bu%C3%B4n+Ma+Thu%E1%BB%99t" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-icon" style={{ background: 'linear-gradient(135deg, #2ecc71, #27ae60)' }}>
                <FiMapPin size={28} />
              </div>
              <span className="contact-card-label">ĐỊA CHỈ</span>
              <h3 className="contact-card-value">27b Phan Kiệm, Ea Tam</h3>
              <p className="contact-card-note">Buôn Ma Thuột, Đắk Lắk</p>
            </a>
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
