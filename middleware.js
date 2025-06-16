import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl.pathname;

  // ✅ Kiểm tra các route cần bảo vệ
  const protectedRoutes = [
    '/products/new',
    /^\/products\/[^\/]+\/edit$/  // ← regex khớp /products/:id/edit
  ];

  const isProtected = protectedRoutes.some(route => {
    if (typeof route === 'string') return url.startsWith(route);
    if (route instanceof RegExp) return route.test(url);
    return false;
  });

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/products/:path*'], // ✅ để middleware áp dụng cho tất cả `/products/*`
};
