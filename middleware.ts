import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminPath = process.env.ADMIN_PATH || "admin-49b979002b3437bc";

  if (pathname === `/${adminPath}` || pathname.startsWith(`/${adminPath}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(`/${adminPath}`, "/admin");
    return NextResponse.rewrite(url);
  }

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
