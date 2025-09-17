"use client";

import { Flex, theme, Typography, Spin, Empty, Alert, Row, Col } from "antd";
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
import { WorkshopCard } from "components/features/workshops/WorkshopCard";
import { PresentationOverview } from "@ssc/core";

const { useToken } = theme;

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

  const renderSection = (items: PresentationOverview[], title: string, sectionKey: string) => {
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
            <WorkshopCard
              presentation={item}
              isPurchased={true}
              workshopImage={`/placeholder-${sectionKey}.jpg`}
            />
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
      {/* Page Title */}
      <Typography.Title level={2} style={{ fontWeight: 800, marginBottom: token.marginLG }}>
        {t("dashboard.events.title")}
      </Typography.Title>

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
        <Typography.Title level={3} style={{ fontWeight: 800, marginBottom: 0 }}>
          {t("dashboard.events.workshops")}
        </Typography.Title>
        {renderSection(workshops, "کارگاه", "workshop")}
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
        <Typography.Title level={3} style={{ fontWeight: 800, marginBottom: 0 }}>
          {t("dashboard.events.talks")}
        </Typography.Title>
        {renderSection(talks, "ارائه", "talk")}
      </Flex>
    </Flex>
  );
}
