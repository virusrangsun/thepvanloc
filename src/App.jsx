import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Building2,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Truck,
  X
} from "lucide-react";

const navItems = [
  { label: "Trang chủ", href: "#top" },
  { label: "Năng lực", href: "#nang-luc" },
  { label: "Sản phẩm", href: "#san-pham" },
  { label: "Quy trình", href: "#quy-trinh" },
  { label: "Liên hệ", href: "#lien-he" }
];

const products = [
  {
    name: "Thép Phi 10",
    note: "Phù hợp nhà ở dân dụng, móng và dầm nhỏ.",
    stock: "Có sẵn trong ngày"
  },
  {
    name: "Thép Phi 12",
    note: "Dùng cho sàn, cột và hạng mục chịu lực phổ biến.",
    stock: "Giao nhanh theo xe"
  },
  {
    name: "Thép Phi 14",
    note: "Ưu tiên cho công trình xưởng, nhà phố quy mô lớn.",
    stock: "Có hỗ trợ cắt buộc"
  },
  {
    name: "Thép Phi 16",
    note: "Phục vụ cấu kiện chịu tải cao và tiến độ gấp.",
    stock: "Báo giá theo số lượng"
  }
];

const capabilities = [
  {
    icon: ShieldCheck,
    title: "Chất lượng kiểm soát chặt",
    text: "Nguồn thép có tiêu chuẩn rõ ràng, theo lô giao hàng và mục đích sử dụng thực tế."
  },
  {
    icon: Truck,
    title: "Điều phối xe chủ động",
    text: "Chốt lịch theo tiến độ công trình, hạn chế chờ vật tư ở giai đoạn đổ móng và lên sàn."
  },
  {
    icon: Award,
    title: "Kinh nghiệm thi công thực chiến",
    text: "Làm việc quen với nhà thầu, đội trưởng công trình và nhu cầu báo giá nhanh trong ngày."
  }
];

const process = [
  "Nhận bản kê hoặc khối lượng dự kiến từ công trình.",
  "Chốt chủng loại, quy cách, lịch giao và phương án xe.",
  "Báo giá theo lô hàng, xác nhận đơn và xuất giao đúng tiến độ."
];

