"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import "./styles/Home.css";

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(products.length / limit);
  const startIndex = (page - 1) * limit;
  const currentProducts = products.slice(startIndex, startIndex + limit);

  // State lưu quantity theo id sản phẩm
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <main className="home-container">
      <h1 className="home-title">Products List</h1>

      <ul className="product-list">
        {currentProducts.map((product) => (
          <li key={product._id} className="product-item">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            )}
            <div className="product-info">
              <Link href={`/products/${product._id}`} className="product-name">
                {product.name}
              </Link>
              <p className="product-price">
                <strong>Price:</strong>{" "}
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>

              <div className="quantity-box">
                <label className="quantity-label">Số lượng:</label>
                <input
                  type="number"
                  min="1"
                  value={quantities[product._id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product._id, parseInt(e.target.value))
                  }
                  className="quantity-input"
                />
              </div>

              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>

      <nav className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="page-button"
        >
          Before
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`page-number ${p === page ? "active" : ""}`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="page-button"
        >
          After
        </button>
      </nav>
    </main>
  );
}
