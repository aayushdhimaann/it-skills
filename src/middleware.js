import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";
export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  const publicPaths = ["/", "/contact", "/about", "/sign-in"];
  if (!token && !publicPaths.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (token && (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/contact", "/about", "/home", "/dashboard", "/profile"],
};
