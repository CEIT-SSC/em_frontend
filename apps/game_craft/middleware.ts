import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

// Protected routes that require authentication
const protectedRoutes = ["/dashboard", "/profile", "/admin"];

function isProtectedRoute(pathname: string) {
  const pathWithoutLocale = pathname.replace(/^\/(fa|en)/, "") || "/";
  return protectedRoutes.some((route) => pathWithoutLocale.startsWith(route));
}

export default withAuth(
  function middleware(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (!isProtectedRoute(pathname)) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|sound|assets|public|svg|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp|.*\\.ico|.*\\.css|.*\\.js|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.otf).*)",
  ],
};
