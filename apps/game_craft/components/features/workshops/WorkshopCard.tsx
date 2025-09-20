"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ItemType, PresentationOverview } from "@ssc/core";
import PresentersAvatar from "../presentersAvatar/PresentersAvatar";
import { use, useMemo, useState } from "react";
import {
  Card,
  Typography,
  Button as AntButton,
  Flex,
  Badge,
  Modal,
  theme,
  Space,
  Row,
  Col,
} from "antd";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useFormatter } from "lib/hooks/useFormatter";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import {
  cartLoadingSelector,
  itemInCartSelector,
} from "lib/store/cart/cart.selectors";
import { useIsPresentationPurchased } from "lib/hooks/usePurchases";
import {
  addItemToCartThunk,
  removeItemFromCartThunk,
} from "lib/store/cart/cart.thunk";
import { toast } from "react-toastify";
import { useAuth } from "lib/hooks/useAuth";
import { digitsToHindi } from "@ssc/utils";

const { useToken } = theme;

interface WorkshopCardProps {
  workshopImage?: string;
  presentation: PresentationOverview;
  isPurchased?: boolean; // Add this prop to control purchase button visibility
}

// simple RTL detection (Persian/Arabic Unicode ranges)
const isRTL = (text?: string) =>
  !!text && /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);

