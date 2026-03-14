import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dlBiz.vn' },
    update: {},
    create: {
      email: 'admin@dlBiz.vn',
      name: 'Admin dlBiz',
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log('Created admin user:', admin.email);

  const categories = [
    { name: 'Lưu trú', slug: 'luu-tru', icon: '🏨', order: 1 },
    { name: 'Giải trí', slug: 'giai-tri', icon: '🎭', order: 2 },
    { name: 'Giáo dục & Học tập', slug: 'giao-duc-hoc-tap', icon: '📚', order: 3 },
    { name: 'Làm đẹp', slug: 'lam-dep', icon: '💄', order: 4 },
    { name: 'Phụ liệu làm đẹp', slug: 'phu-lieu-lam-dep', icon: '💅', order: 5 },
    { name: 'Mua sắm', slug: 'mua-sam', icon: '🛒', order: 6 },
    { name: 'Người nước ngoài tại BMT', slug: 'nguoi-nuoc-ngoai-tai-bmt', icon: '🌍', order: 7 },
    { name: 'Sản xuất', slug: 'san-xuat', icon: '🏭', order: 8 },
    { name: 'Tài chính & Ngân hàng', slug: 'tai-chinh-ngan-hang', icon: '🏦', order: 9 },
    { name: 'Tâm linh & Văn hóa', slug: 'tam-linh-van-hoa', icon: '⛩️', order: 10 },
    { name: 'Thể thao', slug: 'the-thao', icon: '⚽', order: 11 },
    { name: 'Thời trang', slug: 'thoi-trang', icon: '👗', order: 12 },
    { name: 'Thú cưng', slug: 'thu-cung', icon: '🐾', order: 13 },
    { name: 'Ẩm thực', slug: 'am-thuc', icon: '🍜', order: 14 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('Created', categories.length, 'categories');

  const amThuc = await prisma.category.findUnique({ where: { slug: 'am-thuc' } });
  const lamDep = await prisma.category.findUnique({ where: { slug: 'lam-dep' } });
  const muaSam = await prisma.category.findUnique({ where: { slug: 'mua-sam' } });

  if (amThuc && lamDep && muaSam) {
    const samplePosts = [
      {
        title: 'Top 3 cửa hàng bán thuốc uốn tóc uy tín tại Buôn Ma Thuột',
        slug: 'top-3-cua-hang-ban-thuoc-uon-toc-uy-tin-tai-buon-ma-thuot',
        excerpt: 'Tổng hợp những cửa hàng bán thuốc uốn tóc chất lượng, uy tín nhất tại BMT.',
        content: '<h2>Giới thiệu</h2><p>Buôn Ma Thuột không chỉ nổi tiếng với cà phê mà còn có nhiều cửa hàng cung cấp sản phẩm làm đẹp chất lượng.</p><h2>1. Cửa hàng ABC</h2><p>Địa chỉ: 123 Nguyễn Tất Thành, TP. Buôn Ma Thuột. Với hơn 10 năm kinh nghiệm.</p><h2>2. Cửa hàng XYZ</h2><p>Nổi tiếng với đa dạng sản phẩm từ nhiều thương hiệu quốc tế.</p><h2>3. Cửa hàng DEF</h2><p>Cam kết hàng chính hãng 100%, giá cả hợp lý.</p>',
        thumbnail: '/uploads/hair-products-store.png', published: true, featured: true, authorId: admin.id, categoryId: lamDep.id,
      },
      {
        title: 'Top 3 địa chỉ truyền nước tại nhà uy tín ở Buôn Ma Thuột',
        slug: 'top-3-dia-chi-truyen-nuoc-tai-nha-uy-tin-o-buon-ma-thuot',
        excerpt: 'Dịch vụ truyền nước tại nhà ngày càng được ưa chuộng tại BMT.',
        content: '<h2>Vì sao nên chọn dịch vụ truyền nước tại nhà?</h2><p>Tiện lợi, an toàn, được chăm sóc tận tình.</p><h2>1. Phòng khám ABC</h2><p>Dịch vụ 24/7.</p><h2>2. Dịch vụ XYZ</h2><p>Chuyên truyền nước, tiêm thuốc tại nhà.</p><h2>3. Phòng khám DEF</h2><p>Giá cả hợp lý.</p>',
        thumbnail: '/uploads/home-iv-drip-service.png', published: true, featured: true, authorId: admin.id, categoryId: lamDep.id,
      },
      {
        title: 'Có nên mua vàng tại tiệm vàng Kim Môn BMT Đắk Lắk không?',
        slug: 'co-nen-mua-vang-tai-tiem-vang-kim-mon-bmt-dak-lak',
        excerpt: 'Đánh giá chi tiết về tiệm vàng Kim Môn tại BMT.',
        content: '<h2>Tổng quan</h2><p>Tiệm vàng Kim Môn đã hoạt động hơn 20 năm tại Buôn Ma Thuột.</p><h2>Chất lượng</h2><p>Vàng được kiểm định đầy đủ.</p><h2>Kết luận</h2><p>Địa chỉ đáng tin cậy.</p>',
        thumbnail: '/uploads/gold-jewelry-shop.png', published: true, featured: false, authorId: admin.id, categoryId: muaSam.id,
      },
      {
        title: 'Top 4 địa chỉ trị thâm quầng mắt uy tín tại Buôn Ma Thuột',
        slug: 'top-4-dia-chi-tri-tham-quang-mat-uy-tin-tai-buon-ma-thuot',
        excerpt: 'Tìm kiếm địa chỉ trị thâm quầng mắt hiệu quả? Top 4 cơ sở uy tín.',
        content: '<h2>Thâm quầng mắt</h2><p>Ảnh hưởng đến thẩm mỹ.</p><h2>1. Spa ABC Beauty</h2><p>Công nghệ laser hiện đại.</p><h2>2. Thẩm mỹ viện XYZ</h2><p>Bác sĩ giàu kinh nghiệm.</p><h2>3. Clinic DEF</h2><p>Kết hợp nhiều phương pháp.</p><h2>4. Spa GHI</h2><p>Giá cả phải chăng.</p>',
        thumbnail: '/uploads/dark-circles-treatment.png', published: true, featured: false, authorId: admin.id, categoryId: lamDep.id,
      },
      {
        title: 'Top 5 quán cà phê đẹp nhất Buôn Ma Thuột',
        slug: 'top-5-quan-ca-phe-dep-nhat-buon-ma-thuot',
        excerpt: 'Khám phá những quán cà phê đẹp nhất tại thủ phủ cà phê BMT.',
        content: '<h2>Buôn Ma Thuột - Thủ phủ cà phê</h2><p>Nơi đây có những quán cà phê cực kỳ đẹp.</p><h2>1. Cà phê Ê Đê</h2><p>Không gian văn hóa Tây Nguyên.</p><h2>2. The Coffee House BMT</h2><p>Hiện đại, sang trọng.</p><h2>3. Cà phê Vườn Đá</h2><p>Sân vườn thoáng mát.</p><h2>4. Highland Coffee BMT</h2><p>Chất lượng ổn định.</p><h2>5. Cà phê Ban Mê</h2><p>Cà phê nguyên chất.</p>',
        thumbnail: '/uploads/coffee-shop-bmt.png', published: true, featured: true, authorId: admin.id, categoryId: amThuc.id,
      },
      {
        title: 'Top 3 nhà hàng Hàn Quốc tại Buôn Ma Thuột',
        slug: 'top-3-nha-hang-han-quoc-tai-buon-ma-thuot',
        excerpt: 'Nhà hàng Hàn Quốc ngon nhất tại BMT.',
        content: '<h2>Ẩm thực Hàn Quốc tại BMT</h2><p>Ngày càng nhiều nhà hàng Hàn Quốc mở tại BMT.</p><h2>1. Korean BBQ House</h2><p>Thịt nướng chuẩn vị Hàn.</p><h2>2. Seoul Kitchen BMT</h2><p>Đa dạng menu.</p><h2>3. Hanami Restaurant</h2><p>Kết hợp ẩm thực Hàn - Nhật.</p>',
        thumbnail: '/uploads/korean-restaurant.png', published: true, featured: false, authorId: admin.id, categoryId: amThuc.id,
      },
    ];

    for (const post of samplePosts) {
      await prisma.post.upsert({
        where: { slug: post.slug },
        update: {},
        create: post,
      });
    }
    console.log('Created', samplePosts.length, 'sample posts');
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
