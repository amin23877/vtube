import { NextResponse, type NextRequest } from "next/server";
import { sessionKey } from "./api";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(sessionKey);
  console.log(token);
  if (!token) return NextResponse.redirect(new URL("/signIn", request.url));
}

export const config = {
  matcher: ["/", "/channel/:path*", "/video/:path*", "/search/:path*"], // Apply middleware only to /dashboard routes
};
