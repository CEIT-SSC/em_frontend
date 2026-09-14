"use client";

import { CheckCircleOutlined, DeleteOutlined, EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Flex, Modal, Space, Typography } from "antd";
import { ItemType, Pack } from "@ssc/core";
import { useFormatter } from "lib/hooks/useFormatter";
import { useAuth } from "lib/hooks/useAuth";
import { cartLoadingSelector, itemInCartSelector } from "lib/store/cart/cart.selectors";
import { addItemToCartThunk, removeItemFromCartThunk } from "lib/store/cart/cart.thunk";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

export function PackCard({ pack }: { pack: Pack }) {
  const t = useTranslations();
  const { formatNumberToMoney } = useFormatter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const inCart = useAppSelector(itemInCartSelector(pack.id, ItemType.PACK));
  const cartLoading = useAppSelector(cartLoadingSelector);
  const isSelected = Boolean(inCart);
  const includedItems = [...pack.presentations.map((item) => item.title), ...pack.solo_competitions.map((item) => item.title), ...pack.products.map((item) => item.name)];
  const savings = Math.max(0, Number(pack.calculated_price) - Number(pack.real_price));
  const buttonText = !isAuthenticated ? t("workshop.loginToContinue") : isSelected ? t("workshop.removeFromCart") : t("workshop.addToCart");

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
    dispatch(action).unwrap().catch(() => undefined).finally(() => setButtonLoading(false));
  };

  return (
    <>
      <Card className="gc-pack-card" hoverable style={{ width: "100%", height: "100%" }} styles={{ body: { padding: 20, display: "flex", flexDirection: "column", gap: 16, height: "100%" } }}>
        <Flex justify="space-between" align="start" gap="small">
          <Typography.Title level={3} style={{ margin: 0 }}>{pack.name}</Typography.Title>
          <Badge count={t("packs.bundleBadge")} className="gc-pack-card__badge" />
        </Flex>
        <Typography.Paragraph ellipsis={{ rows: 3 }} type="secondary" style={{ margin: 0 }}>{pack.description}</Typography.Paragraph>
        <Space wrap size={[6, 6]}>
          <Badge count={t("packs.includedCount", { count: includedItems.length })} className="gc-pack-card__count" />
          {savings > 0 && <Badge count={t("packs.save", { amount: formatNumberToMoney(savings) })} className="gc-pack-card__saving" />}
        </Space>
        <Flex vertical gap={2} style={{ marginTop: "auto" }}>
          {Number(pack.calculated_price) > Number(pack.real_price) && <Typography.Text delete type="secondary">{formatNumberToMoney(pack.calculated_price)} {t("common.currency")}</Typography.Text>}
          <Typography.Title level={4} style={{ margin: 0 }}>{formatNumberToMoney(pack.real_price)} {t("common.currency")}</Typography.Title>
        </Flex>
        <Flex gap="small">
          <Button icon={<EyeOutlined />} onClick={() => setDetailsOpen(true)} aria-label={t("packs.viewContents")} />
          <Button type={isSelected ? "default" : "primary"} danger={isSelected} icon={isSelected ? <DeleteOutlined /> : <ShoppingCartOutlined />} loading={buttonLoading} onClick={toggleCart} block>
            {buttonText}
          </Button>
        </Flex>
      </Card>
      <Modal open={detailsOpen} footer={null} onCancel={() => setDetailsOpen(false)} title={pack.name}>
        <Typography.Paragraph>{pack.description}</Typography.Paragraph>
        <Typography.Title level={4}>{t("packs.contents")}</Typography.Title>
        <Space direction="vertical" style={{ width: "100%" }}>
          {includedItems.map((item, index) => <Flex key={`${item}-${index}`} gap="small" align="center"><CheckCircleOutlined /><Typography.Text>{item}</Typography.Text></Flex>)}
        </Space>
      </Modal>
    </>
  );
}
