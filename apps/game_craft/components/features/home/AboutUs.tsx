"use client";

import { Button, Col, Flex, Row, Typography } from "antd";
import { useRouter as useNextIntlRouter } from "../../../lib/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@bprogress/next";
import Image from "next/image";

interface AboutUsProps {
  padding?: string;
  backgroundColor?: string;
}

export function AboutUs({
  padding = "3rem 2rem",
  backgroundColor,
}: AboutUsProps) {
  const router = useRouter({
    customRouter: useNextIntlRouter,
  });
  const t = useTranslations("app");

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: "100%",
        padding: padding,
        backgroundColor: backgroundColor,
      }}
      className="gc-home-about"
    >
      <Row align="middle" justify="space-around" style={{ width: "100%" }}>
        <Col span={24} lg={12}>
          <Flex
            vertical
            align="start"
            justify="center"
            style={{ width: "100%" }}
            gap="small"
          >
            <Flex
              vertical
              align="start"
              justify="center"
              style={{ width: "100%" }}
            >
              <Typography.Title
                level={2}
                style={{
                  fontWeight: 900,
                }}
              >
                {t("aboutUs.title")}
              </Typography.Title>
              <Typography.Paragraph>
                {t("aboutUs.description")}
              </Typography.Paragraph>
            </Flex>
            <Button
              type="primary"
              size="large"
              onClick={() => router.push("/staffs")}
            >
              {t("buttons.staffs")}
            </Button>
          </Flex>
        </Col>
        <Col span={24} lg={12}>
          <Flex align="center" justify="center" style={{ width: "100%" }}>
            <Image
              src="/assets/images/hollow-knight/our-team/knight-at-bench.png"
              alt="Knight sitting on bench"
              width={320}
              height={180}
              sizes="(max-width: 768px) calc(100vw - 2rem), min(1200px, 100vw)"
              className="h-auto w-auto max-w-full object-contain"
              priority
            />
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}
