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
  { label: "Nang luc", href: "#nang-luc" },
  { label: "San pham", href: "#san-pham" },
  { label: "Quy trinh", href: "#quy-trinh" },
  { label: "Lien he", href: "#lien-he" }
];

const products = [
  {
    name: "Thep Phi 10",
    note: "Phu hop nha dan dung, mong, dam nho va cac hang muc can giao nhanh.",
    stock: "Hang san tai kho"
  },
  {
    name: "Thep Phi 12",
    note: "Phuc vu cot, san va he ket cau thong dung cho cong trinh nha pho, xuong nho.",
    stock: "Dieu pho xe trong ngay"
  },
  {
    name: "Thep Phi 14",
    note: "Uu tien cho nhung cong trinh can tien do va khoi luong giao theo dot.",
    stock: "Bao gia theo lo"
  },
  {
    name: "Thep Phi 16",
    note: "Danh cho cau kien chiu luc cao, cong trinh san xuat va nha xuong quy mo lon.",
    stock: "Chot lich giao truoc"
  }
];

const capabilities = [
  {
    icon: ShieldCheck,
    title: "Nguon hang ro xuat xu",
    text: "Thong tin quy cach, lo hang va muc dich su dung duoc chot ro ngay tu dau de giam sai lech khi dat hang."
  },
  {
    icon: Truck,
    title: "Dieu phoi giao hang theo tien do",
    text: "Lich xe duoc sap theo nhan cong, thoi diem do mong, len cot, len san va nhu cau xuat hang theo dot."
  },
  {
    icon: Award,
    title: "Lam viec theo kieu nha thau",
    text: "Tap trung vao toc do bao gia, on dinh nguon cung va cach tra loi ngan gon, ro viec, de xuong quyet dinh."
  }
];

const process = [
  "Nhan yeu cau, ban ke hoac khoi luong tam tinh tu cong trinh.",
  "Chot chuong loai, quy cach, so dot giao, lich xe va cach thanh toan.",
  "Xac nhan don, dieu pho giao hang va theo sat hang muc cho toi khi xuat xong."
];

const metrics = [
  { value: "10+", label: "Nam theo nganh thep xay dung" },
  { value: "500+", label: "Lan giao hang cho cong trinh" },
  { value: "24h", label: "Moc phan hoi bao gia pho bien" }
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
          <span>Nha cung cap thep xay dung tai Bac Ninh</span>
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
            <img src="/assets/logo.png" alt="Van Loc Steel" />
            <div>
              <strong>Van Loc Steel</strong>
              <span>Thep xay dung va VLXD</span>
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
            Yeu cau bao gia
          </a>

          <button
            className="menu-button"
            type="button"
            aria-label="Mo menu"
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
              Yeu cau bao gia
            </a>
          </div>
        )}
      </header>

      <main>
        <section className="hero">
          <div className="hero-media">
            <img src="/assets/hero-rebar.jpg" alt="Cong trinh gia cong lap dat thep" />
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
                Nguon thep on dinh cho nha dan, xuong nho va cong trinh can tien do
              </motion.span>
              <motion.h1 variants={reveal}>
                Van Loc Steel
                <br />
                <span>Chot hang ro, giao dung dot, phan hoi nhanh trong ngay.</span>
              </motion.h1>
              <motion.p variants={reveal}>
                Chuyen cung cap thep phi 10, 12, 14, 16 va vat lieu xay dung tai Bac
                Ninh. Tap trung vao giao hang on dinh, quy cach ro rang va cach lam viec
                de nha thau xuong quyet dinh nhanh.
              </motion.p>
              <motion.div className="hero-actions" variants={reveal}>
                <a className="quote-button" href="#san-pham">
                  Xem danh muc
                  <ArrowRight size={18} />
                </a>
                <a className="ghost-button" href="#lien-he">
                  Goi bao gia
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
                <span>Nhip giao hang</span>
                <strong>Di theo tien do do mong, len cot, len san va cach xuat hang theo dot.</strong>
              </div>
              <div className="hero-side-image">
                <img src="/assets/beam-rebar.jpg" alt="Cau kien thep tai bai gia cong" />
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
              <span className="eyebrow eyebrow--brand">Nang luc cung ung</span>
              <h2>Bo cuc nghieng ve doanh nghiep san xuat, khong lam qua tay cho mot site cong trinh.</h2>
              <p>
                Huong moi lay tinh than corporate hon: mat do thong tin ro, band mau
                xanh dam va do nhan, section sach, de doc, khong dung layout qua trinh dien.
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
              <span className="eyebrow eyebrow--soft">Danh muc chu luc</span>
              <h2>Hien thi nhom san pham theo cach nguoi mua thuc te hay hoi.</h2>
              <p>
                Thep duoc gom theo nhung quy cach de bao gia nhanh. Phan nay uu tien ro
                san pham, ro tinh trang giao va ro cach chot lo.
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
                  <span className="product-tag">Thep xay dung</span>
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
              <span className="eyebrow eyebrow--brand">Quy trinh lam viec</span>
              <h2>Du chi tiet de chot hang, nhung van ngan gon va de thao tac.</h2>
              <p>
                Luong mua hang duoc viet lai theo kieu dieu hanh: nhan nhu cau, chot quy
                cach, dieu pho giao va theo sat tung dot.
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
                <span>Phu hop nha dan, xuong nho, cai tao va cong trinh can giao sat tien do.</span>
              </div>
              <img src="/assets/beam-rebar.jpg" alt="Bai thep va ket cau gia cong" />
              <div className="project-panel__footer">
                <div>
                  <strong>Dinh huong giao dien moi</strong>
                  <p>
                    Mau sac va nhiem vu section da doi sang huong doanh nghiep cong
                    nghiep: nen sang, dau muc ro, xanh la chu dao va do dung de nhan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section cta-section" id="lien-he">
          <div className="section-frame cta-shell">
            <div>
              <span className="eyebrow eyebrow--soft">Lien he nhanh</span>
              <h2>Can bao gia, chot quy cach hay sap lich giao, lien he truc tiep.</h2>
              <p>
                Muc tieu cua giao dien nay la de nguoi xem vao du thong tin de goi ngay,
                khong phai doc qua nhieu noi dung mang tinh gioi thieu chung.
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
                339 Ly Thuong Kiet, Tu Son, Bac Ninh
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-frame footer-row">
          <p>© 2026 Van Loc Steel. Nha cung cap thep xay dung va vat lieu xay dung tai Bac Ninh.</p>
          <div className="footer-notes">
            <span>
              <Clock3 size={14} />
              Phan hoi bao gia trong ngay
            </span>
            <span>
              <Truck size={14} />
              Uu tien giao dung tien do
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
