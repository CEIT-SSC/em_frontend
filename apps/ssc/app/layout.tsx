import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import clsx from "clsx";
import Providers from "./components/Provicers/Providers";

const vazirmatn = localFont({
  src: "../public/Vazirmatn.ttf",
});

export const metadata: Metadata = {
  title: "CEIT SSC",
  description: "SSC of AUT CEIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <meta name="enamad" content="65758640" />
      <body className={clsx("antialiased", vazirmatn.className)} dir="rtl">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
