import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useProduct } from "@/features/products/hooks/useProduct";
import "@/features/products/styles/ProductDetail.scss";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById } = useProduct();
  const [activeImage, setActiveImage] = useState(0);

  const product = useSelector((state) => state.product?.singleProduct);

  useEffect(() => {
    handleGetProductById(productId);
    setActiveImage(0);
  }, [productId]);

  const getImages = (product) => {
    if (!product?.images?.length) return [];
    return product.images.map((img) =>
      typeof img === "string" ? img : img?.url || img?.secure_url || ""
    );
  };

  const getPrice = (product) => {
    return product?.price?.amount ?? product?.price ?? 0;
  };

  if (!product) {
    return <p className="product-detail__loading">Loading...</p>;
  }

  const images = getImages(product);

  return (
    <main className="product-detail">
      <button className="product-detail__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <section className="product-detail__content">
        <div className="product-detail__gallery">
          <div className="product-detail__main-image">
            {images.length > 0 ? (
              <img src={images[activeImage]} alt={product.title || "Product"} />
            ) : (
              <div className="product-detail__no-image">No image available</div>
            )}
          </div>

          {images.length > 1 && (
            <div className="product-detail__thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`product-detail__thumb ${
                    i === activeImage ? "product-detail__thumb--active" : ""
                  }`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt={`${product.title} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail__info">
          <span className="product-detail__badge">Listed</span>

          <h1>{product.title || "Untitled Product"}</h1>

          <p className="product-detail__desc">
            {product.description || "No description available."}
          </p>

          <div className="product-detail__price-row">
            <strong className="product-detail__price">
              ₹{Number(getPrice(product)).toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="product-detail__actions">
            <button
              type="button"
              className="product-detail__btn"
              onClick={() => navigate(`/product/edit/${productId}`)}
            >
              Edit Product
            </button>
            <button type="button" className="product-detail__btn product-detail__btn--danger">
              Delete Product
            </button>
          </div>

          <div className="product-detail__meta">
            <div className="product-detail__meta-item">
              <span>Product ID</span>
              <p>{product._id}</p>
            </div>
            <div className="product-detail__meta-item">
              <span>Status</span>
              <p>Listed</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;