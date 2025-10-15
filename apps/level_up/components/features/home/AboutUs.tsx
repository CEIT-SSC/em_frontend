"use client";

import { Button, Col, Flex, Row, Typography } from "antd";
import Image from "next/image";
import { useRouter as useNextIntlRouter } from "../../../lib/navigation";
import { useTranslations } from "next-intl";
import { customColors } from "../../../config/colors";
import { useRouter } from "@bprogress/next";

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
    >
      <Row align="middle" justify="space-around" style={{ width: "100%" }}>
        <Col span={24} lg={12}>
          <Flex
            vertical
            align="center"
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
                level={1}
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
              style={{ backgroundColor: customColors.colorAction }}
              onClick={() => router.push("/staffs")}
            >
              {t("buttons.staffs")}
            </Button>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}
