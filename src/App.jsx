import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  CircleCheck,
  Facebook,
  FileText,
  Gauge,
  Images,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ruler,
  Scissors,
  ShieldCheck,
  Truck,
  X
} from "lucide-react";

const navItems = [
  { label: "Trang chủ", href: "#top" },
  { label: "Giới thiệu", href: "#gioi-thieu" },
  { label: "Sản phẩm", href: "#san-pham" },
  { label: "Bảng tính thép", href: "#bang-tinh-thep" },
  { label: "Tin tức", href: "#tin-tuc" },
  { label: "Liên hệ", href: "#lien-he" }
];

const strengths = [
  {
    icon: Scissors,
    title: "Cắt thép theo kích thước",
    text: "Nhận cắt theo quy cách thực tế của công trình, giảm hao hụt và giúp đội thi công triển khai nhanh hơn."
  },
  {
    icon: Truck,
    title: "Gia công và giao hàng theo tiến độ",
    text: "Hỗ trợ gia công, bó thép, chuẩn bị từng đợt giao để phù hợp lịch đổ móng, lên cột, lên sàn."
  },
  {
    icon: ShieldCheck,
    title: "Nguồn hàng thương hiệu lớn",
    text: "Cung cấp thép xây dựng Hòa Phát, Kyoei, Việt Đức với quy cách rõ ràng, dễ kiểm tra và dễ đối chiếu."
  }
];

const productGroups = [
  {
    name: "Thép cuộn xây dựng",
    detail: "Thép cuộn phi 6, phi 8 dùng cho đai, thép sàn, nhà dân dụng và hạng mục gia công phổ biến."
  },
  {
    name: "Thép cây Hòa Phát",
    detail: "Các quy cách phi 10, 12, 14, 16, 18, 20, 22, 25, 28, 32 phục vụ nhà ở, nhà xưởng và công trình dân dụng."
  },
  {
    name: "Thép cây Kyoei, Việt Đức",
    detail: "Bổ sung lựa chọn theo thương hiệu, yêu cầu hồ sơ vật liệu và thói quen sử dụng của từng đội thầu."
  },
  {
    name: "Dịch vụ cắt và gia công",
    detail: "Cắt thép theo kích thước, bó thép, chuẩn bị danh mục giao theo từng đợt thi công."
  }
];

const process = [
  "Tiếp nhận yêu cầu, bản vẽ hoặc danh sách quy cách thép từ khách hàng.",
  "Tư vấn chủng loại, thương hiệu, chiều dài cắt và lịch giao phù hợp thực tế công trình.",
  "Xác nhận đơn hàng, gia công theo kích thước và giao hàng theo từng đợt cần sử dụng.",
  "Hỗ trợ cập nhật báo giá, khối lượng và thông tin sản phẩm để khách dễ so sánh trước khi chốt."
];

const commonDiameters = [6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32];

const seoPosts = [
  {
    title: "Báo giá thép xây dựng Bắc Ninh hôm nay",
    excerpt:
      "Cập nhật cách hỏi báo giá nhanh, cách so sánh giữa thép Hòa Phát, Kyoei, Việt Đức và những yếu tố ảnh hưởng đến giá thực tế.",
    category: "Báo giá"
  },
  {
    title: "Cách tính trọng lượng 1 cây thép phi 10, 12, 14, 16",
    excerpt:
      "Hướng dẫn công thức tính khối lượng thép theo đường kính và chiều dài để dự trù vật tư chính xác hơn cho công trình.",
    category: "Kiến thức thép"
  },
  {
    title: "Kinh nghiệm đặt thép cắt theo kích thước để giảm hao hụt",
    excerpt:
      "Tổng hợp các lưu ý về chiều dài cắt, phân đợt giao và cách đọc bản kê giúp đội thầu tiết kiệm chi phí vật tư.",
    category: "Kinh nghiệm thi công"
  }
];

