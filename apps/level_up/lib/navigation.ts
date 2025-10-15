import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'fa'] as const;
export const defaultLocale = 'fa' as const;

export type Locale = (typeof locales)[number];

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
