"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import "../styles/Checkout.css"; // nếu bạn có CSS riêng

export default function CheckoutPage() {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          totalAmount: total,
        }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      alert("Đặt hàng thành công!");
      cartItems.forEach((item) => removeFromCart(item.id));
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi đặt hàng!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Giỏ hàng trống</h2>
        <Link href="/" className="back-home-link">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Xác nhận đơn hàng</h2>
      <ul className="checkout-list">
        {cartItems.map((item) => (
          <li key={item.id} className="checkout-item">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>
              {(item.price * item.quantity).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </li>
        ))}
      </ul>

      <p className="checkout-total">
        <strong>Tổng cộng: </strong>
        {total.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>
      <div style={{ marginTop: "20px", padding: "12px 0" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input type="radio" name="payment-method" defaultChecked />
          Thanh toán khi nhận hàng (COD)
        </label>
      </div>
      <button
        onClick={handleCheckout}
        className="confirm-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang xử lý..." : "Xác nhận thanh toán"}
      </button>
    </div>
  );
}
