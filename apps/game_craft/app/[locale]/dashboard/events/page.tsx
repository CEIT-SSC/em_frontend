"use client";

import { Flex, theme, Typography, Spin, Empty, Alert, Row, Col, Card } from "antd";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import { useEffect } from "react";
import { fetchPurchasesThunk } from "lib/store/purchases/purchases.thunk";
import {
  workshopsSelector,
  talksSelector,
  purchasesLoadingSelector,
  purchasesErrorSelector,
} from "lib/store/purchases/purchases.selectors";
import { useTranslations } from "next-intl";
import { PresentationOverview } from "@ssc/core";

const { useToken } = theme;

function EventCard({ presentation }: { presentation: PresentationOverview }) {
  const { token } = useToken();
  const t = useTranslations();

  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card
      style={{
        width: "100%",
        borderRadius: token.borderRadiusLG,
        marginBottom: token.margin,
      }}
      hoverable
    >
      <Flex vertical gap="small">
        <Typography.Title level={5} style={{ margin: 0 }}>
          {presentation.title}
        </Typography.Title>

        <Typography.Paragraph
          style={{
            color: token.colorTextSecondary,
            margin: 0,
            fontSize: "14px"
          }}
          ellipsis={{ rows: 2 }}
        >
          {presentation.description}
        </Typography.Paragraph>

        <Flex justify="space-between" align="center">
          <Typography.Text style={{ fontSize: "12px", color: token.colorTextTertiary }}>
            {formatDateTime(presentation.start_time)}
          </Typography.Text>

          <Flex gap="small">
            {presentation.is_online ? (
              <Typography.Text style={{ color: token.colorSuccess, fontSize: "12px" }}>
                {t("workshop.online")}
              </Typography.Text>
            ) : (
              <Typography.Text style={{ color: token.colorPrimary, fontSize: "12px" }}>
                {t("workshop.inPerson")}
              </Typography.Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

export default function EventsPage() {
  const dispatch = useAppDispatch();
  const workshops = useAppSelector(workshopsSelector);
  const talks = useAppSelector(talksSelector);
  const loading = useAppSelector(purchasesLoadingSelector);
  const error = useAppSelector(purchasesErrorSelector);
  const { token } = useToken();
  const t = useTranslations();

  useEffect(() => {
    dispatch(fetchPurchasesThunk());
  }, [dispatch]);

  const renderSection = (items: PresentationOverview[], title: string) => {
    if (loading) {
      return (
        <Flex
          justify="center"
          align="center"
          style={{
            height: "200px",
            width: "100%",
          }}
        >
          <Spin size="large" />
        </Flex>
      );
    }

    if (error) {
      return (
        <Alert
          message={`خطا در بارگذاری ${title}`}
          description={error}
          type="error"
          showIcon
          style={{ margin: token.margin }}
        />
      );
    }

    if (!items || items.length === 0) {
      return (
        <Flex
          justify="center"
          align="center"
          style={{
            height: "200px",
            width: "100%",
          }}
        >
          <Empty
            description={`شما در هیچ ${title.toLowerCase()}ی ثبت‌نام نکرده‌اید`}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Flex>
      );
    }

    return (
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        {items.map((item) => (
          <Col key={item.id} xs={24} sm={12} lg={8} xl={6}>
            <EventCard presentation={item} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: "100%",
        padding: token.padding,
      }}
      gap="large"
    >
      {/* Workshops Section */}
      <Flex
        vertical
        align="start"
        justify="center"
        style={{
          width: "100%",
        }}
        gap="medium"
      >
        <Typography.Title level={4} style={{ fontWeight: 800, marginBottom: 0 }}>
          کارگاه ها
        </Typography.Title>
        {renderSection(workshops, "کارگاه")}
      </Flex>

      {/* Talks Section */}
      <Flex
        vertical
        align="start"
        justify="center"
        style={{
          width: "100%",
        }}
        gap="medium"
      >
        <Typography.Title level={4} style={{ fontWeight: 800, marginBottom: 0 }}>
          ارائه ها
        </Typography.Title>
        {renderSection(talks, "ارائه")}
      </Flex>
    </Flex>
  );
}
