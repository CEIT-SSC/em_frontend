import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/routing";
import { NextRequest } from "next/server";

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

// Protected routes that require authentication
const protectedRoutes = ["/dashboard", "/profile", "/admin"];

// Check if the pathname matches any protected route
function isProtectedRoute(pathname: string) {
  // Remove locale prefix to check the actual route
  const pathWithoutLocale = pathname.replace(/^\/(fa|en)/, "") || "/";
  return protectedRoutes.some((route) => pathWithoutLocale.startsWith(route));
}

export default withAuth(
  function middleware(req) {
    // Apply internationalization middleware for all routes
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to public routes without authentication
        if (!isProtectedRoute(pathname)) {
          return true;
        }

        // Require authentication for protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  // Match internationalized pathnames and protected routes
  matcher: ["/", "/(fa|en)/:path*"],
};
