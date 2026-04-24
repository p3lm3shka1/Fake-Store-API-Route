import { useState, useEffect, use } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  fetchProducts,
  fetchUserRating,
  fetchLocalProducts,
} from "../../utils/api";

import StarRating from "../../components/StarRatings/StarRatings";

import { FiLoader } from "react-icons/fi";
import { MdAddBox } from "react-icons/md";

import "../../App.scss";
import "./HomePage.scss";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const location = useLocation();

  // fetch products / ratings
  useEffect(() => {
    setTimeout(() => {
      Promise.all([fetchProducts(), fetchLocalProducts()])
        .then(async ([apiProducts, localProducts]) => {
          const allProducts = [...apiProducts, ...localProducts];

          const productsWithUserRatings = await Promise.all(
            allProducts.map(async (product) => {
              const userRating = await fetchUserRating(product.id);
              return {
                ...product,
                rating: {
                  ...product.rating,
                  rate: userRating !== null ? userRating : product.rating?.rate,
                },
              };
            }),
          );
          setProducts(productsWithUserRatings);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }, 500);
  }, []);

  //filter  from ProductPage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) {
      setCategory(cat);
    }
  }, [location.search]);

  // list
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );

  // filter
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

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
      {isLoading && (
        <p className="product-loading-p">
          <FiLoader className="product-loading-p__icon" size={100} /> Loading
          products...
        </p>
      )}
      {!isLoading && products.length > 0 && (
        <>
          <Link to="/add-product" className="product-add-link">
            <MdAddBox size={25} /> Add New Product
          </Link>
          <div className="product-filter">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="product-filter__select"
            >
              <option value="all">All</option>
              {categories.map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <section className="products">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} />

                <div className="product-card__content">
                  <p
                    className="product-category"
                    onClick={() => setCategory(product.category)}
                  >
                    {product.category}
                  </p>
                  <h2 className="product-title">{product.title}</h2>

                  <p className="product-rating">
                    <span
                      className="stars"
                      aria-label={`Rating: ${product.rating?.rate} out of 5`}
                    >
                      <StarRating value={product.rating?.rate} readOnly />
                    </span>
                    <span className="rating-text">
                      ({product.rating?.count} reviews)
                    </span>
                  </p>

                  <div className="product-details">
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="product-link"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </section>
  );
}

export default HomePage;
