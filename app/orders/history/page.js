"use client";

import { useEffect, useState } from "react";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("/api/orders", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    }
    fetchOrders();
  }, []);

  return (
    <main style={styles.page}>
      <h2 style={styles.title}>🧾 Lịch sử đơn hàng</h2>

      {orders.length === 0 ? (
        <p style={styles.emptyText}>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <ul style={styles.orderList}>
          {orders.map((order) => (
            <li key={order._id} style={styles.orderCard}>
              <div style={styles.row}>
                <span style={styles.label}>Mã đơn:</span>
                <span style={styles.value}>{order._id}</span>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Trạng thái:</span>
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor:
                      order.status === "pending" ? "#f9c74f" : "#90be6d",
                  }}
                >
                  {order.status}
                </span>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Sản phẩm:</span>
                <ul style={styles.productList}>
                  {order.products.map((p, i) => (
                    <li key={i}>
                      {p.productId?.name || "Sản phẩm đã xoá"} x {p.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Tổng:</span>
                <span style={styles.total}>
                  {order.totalAmount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

const styles = {
  page: {
    padding: "32px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    fontSize: "28px",
    marginBottom: "24px",
    fontWeight: "bold",
  },
  emptyText: {
    color: "#888",
    fontSize: "16px",
  },
  orderList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  orderCard: {
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "16px 20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    backgroundColor: "#fff",
  },
  row: {
    marginBottom: "12px",
  },
  label: {
    fontWeight: "600",
    marginRight: "6px",
  },
  value: {
    fontFamily: "monospace",
  },
  badge: {
    padding: "2px 8px",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  productList: {
    listStyle: "circle",
    paddingLeft: "20px",
    marginTop: "4px",
  },
  total: {
    fontWeight: "bold",
    color: "#d6336c",
  },
};
