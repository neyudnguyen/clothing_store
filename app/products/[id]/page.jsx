"use client";

import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import { useCart } from "@/context/CartContext";
import "./ProductDetail.css";

export default function ProductDetail({ params }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <main className="detail-container">
      <h1 className="detail-title">{product.name}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="detail-image"
        />
      )}

      <p className="detail-description">{product.description}</p>

      <p className="detail-price">
        <strong>Price: </strong>
        {product.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>

      <div className="detail-actions">
        <a href={`/products/${params.id}/edit`} className="detail-edit-button">
          Edit
        </a>
        <DeleteButton id={params.id} />
        <button
          onClick={() => addToCart(product)}
          className="detail-cart-button"
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
