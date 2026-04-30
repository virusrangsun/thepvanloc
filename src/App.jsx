import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  ChevronRight,
  CircleCheck,
  Facebook,
  Gauge,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scissors,
  ShieldCheck,
  Truck,
  X
} from "lucide-react";

const zaloPrimary = "https://zalo.me/0974996919";
const zaloSecondary = "https://zalo.me/0888939569";
const facebookUrl = "https://www.facebook.com/profile.php?id=61579531209105";

const navItems = [
  { label: "Trang chủ", href: "#top" },
  { label: "Dịch vụ", href: "#dich-vu" },
  { label: "Bảng tính thép", href: "#bang-tinh-thep" },
  { label: "Tin tức", href: "#tin-tuc" },
  { label: "Liên hệ", href: "#lien-he" }
];

const spotlightCards = [
  {
    id: "cat-chuan",
    title: "Cắt chuẩn",
    subtitle: "Theo kích thước thực tế của công trình"
  },
  {
    id: "thuong-hieu",
    title: "3 thương hiệu",
    subtitle: "Hòa Phát, Kyoei, Việt Đức"
  },
  {
    id: "phan-hoi",
    title: "Phản hồi nhanh",
    subtitle: "Chốt báo giá và thông tin trong ngày"
  }
];

const serviceCards = [
  {
    title: "Thép cây và thép cuộn xây dựng",
    text: "Cung cấp thép phi 6 đến phi 32 cho nhà dân, nhà xưởng và công trình cần giao hàng theo tiến độ."
  },
  {
    title: "Cắt theo kích thước và gia công",
    text: "Nhận cắt thép, bó thép và chuẩn bị vật tư theo danh sách thi công để giảm hao hụt và tiết kiệm thời gian."
  },
  {
    title: "Báo giá nhanh theo thương hiệu",
    text: "Hỗ trợ báo giá thép Hòa Phát, Kyoei, Việt Đức rõ quy cách để khách dễ so sánh và chốt đơn."
  }
];