const faqs = [
  {
    q: "1 cây thép dài bao nhiêu mét?",
    a: "Chiều dài tham khảo phổ biến là 11,7 mét với thép cây xây dựng. Một số đơn hàng cắt theo kích thước sẽ khác theo yêu cầu."
  },
  {
    q: "Có nhận cắt thép theo kích thước không?",
    a: "Có. Vạn Lộc nhận cắt theo kích thước, hỗ trợ bó thép và giao theo từng đợt để phù hợp tiến độ công trình."
  },
  {
    q: "Có cung cấp thép Hòa Phát, Kyoei, Việt Đức không?",
    a: "Có. Đây là nhóm thương hiệu chủ lực được sử dụng nhiều trong công trình dân dụng và nhà xưởng."
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "Vạn Lộc Steel",
      description:
        "Cung cấp thép xây dựng Bắc Ninh, cắt thép theo kích thước, gia công và báo giá thép Hòa Phát, Kyoei, Việt Đức.",
      areaServed: "Bắc Ninh",
      telephone: ["0974996919", "0888939569"],
      sameAs: ["https://www.facebook.com/profile.php?id=61579531209105"],
      url: "https://thepvanloc.bacninh.vn"
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a
        }
      }))
    }
  ]
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

function formatWeight(value) {
  return new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
}

