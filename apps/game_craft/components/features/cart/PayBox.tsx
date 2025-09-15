"use client";

import {
  cartPresentationsSelector,
  cartLoadingSelector,
  cartPaymentDataSelector,
} from "lib/store/cart/cart.selectors";
import { createAndCheckoutThunk } from "lib/store/order/order.thunk";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import { useCallback } from "react";
import {
  Flex,
  Divider,
  Typography,
  Button as AntButton,
  theme,
  Spin,
} from "antd";
import { useFormatter } from "lib/hooks/useFormatter";

const { useToken } = theme;

export function PayBox() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(cartPresentationsSelector);
  const paymentData = useAppSelector(cartPaymentDataSelector);
  const loading = useAppSelector(cartLoadingSelector);
  const { token } = useToken();
  const { formatNumberToMoney } = useFormatter();

  const applyDiscount = () => {
    // TODO: handling discount code
    // dispatch(applyBonusCodeThunk("DISCOUNT2024"));
  };

  const checkout = useCallback(() => {
    dispatch(createAndCheckoutThunk(cartItems.map((item) => item.id)))
      .unwrap()
      .then((res) => {
        window.open(res.payment_url, "_blank");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cartItems]);

  if (loading) {
    return (
      <Flex
        align="center"
        justify="center"
        style={{
          width: "100%",
          padding: token.padding,
          height: "200px",
        }}
      >
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: "100%",
        padding: token.padding,
        paddingTop: 0,
        zIndex: 1000,
      }}
      gap="small"
    >
      <Divider
        variant="dashed"
        type="horizontal"
        style={{ borderColor: token.colorBorder }}
      />

      <Flex
        align="center"
        justify="space-between"
        style={{
          width: "100%",
        }}
        gap="middle"
      >
        {!paymentData.discountCode ? (
          <>
            <Typography.Text>کد تخفیف دارید؟</Typography.Text>
            <AntButton type="dashed" onClick={applyDiscount}>
              وارد کردن
            </AntButton>
          </>
        ) : (
          <Typography.Text type="secondary">
            کد تخفیف شما: {paymentData.discountCode}
          </Typography.Text>
        )}
      </Flex>

      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          width: "100%",
        }}
        gap="small"
      >
        <Flex align="center" justify="space-between" style={{ width: "100%" }}>
          <Typography.Text>جمع کل:</Typography.Text>
          <Typography.Text strong>
            {formatNumberToMoney(paymentData.subTotal)} تومان
          </Typography.Text>
        </Flex>

        {paymentData.discountAmount > 0 && (
          <Flex
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <Typography.Text type="secondary">تخفیف:</Typography.Text>
            <Typography.Text type="success">
              -{formatNumberToMoney(paymentData.discountAmount)} تومان
            </Typography.Text>
          </Flex>
        )}

        <Divider
          variant="solid"
          style={{ margin: "8px 0", borderColor: token.colorBorder }}
        />

        <Flex align="center" justify="space-between" style={{ width: "100%" }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            مبلغ نهایی:
          </Typography.Title>
          <Typography.Title
            level={5}
            style={{ margin: 0, color: token.colorPrimary }}
          >
            {formatNumberToMoney(paymentData.total)} تومان
          </Typography.Title>
        </Flex>

        <AntButton
          type="primary"
          size="large"
          block
          style={{ marginTop: token.margin }}
          onClick={checkout}
        >
          <Flex align="center" justify="center" gap="small">
            <Typography.Text style={{ fontWeight: 900, color: "white" }}>
              پرداخت
            </Typography.Text>
          </Flex>
        </AntButton>
      </Flex>
    </Flex>
  );
}
