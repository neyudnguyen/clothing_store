"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import "../styles/CartPage.css";

export default function CartPage() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Chưa có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-image"
                  />
                )}

                <div className="cart-info">
                  <h3 className="cart-name">{item.name}</h3>
                  <p className="cart-price">
                    Giá:{" "}
                    {item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>

                  <div className="quantity-control">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p className="cart-total">
              <strong>Tổng cộng:</strong>{" "}
              {totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <Link href="/checkout" className="checkout-button">
              Thanh toán
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