const articleTopics = {
  "cat-chuan": {
    eyebrow: "Bài viết về cắt thép",
    title: "Cắt thép theo kích thước, gia công và hình ảnh thực tế",
    description:
      "Tổng hợp bài viết về cắt sắt, hình ảnh gia công, kinh nghiệm đặt theo kích thước và cách giảm hao hụt vật tư cho công trình.",
    articles: [
      {
        title: "Cắt thép theo kích thước là gì và phù hợp công trình nào?",
        excerpt:
          "Phân tích khi nào nên đặt thép cây nguyên cây, khi nào nên cắt theo kích thước để giảm hao hụt và tiết kiệm thời gian lắp dựng.",
        image: "/assets/beam-rebar.jpg"
      },
      {
        title: "Ảnh gia công, bó thép và chuẩn bị từng đợt giao",
        excerpt:
          "Tổng hợp hình ảnh thực tế để khách dễ hình dung cách thép được cắt, bó và phân theo từng hạng mục trước khi giao đến công trình.",
        image: "/assets/hero-rebar.jpg"
      },
      {
        title: "Kinh nghiệm gửi danh sách cắt để nhận báo giá nhanh",
        excerpt:
          "Những thông tin nên gửi trước khi đặt cắt thép: đường kính, chiều dài, số lượng, từng đợt giao và thời điểm cần nhận hàng.",
        image: "/assets/beam-rebar.jpg"
      }
    ]
  },
  "thuong-hieu": {
    eyebrow: "Bài viết theo thương hiệu",
    title: "Thép Hòa Phát, Kyoei và Việt Đức",
    description:
      "Thông tin tham khảo theo từng thương hiệu để khách hàng dễ so sánh quy cách, nhu cầu sử dụng và lựa chọn trước khi chốt đơn.",
    articles: [
      {
        title: "Thép Hòa Phát dùng trong công trình dân dụng và nhà xưởng",
        excerpt:
          "Giới thiệu thép Hòa Phát, nhóm quy cách hay dùng, ưu điểm khi làm nhà dân và cách hỏi báo giá nhanh theo phi thép.",
        image: "/assets/hero-rebar.jpg"
      },
      {
        title: "Thép Kyoei: lựa chọn quen thuộc của nhiều đội thầu",
        excerpt:
          "Bài viết riêng về thép Kyoei, cách nhận biết quy cách, đối chiếu trọng lượng và những hạng mục thường sử dụng.",
        image: "/assets/beam-rebar.jpg"
      },
      {
        title: "Thép Việt Đức và cách so sánh trước khi chốt đơn hàng",
        excerpt:
          "Tổng hợp câu hỏi khách thường quan tâm khi cần so sánh thép Việt Đức với các thương hiệu khác về quy cách và giá bán.",
        image: "/assets/hero-rebar.jpg"
      }
    ]
  },
  "phan-hoi": {
    eyebrow: "Tin tức sắt thép",
    title: "Tin tức sắt thép, giá thép và nhu cầu thị trường",
    description:
      "Cập nhật bài viết mới về giá thép, cắt thép, gia công và nhu cầu vật tư để khách tiện theo dõi thị trường.",
    articles: [
      {
        title: "Báo giá thép xây dựng Bắc Ninh hôm nay cần chú ý gì?",
        excerpt:
          "Tóm tắt các yếu tố ảnh hưởng đến báo giá thực tế: thương hiệu, quy cách, số lượng, lịch giao và yêu cầu cắt theo kích thước.",
        image: "/assets/beam-rebar.jpg"
      },
      {
        title: "Cách tính nhanh trọng lượng 1 cây thép trước khi đặt hàng",
        excerpt:
          "Hướng dẫn công thức tính trọng lượng thép phổ biến để khách có thể tự đối chiếu sơ bộ trước khi chốt số lượng.",
        image: "/assets/hero-rebar.jpg"
      },
      {
        title: "Tin tức mới về cắt thép, gia công và nhu cầu xây dựng",
        excerpt:
          "Gợi ý nhóm bài viết cập nhật thường xuyên để kéo thêm truy cập tự nhiên cho website theo nhu cầu tìm kiếm thực tế.",
        image: "/assets/beam-rebar.jpg"
      }
    ]
  }
};

const commonDiameters = [6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32];

