"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./styles/Home.css"; // CSS riêng cho trang này

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(products.length / limit);
  const startIndex = (page - 1) * limit;
  const currentProducts = products.slice(startIndex, startIndex + limit);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
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
              <img src={product.image} alt={product.name} className="product-image" />
            )}
            <div>
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
            </div>
          </li>
        ))}
      </ul>

      <nav className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="page-button">
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

        <button onClick={() => setPage(page + 1)} disabled={page >= totalPages} className="page-button">
          After 
        </button>
      </nav>
    </main>
  );
}
