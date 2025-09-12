"use client";

import { Flex, theme, Typography, Collapse, Space, Card } from "antd";
import { useTranslations } from "next-intl";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useResponsive } from "lib/hooks/useResponsive";

const { useToken } = theme;

export default function FAQPage() {
  const { token } = useToken();
  const screens = useResponsive();
  const t = useTranslations("app");
  const faqViewPadding = screens.lg ? "3rem 5rem" : "3rem 2rem";

  const items = [
    {
      key: "1",
      label: (
        <Space>
          <QuestionCircleOutlined style={{ color: token.colorPrimary }} />
          <Typography.Text strong style={{ fontSize: "16px" }}>
            {t("faq.howToParticipate.title")}
          </Typography.Text>
        </Space>
      ),
      children: (
        <Typography.Paragraph style={{ fontSize: "16px", lineHeight: 1.6 }}>
          {t("faq.howToParticipate.content")}
        </Typography.Paragraph>
      ),
    },
    {
      key: "2",
      label: (
        <Space>
          <QuestionCircleOutlined style={{ color: token.colorPrimary }} />
          <Typography.Text strong style={{ fontSize: "16px" }}>
            {t("faq.competitionRules.title")}
          </Typography.Text>
        </Space>
      ),
      children: (
        <Typography.Paragraph style={{ fontSize: "16px", lineHeight: 1.6 }}>
          {t("faq.competitionRules.content")}
        </Typography.Paragraph>
      ),
    },
    {
      key: "3",
      label: (
        <Space>
          <QuestionCircleOutlined style={{ color: token.colorPrimary }} />
          <Typography.Text strong style={{ fontSize: "16px" }}>
            {t("faq.judgingCriteria.title")}
          </Typography.Text>
        </Space>
      ),
      children: (
        <Typography.Paragraph style={{ fontSize: "16px", lineHeight: 1.6 }}>
          {t("faq.judgingCriteria.content")}
        </Typography.Paragraph>
      ),
    },
    {
      key: "4",
      label: (
        <Space>
          <QuestionCircleOutlined style={{ color: token.colorPrimary }} />
          <Typography.Text strong style={{ fontSize: "16px" }}>
            {t("faq.submissionDeadline.title")}
          </Typography.Text>
        </Space>
      ),
      children: (
        <Typography.Paragraph style={{ fontSize: "16px", lineHeight: 1.6 }}>
          {t("faq.submissionDeadline.content")}
        </Typography.Paragraph>
      ),
    },
  ];

  return (
    <Flex
      align="center"
      justify="center"
      vertical
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      <Flex
        align="center"
        justify="center"
        style={{
          width: "100%",
          backgroundSize: "fit",
          backgroundPosition: "center",
          padding: faqViewPadding,
          position: "relative",
        }}
      >
        <Card
          style={{
            backgroundColor: token.colorBgBase,
            width: "100%",
            maxWidth: "1000px",
            borderRadius: token.borderRadiusLG,
            boxShadow: token.boxShadow,
            border: "none",
          }}
        >
          <Flex vertical align="center" gap="large" style={{ width: "100%" }}>
            <Space direction="vertical" align="center" size={16}>
              <Typography.Title
                level={1}
                style={{
                  fontWeight: 900,
                  color: token.colorPrimary,
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {t("faq.title")}
              </Typography.Title>
              <Typography.Text
                type="secondary"
                style={{
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                {t("faq.competitionConditions")}
              </Typography.Text>
            </Space>

            <Collapse
              items={items}
              ghost
              size="large"
              style={{
                width: "100%",
                backgroundColor: "transparent",
              }}
              expandIconPosition="end"
            />
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
