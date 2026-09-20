"use client";

import { Col, Flex, Row, theme, Typography } from "antd";
import { useTranslations } from "next-intl";
import { presenters } from "../../../config/presenters";
import { StaffCard } from "../staff/StaffCard";

const { useToken } = theme;

export function PresentersContainer() {
  const { token } = useToken();
  const t = useTranslations("app.presenters");

  return (
    <Flex
      className="gc-staff-hall"
      vertical
      align="center"
      justify="center"
      style={{
        width: "100%",
        backgroundColor: token.colorBgBase,
        borderRadius: token.borderRadius,
        padding: "3rem 1rem",
        gap: "1rem",
      }}
    >
      <Flex vertical align="center" justify="center">
        <Typography.Title
          level={1}
          style={{
            fontWeight: 900,
            color: "var(--gc-ivory)",
          }}
        >
          {t("title")}
        </Typography.Title>
      </Flex>
      <Row
        justify="center"
        gutter={[16, 16]}
        style={{ width: "100%", alignItems: "stretch" }}
      >
        {presenters.map((presenter) => (
          <Col
            key={presenter.name}
            span={24}
            sm={12}
            md={8}
            lg={6}
            xxl={4}
            style={{ display: "flex" }}
          >
            <StaffCard staff={presenter} showSocialLinks={false} />
          </Col>
        ))}
      </Row>
    </Flex>
  );
}
