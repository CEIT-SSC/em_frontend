"use client";

import {
  Card,
  Typography,
  Avatar,
  Button,
  Flex,
  theme,
  Badge,
  Skeleton,
} from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PresentationId, PresentationOverview } from "@ssc/core";
import useFetch from "lib/hooks/useFetch";
import { clientApi } from "lib/api/client/clientApi";
import { digitsToHindi, tomanFormat } from "@ssc/utils";
import PresentersAvatar from "../presentersAvatar/PresentersAvatar";
const { useToken } = theme;

interface WorkshopCardProps {
  onAddToCart?: () => void; // Made optional since we're not using it for now
  workshopImage?: string; // Add optional image prop
  id: PresentationId;
}

export function WorkshopCard({
  id,
  workshopImage,
  onAddToCart,
}: WorkshopCardProps) {
  const { token } = useToken();
  const t = useTranslations();

  const { loading, error, data } = useFetch(
    (id: PresentationId) => clientApi.presentations.getPresentationDetails(id),
    id,
    { immediate: true }
  );

  // Color palette based on theme
  const cardBg = token.colorBgElevated;
  const colorStripes = ["#4CAF50", "#2196F3", "#FFC107", "#F44336"];
  const textPrimary = token.colorText;
  const textSecondary = token.colorTextSecondary;
  const borderColor = token.colorBorder;

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

  // Loading state
  if (loading) {
    return (
      <Card
        style={{
          width: "100%",
          minWidth: "250px",
          maxWidth: "100%",
          borderRadius: token.borderRadiusLG,
          overflow: "hidden",
          border: "none",
          backgroundColor: cardBg,
          boxShadow: token.boxShadow,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        styles={{
          body: {
            padding: 0,
            flex: 1,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Header Image Skeleton */}
        <div
          style={{
            position: "relative",
            paddingTop: "56.25%", // 16:9 aspect ratio
            backgroundColor: token.colorBgContainer,
          }}
        >
          <Skeleton.Image
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
            active
          />
          {/* Colored Stripes Skeleton */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              zIndex: 1,
            }}
          >
            {colorStripes.map((color, index) => (
              <div
                key={index}
                style={{
                  height: "4px",
                  flex: 1,
                  backgroundColor: color,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <Flex
          vertical
          style={{
            padding: "16px",
            flex: 1,
            gap: "12px",
          }}
        >
          {/* Title Skeleton */}
          <Skeleton title={{ width: "80%" }} paragraph={false} active />

          {/* Description Skeleton */}
          <Skeleton
            title={false}
            paragraph={{ rows: 3, width: ["100%", "90%", "70%"] }}
            active
          />

          {/* Date and Time Skeleton */}
          <Flex align="center" gap="small">
            <Skeleton.Avatar size="small" active />
            <Skeleton title={{ width: 150 }} paragraph={false} active />
          </Flex>

          {/* Location Skeleton */}
          <Skeleton title={{ width: 120 }} paragraph={false} active />

          {/* Presenters Label Skeleton */}
          <Skeleton title={{ width: 80 }} paragraph={false} active />

          {/* Presenters Avatar Skeleton */}
          <Flex gap="small" align="center">
            <Flex style={{ position: "relative" }}>
              <Skeleton.Avatar size={32} active />
              <Skeleton.Avatar size={32} active style={{ marginLeft: -8 }} />
              <Skeleton.Avatar size={32} active style={{ marginLeft: -8 }} />
            </Flex>
            <Skeleton title={{ width: 100 }} paragraph={false} active />
          </Flex>

          {/* Price and Button Skeleton */}
          <Flex
            justify="space-between"
            align="center"
            style={{
              marginTop: "auto",
              paddingTop: "12px",
              borderTop: `1px solid ${borderColor}`,
            }}
          >
            <Skeleton title={{ width: 80 }} paragraph={false} active />
            <Skeleton.Button
              style={{
                width: 120,
                height: 36,
                borderRadius: "8px",
              }}
              active
            />
          </Flex>
        </Flex>
      </Card>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <Card
        style={{
          width: "100%",
          minWidth: "250px",
          maxWidth: "100%",
          borderRadius: token.borderRadiusLG,
          overflow: "hidden",
          border: "none",
          backgroundColor: cardBg,
          boxShadow: token.boxShadow,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        styles={{
          body: {
            padding: "16px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Flex
          vertical
          align="center"
          justify="center"
          gap="medium"
          style={{ height: "100%" }}
        >
          <Typography.Text type="secondary" style={{ fontSize: "16px" }}>
            {error ? t("workshop.error") : "Failed to load workshop"}
          </Typography.Text>
          <Button
            type="default"
            size="small"
            onClick={() => window.location.reload()}
          >
            {t("common.retry")}
          </Button>
        </Flex>
      </Card>
    );
  }

  const presentation = data.data.data;

  return (
    <Card
      style={{
        width: "100%",
        minWidth: "250px",
        maxWidth: "100%",
        borderRadius: token.borderRadiusLG,
        overflow: "hidden",
        border: "none",
        backgroundColor: cardBg,
        boxShadow: token.boxShadow,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      styles={{
        body: {
          padding: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header Image with Stripes */}
      <div
        style={{
          position: "relative",
          paddingTop: "56.25%", // 16:9 aspect ratio
        }}
      >
        {/* Workshop Image */}
        <Image
          src={workshopImage}
          alt={"workshop"}
          fill
          style={{
            objectFit: "cover",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Colored Stripes */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            zIndex: 1,
          }}
        >
          {colorStripes.map((color, index) => (
            <div
              key={index}
              style={{ height: "4px", flex: 1, backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <Flex
        vertical
        style={{
          padding: "16px",
          flex: 1,
          gap: "12px",
        }}
      >
        {/* Title and Badge */}
        <Flex vertical gap="small">
          <Typography.Title
            level={4}
            style={{
              margin: 0,
              fontSize: "18px",
              lineHeight: 1.4,
            }}
            ellipsis={{ rows: 2 }}
          >
            {presentation.title}
          </Typography.Title>
        </Flex>

        {/* Description */}
        <Typography.Paragraph
          style={{
            color: textSecondary,
            margin: 0,
            fontSize: "14px",
            lineHeight: 1.6,
          }}
          ellipsis={{ rows: 3 }}
        >
          {presentation.description}
        </Typography.Paragraph>

        {/* Date and Time */}
        <Flex align="center" gap="small">
          <ClockCircleOutlined style={{ color: token.colorPrimary }} />
          <Typography.Text style={{ color: textSecondary, fontSize: "14px" }}>
            {formatDateTime(presentation.start_time)}
          </Typography.Text>
        </Flex>

        {/* Location/Link */}
        {presentation.location && !presentation.is_online && (
          <Typography.Text style={{ color: textSecondary, fontSize: "14px" }}>
            📍 {presentation.location}
          </Typography.Text>
        )}
        {presentation.online_link && presentation.is_online && (
          <Typography.Text style={{ color: textSecondary, fontSize: "14px" }}>
            🔗 {t("workshop.onlineLink")}
          </Typography.Text>
        )}

        {/* Presenters Label */}
        <Typography.Text
          style={{
            color: textSecondary,
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          {t("workshop.presenters")}:
        </Typography.Text>

        {/* Instructor */}
        <PresentersAvatar presenters={presentation.presenters_details} />

        {/* Price and Add to Cart */}
        <Flex
          justify="space-between"
          align="center"
          style={{
            marginTop: "auto",
            paddingTop: "12px",
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <Typography.Title
            level={5}
            style={{
              margin: 0,
              fontSize: "16px",
            }}
          >
            {presentation.is_paid
              ? digitsToHindi(tomanFormat(presentation.price))
              : t("workshop.free")}{" "}
            {presentation.is_paid && t("common.currency")}
          </Typography.Title>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => {
              // TODO: Implement registration/cart functionality
              console.log(`Action for presentation: ${presentation.title}`);
            }}
            style={{
              borderRadius: "8px",
              height: "36px",
            }}
            disabled={!presentation.is_active}
          >
            {presentation.is_paid
              ? t("workshop.addToCart")
              : t("workshop.enroll")}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
