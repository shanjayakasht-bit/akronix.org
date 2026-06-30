import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(function middleware(req: NextRequest & { auth: any }) {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login?callbackUrl=/admin", req.url));
    }
    const role = session?.user?.role as string;
    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // Client portal protection
  if (pathname.startsWith("/portal")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login?callbackUrl=/portal", req.url));
    }
    const role = session?.user?.role as string;
    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // Redirect logged in users away from auth pages
  if ((pathname === "/login" || pathname === "/signup") && session) {
    const role = session?.user?.role as string;
    if (role === "ADMIN" || role === "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/portal", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
    "/login",
    "/signup",
  ],
};
