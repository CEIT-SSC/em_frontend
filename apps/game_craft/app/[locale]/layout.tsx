import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import "../globals.css";
import { SoundProvider } from "components/providers/SoundProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AuthProvider from "components/providers/AuthProvider";
import AntDesignProvider from "components/providers/AntDesignProvider";
import Providers from "components/Providers";
import { routing } from "lib/routing";
import { Provider } from "react-redux";
import { store } from "lib/store/store";
import StoreProvider from "components/providers/StoreProvider";

// Font definitions
const estedad = localFont({
  src: [
    {
      path: "../../public/fonts/Estedad-v7.3/webfonts/statics/Estedad-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Estedad-v7.3/webfonts/statics/Estedad-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Estedad-v7.3/webfonts/statics/Estedad-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Estedad-v7.3/webfonts/statics/Estedad-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Estedad-v7.3/webfonts/statics/Estedad-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Estedad-v7.3/webfonts/statics/Estedad-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Estedad-v7.3/webfonts/statics/Estedad-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Estedad-v7.3/webfonts/statics/Estedad-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Estedad-v7.3/webfonts/statics/Estedad-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-estedad",
  display: "swap",
});

const vazirmatn = localFont({
  src: [
    {
      path: "../../public/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-v33.003/fonts/webfonts/Vazirmatn-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = locale === "fa" ? "گیم‌کرفت" : "GameCraft";
  const description = locale === "fa" ? "گیم‌کرفت - ۱۴۰۴" : "GameCraft - 2025";

  return {
    title,
    description,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();
  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${estedad.variable} ${vazirmatn.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <StoreProvider>
          <ThemeProvider
            defaultTheme="light"
            enableSystem={true}
            attribute={["data-theme", "class"]}
          >
            <SoundProvider>
              <AntdRegistry>
                <NextIntlClientProvider messages={messages}>
                  <AuthProvider>
                    <AntDesignProvider direction={direction}>
                      <Providers>{children}</Providers>
                    </AntDesignProvider>
                  </AuthProvider>
                </NextIntlClientProvider>
              </AntdRegistry>
            </SoundProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
