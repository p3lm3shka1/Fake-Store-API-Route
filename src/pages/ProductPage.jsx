import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.scss";
import "./ProductPage.scss";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const renderStars = (rate = 0) => {
    const full = Math.floor(rate);
    const empty = 5 - full;
    return `${"★".repeat(full)}${"☆".repeat(empty)}`;
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <p className="product-page">Loading product...</p>;
  if (!product) return <p className="product-page">Product not found.</p>;

  return (
    <section className="product-page">
      <div className="product-navigation">
        <Link to="/" className="product-back">
          All Products
        </Link>
        <span>›</span>
        <span>{product.category}</span>
        <span>›</span>
        <span>{product.title}</span>
      </div>
      <div className="product-grid">
        <div className="product-image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h1 className="product-title">{product.title}</h1>

          <div className="product-meta">
            <p className="product-rating">
              {renderStars(product.rating?.rate)} ({product.rating?.count}{" "}
              reviews)
            </p>
            <p className="product-sku">
              SKU: #FKST-{String(product.id).padStart(4, "0")}
            </p>
          </div>
          <div className="product-price-box">
            <p>Price</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
          <div>
            <h3 className="product-desc-title">Description</h3>
            <p className="product-desc">{product.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