const faqs = [
  {
    q: "1 cây thép dài bao nhiêu mét?",
    a: "Chiều dài tham khảo phổ biến là 11,7 mét. Với đơn hàng cắt theo kích thước, chiều dài sẽ thay đổi theo nhu cầu công trình."
  },
  {
    q: "Có nhận cắt theo kích thước không?",
    a: "Có. Vạn Lộc nhận cắt theo kích thước, bó thép và giao theo từng đợt sử dụng."
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
      sameAs: [facebookUrl],
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
  const [activeTopic, setActiveTopic] = useState("cat-chuan");
  const articleSectionRef = useRef(null);

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
  const activeContent = articleTopics[activeTopic];

  const handleTopicClick = (topicId) => {
    setActiveTopic(topicId);
    requestAnimationFrame(() => {
      articleSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

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

          <a className="quote-button desktop-only" href={zaloPrimary} target="_blank" rel="noreferrer">
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
            <a className="quote-button" href={zaloPrimary} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
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
            <motion.div className="hero-copy" initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }}>
              <motion.span className="eyebrow" variants={reveal}>
                Thép xây dựng Bắc Ninh | Cắt theo kích thước | Giao hàng theo tiến độ
              </motion.span>
              <motion.h1 variants={reveal}>
                Vạn Lộc Steel
                <br />
                <span>Cung cấp thép Hòa Phát, Kyoei, Việt Đức và gia công theo yêu cầu.</span>
              </motion.h1>
              <motion.p variants={reveal}>
                Chuyên cung cấp thép xây dựng, thép cây, thép cuộn, dịch vụ cắt thép theo kích
                thước và gia công cho nhà dân, nhà xưởng và công trình cần giao hàng sát tiến độ.
              </motion.p>
              <motion.div className="hero-actions" variants={reveal}>
                <a className="quote-button" href={zaloPrimary} target="_blank" rel="noreferrer">
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
                  Cắt theo kích thước, gia công theo đơn, cung cấp thép xây dựng Hòa Phát, Kyoei,
                  Việt Đức và điều phối giao hàng theo từng đợt thi công.
                </strong>
              </div>
              <div className="hero-side-image">
                <img src="/assets/beam-rebar.jpg" alt="Gia công thép xây dựng theo quy cách" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="metrics-section">
          <div className="section-frame metrics-grid metrics-grid--interactive">
            {spotlightCards.map((card) => (
              <button key={card.id} className="metric-block metric-button" type="button" onClick={() => handleTopicClick(card.id)}>
                <strong>{card.title}</strong>
                <span>{card.subtitle}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section section-dark" id="dich-vu">
          <div className="section-frame">
            <div className="section-heading section-heading--compact">
              <span className="eyebrow eyebrow--brand">Dịch vụ chính</span>
              <h2>Cung cấp thép, cắt theo kích thước và gia công theo nhu cầu công trình.</h2>
            </div>

            <div className="product-grid">
              {serviceCards.map((item) => (
                <motion.article
                  key={item.title}
                  className="product-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="product-tag">Vạn Lộc Steel</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a className="product-link" href={zaloPrimary} target="_blank" rel="noreferrer">
                    Chi tiết báo giá
                    <ChevronRight size={16} />
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-light section-split" id="bang-tinh-thep">
          <div className="section-frame split-grid split-grid--balanced">
            <div className="split-copy">
              <span className="eyebrow eyebrow--soft">Bảng tính trọng lượng thép</span>
              <h2>Tính nhanh trọng lượng thép để tham khảo trước khi đặt hàng.</h2>
              <p>
                Công thức tham khảo: trọng lượng 1 mét thép ≈ D x D / 162. Dùng để ước lượng
                nhanh khối lượng thép theo đường kính và chiều dài thực tế.
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
            </div>

            <div className="project-panel project-panel--table">
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
            </div>
          </div>
        </section>

        <section className="section section-dark" id="tin-tuc" ref={articleSectionRef}>
          <div className="section-frame">
            <div className="section-heading section-heading--compact">
              <span className="eyebrow eyebrow--brand">{activeContent.eyebrow}</span>
              <h2>{activeContent.title}</h2>
              <p>{activeContent.description}</p>
            </div>

            <div className="topic-switcher">
              {spotlightCards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  className={`topic-switcher__button ${activeTopic === card.id ? "is-active" : ""}`}
                  onClick={() => setActiveTopic(card.id)}
                >
                  {card.title}
                </button>
              ))}
            </div>

            <div className="news-grid">
              {activeContent.articles.map((post) => (
                <article key={post.title} className="news-card">
                  <img className="news-card__image" src={post.image} alt={post.title} />
                  <div className="news-card__body">
                    <span className="news-category">{activeContent.eyebrow}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <a className="product-link" href={zaloPrimary} target="_blank" rel="noreferrer">
                      Chi tiết báo giá
                      <ChevronRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        <section className="section cta-section" id="lien-he">
          <div className="section-frame cta-shell">
            <div>
              <span className="eyebrow eyebrow--soft">Liên hệ báo giá</span>
              <h2>Liên hệ nhanh qua Zalo, Facebook hoặc điện thoại để nhận báo giá.</h2>
              <p>
                Hỗ trợ trao đổi nhanh về quy cách thép, chiều dài cắt, số lượng, tiến độ giao hàng
                và báo giá theo từng thương hiệu.
              </p>
            </div>

            <div className="contact-stack">
              <a href={zaloPrimary} target="_blank" rel="noreferrer">
                <Phone size={18} />
                Zalo 0974 996 919
              </a>
              <a href={zaloSecondary} target="_blank" rel="noreferrer">
                <Phone size={18} />
                Zalo 0888 939 569
              </a>
              <a href={facebookUrl} target="_blank" rel="noreferrer">
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
