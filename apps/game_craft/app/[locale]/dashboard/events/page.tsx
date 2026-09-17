"use client";

import { Alert, Col, Empty, Flex, Row, Spin, theme, Typography } from "antd";
import { useTranslations } from "next-intl";
import { WorkshopCard } from "components/features/workshops/WorkshopCard";
import { PresentationType } from "@ssc/core";
import { usePurchases } from "lib/hooks/usePurchases";
import { CompetitionsList } from "components/features/competitions/CompetitonsList";
import { useResponsive } from "lib/hooks/useResponsive";

const { useToken } = theme;

export default function EventsPage() {
  const { token } = useToken();
  const t = useTranslations("app");
  const tc = useTranslations("common");
  const { presentations, loading, error, isAuthenticated } = usePurchases();
  const screen = useResponsive();

  // Filter presentations by type
  const workshops = presentations.filter(
    (p) => p.type === "workshop" || p.type === "course"
  );
  const talks = presentations.filter((p) => p.type === "talk");

  const renderSection = (items: typeof presentations, title: string) => {
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
          message={t("dashboard.events.loadError", { section: title })}
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
            description={t("dashboard.events.emptyDescription")}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Flex>
      );
    }

    return (
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        {items.map((item) => (
          <Col key={item.id} xs={24} sm={12} lg={8} xl={8}>
            <WorkshopCard
              presentation={item}
              isPurchased={true}
              workshopImage={
                item.type === PresentationType.WORKSHOP
                  ? "/images/2025/staffs/hero.gif"
                  : "/images/2025/staffs/hero.gif"
              }
            />
          </Col>
        ))}
      </Row>
    );
  };

  // If not authenticated, show message to login
  if (!isAuthenticated) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{
          height: "400px",
          width: "100%",
        }}
      >
        <Alert
          message={tc("accessDenied")}
          description={t("dashboard.events.unauthorized")}
          type="warning"
          showIcon
        />
      </Flex>
    );
  }

  return (
    <Flex
      className="gc-dashboard-events"
      vertical
      align="start"
      justify="center"
      style={{
        width: "100%",
        padding: screen.xs ? "2px" : token.padding,
      }}
      gap="large"
    >
      {/* Competition Section */}
      <Flex className="gc-dashboard-event-section"
        vertical
        align={screen.xs ? "center" : "start"}
        justify="center"
        style={{
          width: "100%",
        }}
        gap="large"
      >
        <Typography.Title
          level={3}
          style={{ fontWeight: 800, marginBottom: 0 }}
        >
          {t("dashboard.events.competitions")}
        </Typography.Title>
        <CompetitionsList dashboardMode={true} />
      </Flex>

      {/* Workshops Section */}
      <Flex className="gc-dashboard-event-section"
        vertical
        align={screen.xs ? "center" : "start"}
        justify="center"
        style={{
          width: "100%",
        }}
        gap="large"
      >
        <Typography.Title
          level={3}
          style={{ fontWeight: 800, marginBottom: 0 }}
        >
          {t("dashboard.events.workshops")}
        </Typography.Title>
        {renderSection(workshops, "کارگاه")}
      </Flex>

      {/* Talks Section */}
      <Flex className="gc-dashboard-event-section"
        vertical
        align={screen.xs ? "center" : "start"}
        justify="center"
        style={{
          width: "100%",
        }}
        gap="large"
      >
        <Typography.Title
          level={3}
          style={{ fontWeight: 800, marginBottom: 0 }}
        >
          {t("dashboard.events.talks")}
        </Typography.Title>
        {renderSection(talks, "ارائه")}
      </Flex>
    </Flex>
  );
}
