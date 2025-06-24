"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import "../app/styles/Navbar.css";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { cartItems } = useCart();
  const router = useRouter();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        MyStore
      </Link>
      <div className="navbar-links">
        <Link href="/" className="nav-link">
          Home
        </Link>
        {isLoggedIn && (
          <>
            <Link href="/products/new" className="nav-link">
              Create Product
            </Link>
            <Link href="/orders/history" className="nav-link">
              Order History
            </Link>
          </>
        )}
        <Link href="/cart" className="nav-link">
          Cart ({totalQuantity})
        </Link>
        {!isLoggedIn ? (
          <Link href="/login" className="nav-link">
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="nav-link">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
