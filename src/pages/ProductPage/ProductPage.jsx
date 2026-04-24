import { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useCart } from "../../context/cartContext";

import { IoArrowBackOutline } from "react-icons/io5";

import notFoundImg from "../../assets/images/404.png";

import {
  fetchProduct,
  fetchUserRating,
  saveUserRating,
  fetchLocalProduct,
} from "../../utils/api";

import { FiLoader } from "react-icons/fi";

import StarRating from "../../components/StarRatings/StarRatings";

import "../../App.scss";
import "./ProductPage.scss";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myRating, setMyRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useCart();

  //
  useEffect(() => {
    if (product && product.rating) setMyRating(product.rating.rate);
  }, [product]);

  // helper to render stars
  const renderStars = (rate = 0) => {
    const full = Math.floor(rate);
    const empty = 5 - full;
    return `${"★".repeat(full)}${"☆".repeat(empty)}`;
  };

  //fetch products
  useEffect(() => {
    setIsLoading(true);
    setProduct(null);

    setTimeout(() => {
      fetchLocalProduct(id)
        .then((localData) => {
          if (localData && localData.id) {
            setProduct(localData);
            setIsLoading(false);
          } else {
            fetchProduct(id)
              .then((apiData) => {
                setProduct(apiData);
                setIsLoading(false);
              })
              .catch((error) => {
                console.error(error);
                setIsLoading(false);
              });
          }
        })
        .catch(() => {
          fetchProduct(id)
            .then((apiData) => {
              setProduct(apiData);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error(error);
              setIsLoading(false);
            });
        });
    }, 500);
  }, [id]);

  // saving users rating in local json
  useEffect(() => {
    if (product?.id) {
      fetchUserRating(product.id).then((rating) => {
        if (rating !== null) setMyRating(rating);
        else setMyRating(product.rating?.rate ?? 0);
      });
    }
  }, [product]);

  const handleStarChange = (newRating) => {
    setMyRating(newRating);
    saveUserRating(product.id, newRating);
  };

  if (isLoading)
    return (
      <div className="loading-page">
        <p className="product-loading-p">
          <FiLoader className="product-loading-p__icon" size={100} /> Loading
          products...
        </p>
      </div>
    );

  if (!product)
    return (
      <div className="not-found">
        <img src={notFoundImg} alt="404 Not Found" className="not-found__img" />
        <Link to="/" className="link">
          <IoArrowBackOutline />
          Go Back
        </Link>
      </div>
    );

  return (
    <section className="product-page">
      <div className="product-navigation">
        <Link to="/" className="product-back">
          All Products
        </Link>
        <span>›</span>
        <span className="product-category-span">
          <Link
            to={`/?category=${encodeURIComponent(product.category)}`}
            className="link"
          >
            {product.category}
          </Link>
        </span>
        <span>›</span>
        <span>{product.title}</span>
      </div>
      <div className="product-grid">
        <div className="product-image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            onClick={() => setIsOpen(true)}
          />
          {isOpen && (
            <div
              className="product-image-lightbox"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-overlay-image"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
        <div className="product-info">
          <p className="product-category">
            <Link
              to={`/?category=${encodeURIComponent(product.category)}`}
              className="link"
            >
              {product.category}
            </Link>
          </p>
          <h1 className="product-title">{product.title}</h1>

          <div className="product-meta">
            <p className="product-rating">
              <StarRating value={myRating} onChange={handleStarChange} />
              <span className="product-rating-count">
                ({product.rating?.count} reviews)
              </span>
            </p>
            <p className="product-sku">
              SKU: #FKST-{String(product.id).padStart(4, "0")}
            </p>
          </div>
          <div className="product-price-box">
            <p>Price</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
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
