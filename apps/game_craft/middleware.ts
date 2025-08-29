import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/navigation';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fa|en)/:path*']
};
