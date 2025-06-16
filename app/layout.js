import Navbar from '../components/Navbar';
import { AuthProvider } from '@/context/AuthContext'; // ✅

export const metadata = {
  title: 'My E-commerce',
  description: 'Clothing store built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider> {/* ✅ Bọc ở đây */}
          <Navbar />
          <main style={{ padding: '1rem' }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