export function WorkshopCard({
  presentation,
  workshopImage,
  isPurchased = false, // Default to false if not provided
}: WorkshopCardProps) {
  const t = useTranslations();
  const [showModal, setShowModal] = useState(false);
  const { formatNumberToMoney } = useFormatter();
  const dispatch = useAppDispatch();
  const itemInCart = useAppSelector(
    itemInCartSelector(presentation.id, ItemType.PRESENTATION)
  );
  const isPresentationPurchased = useIsPresentationPurchased(presentation.id);
  const buttonShouldBeDisabled = useAppSelector(cartLoadingSelector);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { token } = useToken();

  const isSelected = useMemo(() => {
    return itemInCart !== undefined;
  }, [itemInCart]);

  // Color palette
  const colorStripes = ["#4CAF50", "#2196F3", "#FFC107", "#F44336"];

  const buttonText = useMemo(() => {
    if (!isAuthenticated) return t("workshop.loginToContinue");
    if (isSelected) {
      return t("workshop.removeFromCart");
    } else {
      return presentation.is_paid
        ? t("workshop.addToCart")
        : t("workshop.enroll");
    }
  }, [isSelected, presentation, t, isAuthenticated]);

  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("fa-IR", {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format time only (for end time when it's same day)
  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("fa-IR", {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if start and end dates are on the same day
  const isSameDay = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return start.toDateString() === end.toDateString();
  };

  // Format date time range
  const formatDateTimeRange = () => {
    if (!presentation.end_time) {
      return formatDateTime(presentation.start_time);
    }

    // if (isSameDay(presentation.start_time, presentation.end_time)) {
    //     // Same day: show date + start time - end time
    //
    // } else {
    //     // Different days: show full start date/time - full end date/time
    //     return `${formatDateTime(presentation.start_time)} - ${formatDateTime(presentation.end_time)}`;
    // }

    // since all the presentations are on one day
    return `${formatDateTime(presentation.start_time)} - ${formatTime(
      presentation.end_time
    )}`;
  };

  const handleAddToCart = () => {
    if (buttonShouldBeDisabled) {
      if (!isAuthenticated) {
        toast.error("لطفا وارد حساب خود شوید");
      }
      return;
    }
    setButtonLoading(true);
    dispatch(
      addItemToCartThunk({
        item_type: ItemType.PRESENTATION,
        item_id: presentation.id,
      })
    )
      .unwrap()
      .catch()
      .finally(() => setButtonLoading(false));
  };

  const removeFromCart = () => {
    if (buttonShouldBeDisabled || !itemInCart) return;
    setButtonLoading(true);
    dispatch(
      removeItemFromCartThunk({
        item_id: itemInCart.id,
        item_type: ItemType.PRESENTATION,
      })
    )
      .unwrap()
      .catch()
      .finally(() => setButtonLoading(false));
  };

  const titleIsRTL = isRTL(presentation.title);
  const descriptionIsRTL = isRTL(presentation.description);

  const formatPrice = () => {
    return presentation.is_paid
      ? formatNumberToMoney(presentation.price)
      : t("workshop.free");
  };

  return (
    <>
      {/* Workshop Card */}
      <Card
        style={{
          width: "100%",
          minWidth: "250px",
          maxWidth: "100%",
          borderRadius: token.borderRadiusLG,
          overflow: "hidden",
          border: "none",
          backgroundColor: token.colorBgContainer,
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
        hoverable
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
            src={workshopImage || "/placeholder-workshop.jpg"}
            alt="workshop"
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

          {/* View Details Button */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
            }}
          >
            <AntButton
              onClick={() => setShowModal(true)}
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              style={{
                borderRadius: token.borderRadiusLG,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderColor: "transparent",
              }}
            >
              جزئیات بیشتر
            </AntButton>
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
          {/* Title and Badges */}
          <Flex vertical gap="small">
            <Typography.Title
              level={4}
              style={{
                margin: 0,
                fontSize: "18px",
                lineHeight: 1.4,
                direction: titleIsRTL ? "rtl" : "ltr",
              }}
              ellipsis={{ rows: 2 }}
            >
              {presentation.title}
            </Typography.Title>

            <Flex gap="small" wrap>
              {!presentation.is_online && (
                <Badge
                  style={{
                    backgroundColor: "transparent",
                    color: token.colorWarning,
                    border: `1px solid ${token.colorWarning}`,
                    borderRadius: "4px",
                    padding: "0 8px",
                  }}
                  count={t("workshop.inPerson")}
                />
              )}
              {presentation.is_online && (
                <Badge
                  style={{
                    backgroundColor: "transparent",
                    color: token.colorSuccess,
                    border: `1px solid ${token.colorSuccess}`,
                    borderRadius: "4px",
                    padding: "0 8px",
                  }}
                  count={t("workshop.online")}
                />
              )}
              <Badge
                style={{
                  backgroundColor: "transparent",
                  color: token.colorInfo,
                  border: `1px solid ${token.colorInfo}`,
                  borderRadius: "4px",
                  padding: "0 8px",
                }}
                count={t(`workshop.type.${presentation.type}`)}
              />
              <Badge
                style={{
                  backgroundColor: "transparent",
                  color: token.colorInfo,
                  border: `1px solid ${token.colorInfo}`,
                  borderRadius: "4px",
                  padding: "0 8px",
                }}
                count={t(`workshop.level.${presentation.level}`)}
              />
            </Flex>
          </Flex>

          {/* Description */}
          <Typography.Paragraph
            style={{
              color: token.colorTextSecondary,
              margin: 0,
              fontSize: "14px",
              lineHeight: 1.6,
              direction: descriptionIsRTL ? "rtl" : "ltr",
            }}
            ellipsis={{ rows: 3 }}
          >
            {presentation.description}
          </Typography.Paragraph>

          {/* Date and Time */}
          <Flex align="center" gap="small">
            <ClockCircleOutlined style={{ color: token.colorPrimary }} />
            <Typography.Text
              style={{ color: token.colorTextSecondary, fontSize: "14px" }}
            >
              {formatDateTimeRange()}
            </Typography.Text>
          </Flex>

          {/* Location/Link */}
          {presentation.location && !presentation.is_online && (
            <Flex align="center" gap="small">
              <EnvironmentOutlined style={{ color: token.colorSuccess }} />
              <Typography.Text
                style={{ color: token.colorTextSecondary, fontSize: "14px" }}
              >
                {presentation.location}
              </Typography.Text>
            </Flex>
          )}
          {presentation.online_link && presentation.is_online && (
            <Flex align="center" gap="small">
              <LinkOutlined style={{ color: token.colorPrimary }} />
              <Typography.Text
                style={{ color: token.colorTextSecondary, fontSize: "14px" }}
              >
                {t("workshop.onlineLink")}
              </Typography.Text>
            </Flex>
          )}

          {/* Presenters Label */}
          <Typography.Text
            style={{
              color: token.colorTextSecondary,
              fontSize: "14px",
              opacity: 0.7,
            }}
          >
            {t("workshop.presenters")}:
          </Typography.Text>

          {/* Presenters */}
          <PresentersAvatar presenters={presentation.presenters_details} />

          {/* Capacity */}
          <Flex
            justify="space-between"
            align="center"
            style={{
              marginTop: "auto",
              paddingTop: "12px",
              borderTop: `1px solid ${token.colorBorder}`,
            }}
          >
            <Typography.Title
              level={5}
              style={{
                margin: 0,
                fontSize: "16px",
              }}
            >
              {t("workshop.capacity") +
                ": " +
                digitsToHindi(presentation.capacity)}
            </Typography.Title>

            <Typography.Title
              level={5}
              style={{
                margin: 0,
                fontSize: "16px",
              }}
            >
              {t("workshop.remainingCapacity") +
                ": " +
                digitsToHindi(presentation.remaining_capacity)}
            </Typography.Title>
          </Flex>

          {/* Price and Add to Cart */}
          <Flex
            justify="space-between"
            align="center"
            style={{
              marginTop: "auto",
              paddingTop: "12px",
              borderTop: `1px solid ${token.colorBorder}`,
            }}
          >
            <Typography.Title
              level={5}
              style={{
                margin: 0,
                fontSize: "16px",
              }}
            >
              {formatPrice()} {presentation.is_paid && t("common.currency")}
            </Typography.Title>

            {/* Show purchased button if already purchased, otherwise show add to cart/register button */}
            {isPresentationPurchased ? (
              <AntButton
                disabled
                style={{
                  borderRadius: token.borderRadius,
                  height: "36px",
                  backgroundColor: token.colorSuccess,
                  borderColor: token.colorSuccess,
                  color: "white",
                }}
              >
                خریداری شده
              </AntButton>
            ) : (
              <AntButton
                type={isSelected ? "default" : "primary"}
                danger={isSelected}
                icon={
                  isSelected ? <DeleteOutlined /> : <ShoppingCartOutlined />
                }
                onClick={isSelected ? removeFromCart : handleAddToCart}
                disabled={
                  !presentation.is_active ||
                  buttonShouldBeDisabled ||
                  presentation.capacity <= 0 ||
                  !isAuthenticated
                }
                loading={buttonLoading}
                style={{
                  borderRadius: token.borderRadius,
                  height: "36px",
                }}
              >
                {buttonText}
              </AntButton>
            )}
          </Flex>
        </Flex>
      </Card>

      {/* Modal */}
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          // Only show action button if not purchased
          ...(!isPurchased
            ? [
                <AntButton
                  key="action"
                  type={isSelected ? "default" : "primary"}
                  danger={isSelected}
                  icon={
                    isSelected ? <DeleteOutlined /> : <ShoppingCartOutlined />
                  }
                  onClick={() => {
                    if (isSelected) {
                      removeFromCart();
                    } else {
                      handleAddToCart();
                    }
                    setShowModal(false);
                  }}
                  disabled={
                    !presentation.is_active ||
                    buttonShouldBeDisabled ||
                    presentation.capacity <= 0 ||
                    !isAuthenticated
                  }
                  loading={buttonLoading}
                >
                  {buttonText}
                </AntButton>,
              ]
            : []),
        ]}
        width={800}
        style={{ top: 50, zIndex: 200 }}
        styles={{
          body: { maxHeight: "70vh", overflowY: "auto" },
        }}
      >
        <Typography.Title
          level={2}
          style={{
            direction: titleIsRTL ? "rtl" : "ltr",
            marginBottom: "24px",
          }}
        >
          {presentation.title}
        </Typography.Title>

        {/* Workshop Image */}
        {workshopImage && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "256px",
              marginBottom: "24px",
              borderRadius: token.borderRadius,
              overflow: "hidden",
            }}
          >
            <Image
              src={workshopImage}
              alt="workshop"
              fill
              style={{ objectFit: "cover" }}
            />
            {/* Colored Stripes */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                display: "flex",
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
        )}

        {/* Workshop Details */}
        <Row gutter={[24, 24]} className="w-full">
          {/* Left Column */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* Description */}
              <div>
                <Typography.Title level={4} style={{ marginBottom: "12px" }}>
                  {t("workshop.description")}
                </Typography.Title>
                <Typography.Paragraph
                  style={{
                    color: token.colorTextSecondary,
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                    direction: descriptionIsRTL ? "rtl" : "ltr",
                  }}
                >
                  {presentation.description}
                </Typography.Paragraph>
              </div>

              {/* Date and Time */}
              <div>
                <Typography.Title level={4} style={{ marginBottom: "12px" }}>
                  {t("workshop.schedule")}
                </Typography.Title>
                <Flex align="center" gap="small">
                  <ClockCircleOutlined
                    style={{ color: token.colorPrimary, fontSize: "20px" }}
                  />
                  <Typography.Text style={{ color: token.colorTextSecondary }}>
                    {formatDateTimeRange()}
                  </Typography.Text>
                </Flex>
              </div>

              {/* Location */}
              {presentation.location !== null && (
                <div>
                  <Typography.Title level={4} style={{ marginBottom: "12px" }}>
                    {t("workshop.location")}
                  </Typography.Title>
                  {presentation.location && !presentation.is_online && (
                    <Flex align="center" gap="small">
                      <EnvironmentOutlined
                        style={{ color: token.colorSuccess, fontSize: "20px" }}
                      />
                      <Typography.Text
                        style={{ color: token.colorTextSecondary }}
                      >
                        {presentation.location}
                      </Typography.Text>
                    </Flex>
                  )}
                  {presentation.online_link && presentation.is_online && (
                    <Flex align="center" gap="small">
                      <LinkOutlined
                        style={{ color: token.colorPrimary, fontSize: "20px" }}
                      />
                      <Typography.Text
                        style={{ color: token.colorTextSecondary }}
                      >
                        {t("workshop.onlineLink")}
                      </Typography.Text>
                    </Flex>
                  )}
                </div>
              )}
            </Space>
          </Col>

          {/* Right Column */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* Presenters */}
              <div>
                <Typography.Title level={4} style={{ marginBottom: "12px" }}>
                  {t("workshop.presenters")}
                </Typography.Title>
                {presentation.presenters_details.map((presenter) => (
                  <>
                    <PresentersAvatar presenters={[presenter]} />
                    <Typography.Paragraph
                      style={{
                        color: token.colorTextSecondary,
                        lineHeight: 1.7,
                        whiteSpace: "pre-line",
                        direction: descriptionIsRTL ? "rtl" : "ltr",
                        marginBottom: "12px",
                      }}
                    >
                      {presenter.bio}
                    </Typography.Paragraph>
                  </>
                ))}
              </div>

              {/* Price */}
              <div>
                <Typography.Title level={4} style={{ marginBottom: "12px" }}>
                  {t("workshop.price")}
                </Typography.Title>
                <Typography.Title
                  level={3}
                  style={{
                    margin: 0,
                    color: token.colorText,
                  }}
                >
                  {presentation.is_paid
                    ? `${formatNumberToMoney(presentation.price)} ${t(
                        "common.currency"
                      )}`
                    : t("workshop.free")}
                </Typography.Title>
              </div>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
