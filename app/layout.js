import Navbar from "../components/Navbar";
import { AuthProvider } from "@/context/AuthContext"; // ✅
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "My E-commerce",
  description: "Clothing store built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {" "}
          <CartProvider>
            <Navbar />
            <main style={{ padding: "1rem" }}>{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
