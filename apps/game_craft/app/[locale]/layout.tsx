import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/routing";
import { ThemeProvider } from "next-themes";
import AntDesignProvider from "@/components/providers/AntDesignProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "@/components/Providers";
import localFont from "next/font/local";
import "../globals.css";

// Font definitions
const estedad = localFont({
  src: [
    {
      path: "../../public/fonts/Estedad-v7.3/webfonts/statics/Estedad-ExtraLight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Estedad-v7.3/webfonts/statics/Estedad-Thin.woff2",
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

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Await params in Next.js 15
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${estedad.variable} ${vazirmatn.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialTheme() {
                  const persistedTheme = localStorage.getItem('theme');
                  const hasPersistedTheme = typeof persistedTheme === 'string';
                  
                  if (hasPersistedTheme) {
                    return persistedTheme;
                  }
                  
                  const mql = window.matchMedia('(prefers-color-scheme: dark)');
                  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
                  
                  if (hasMediaQueryPreference) {
                    return mql.matches ? 'dark' : 'light';
                  }
                  
                  return 'light';
                }
                
                const theme = getInitialTheme();
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider
          themes={["light", "dark"]}
          defaultTheme="light"
          enableSystem={true}
          attribute="data-theme"
        >
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
