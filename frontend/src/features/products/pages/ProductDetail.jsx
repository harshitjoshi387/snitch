import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "@/features/products/hooks/useProduct";
import "@/features/products/styles/ProductDetail.scss";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById, handleGetAllProducts } = useProduct();

  const product = useSelector((state) => state.product?.singleProduct);
  const allProducts = useSelector((state) => state.product?.allProducts || []);

  useEffect(() => {
    handleGetProductById(productId);
    if (allProducts.length === 0) {
      handleGetAllProducts();
    }
  }, [productId]);

  const getImages = (product) => {
    if (!product?.images?.length) return [];
    return product.images.map((img) =>
      typeof img === "string" ? img : img?.url || img?.secure_url || ""
    );
  };

  const getImage = (p) => {
    const firstImage = p.images?.[0];
    if (typeof firstImage === "string") return firstImage;
    return firstImage?.url || firstImage?.secure_url || "";
  };

  const getPrice = (product) => {
    return product?.price?.amount ?? product?.price ?? 0;
  };

  if (!product) {
    return <p className="pd-loading">Loading...</p>;
  }

  const images = getImages(product);
  const related = allProducts
    .filter((p) => (p._id || p.id) !== productId)
    .slice(0, 4);

  return (
    <div className="pd-page">
      {/* Navbar */}
      <nav className="pd-navbar">
        <div className="navbar-left">
          <button className="menu-icon">☰</button>
          <div className="nav-links">
            <a className="active" href="/">MEN</a>
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

      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <a href="/">Home</a> / <span>{product.title}</span>
      </div>

      <div className="pd-content">
        {/* Left gallery */}
        <div className="pd-gallery">
          {images.length > 0 ? (
            images.map((img, i) => (
              <div className="pd-gallery__item" key={i}>
                <img src={img} alt={`${product.title} ${i + 1}`} />
              </div>
            ))
          ) : (
            <div className="pd-gallery__item pd-gallery__item--empty">
              No image available
            </div>
          )}
        </div>

        {/* Right info */}
        <div className="pd-info">
          <h1>{product.title || "Untitled Product"}</h1>
          <p className="pd-category">Fashion Product</p>

          <div className="pd-price">
            ₹{Number(getPrice(product)).toLocaleString("en-IN")}
            <span>Price incl. of all taxes</span>
          </div>

          <div className="pd-size-select">
            <div className="size-head">
              <strong>Please select a size.</strong>
              <a href="#">Size Chart</a>
            </div>
            <div className="size-options">
              {["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((s) => (
                <button key={s} type="button">{s}</button>
              ))}
            </div>
          </div>

          <div className="pd-qty">
            <label>Quantity</label>
            <select defaultValue="01">
              {["01", "02", "03", "04", "05"].map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          <div className="pd-actions">
            <button className="btn-cart">ADD TO CART</button>
            <button className="btn-wishlist">WISHLIST ♡</button>
          </div>

          <div className="pd-share">
            <span>Share</span>
            <div className="share-icons">
              <span>📱</span>
              <span>📘</span>
              <span>✖</span>
              <span>📷</span>
            </div>
          </div>

          <div className="pd-delivery">
            <strong>Delivery Details</strong>
            <div className="delivery-input">
              <input type="text" placeholder="Enter Pincode" />
              <button>CHECK</button>
            </div>
          </div>

          <div className="pd-return-note">
            <span>🔄</span>
            <p>
              This product is eligible for return or exchange under our
              30-day return or exchange policy. No questions asked.
            </p>
          </div>

          <div className="pd-details-accordion">
            <div className="acc-head">
              <strong>Product Details</strong>
              <span>▲</span>
            </div>
            <div className="acc-body">
              <p><strong>Description:</strong> {product.description || "No description available."}</p>
              <p><strong>Country of Origin:</strong> India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="pd-related">
          <h2>Others Also Bought</h2>
          <div className="pd-related__grid">
            {related.map((p) => {
              const pid = p._id || p.id;
              return (
                <article
                  className="related-card"
                  key={pid}
                  onClick={() => navigate(`/product/${pid}`)}
                >
                  <div className="related-card__image">
                    {getImage(p) ? (
                      <img src={getImage(p)} alt={p.title} />
                    ) : (
                      <div className="no-image">No image</div>
                    )}
                  </div>
                  <h3>{p.title}</h3>
                  <strong>
                    ₹{Number(getPrice(p)).toLocaleString("en-IN")}
                  </strong>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;