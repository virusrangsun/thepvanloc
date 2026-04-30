import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { getAllPosts, getPostBySlug } from "./content";

const zaloPrimary = "https://zalo.me/0974996919";
const zaloSecondary = "https://zalo.me/0888939569";
const facebookUrl = "https://www.facebook.com/profile.php?id=61579531209105";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Dịch vụ", href: "/#dich-vu" },
  { label: "Bảng tính thép", href: "/#bang-tinh-thep" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/#lien-he" }
];

const spotlightCards = [
  { id: "cat-chuan", title: "Cắt chuẩn", subtitle: "Theo kích thước thực tế của công trình" },
  { id: "thuong-hieu", title: "3 thương hiệu", subtitle: "Hòa Phát, Kyoei, Việt Đức" },
  { id: "phan-hoi", title: "Phản hồi nhanh", subtitle: "Chốt báo giá và thông tin trong ngày" }
];

const topicCopy = {
  "cat-chuan": {
    eyebrow: "Bài viết về cắt thép",
    title: "Cắt thép theo kích thước, gia công và hình ảnh thực tế",
    description:
      "Tổng hợp bài viết về cắt sắt, hình ảnh gia công, kinh nghiệm đặt theo kích thước và cách giảm hao hụt vật tư cho công trình."
  },
  "thuong-hieu": {
    eyebrow: "Bài viết theo thương hiệu",
    title: "Thép Hòa Phát, Kyoei và Việt Đức",
    description:
      "Thông tin tham khảo theo từng thương hiệu để khách hàng dễ so sánh quy cách, nhu cầu sử dụng và lựa chọn trước khi chốt đơn."
  },
  "phan-hoi": {
    eyebrow: "Tin tức sắt thép",
    title: "Tin tức sắt thép, giá thép và nhu cầu thị trường",
    description:
      "Cập nhật bài viết mới về giá thép, cắt thép, gia công và nhu cầu vật tư để khách tiện theo dõi thị trường."
  }
};

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

function formatWeight(value) {
  return new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
}

