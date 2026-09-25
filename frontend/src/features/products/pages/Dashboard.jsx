import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useProduct } from "@/features/products/hooks/useProduct";
import "@/features/products/styles/Dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const { handleGetSellerProduct } = useProduct();

  const products = useSelector(
    (state) => state.product?.sellerProducts || []
  );

  useEffect(() => {
    handleGetSellerProduct();
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

  return (
    <div className="dash-page">
      {/* Top promo bar */}
      <div className="promo-bar">
        FREE SHIPPING ON ALL ORDERS OVER $50 &nbsp;•&nbsp; USE CODE: <span>FRESH25</span> FOR 15% OFF
      </div>

      {/* Navbar */}
      <nav className="dash-navbar">
        <div className="logo"><span>Snitch</span></div>
        <div className="nav-links">
          <a href="/men">MEN</a>
          <a href="/women">WOMEN</a>
          <a href="/sneakers">SNEAKERS</a>
          <a href="/accessories">ACCESSORIES</a>
        </div>
        <button className="add-btn" onClick={() => navigate("/product")}>
          + Add Product
        </button>
      </nav>

      {/* Hero header */}
      <header className="dash-hero">
        <span className="eyebrow">SELLER PANEL</span>
        <h1>My Listed Products</h1>
        <p>Manage your products and inventory, all in one place.</p>
      </header>

      <main className="dash-main">
        {/* Stats */}
        <section className="dash-stats">
          <div className="stat-card">
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>
          <div className="stat-card">
            <span>Available Products</span>
            <strong>{products.length}</strong>
          </div>
        </section>

        {/* Products */}
        <section className="dash-products">
          <div className="section-head">
            <h2>Listed Products</h2>
            <span>{products.length} products</span>
          </div>

          {products.length === 0 ? (
            <div className="dash-empty">
              <h3>No products listed yet</h3>
              <p>Add your first product to show it here.</p>
              <button onClick={() => navigate("/product")}>Add Product</button>
            </div>
          ) : (
            <div className="dash-grid">
              {products.map((product) => {
                const image = getImage(product);
                const productId = product._id || product.id;

                return (
                  <article
                    className="dash-card"
                    key={productId}
                    onClick={() => navigate(`/product/${productId}`)}
                  >
                    <div className="dash-card__image">
                      {image ? (
                        <img src={image} alt={product.title || "Product"} />
                      ) : (
                        <div className="no-image">No image</div>
                      )}

                      <span className="badge">Listed</span>

                      <div className="dash-card__overlay">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/edit/${productId}`);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="dash-card__content">
                      <h3>{product.title || "Untitled Product"}</h3>
                      <p>{product.description || "No description available."}</p>
                      <strong>
                        ₹{Number(getPrice(product)).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;