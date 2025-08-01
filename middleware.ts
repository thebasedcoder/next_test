// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateToken } from '@/lib/auth';

// Define which routes are protected
const protectedRoutes = ['/dashboard', '/posts', '/settings'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const isAuthenticated = token ? await validateToken(token) : false;
  const path = request.nextUrl.pathname;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((prefix) => path.startsWith(prefix));

  // Redirect if not authenticated and trying to access a protected route
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', path);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect if authenticated and trying to access /login
  if (isAuthenticated && path.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Update the matcher to include all relevant routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/posts',
    '/posts/:path*',
    '/settings/:path*',
    '/login',
  ],
};