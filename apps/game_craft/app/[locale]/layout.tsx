import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/routing";
import { ThemeProvider } from "next-themes";
import AntDesignProvider from "@/components/providers/AntDesignProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "@/components/Providers";
import "../globals.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Await params in Next.js 15
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>
        <ThemeProvider themes={["light", "dark"]}>
          <AntdRegistry>
            <NextIntlClientProvider messages={messages}>
              <AuthProvider>
                <AntDesignProvider locale={locale} direction={direction}>
                  <Providers>{children}</Providers>
                </AntDesignProvider>
              </AuthProvider>
            </NextIntlClientProvider>
          </AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