function calcWeightPerMeter(diameter) {
  return (diameter * diameter) / 162;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

function Header() {
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
        <Link className="brand" to="/">
          <img src="/assets/vl-logo.svg" alt="Logo Vạn Lộc Steel" />
          <div>
            <strong>Vạn Lộc Steel</strong>
            <span>Thép xây dựng, gia công và vật liệu xây dựng</span>
          </div>
        </Link>

        <nav className="desktop-nav">
          {navItems.map((item) =>
            item.href.startsWith("/#") ? (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ) : (
              <NavLink key={item.href} to={item.href}>
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <a className="quote-button desktop-only" href={zaloPrimary} target="_blank" rel="noreferrer">
          Báo giá ngay
        </a>

        <button className="menu-button" type="button" aria-label="Mở menu" onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-panel">
          {navItems.map((item) =>
            item.href.startsWith("/#") ? (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} to={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            )
          )}
          <a className="quote-button" href={zaloPrimary} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            Báo giá ngay
          </a>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
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
  );
}

function HomePage() {
  const navigate = useNavigate();
  const allPosts = useMemo(() => getAllPosts(), []);
  const [diameter, setDiameter] = useState(16);
  const [length, setLength] = useState(11.7);

  const weightPerMeter = useMemo(() => calcWeightPerMeter(diameter), [diameter]);
  const weightPerBar = useMemo(() => weightPerMeter * length, [weightPerMeter, length]);
  const latestPosts = allPosts.slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="hero-media">
          <img src="/assets/hero-rebar.jpg" alt="Bãi thép xây dựng và thép cây giao công trình" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-grid">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="eyebrow">
              Thép xây dựng Bắc Ninh | Cắt theo kích thước | Giao hàng theo tiến độ
            </span>
            <h1>
              Vạn Lộc Steel
              <br />
              <span>Cung cấp thép Hòa Phát, Kyoei, Việt Đức và gia công theo yêu cầu.</span>
            </h1>
            <p>
              Chuyên cung cấp thép xây dựng, thép cây, thép cuộn, dịch vụ cắt thép theo kích
              thước và gia công cho nhà dân, nhà xưởng và công trình cần giao hàng sát tiến độ.
            </p>
            <div className="hero-actions">
              <a className="quote-button" href={zaloPrimary} target="_blank" rel="noreferrer">
                Báo giá qua Zalo
                <ArrowRight size={18} />
              </a>
              <Link className="ghost-button" to="/tin-tuc">
                Xem tin tức
              </Link>
            </div>
          </motion.div>

          <motion.div className="hero-side" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}>
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
            <button
              key={card.id}
              className="metric-block metric-button"
              type="button"
              onClick={() => navigate(`/tin-tuc?topic=${card.id}`)}
            >
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
              <article key={item.title} className="product-card">
                <span className="product-tag">Vạn Lộc Steel</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a className="product-link" href={zaloPrimary} target="_blank" rel="noreferrer">
                  Chi tiết báo giá
                  <ChevronRight size={16} />
                </a>
              </article>
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

      <section className="section section-dark" id="tin-tuc">
        <div className="section-frame">
          <div className="section-heading section-heading--compact">
            <span className="eyebrow eyebrow--brand">Tin tức và bài viết</span>
            <h2>Cập nhật bài viết mới về thép xây dựng, gia công và báo giá.</h2>
          </div>
          <div className="news-grid">
            {latestPosts.map((post) => (
              <article key={post.slug} className="news-card">
                <img className="news-card__image" src={post.cover} alt={post.title} />
                <div className="news-card__body">
                  <span className="news-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link className="product-link" to={`/tin-tuc/${post.slug}`}>
                    Xem bài viết
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="section-actions">
            <Link className="quote-button" to="/tin-tuc">
              Xem tất cả bài viết
            </Link>
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
  );
}

function NewsListPage() {
  const posts = useMemo(() => getAllPosts(), []);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topic = searchParams.get("topic");
  const filteredPosts = topic ? posts.filter((post) => post.topic === topic) : posts;
  const copy = topic ? topicCopy[topic] : {
    eyebrow: "Tin tức và bài viết",
    title: "Bài viết mới về thép xây dựng, báo giá và gia công",
    description: "Tổng hợp tin tức, kiến thức, thương hiệu thép và kinh nghiệm đặt hàng theo nhu cầu thực tế."
  };

  return (
    <main className="subpage-shell">
      <section className="section section-light">
        <div className="section-frame">
          <div className="section-heading">
            <span className="eyebrow eyebrow--soft">{copy.eyebrow}</span>
            <h1 className="subpage-title">{copy.title}</h1>
            <p>{copy.description}</p>
          </div>

          <div className="topic-switcher">
            <Link className={`topic-switcher__button ${!topic ? "is-active" : ""}`} to="/tin-tuc">
              Tất cả
            </Link>
            {spotlightCards.map((card) => (
              <Link
                key={card.id}
                className={`topic-switcher__button ${topic === card.id ? "is-active" : ""}`}
                to={`/tin-tuc?topic=${card.id}`}
              >
                {card.title}
              </Link>
            ))}
          </div>

          <div className="news-grid">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="news-card">
                <img className="news-card__image" src={post.cover} alt={post.title} />
                <div className="news-card__body">
                  <span className="news-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="news-meta">
                    <span>{formatDate(post.date)}</span>
                    <Link className="product-link" to={`/tin-tuc/${post.slug}`}>
                      Xem bài viết
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ArticleDetailPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const relatedPosts = useMemo(
    () => getAllPosts().filter((item) => item.slug !== slug && item.topic === post?.topic).slice(0, 3),
    [slug, post]
  );

  if (!post) {
    return (
      <main className="subpage-shell">
        <section className="section section-light">
          <div className="section-frame">
            <h1 className="subpage-title">Không tìm thấy bài viết</h1>
            <Link className="quote-button" to="/tin-tuc">
              Quay lại tin tức
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="subpage-shell">
      <article className="section section-light article-shell">
        <div className="section-frame article-frame">
          <div className="article-header">
            <span className="news-category">{post.category}</span>
            <h1 className="subpage-title">{post.title}</h1>
            <div className="article-meta">
              <span>{formatDate(post.date)}</span>
              <a href={zaloPrimary} target="_blank" rel="noreferrer">
                Liên hệ báo giá
              </a>
            </div>
          </div>
          <img className="article-cover" src={post.cover} alt={post.title} />
          <div className="article-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="section section-dark">
          <div className="section-frame">
            <div className="section-heading section-heading--compact">
              <span className="eyebrow eyebrow--brand">Bài viết liên quan</span>
              <h2>Xem thêm nội dung cùng chủ đề</h2>
            </div>
            <div className="news-grid">
              {relatedPosts.map((item) => (
                <article key={item.slug} className="news-card">
                  <img className="news-card__image" src={item.cover} alt={item.title} />
                  <div className="news-card__body">
                    <span className="news-category">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <Link className="product-link" to={`/tin-tuc/${item.slug}`}>
                      Xem bài viết
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function AppShell() {
  useEffect(() => {
    document.title = "Vạn Lộc Steel | Thép xây dựng Bắc Ninh, cắt theo kích thước";
  }, []);

  return (
    <div className="site-shell" id="top">
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tin-tuc" element={<NewsListPage />} />
        <Route path="/tin-tuc/:slug" element={<ArticleDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