function calcWeightPerMeter(diameter) {
  return (diameter * diameter) / 162;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [diameter, setDiameter] = useState(16);
  const [length, setLength] = useState(11.7);

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

  useEffect(() => {
    document.title = "Vạn Lộc Steel | Thép xây dựng Bắc Ninh, cắt theo kích thước";
  }, []);

  const weightPerMeter = useMemo(() => calcWeightPerMeter(diameter), [diameter]);
  const weightPerBar = useMemo(() => weightPerMeter * length, [weightPerMeter, length]);

  return (
    <div className="site-shell" id="top">
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <header className={`site-header ${scrolled ? "site-header--solid" : ""}`}>
        <div className="topbar">
          <span>Cung cấp thép xây dựng, cắt theo kích thước và gia công tại Bắc Ninh</span>
          <div className="topbar-links">
            <a href="tel:0974996919">
              <Phone size={14} />
              0974 996 919
            </a>
            <a href="tel:0888939569">
              <Phone size={14} />
              0888 939 569
            </a>
          </div>
        </div>

        <div className="navbar">
          <a className="brand" href="#top">
            <img src="/assets/vl-logo.svg" alt="Logo Vạn Lộc Steel" />
            <div>
              <strong>Vạn Lộc Steel</strong>
              <span>Thép xây dựng, gia công và vật liệu xây dựng</span>
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
            Báo giá ngay
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
              Báo giá ngay
            </a>
          </div>
        )}
      </header>

      <main>
        <section className="hero">
          <div className="hero-media">
            <img src="/assets/hero-rebar.jpg" alt="Bãi thép xây dựng và thép cây giao công trình" />
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
                Thép xây dựng Bắc Ninh | Cắt theo kích thước | Giao hàng theo tiến độ
              </motion.span>
              <motion.h1 variants={reveal}>
                Vạn Lộc Steel
                <br />
                <span>Cung cấp thép Hòa Phát, Kyoei, Việt Đức và gia công theo yêu cầu.</span>
              </motion.h1>
              <motion.p variants={reveal}>
                Chuyên cung cấp thép xây dựng, thép cây, thép cuộn, dịch vụ cắt thép theo
                kích thước và gia công cho nhà dân, nhà xưởng và công trình cần giao hàng
                sát tiến độ. Ưu tiên báo giá nhanh, thông tin rõ và hỗ trợ khách dễ chốt vật tư.
              </motion.p>
              <motion.div className="hero-actions" variants={reveal}>
                <a className="quote-button" href="https://zalo.me/0974996919" target="_blank" rel="noreferrer">
                  Báo giá qua Zalo
                  <ArrowRight size={18} />
                </a>
                <a className="ghost-button" href="#bang-tinh-thep">
                  Xem bảng tính thép
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
                <span>Điểm mạnh công ty</span>
                <strong>
                  Cắt theo kích thước, gia công theo đơn, cung cấp thép xây dựng Hòa Phát,
                  Kyoei, Việt Đức và điều phối giao hàng theo từng đợt thi công.
                </strong>
              </div>
              <div className="hero-side-image">
                <img src="/assets/beam-rebar.jpg" alt="Gia công thép xây dựng theo quy cách" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="metrics-section">
          <div className="section-frame metrics-grid">
            <div className="metric-block">
              <strong>Cắt chuẩn</strong>
              <span>Theo kích thước thực tế của công trình</span>
            </div>
            <div className="metric-block">
              <strong>3 thương hiệu</strong>
              <span>Hòa Phát, Kyoei, Việt Đức</span>
            </div>
            <div className="metric-block">
              <strong>Phản hồi nhanh</strong>
              <span>Chốt báo giá và thông tin trong ngày</span>
            </div>
          </div>
        </section>

        <section className="section section-dark" id="gioi-thieu">
          <div className="section-frame">
            <div className="section-heading">
              <span className="eyebrow eyebrow--brand">Giới thiệu Vạn Lộc Steel</span>
              <h2>Nhà cung cấp thép xây dựng tại Bắc Ninh, làm việc theo nhu cầu thực tế của công trình.</h2>
              <p>
                Vạn Lộc tập trung vào các việc khách hàng cần ngay: nguồn thép rõ quy cách,
                hỗ trợ cắt thép theo kích thước, gia công theo danh sách và giao hàng đúng
                từng đợt sử dụng.
              </p>
            </div>

            <div className="capability-list">
              {strengths.map(({ icon: Icon, title, text }) => (
                <motion.article
                  key={title}
                  className="capability-item"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="icon-wrap">
                    <Icon size={22} />
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
              <span className="eyebrow eyebrow--soft">Sản phẩm và dịch vụ</span>
              <h2>Danh mục vật tư và dịch vụ khách thường cần hỏi báo giá trước khi chốt đơn.</h2>
              <p>
                Ngoài thép cây, thép cuộn và vật liệu xây dựng, Vạn Lộc còn hỗ trợ gia công,
                cắt theo kích thước và chuẩn bị vật tư theo danh sách thi công.
              </p>
            </div>

            <div className="product-grid">
              {productGroups.map((product) => (
                <motion.article
                  key={product.name}
                  className="product-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="product-tag">Vạn Lộc Steel</span>
                  <h3>{product.name}</h3>
                  <p>{product.detail}</p>
                  <div className="product-meta">
                    <span>Xem chi tiết và báo giá</span>
                    <ArrowRight size={16} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark section-split" id="bang-tinh-thep">
          <div className="section-frame split-grid">
            <div className="split-copy">
              <span className="eyebrow eyebrow--brand">Bảng tính trọng lượng thép</span>
              <h2>Công cụ tính nhanh trọng lượng 1 cây thép để khách tham khảo trước khi đặt hàng.</h2>
              <p>
                Công thức tham khảo: trọng lượng 1 mét thép ≈ D x D / 162. Dùng cho việc dự
                toán nhanh khối lượng thép cây theo đường kính và chiều dài thực tế.
              </p>

              <div className="calculator-panel">
                <div className="calculator-grid">
                  <label>
                    <span>Đường kính thép (mm)</span>
                    <select value={diameter} onChange={(event) => setDiameter(Number(event.target.value))}>
                      {commonDiameters.map((value) => (
                        <option key={value} value={value}>
                          Phi {value}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Chiều dài cây thép (m)</span>
                    <input
                      type="number"
                      min="1"
                      step="0.1"
                      value={length}
                      onChange={(event) => setLength(Number(event.target.value) || 0)}
                    />
                  </label>
                </div>

                <div className="result-grid">
                  <div className="result-card">
                    <Gauge size={18} />
                    <div>
                      <strong>{formatWeight(weightPerMeter)} kg/m</strong>
                      <span>Trọng lượng 1 mét thép phi {diameter}</span>
                    </div>
                  </div>
                  <div className="result-card">
                    <Calculator size={18} />
                    <div>
                      <strong>{formatWeight(weightPerBar)} kg/cây</strong>
                      <span>Trọng lượng 1 cây dài {length} m</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="seo-points">
                <div>
                  <Ruler size={18} />
                  <span>Khách có thể dùng bảng này để ước lượng số kg theo quy cách thép phổ biến.</span>
                </div>
                <div>
                  <FileText size={18} />
                  <span>Nội dung tính trọng lượng thép cũng là nhóm từ khóa SEO có nhu cầu tìm kiếm cao.</span>
                </div>
              </div>
            </div>

            <div className="project-panel">
              <div className="project-panel__head">
                <CircleCheck size={20} />
                <span>Bảng tham khảo trọng lượng 1 cây thép xây dựng phổ biến.</span>
              </div>

              <div className="table-wrap">
                <table className="steel-table">
                  <thead>
                    <tr>
                      <th>Quy cách</th>
                      <th>Kg/m</th>
                      <th>Kg/cây 11,7m</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commonDiameters.map((value) => {
                      const kgPerMeter = calcWeightPerMeter(value);
                      return (
                        <tr key={value}>
                          <td>Thép phi {value}</td>
                          <td>{formatWeight(kgPerMeter)}</td>
                          <td>{formatWeight(kgPerMeter * 11.7)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="project-panel__footer">
                <strong>Lưu ý</strong>
                <p>
                  Bảng tính dùng để tham khảo nhanh. Khối lượng thực tế có thể thay đổi theo
                  nhà sản xuất, tiêu chuẩn sản phẩm và chiều dài cắt theo yêu cầu.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-light" id="tin-tuc">
          <div className="section-frame">
            <div className="section-heading">
              <span className="eyebrow eyebrow--soft">Tin tức, bài viết, hình ảnh SEO</span>
              <h2>Cấu trúc nội dung để đẩy SEO cho website thép xây dựng theo nhu cầu tìm kiếm thực tế.</h2>
              <p>
                Tôi đã thêm khối tin tức và kiến thức nền để website có thêm nội dung phục vụ SEO:
                báo giá, kiến thức trọng lượng thép, kinh nghiệm đặt hàng và hình ảnh thực tế.
              </p>
            </div>

            <div className="news-grid">
              {seoPosts.map((post) => (
                <article key={post.title} className="news-card">
                  <span className="news-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </article>
              ))}
            </div>

            <div className="gallery-strip">
              <div className="gallery-copy">
                <Images size={20} />
                <div>
                  <strong>Ảnh công trình, ảnh bãi thép, ảnh gia công</strong>
                  <p>
                    Đây là nhóm nội dung nên bổ sung đều để tăng độ tin cậy và tạo thêm landing
                    SEO theo từng dự án, từng loại thép, từng khu vực giao hàng.
                  </p>
                </div>
              </div>
              <div className="gallery-images">
                <img src="/assets/hero-rebar.jpg" alt="Ảnh bãi thép xây dựng Vạn Lộc" />
                <img src="/assets/beam-rebar.jpg" alt="Ảnh gia công thép theo kích thước" />
              </div>
            </div>

            <div className="faq-grid">
              {faqs.map((item) => (
                <article key={item.q} className="faq-card">
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" id="quy-trinh">
          <div className="section-frame">
            <div className="section-heading">
              <span className="eyebrow eyebrow--brand">Quy trình làm việc</span>
              <h2>Từ báo giá, cắt thép theo kích thước đến giao hàng theo tiến độ công trình.</h2>
            </div>

            <ol className="process-list">
              {process.map((step) => (
                <li key={step}>
                  <span />
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section cta-section" id="lien-he">
          <div className="section-frame cta-shell">
            <div>
              <span className="eyebrow eyebrow--soft">Liên hệ báo giá</span>
              <h2>Báo giá sẽ liên kết trực tiếp tới Zalo và Facebook để khách nhắn ngay.</h2>
              <p>
                Tôi đã ưu tiên các điểm chuyển đổi dễ dùng nhất: gọi điện, Zalo và Facebook.
                Đây là cách phù hợp hơn cho nhóm khách mua thép và vật liệu xây dựng.
              </p>
            </div>

            <div className="contact-stack">
              <a href="https://zalo.me/0974996919" target="_blank" rel="noreferrer">
                <Phone size={18} />
                Zalo 0974 996 919
              </a>
              <a href="https://zalo.me/0888939569" target="_blank" rel="noreferrer">
                <Phone size={18} />
                Zalo 0888 939 569
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61579531209105"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook size={18} />
                Facebook Vạn Lộc Steel
              </a>
              <a href="mailto:thepvanloc.vn@gmail.com">
                <Mail size={18} />
                thepvanloc.vn@gmail.com
              </a>
              <div>
                <MapPin size={18} />
                Bắc Ninh - hỗ trợ giao hàng khu vực lân cận
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-frame footer-row">
          <p>© 2026 Vạn Lộc Steel. Cung cấp thép xây dựng, cắt theo kích thước và gia công tại Bắc Ninh.</p>
          <div className="footer-notes">
            <span>
              <Scissors size={14} />
              Cắt theo kích thước
            </span>
            <span>
              <Truck size={14} />
              Giao theo tiến độ
            </span>
            <span>
              <ShieldCheck size={14} />
              Hòa Phát, Kyoei, Việt Đức
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
