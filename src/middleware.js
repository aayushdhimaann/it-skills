import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  const publicPaths = ["/", "/contact", "/about", "/sign-in", "/sign-up"];
  const isApiRoute = url.pathname.startsWith("/api");
  if (token) {
    if (isApiRoute) {
      const authHeader = request.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const bearerToken = authHeader.split(" ")[1];
      // Verify if the token is valid (you may want to add logic here)
      if (!bearerToken || bearerToken !== token.accessToken) {
        return NextResponse.json({ error: "Invalid token" }, { status: 500 });
      }
    }
  }

  // Redirect to sign-in if no token and trying to access a non-public path
  if (!token && !publicPaths.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Redirect to home if authenticated user tries to access sign-in or sign-up
  if (
    token &&
    (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin route protection logic
  if (token) {
    const isAdmin =
      token._role === "6706bc9fff27bd499083aac2" ||
      token._role === "6706bd8dff27bd499083aac3";
    if (!isAdmin && url.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (token) {
    const isAdmin =
      token._role === "6706bc9fff27bd499083aac2" ||
      token._role === "6706bd8dff27bd499083aac3";
    if (isAdmin && url.pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
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
    "/api/course/add-new",
    "/api/course/category/add-new",
    "/api/course/update",
    "/api/student/view-all",
    "/api/course/category/update",
  ],
};
