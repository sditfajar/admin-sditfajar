import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens';
import { authConfig } from '@/lib/firebase/admin';

export const runtime = 'edge';

const protectedRoutes = [
  '/dashboard', 
  '/siswa', 
  '/guru', 
  '/pembayaran', 
  '/alumni', 
  '/konten', 
  '/absensi'
];

export async function middleware(request: NextRequest) {
  // getTokens validates the idToken and automatically handles verification securely in edge runtime!
  const tokens = await getTokens(request.cookies, authConfig);
  const session = tokens?.decodedToken;

  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/siswa/:path*', 
    '/guru/:path*', 
    '/pembayaran/:path*', 
    '/alumni/:path*', 
    '/konten/:path*', 
    '/absensi/:path*', 
    '/login'
  ],
}
