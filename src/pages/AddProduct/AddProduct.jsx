import { Link } from "react-router-dom";
import { addProduct, fetchProduct } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, use } from "react";

import "./AddProduct.scss";

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    image: "",
    category: "",
    title: "",
    price: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const CATEGORIES = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    if (
      !form.image ||
      !form.category ||
      !form.title ||
      !form.price ||
      !form.description
    ) {
      setError("All fields are required.");
      setSaving(false);
      return;
    }

    try {
      const newProduct = {
        ...form,
        price: parseFloat(form.price),
        rating: { rate: 0, count: 0 },
      };
      await addProduct(newProduct);
      navigate("/");
      setTimeout(() => window.location.reload(), 50);
    } catch (err) {
      setError("Failed to add product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="add-product">
      <h1>Let's add a new products</h1>

      <form className="add-product__form" onSubmit={handleSubmit}>
        <label>
          Image URL:
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Enter URL"
          />
        </label>
        <label>
          Category:
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="" disabled>
              Select category
            </option>
            {CATEGORIES.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={form.price}
            step="0.01"
            onChange={handleChange}
            placeholder="Enter price"
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </label>
        {error && <p className="add-product__form__error">{error}</p>}
        <div className="add-product__form__btngroup">
          <button
            type="submit"
            disabled={saving}
            className="add-product__form__btngroup__btn"
          >
            {saving ? "Saving..." : "Add Product"}
          </button>
          <button className="add-product__form__btngroup__btn">
            <Link to="/">Back to Products</Link>
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
