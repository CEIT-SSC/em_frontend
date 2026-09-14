"use client";

import { Layout } from "antd";
import { AppHeader } from "../../../components/layout/AppHeader";
import { AppFooter } from "../../../components/layout/AppFooter";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout className="gc-public gc-public-world min-h-screen text-[var(--gc-ivory)]"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <AppHeader />
      <Layout.Content
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "transparent",
          backgroundImage: "none",
        }}
      >
        {children}
      </Layout.Content>
      <AppFooter />
      {/*<FloatButton.BackTop style={{ insetInlineStart: 24 }} />*/}
    </Layout>
  );
}
