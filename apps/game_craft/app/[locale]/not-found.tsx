"use client";

import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fa";

  return (
    <main className="gc-public gc-public-world gc-not-found" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1.5rem" }}>
      <section className="gc-surface gc-unmapped-panel" style={{ width: "min(100%, 680px)", padding: "clamp(2rem, 7vw, 5rem)", textAlign: "center" }}>
        <div className="gc-unmapped-sigil" aria-hidden="true" />
        <Typography.Title style={{ fontSize: "clamp(5rem, 20vw, 10rem)", lineHeight: 0.8, color: "var(--gc-blue)", margin: 0 }}>404</Typography.Title>
        <Typography.Title level={1} style={{ marginTop: "2rem" }}>{t("title")}</Typography.Title>
        <Typography.Paragraph style={{ fontSize: "1.1rem", color: "rgba(241, 236, 223, .72)", maxWidth: "42ch", margin: "0 auto 2rem" }}>{t("description")}</Typography.Paragraph>
        <Flex justify="center" gap="middle" wrap>
          <Button type="primary" size="large" icon={<HomeOutlined />} onClick={() => router.push(`/${locale}`)}>{t("goHome")}</Button>
          <Button size="large" icon={<ArrowLeftOutlined />} onClick={() => router.back()}>{t("goBack")}</Button>
        </Flex>
      </section>
    </main>
  );
}
