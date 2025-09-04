"use client";

import { Layout, theme } from "antd";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import Wave from "@/components/common/Wave";
import { usePathname } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

const { useToken } = theme;

export default function MainLayout({ children }: MainLayoutProps) {
  const { token } = useToken();
  const pathname = usePathname();

  // if pathname == /[locale]/ --> home page
  const isHomePage = pathname === "/" || /^\/[a-zA-Z-]+\/?$/.test(pathname);

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <AppHeader />
      <Layout.Content
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: isHomePage ? token.colorBgBase : token.colorPrimary,
          backgroundImage: isHomePage ? null : "url('/images/pattern.svg')",
        }}
      >
        {children}
        <Wave
          width="100%"
          height="auto"
          fill={token.colorPrimary}
          style={{ transform: "scaleY(-1) translateY(-2px)" }}
        />
      </Layout.Content>
      <AppFooter />
    </Layout>
  );
}
