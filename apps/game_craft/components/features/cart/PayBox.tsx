"use client";

import {
  cartPresentationsSelector,
  cartLoadingSelector,
  cartPaymentDataSelector,
} from "lib/store/cart/cart.selectors";
import { createAndCheckoutThunk } from "lib/store/order/order.thunk";
import {
  applyBonusCodeThunk,
  removeBonusCodeThunk,
} from "lib/store/cart/cart.thunk";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import { useCallback, useState } from "react";
import {
  Flex,
  Divider,
  Typography,
  Button as AntButton,
  theme,
  Spin,
  Modal,
  Input,
  message,
} from "antd";
import { useFormatter } from "lib/hooks/useFormatter";
import { toast, ToastContainer } from "react-toastify";
import { FaCross } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const { useToken } = theme;

export function PayBox() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(cartPresentationsSelector);
  const paymentData = useAppSelector(cartPaymentDataSelector);
  const loading = useAppSelector(cartLoadingSelector);
  const { token, theme } = useToken();
  const { formatNumberToMoney } = useFormatter();

  // State for discount code modal and input
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);

  const applyDiscount = () => {
    setIsDiscountModalOpen(true);
  };

  const handleDiscountSubmit = async () => {
    if (!discountCode.trim()) {
      toast.error("لطفاً کد تخفیف را وارد کنید");
      return;
    }

    setDiscountLoading(true);
    try {
      await dispatch(applyBonusCodeThunk(discountCode.trim())).unwrap();
      toast.success("کد تخفیف با موفقیت اعمال شد");
      setIsDiscountModalOpen(false);
      setDiscountCode("");
    } catch (error) {
      toast.error("کد تخفیف معتبر نمی باشد");
    } finally {
      setDiscountLoading(false);
    }
  };

  const handleDiscountCancel = () => {
    setIsDiscountModalOpen(false);
    setDiscountCode("");
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
  }, [cartItems, dispatch]);

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
      <ToastContainer theme={theme.id === 1 ? "dark" : "light"} />
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
          <>
            <Typography.Text type="secondary">کد تخفیف شما:</Typography.Text>
            <>
              <Flex align="top" gap="4px">
                <Typography.Text type="secondary">
                  {paymentData.discountCode}
                </Typography.Text>
                <AntButton
                  type="text"
                  danger
                  icon={<MdCancel size={24} />}
                  onClick={() => dispatch(removeBonusCodeThunk())}
                  style={{ padding: 0, margin: 0 }}
                  aria-label="حذف کد تخفیف"
                />
              </Flex>
            </>
          </>
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

      {/* Discount Code Modal */}
      <Modal
        title="وارد کردن کد تخفیف"
        open={isDiscountModalOpen}
        onOk={handleDiscountSubmit}
        onCancel={handleDiscountCancel}
        confirmLoading={discountLoading}
        okText="اعمال"
        cancelText="انصراف"
        destroyOnHidden={true}
      >
        <Flex vertical gap="middle" style={{ padding: "16px 0" }}>
          <Typography.Text>کد تخفیف خود را وارد کنید:</Typography.Text>
          <Input
            placeholder="کد تخفیف"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            onPressEnter={handleDiscountSubmit}
            size="large"
            disabled={discountLoading}
          />
        </Flex>
      </Modal>
    </Flex>
  );
}
