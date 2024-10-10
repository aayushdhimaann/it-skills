import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";
export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  const publicPaths = ["/", "/contact", "/about", "/sign-in", "/sign-up"];

  // Redirect to sign-in if no token and trying to access a non-public path
  if (!token && !publicPaths.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Redirect to home if authenticated user tries to access sign-in or sign-up
  if (token && (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin route protection logic
  if (token) {
    const isAdmin = token._role === "6706bc9fff27bd499083aac2" || token._role === "6706bd8dff27bd499083aac3";
    if (!isAdmin && url.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect /login to /sign-in
  if (url.pathname === "/login") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/contact",
    "/about",
    "/sign-up",
    "/sign-in",
    "/login",
    "/admin/:path*", // Match all routes that start with /admin
  ],
};
