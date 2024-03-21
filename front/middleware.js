import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req, event) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/auth/signin") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/profile/")) {
    const authMiddleware = await withAuth({
      pages: {
        signIn: "/auth/signin", // Customize the sign-in page URL
      },
    });
    return authMiddleware(req, event);
  }

  // Allow unrestricted access to other pages
  return NextResponse.next();
}
