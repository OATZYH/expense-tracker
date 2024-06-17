'use server';
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export default async function middleware(req) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const { pathname } = req.nextUrl;

    // If no token and trying to access protected routes, redirect to login
    if (!token && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If user is logged in, redirect from login/signup to dashboard
    if (token && (pathname === "/login" || pathname === "/signup")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } catch (error) {
    console.error("Error in middleware:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
