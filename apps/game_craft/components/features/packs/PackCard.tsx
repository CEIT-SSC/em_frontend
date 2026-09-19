"use client";

import {
  AppstoreOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Button, Card, Flex, Modal, theme, Typography } from "antd";
import { ItemType, Pack } from "@ssc/core";
import Image from "next/image";
import { useFormatter } from "lib/hooks/useFormatter";
import { useAuth } from "lib/hooks/useAuth";
import {
  cartLoadingSelector,
  itemInCartSelector,
} from "lib/store/cart/cart.selectors";
import {
  addItemToCartThunk,
  removeItemFromCartThunk,
} from "lib/store/cart/cart.thunk";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

const { useToken } = theme;

export function PackCard({ pack }: { pack: Pack }) {
  const t = useTranslations();
  const { token } = useToken();
  const { formatNumberToMoney } = useFormatter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const inCart = useAppSelector(itemInCartSelector(pack.id, ItemType.PACK));
  const cartLoading = useAppSelector(cartLoadingSelector);
  const isSelected = Boolean(inCart);
  const includedItems = [
    ...pack.presentations.map((item) => item.title),
    ...pack.solo_competitions.map((item) => item.title),
    ...pack.products.map((item) => item.name),
  ];
  const packImage =
    pack.image ??
    pack.presentations.find((item) => item.poster)?.poster ??
    pack.products.find((item) => item.image)?.image ??
    null;
  const savings = Math.max(
    0,
    Number(pack.calculated_price) - Number(pack.real_price),
  );
  const buttonText = !isAuthenticated
    ? t("workshop.loginToContinue")
    : isSelected
      ? t("workshop.removeFromCart")
      : t("workshop.addToCart");

  const toggleCart = () => {
    if (!isAuthenticated) {
      toast.error(t("workshop.loginToContinue"));
      return;
    }
    if (cartLoading) return;
    setButtonLoading(true);
    const action = isSelected
      ? removeItemFromCartThunk({ item_id: pack.id, item_type: ItemType.PACK })
      : addItemToCartThunk({ item_id: pack.id, item_type: ItemType.PACK });
    dispatch(action)
      .unwrap()
      .catch(() => undefined)
      .finally(() => setButtonLoading(false));
  };

  return (
    <>
      <Card
        className="gc-pack-card"
        hoverable
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
      >
        <div className="gc-pack-card__visual">
          {packImage ? (
            <Image
              src={packImage}
              alt=""
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="gc-pack-card__visual-fallback" aria-hidden="true">
              <AppstoreOutlined />
            </div>
          )}
          <div className="gc-pack-card__stripes" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <Button
            className="gc-card-details gc-pack-card__visual-action"
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => setDetailsOpen(true)}
            style={{ borderRadius: token.borderRadiusLG }}
          >
            {t("packs.viewContents")}
          </Button>
        </div>
        <Flex
          className="gc-pack-card__body"
          vertical
          style={{
            padding: "16px",
            flex: 1,
            gap: "12px",
          }}
        >
          <Flex vertical gap="small">
            <Typography.Title
              className="gc-pack-card__title"
              level={3}
              style={{ margin: 0, fontSize: "18px", lineHeight: 1.4 }}
              ellipsis={{ rows: 2 }}
            >
              {pack.name}
            </Typography.Title>
            <Flex className="gc-card-tags gc-pack-card__tags" gap="small" wrap>
              <Badge
                count={t("packs.bundleBadge")}
                className="gc-card-tag gc-card-tag--warning gc-pack-card__badge"
              />
              <Badge
                count={t("packs.includedCount", {
                  count: includedItems.length,
                })}
                className="gc-card-tag gc-card-tag--info gc-pack-card__count"
              />
              {savings > 0 && (
                <Badge
                  count={t("packs.save", {
                    amount: formatNumberToMoney(savings),
                  })}
                  className="gc-card-tag gc-card-tag--success gc-pack-card__saving"
                />
              )}
            </Flex>
          </Flex>

          <Typography.Paragraph
            className="gc-pack-card__description"
            ellipsis={{ rows: 3 }}
            style={{
              color: token.colorTextSecondary,
              margin: 0,
              fontSize: "14px",
              lineHeight: 1.6,
            }}
          >
            {pack.description}
          </Typography.Paragraph>

          <Flex
            className="gc-pack-card__footer"
            justify="space-between"
            align="center"
            style={{
              marginTop: "auto",
              paddingTop: "12px",
              borderTop: `1px solid ${token.colorBorder}`,
            }}
          >
            <Typography.Title level={5} style={{ margin: 0, fontSize: "16px" }}>
              {formatNumberToMoney(pack.real_price)} {t("common.currency")}
            </Typography.Title>
            <Button
              className="gc-card-purchase"
              type={isSelected ? "default" : "primary"}
              danger={isSelected}
              icon={isSelected ? <DeleteOutlined /> : <ShoppingCartOutlined />}
              loading={buttonLoading}
              onClick={toggleCart}
              style={{ borderRadius: token.borderRadius, height: "36px" }}
            >
              {buttonText}
            </Button>
          </Flex>
        </Flex>
      </Card>
      <Modal
        className="gc-pack-modal"
        open={detailsOpen}
        onCancel={() => setDetailsOpen(false)}
        title={
          <Flex
            className="gc-pack-modal__title"
            align="center"
            gap="small"
            dir="auto"
          >
            <Typography.Title level={3}>{pack.name}</Typography.Title>
            <Badge
              count={t("packs.bundleBadge")}
              className="gc-card-tag gc-card-tag--warning gc-pack-card__badge"
            />
          </Flex>
        }
        footer={
          <Button
            className="gc-card-purchase"
            type={isSelected ? "default" : "primary"}
            danger={isSelected}
            icon={isSelected ? <DeleteOutlined /> : <ShoppingCartOutlined />}
            loading={buttonLoading}
            onClick={toggleCart}
            style={{ borderRadius: token.borderRadius, height: "36px" }}
          >
            {buttonText}
          </Button>
        }
      >
        <Flex className="gc-pack-modal__content" vertical gap="large">
          <Typography.Paragraph
            className="gc-pack-modal__description"
            dir="auto"
            style={{ margin: 0 }}
          >
            {pack.description}
          </Typography.Paragraph>
          <Flex
            className="gc-pack-modal__price"
            align="center"
            justify="space-between"
            gap="middle"
            wrap
          >
            <Typography.Text type="secondary">
              {t("packs.contents")}
            </Typography.Text>
            <Flex vertical align="end" gap={2} style={{ margin: 8 }}>
              {Number(pack.calculated_price) > Number(pack.real_price) && (
                <Typography.Text delete type="secondary">
                  {formatNumberToMoney(pack.calculated_price)}{" "}
                  {t("common.currency")}
                </Typography.Text>
              )}
              <Typography.Title level={4} style={{ margin: 0 }}>
                {formatNumberToMoney(pack.real_price)} {t("common.currency")}
              </Typography.Title>
            </Flex>
          </Flex>
          <Flex className="gc-pack-modal__items" vertical>
            {includedItems.map((item, index) => (
              <Flex
                className="gc-pack-modal__item"
                key={`${item}-${index}`}
                gap="small"
                align="center"
                dir="auto"
              >
                <CheckCircleOutlined aria-hidden="true" />
                <Typography.Text>{item}</Typography.Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
