import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useProduct } from "@/features/products/hooks/useProduct";
import "@/features/auth/styles/Dashboard.scss";

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
    <main className="seller-dashboard">
      <section className="seller-dashboard__header">
        <div>
          <p>SELLER PANEL</p>
          <h1>My Listed Products</h1>
          <span>Manage your products and inventory.</span>
        </div>

        <button type="button" onClick={() => navigate("/product")}>
          + Add Product
        </button>
      </section>

      <section className="seller-dashboard__summary">
        <div>
          <span>Total Products</span>
          <strong>{products.length}</strong>
        </div>

        <div>
          <span>Available Products</span>
          <strong>{products.length}</strong>
        </div>
      </section>

      <section className="seller-dashboard__products">
        <div className="seller-dashboard__title-row">
          <h2>Listed Products</h2>
          <span>{products.length} products</span>
        </div>

        {products.length === 0 ? (
          <div className="seller-dashboard__empty">
            <h3>No products listed yet</h3>
            <p>Add your first product to show it here.</p>
            <button type="button" onClick={() => navigate("/product")}>
              Add Product
            </button>
          </div>
        ) : (
          <div className="seller-dashboard__grid">
            {products.map((product) => {
              const image = getImage(product);

              return (
                <article
                  className="seller-product-card"
                  key={product._id || product.id}
                >
                  <div className="seller-product-card__image">
                    {image ? (
                      <img
                        src={image}
                        alt={product.title || "Product"}
                      />
                    ) : (
                      <div>No image available</div>
                    )}
                  </div>

                  <div className="seller-product-card__content">
                    <h3>{product.title || "Untitled Product"}</h3>

                    <p>
                      {product.description || "No description available."}
                    </p>

                    <div className="seller-product-card__bottom">
                      <strong>
                        ₹{Number(getPrice(product)).toLocaleString("en-IN")}
                      </strong>

                      <span>Listed</span>
                    </div>

                    <div className="seller-product-card__actions">
                      <button type="button">Edit</button>
                      <button type="button">Delete</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;