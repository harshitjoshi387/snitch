import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useProduct } from "@/features/products/hooks/useProduct";
import "@/features/products/styles/Home.scss";

const heroSlides = [
  {
    label: "EXPLORE",
    title: "SNEAKERS",
    bg: "linear-gradient(135deg, #3a3a3a, #1a1a1a)",
  },
  {
    label: "EXPLORE",
    title: "BOTTOMS",
    bg: "linear-gradient(135deg, #1e2a3a, #0d141d)",
  },
  {
    label: "EXPLORE",
    title: "WINTER WEAR",
    bg: "linear-gradient(135deg, #3a2a1e, #1d130d)",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { handleGetAllProducts } = useProduct();
  const [activeSlide, setActiveSlide] = useState(0);

  const products = useSelector((state) => state.product?.allProducts || []);

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const getImage = (product) => {
    const firstImage = product.images?.[0];
    if (typeof firstImage === "string") return firstImage;
    return (
      firstImage?.url ||
      firstImage?.secure_url ||
      product.image ||
      product.thumbnail ||
      ""
    );
  };

  const getPrice = (product) => {
    return product.price?.amount ?? product.price ?? 0;
  };

  const goPrev = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="home-navbar">
        <div className="navbar-left">
          <button className="menu-icon">☰</button>
          <div className="nav-links">
            <a className="active" href="#">MEN</a>
            <a href="#">WOMEN</a>
            <a href="#">SNEAKERS</a>
          </div>
        </div>

        <div className="logo"><span>Snitch</span></div>

        <div className="navbar-right">
          <div className="search-bar">
            <input type="text" placeholder="What are you looking for?" />
            <span className="search-icon">🔍</span>
          </div>
          <button className="icon-btn" onClick={() => navigate("/login")}>👤</button>
          <button className="icon-btn">♡</button>
          <button className="icon-btn">🛒</button>
        </div>
      </nav>

      {/* Hero Carousel */}
      <section
        className="hero"
        style={{ background: heroSlides[activeSlide].bg }}
      >
        <button className="hero-arrow hero-arrow--left" onClick={goPrev}>‹</button>

        <div className="hero-text">
          <span>{heroSlides[activeSlide].label}</span>
          <h1>{heroSlides[activeSlide].title}</h1>
        </div>

        <div className="hero-placeholder">
          <div className="placeholder-box"></div>
          <div className="placeholder-box"></div>
          <div className="placeholder-box"></div>
        </div>

        <button className="hero-arrow hero-arrow--right" onClick={goNext}>›</button>

        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === activeSlide ? "dot--active" : ""}`}
              onClick={() => setActiveSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* Perks strip */}
      <section className="perks-strip">
        <div className="perk">
          <span>💰</span>
          <p>10% Cashback<br />on all App orders</p>
        </div>
        <div className="perk">
          <span>📦</span>
          <p>30 days Easy Returns<br />& Exchanges</p>
        </div>
        <div className="perk">
          <span>🚚</span>
          <p>Free &<br />Fast Shipping</p>
        </div>
      </section>

      {/* New Arrivals grid */}
      <main className="home-main">
        <h2 className="section-title">NEW ARRIVALS</h2>

        {products.length === 0 ? (
          <div className="home-empty">
            <h3>No products available yet</h3>
            <p>Check back soon for new drops.</p>
          </div>
        ) : (
          <div className="home-grid">
            {products.map((product) => {
              const image = getImage(product);
              const productId = product._id || product.id;

              return (
                <article
                  className="product-card"
                  key={productId}
                  onClick={() => navigate(`/product/${productId}`)}
                >
                  <div className="product-card__image">
                    {image ? (
                      <img src={image} alt={product.title || "Product"} />
                    ) : (
                      <div className="no-image">No image</div>
                    )}
                  </div>

                  <div className="product-card__content">
                    <h3>{product.title || "Untitled Product"}</h3>
                    <p>{product.description || "Fashion item"}</p>
                    <strong>
                      ₹{Number(getPrice(product)).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;