"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import "../app/styles/Navbar.css"
export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">MyStore</Link>
      <div className="navbar-links">
        <Link href="/" className="nav-link">Home</Link>
        {isLoggedIn && <Link href="/products/new" className="nav-link">Create Product</Link>}
        {!isLoggedIn ? (
          <Link href="/login" className="nav-link">Login</Link>
        ) : (
          <button onClick={handleLogout} className="nav-link">Logout</button>
        )}
      </div>
    </nav>
  );
}
