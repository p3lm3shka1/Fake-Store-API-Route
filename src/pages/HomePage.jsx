import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.scss";
import "./HomePage.scss";

function HomePage() {
  const API = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const renderStars = (rate = 0) => {
    const full = Math.floor(rate);
    const empty = 5 - full;
    return `${"★".repeat(full)}${"☆".repeat(empty)}`;
  };

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="page">
      <div className="page-hero">
        <h3>Welcome to FakeStore</h3>
        <h1>Discover Amazing Products Today</h1>
        <p>
          Browse our curated collection of products across electronics, fashion,
          and more — all at great prices.
        </p>
        <div className="circle-big"></div>
        <div className="circle-small"></div>
      </div>
      {isLoading && <p>Loading products...</p>}
      {!isLoading && products.length > 0 && (
        <section className="products">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />

              <div className="product-card__content">
                <p className="product-category">{product.category}</p>
                <h2 className="product-title">{product.title}</h2>

                <p className="product-rating">
                  <span
                    className="stars"
                    aria-label={`Rating: ${product.rating?.rate} out of 5`}
                  >
                    {renderStars(product.rating?.rate)}
                  </span>
                  <span className="rating-text">
                    {product.rating?.rate} ({product.rating?.count} reviews)
                  </span>
                </p>

                <div className="product-details">
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <Link to={`/product/${product.id}`} className="product-link">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
}
export default HomePage;