const metrics = [
  { value: "10+", label: "Năm theo ngành thép xây dựng" },
  { value: "500+", label: "Lần giao hàng cho công trình" },
  { value: "24h", label: "Mốc phản hồi báo giá phổ biến" }
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 }
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="site-shell" id="top">
      <header className={`site-header ${scrolled ? "site-header--solid" : ""}`}>
        <div className="topbar">
          <span>Nhà cung cấp thép xây dựng tại Bắc Ninh</span>
          <div className="topbar-links">
            <a href="tel:0888939569">
              <Phone size={14} />
              0888 939 569
            </a>
            <a href="tel:0983122405">
              <Phone size={14} />
              0983 122 405
            </a>
          </div>
        </div>
        <div className="navbar">
          <a className="brand" href="#top">
            <img src="/assets/logo.png" alt="Vạn Lộc Steel" />
            <div>
              <strong>Vạn Lộc Steel</strong>
              <span>Thép xây dựng và VLXD</span>
            </div>
          </a>

          <nav className="desktop-nav">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="quote-button desktop-only" href="#lien-he">
            Yêu cầu báo giá
          </a>

          <button
            className="menu-button"
            type="button"
            aria-label="Mở menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-panel">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a className="quote-button" href="#lien-he" onClick={() => setMenuOpen(false)}>
              Yêu cầu báo giá
            </a>
          </div>
        )}
      </header>

      <main>
        <section className="hero">
          <div className="hero-media">
            <img src="/assets/hero-rebar.jpg" alt="Công trình gia công lắp đặt thép" />
            <div className="hero-overlay" />
          </div>

          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.12 }}
            >
              <motion.span className="eyebrow" variants={reveal}>
                Nguồn thép ổn định cho công trình dân dụng và nhà xưởng
              </motion.span>
              <motion.h1 variants={reveal}>
                Vạn Lộc Steel
                <br />
                <span>Giao thép đúng tiến độ, báo giá rõ ngay từ đầu.</span>
              </motion.h1>
              <motion.p variants={reveal}>
                Chuyên thép phi 10, 12, 14, 16 và vật liệu xây dựng cho đội thầu tại
                Bắc Ninh. Ưu tiên hàng sẵn, xe sẵn và phản hồi nhanh để công trình
                không bị ngắt nhịp.
              </motion.p>
              <motion.div className="hero-actions" variants={reveal}>
                <a className="quote-button" href="#san-pham">
                  Xem danh mục
                  <ArrowRight size={18} />
                </a>
                <a className="ghost-button" href="#lien-he">
                  Liên hệ trực tiếp
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-side"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="hero-band">
                <span>Nhịp giao hàng</span>
                <strong>Đi theo tiến độ đổ móng, lên cột, lên sàn</strong>
              </div>
              <div className="hero-side-image">
                <img src="/assets/beam-rebar.jpg" alt="Cấu kiện thép tại bãi gia công" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="metrics-section">
          <div className="section-frame metrics-grid">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-block">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-dark" id="nang-luc">
          <div className="section-frame">
            <div className="section-heading">
              <span className="eyebrow eyebrow--orange">Năng lực cung ứng</span>
              <h2>Bố cục gọn, thông tin thẳng vào quyết định mua hàng.</h2>
              <p>
                Phiên bản dựng lại này bỏ bớt cảm giác demo và chuyển về một giao diện
                vận hành hơn: rõ đầu việc, rõ nguồn hàng, rõ cách liên hệ.
              </p>
            </div>

            <div className="capability-list">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <motion.article
                  key={title}
                  className="capability-item"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-light" id="san-pham">
          <div className="section-frame">
            <div className="section-heading">
              <span className="eyebrow eyebrow--dark">Danh mục chủ lực</span>
              <h2>Nhóm sản phẩm hiển thị theo cách khách hàng hay hỏi thực tế.</h2>
              <p>
                Thay vì trải đều quá nhiều khối nội dung, phần này gom đúng những quy
                cách thép đang là nhu cầu phổ biến để báo giá nhanh hơn.
              </p>
            </div>

            <div className="product-grid">
              {products.map((product) => (
                <motion.article
                  key={product.name}
                  className="product-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="product-tag">Thép xây dựng</span>
                  <h3>{product.name}</h3>
                  <p>{product.note}</p>
                  <div className="product-meta">
                    <span>{product.stock}</span>
                    <ChevronRight size={16} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark section-split" id="quy-trinh">
          <div className="section-frame split-grid">
            <div className="split-copy">
              <span className="eyebrow eyebrow--orange">Quy trình làm việc</span>
              <h2>Đủ chi tiết để chốt hàng, không làm người xem phải đoán.</h2>
              <p>
                Luồng mua hàng được rút gọn theo thực tế công trình: gửi nhu cầu, chốt
                quy cách, xác nhận xe và giao hàng đúng lịch.
              </p>

              <ol className="process-list">
                {process.map((step) => (
                  <li key={step}>
                    <span />
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="project-panel">
              <div className="project-panel__head">
                <Building2 size={20} />
                <span>Phù hợp nhà dân, xưởng nhỏ, cải tạo và công trình gấp tiến độ</span>
              </div>
              <img src="/assets/beam-rebar.jpg" alt="Bãi thép và kết cấu gia công" />
              <div className="project-panel__footer">
                <div>
                  <strong>Điểm khác biệt của bản dựng mới</strong>
                  <p>
                    Hero có ảnh thật, phần sản phẩm ngắn gọn hơn và CTA rõ vị trí hơn bản
                    hiện tại.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section cta-section" id="lien-he">
          <div className="section-frame cta-shell">
            <div>
              <span className="eyebrow eyebrow--dark">Liên hệ nhanh</span>
              <h2>Sẵn sàng dựng tiếp thành repo GitHub và deploy Netlify.</h2>
              <p>
                Đây là codebase mới để thay thế việc không có source cũ. Sau bước này,
                bạn chỉ cần đưa nó lên GitHub rồi nối với site Netlify hiện tại.
              </p>
            </div>

            <div className="contact-stack">
              <a href="tel:0888939569">
                <Phone size={18} />
                0888 939 569
              </a>
              <a href="tel:0983122405">
                <Phone size={18} />
                0983 122 405
              </a>
              <a href="mailto:thepvanloc.vn@gmail.com">
                <Mail size={18} />
                thepvanloc.vn@gmail.com
              </a>
              <div>
                <MapPin size={18} />
                339 Lý Thường Kiệt, Từ Sơn, Bắc Ninh
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-frame footer-row">
          <p>© 2026 Vạn Lộc Steel. Giao diện dựng lại từ đầu để đẩy Git và Netlify.</p>
          <div className="footer-notes">
            <span>
              <Clock3 size={14} />
              Phản hồi báo giá trong ngày
            </span>
            <span>
              <Truck size={14} />
              Ưu tiên giao đúng tiến độ
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
